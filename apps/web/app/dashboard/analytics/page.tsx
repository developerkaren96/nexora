"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PageHeader } from "../_components/dashboard-shell";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { api("/analytics/summary?days=30").then(setData).catch(() => {}); }, []);

  const total = (data?.byDay ?? []).reduce(
    (acc: any, r: any) => ({ pv: acc.pv + r.pageviews, orders: acc.orders + r.orders }),
    { pv: 0, orders: 0 },
  );
  const series = (data?.byDay ?? []).map((d: any) => d.pageviews);

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Аналитика"
        subtitle="Просмотры, заказы, выручка за последние 30 дней"
      />

      <div className="mx-auto max-w-7xl space-y-6 px-8 py-6">
        <section className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
          <Stat label="Просмотры" sublabel="30 дней" value={total.pv.toLocaleString("ru-RU")} />
          <Stat label="Заказы"    sublabel="30 дней" value={total.orders.toLocaleString("ru-RU")} />
          <Stat label="Выручка"   sublabel="30 дней" value={`$${(((data?.revenueCents ?? 0) / 100) | 0).toLocaleString("en-US")}`} mono />
        </section>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 px-5 py-4">
            <h2 className="text-[13px] font-semibold text-zinc-900">Просмотры по дням</h2>
            <p className="mt-0.5 text-[11px] text-zinc-500">Последние 30 дней</p>
          </div>
          <div className="px-5 py-5">
            <Sparkline values={series} />
          </div>
        </section>
      </div>
    </>
  );
}

function Stat({ label, sublabel, value, mono }: { label: string; sublabel?: string; value: string; mono?: boolean }) {
  return (
    <div className="bg-white px-5 py-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">{label}</span>
        {sublabel && <span className="text-[10px] text-zinc-400">{sublabel}</span>}
      </div>
      <div className={`mt-1.5 text-[22px] font-semibold tracking-tight tabular-nums text-zinc-900 ${mono ? "font-mono text-[20px]" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  if (!values.length) return <p className="py-8 text-center text-[12px] text-zinc-500">Пока нет данных.</p>;
  const w = 800, h = 160, pad = 4;
  const max = Math.max(...values, 1);
  const step = (w - pad * 2) / Math.max(values.length - 1, 1);
  const pts = values.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${(pad + (values.length - 1) * step).toFixed(1)},${h - pad} L${pad},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-40 w-full">
      <defs>
        <linearGradient id="aFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="rgb(24,24,27)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="rgb(24,24,27)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#aFill)" />
      <path d={d} fill="none" stroke="rgb(24,24,27)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
