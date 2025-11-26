"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Layers, Globe, CreditCard, Settings, Users, BarChart3, LogOut } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const NAV = [
  { href: "/",          label: "Обзор",      icon: Home },
  { href: "/projects",  label: "Проекты",    icon: Layers },
  { href: "/domains",   label: "Домены",     icon: Globe },
  { href: "/crm",       label: "CRM",        icon: Users },
  { href: "/analytics", label: "Аналитика",  icon: BarChart3 },
  { href: "/billing",   label: "Биллинг",    icon: CreditCard },
  { href: "/settings",  label: "Настройки",  icon: Settings },
] as const;

export function DashboardShell({ me, children }: { me: any; children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const tenant = me?.memberships?.[0]?.tenant;
  const initial = (me?.name || me?.email || "?").slice(0, 1).toUpperCase();
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
      toast.success("Вы вышли");
      router.refresh();
      router.push("/login");
    } catch (e: any) {
      toast.error(e.message ?? "Не удалось выйти");
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-zinc-50">
      <aside className="sticky top-0 flex h-screen flex-col border-r border-zinc-200 bg-white">
        {/* Workspace */}
        <div className="flex h-14 items-center gap-2.5 border-b border-zinc-200 px-4">
          <div
            className="grid size-7 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white"
            style={{ background: tenant?.brandColor || "#18181B" }}
          >
            {(tenant?.name || "N").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold tracking-tight text-zinc-900">
              {tenant?.name ?? "Nexora"}
            </div>
            <div className="truncate font-mono text-[10px] text-zinc-500">
              {tenant?.slug ? `${tenant.slug}.nexora.app` : "workspace"}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="px-2 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            Workspace
          </div>
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = active(href);
            return (
              <Link
                key={href}
                href={href as any}
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
            <div className="grid size-7 shrink-0 place-items-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-medium text-zinc-900">{me?.name || "Пользователь"}</div>
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

      <main className="min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 px-8 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{eyebrow}</p>
          )}
          <h1 className="mt-0.5 text-[22px] font-semibold tracking-tight text-zinc-900">{title}</h1>
          {subtitle && <p className="mt-1 text-[13px] text-zinc-500">{subtitle}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}
