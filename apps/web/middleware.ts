import { NextRequest, NextResponse } from "next/server";

const ROOT = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "nexora.app";
const RESERVED = new Set(["app", "api", "www", "admin", "docs"]);

/**
 * Routes:
 *   - nexora.app, www.nexora.app                → marketing (rewrites to /marketing)
 *   - app.nexora.app                            → dashboard (rewrites to /dashboard)
 *   - admin.nexora.app                          → super-admin (rewrites to /admin)
 *   - <slug>.nexora.app or <custom domain>      → tenant site (rewrites to /t/<slug>)
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host")?.toLowerCase().split(":")[0] ?? "";
  if (!host) return NextResponse.next();

  // static / next internals
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api") || url.pathname.match(/\.[a-z0-9]+$/i)) {
    return NextResponse.next();
  }

  const isRoot = host === ROOT || host === `www.${ROOT}` || host === "localhost" || host === "127.0.0.1";
  const sub = host.endsWith(`.${ROOT}`)
    ? host.slice(0, -1 * (ROOT.length + 1))
    : host.endsWith(".localhost")
      ? host.slice(0, -(".localhost".length))
      : null;

  // Forward the original pathname so server components / layouts can do
  // pathname-aware logic (e.g. auth gating on /login vs protected pages).
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-pathname", url.pathname);
  const opts = { request: { headers: reqHeaders } } as const;

  if (isRoot) {
    return NextResponse.rewrite(new URL(`/marketing${url.pathname}${url.search}`, req.url), opts);
  }
  if (sub === "app") {
    return NextResponse.rewrite(new URL(`/dashboard${url.pathname}${url.search}`, req.url), opts);
  }
  if (sub === "admin") {
    return NextResponse.rewrite(new URL(`/admin${url.pathname}${url.search}`, req.url), opts);
  }
  if (sub && !RESERVED.has(sub)) {
    return NextResponse.rewrite(new URL(`/t/${sub}${url.pathname}${url.search}`, req.url), opts);
  }
  // Custom domain
  return NextResponse.rewrite(new URL(`/t/_byhost${url.pathname}${url.search}`, req.url), opts);
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
