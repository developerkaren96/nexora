import { cookies } from "next/headers";
import { ssrApi } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, StatusPill } from "./_components/page-chrome";

type Stats = { tenants?: number; users?: number; activeSubs?: number; projects?: number; mrrCents?: number };
type Overview = {
  recentTenants?: Array<{ id: string; slug: string; name: string; status: string; createdAt: string; brandColor?: string }>;
  recentUsers?: Array<{ id: string; email: string; name?: string; systemRole?: string; createdAt: string }>;
  planBreakdown?: Array<{ planCode: string; _count: { _all: number } }>;
  byStatus?: Array<{ status: string; _count: { _all: number } }>;
};

export default async function AdminHome() {
  const c = (await cookies()).toString();
  const [stats, overview] = await Promise.all([
    ssrApi<Stats>("/admin/stats", c).catch(() => ({} as Stats)),
    ssrApi<Overview>("/admin/overview", c).catch(() => ({} as Overview)),
  ]);

  const mrr = (stats.mrrCents ?? 0) / 100;

  // 14-day trend from recent tenants
  const days = 14;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const series = Array.from({ length: days }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - (days - 1 - i));
    const next = new Date(d); next.setDate(next.getDate() + 1);
    return (overview.recentTenants ?? []).filter((t) => {
      const c = new Date(t.createdAt);
      return c >= d && c < next;
    }).length;
  });

  // Week-over-week delta
  const lastWeek = series.slice(0, 7).reduce((s, n) => s + n, 0);
  const thisWeek = series.slice(7).reduce((s, n) => s + n, 0);
  const weekDelta = lastWeek === 0 ? (thisWeek > 0 ? 100 : 0) : Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  const totalNew = series.reduce((s, n) => s + n, 0);

  return (
    <>
      <PageHeader
        eyebrow="Платформа"
        title="Обзор"
        subtitle="Состояние всей платформы в реальном времени"
      />

      <div className="mx-auto max-w-7xl space-y-6 px-8 pb-10">
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 md:grid-cols-5">
          <KPI label="Тенанты"           value={fmt(stats.tenants ?? 0)} />
          <KPI label="Пользователи"      value={fmt(stats.users ?? 0)} />
          <KPI label="Активные подписки" value={fmt(stats.activeSubs ?? 0)} />
          <KPI label="Проекты"           value={fmt(stats.projects ?? 0)} />
          <KPI label="MRR"               value={`$${fmt(Math.round(mrr))}`} mono />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {/* Sparkline card */}
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white lg:col-span-2">
            <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4">
              <div>
                <h2 className="text-[13px] font-semibold text-zinc-900">Новые тенанты</h2>
                <p className="mt-0.5 text-[11px] text-zinc-500">Регистрации за последние 14 дней</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold tabular-nums text-zinc-900">{totalNew}</div>
                <div className={`mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium ${weekDelta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {weekDelta >= 0 && <ArrowUpRight className="size-3" />}
                  {weekDelta >= 0 ? "+" : ""}{weekDelta}% за неделю
                </div>
              </div>
            </div>
            <div className="px-5 py-5">
              <Sparkline values={series} />
              <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                <span>{formatShort(new Date(today.getTime() - (days - 1) * 86_400_000))}</span>
                <span>Сегодня</span>
              </div>
            </div>
          </div>

          {/* Plan breakdown */}
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-5 py-4">
              <h2 className="text-[13px] font-semibold text-zinc-900">Распределение по тарифам</h2>
              <p className="mt-0.5 text-[11px] text-zinc-500">Активные подписки</p>
            </div>
            <div className="px-5 py-4">
              {overview.planBreakdown && overview.planBreakdown.length > 0 ? (
                <ul className="space-y-3.5">
                  {overview.planBreakdown.map((p) => {
                    const max = Math.max(...overview.planBreakdown!.map((x) => x._count._all), 1);
                    const pct = (p._count._all / max) * 100;
                    return (
                      <li key={p.planCode}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-[12px] font-medium text-zinc-900">{p.planCode}</span>
                          <span className="font-mono text-[11px] tabular-nums text-zinc-500">{p._count._all}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-zinc-100">
                          <div className="h-full rounded-full bg-zinc-900" style={{ width: `${pct}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="py-6 text-center text-[12px] text-zinc-500">Нет данных</p>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <ListCard title="Новые тенанты" href="/tenants">
            {(overview.recentTenants ?? []).slice(0, 6).map((t) => (
              <li key={t.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-zinc-50">
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-md text-[11px] font-semibold text-white"
                  style={{ background: t.brandColor || "#18181B" }}
                >
                  {t.name.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-zinc-900">{t.name}</div>
                  <div className="truncate font-mono text-[10.5px] text-zinc-500">{t.slug}.nexora.app</div>
                </div>
                <StatusPill status={t.status} />
              </li>
            ))}
            {(!overview.recentTenants || overview.recentTenants.length === 0) && (
              <li className="px-5 py-10 text-center text-[12px] text-zinc-500">Пока нет тенантов</li>
            )}
          </ListCard>

          <ListCard title="Новые пользователи">
            {(overview.recentUsers ?? []).slice(0, 6).map((u) => (
              <li key={u.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-zinc-50">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white">
                  {(u.name || u.email).slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-zinc-900">{u.name || u.email}</div>
                  <div className="truncate text-[11px] text-zinc-500">{u.email}</div>
                </div>
                {u.systemRole && u.systemRole !== "USER" && (
                  <span className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-700">
                    {u.systemRole === "PLATFORM_ADMIN" ? "ADMIN" : u.systemRole}
                  </span>
                )}
              </li>
            ))}
            {(!overview.recentUsers || overview.recentUsers.length === 0) && (
              <li className="px-5 py-10 text-center text-[12px] text-zinc-500">Пока нет пользователей</li>
            )}
          </ListCard>
        </section>
      </div>
    </>
  );
}

function KPI({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="bg-white px-5 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">{label}</div>
      <div className={`mt-1.5 text-[22px] font-semibold tracking-tight tabular-nums text-zinc-900 ${mono ? "font-mono text-[20px]" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function ListCard({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="flex h-11 items-center justify-between border-b border-zinc-100 px-5">
        <h2 className="text-[13px] font-semibold text-zinc-900">{title}</h2>
        {href && (
          <a href={href} className="inline-flex items-center gap-0.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-900">
            Все <ArrowUpRight className="size-3" />
          </a>
        )}
      </div>
      <ul className="divide-y divide-zinc-100">{children}</ul>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 600;
  const h = 72;
  const pad = 4;
  const max = Math.max(...values, 1);
  const step = (w - pad * 2) / Math.max(values.length - 1, 1);
  const points = values.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - (v / max) * (h - pad * 2);
    return [x, y] as const;
  });
  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${(pad + (values.length - 1) * step).toFixed(1)},${h - pad} L${pad},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-20 w-full">
      <defs>
        <linearGradient id="sparkfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="rgb(24,24,27)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="rgb(24,24,27)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkfill)" />
      <path d={d} fill="none" stroke="rgb(24,24,27)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], i) => (
        values[i] > 0 ? <circle key={i} cx={x} cy={y} r={2} fill="rgb(24,24,27)" /> : null
      ))}
    </svg>
  );
}

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}
function formatShort(d: Date) {
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}
