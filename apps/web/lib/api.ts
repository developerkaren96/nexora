import { API_URL } from "./utils";
export { API_URL };

export class ApiError extends Error {
  constructor(msg: string, public status: number, public body?: any) { super(msg); }
}

/**
 * Browser-side fetch — goes through Next.js same-origin proxy so cookies
 * Just Work across subdomains. Path is the API path WITHOUT the /v1 prefix
 * (the proxy adds it).
 */
export async function api<T>(path: string, init: RequestInit & { tenantSlug?: string } = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");
  if (init.tenantSlug) headers.set("X-Tenant-Slug", init.tenantSlug);
  const url = `/api/proxy${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, { ...init, headers, credentials: "include" });
  const text = await res.text();
  const data = text ? safeJson(text) : null;
  if (!res.ok) throw new ApiError(data?.message ?? `Request failed (${res.status})`, res.status, data);
  return data as T;
}
function safeJson(t: string) { try { return JSON.parse(t); } catch { return t; } }

/**
 * Server-side fetch — hits the backend API directly and forwards the user's
 * cookies (which were placed on the frontend host by the proxy on login).
 * Use from server components / route handlers only.
 */
export async function ssrApi<T>(path: string, cookieHeader?: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (cookieHeader) headers.set("cookie", cookieHeader);
  const url = `${API_URL}/v1${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  if (!res.ok) throw new ApiError(`SSR fetch ${path} → ${res.status}`, res.status);
  return res.json() as Promise<T>;
}
