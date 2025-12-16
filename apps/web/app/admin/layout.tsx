import { cookies } from "next/headers";
import { ssrApi } from "@/lib/api";
import { AdminLogin } from "./_components/admin-login";
import { AdminShell } from "./_components/admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const c = (await cookies()).toString();
  let me: any = null;
  try { me = await ssrApi<any>("/users/me", c); } catch {}

  if (!me) return <AdminLogin />;
  if (me.systemRole !== "PLATFORM_ADMIN") return <AdminLogin wrongRole />;

  return <AdminShell me={me}>{children}</AdminShell>;
}
