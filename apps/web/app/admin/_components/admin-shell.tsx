"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Building2, ScrollText, Server, LogOut } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const NAV = [
  { href: "/",        label: "Обзор",   icon: LayoutDashboard },
  { href: "/tenants", label: "Тенанты", icon: Building2 },
  { href: "/audit",   label: "Журнал",  icon: ScrollText },
  { href: "/system",  label: "Система", icon: Server },
] as const;

export function AdminShell({ me, children }: { me: any; children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const initial = (me?.name || me?.email || "?").slice(0, 1).toUpperCase();
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
      toast.success("Вы вышли из админ-панели");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Не удалось выйти");
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-zinc-50">
      <aside className="sticky top-0 flex h-screen flex-col border-r border-zinc-200 bg-white">
        {/* Brand */}
        <div className="flex h-14 items-center gap-2.5 border-b border-zinc-200 px-4">
          <div className="grid size-7 place-items-center rounded-md bg-zinc-950 text-[11px] font-bold text-white">
            N
          </div>
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-[13px] font-semibold tracking-tight text-zinc-900">Nexora</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400">admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2">
          <div className="px-2 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            Платформа
          </div>
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = active(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r bg-zinc-900" />
                )}
                <Icon className={`size-[15px] ${isActive ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-700"}`} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="border-t border-zinc-200 p-2">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
            <div className="grid size-7 place-items-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-medium text-zinc-900">{me?.name || "Admin"}</div>
              <div className="truncate text-[11px] text-zinc-500">{me?.email}</div>
            </div>
            <button
              onClick={logout}
              title="Выйти"
              className="grid size-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <LogOut className="size-3.5" />
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
