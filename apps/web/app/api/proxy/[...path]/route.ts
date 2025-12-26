import { NextRequest, NextResponse } from "next/server";

/**
 * Same-origin proxy to the NestJS API.
 *
 * Why this exists:
 *   The API at API_URL sets auth cookies on its own origin. Browsers do NOT send
 *   those cookies on cross-origin `fetch()` with SameSite=Lax. By proxying every
 *   API call through Next.js, the request becomes same-origin and Set-Cookie
 *   from the backend gets re-applied to the frontend host — so SSR and CSR
 *   share the same auth state on every subdomain (app.localhost, admin.localhost,
 *   <slug>.localhost) without any CORS / cookie-domain gymnastics.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Headers that must never be forwarded — they're hop-by-hop or will confuse the upstream.
const STRIP_REQ = new Set([
  "host", "connection", "content-length", "accept-encoding",
  "x-forwarded-host", "x-forwarded-proto", "x-forwarded-port",
]);
const STRIP_RES = new Set([
  "transfer-encoding", "connection", "keep-alive", "content-encoding",
]);

async function handle(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const search = req.nextUrl.search;
  const target = `${API_URL}/v1/${path.join("/")}${search}`;

  // Forward headers (filtered)
  const headers = new Headers();
  req.headers.forEach((v, k) => { if (!STRIP_REQ.has(k.toLowerCase())) headers.set(k, v); });

  // Body: only for methods that can have one
  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const upstream = await fetch(target, {
    method,
    headers,
    body: body && body.byteLength ? body : undefined,
    redirect: "manual",
    // Forward the browser's cookies for this origin to the upstream as a Cookie header.
    // (req.headers already includes "cookie" — Next preserves it.)
  });

  // Build response, copy headers (filtered)
  const resHeaders = new Headers();
  upstream.headers.forEach((v, k) => { if (!STRIP_RES.has(k.toLowerCase())) resHeaders.append(k, v); });

  // Re-issue Set-Cookie on the frontend host: strip any Domain= attribute so it
  // becomes host-only (works for app.localhost, admin.localhost, etc.).
  resHeaders.delete("set-cookie");
  const setCookies = upstream.headers.getSetCookie?.() ?? [];
  for (const raw of setCookies) {
    const cleaned = raw
      .split(";")
      .map((p) => p.trim())
      .filter((p) => !/^domain=/i.test(p))
      .join("; ");
    resHeaders.append("set-cookie", cleaned);
  }

  const buf = await upstream.arrayBuffer();
  return new NextResponse(buf, { status: upstream.status, headers: resHeaders });
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
export const HEAD = handle;
