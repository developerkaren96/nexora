import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ssrApi } from "@/lib/api";
import { DashboardShell } from "./_components/dashboard-shell";

// Paths inside app.<domain> that don't require auth.
const PUBLIC_PREFIXES = ["/login", "/register", "/forgot", "/reset"];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const c = (await cookies()).toString();
  let me: any = null;
  try {
    me = await ssrApi<any>("/users/me", c);
  } catch {}

  if (!me) {
    if (isPublic) return <>{children}</>;
    const dest = pathname && pathname !== "/" ? `?redirect=${encodeURIComponent(pathname)}` : "";
    redirect(`/login${dest}`);
  }

  // Authenticated user hitting /login or /register → send them home.
  if (me && isPublic) redirect("/");

  return <DashboardShell me={me}>{children}</DashboardShell>;
}
