"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { PageHeader } from "../_components/dashboard-shell";
import { ExternalLink, Check } from "lucide-react";

export default function BillingPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [sub, setSub] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api("/billing/plans"), api("/billing/subscription"), api("/billing/invoices")])
      .then(([p, s, i]: any) => { setPlans(p); setSub(s); setInvoices(i); })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function upgrade(plan: string) {
    try {
      const { url }: any = await api("/billing/checkout", {
        method: "POST",
        body: JSON.stringify({ plan, successUrl: `${location.origin}/billing?ok=1`, cancelUrl: `${location.origin}/billing` }),
      });
      location.href = url;
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function portal() {
    try {
      const { url }: any = await api("/billing/portal", { method: "POST", body: JSON.stringify({ returnUrl: location.href }) });
      location.href = url;
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Биллинг"
        subtitle="Тариф, подписка, инвойсы и платёжный портал"
        action={
          <button
            onClick={portal}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-[13px] font-medium text-zinc-900 hover:bg-zinc-50"
          >
            <ExternalLink className="size-3.5" /> Портал оплат
          </button>
        }
      />

      <div className="mx-auto max-w-7xl space-y-6 px-8 py-6">
        {/* Current plan */}
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center border-b border-zinc-100 px-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">Текущий тариф</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4 px-5 py-4">
            <div className="text-[16px] font-semibold text-zinc-900">{sub?.plan?.name ?? "—"}</div>
            {sub?.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {ruSubStatus(sub.status)}
              </span>
            )}
            {sub?.currentPeriodEnd && (
              <span className="text-[11.5px] text-zinc-500">
                Следующее списание {new Date(sub.currentPeriodEnd).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
          </div>
        </section>

        {/* Plans */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-[13px] font-semibold text-zinc-900">Доступные тарифы</h2>
            <span className="text-[11px] text-zinc-500">Меняйте в любое время</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {loading && Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[180px] animate-pulse rounded-lg border border-zinc-200 bg-zinc-50" />
            ))}
            {plans.map((p) => {
              const current = sub?.planCode === p.code;
              return (
                <div
                  key={p.code}
                  className={`rounded-lg border bg-white p-5 ${current ? "border-zinc-900 ring-1 ring-zinc-900" : "border-zinc-200"}`}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="text-[14px] font-semibold text-zinc-900">{p.name}</div>
                    {current && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-900">
                        <Check className="size-3" /> текущий
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-[24px] font-semibold tabular-nums text-zinc-900">
                      ${((p.monthlyPriceUsd ?? 0) / 100).toFixed(0)}
                    </span>
                    <span className="ml-1 text-[12px] text-zinc-500">/мес</span>
                  </div>
                  <button
                    onClick={() => upgrade(p.code)}
                    disabled={current}
                    className={[
                      "mt-4 inline-flex h-9 w-full items-center justify-center rounded-md text-[13px] font-medium transition-colors",
                      current
                        ? "cursor-default bg-zinc-100 text-zinc-500"
                        : "bg-zinc-900 text-white hover:bg-zinc-800",
                    ].join(" ")}
                  >
                    {current ? "Активен" : "Перейти"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Invoices */}
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center border-b border-zinc-100 px-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">Инвойсы</h2>
          </div>
          {invoices.length === 0 ? (
            <p className="px-5 py-10 text-center text-[12px] text-zinc-500">
              {loading ? "Загрузка…" : "Пока нет инвойсов."}
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {invoices.map((i) => (
                <li key={i.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <div className="font-mono text-[12px] font-medium text-zinc-900">
                      {i.number ?? i.id.slice(0, 8)}
                    </div>
                    <div className="mt-0.5 text-[11px] text-zinc-500">
                      {i.createdAt && new Date(i.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[12px] tabular-nums text-zinc-900">
                      ${((i.amountPaidCents ?? 0) / 100).toFixed(2)}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      i.status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {ruInvoiceStatus(i.status)}
                    </span>
                    {i.hostedUrl && (
                      <a
                        href={i.hostedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] font-medium text-zinc-700 hover:text-zinc-900"
                      >
                        Открыть <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

function ruSubStatus(s: string) {
  return ({ active: "Активна", trialing: "Триал", past_due: "Просрочена", canceled: "Отменена" } as Record<string, string>)[s] ?? s;
}
function ruInvoiceStatus(s: string) {
  return ({ paid: "Оплачен", open: "Открыт", void: "Аннулирован", uncollectible: "Не оплачен" } as Record<string, string>)[s] ?? s;
}
