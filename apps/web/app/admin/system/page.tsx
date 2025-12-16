import { cookies } from "next/headers";
import { ssrApi } from "@/lib/api";
import { PageHeader } from "../_components/page-chrome";
import { ExternalLink } from "lucide-react";

export default async function SystemPage() {
  const c = (await cookies()).toString();
  const [stats, health] = await Promise.all([
    ssrApi<any>("/admin/stats", c).catch(() => ({})),
    ssrApi<any>("/healthz").catch(() => ({ status: "down" })),
  ]);
  const apiOk = health?.status !== "down";

  const services: Array<{ name: string; url: string; port: string; description: string; ok: boolean }> = [
    { name: "API (NestJS)",  url: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000", port: "4000",        description: "REST + WebSocket, JWT auth, RBAC",        ok: apiOk },
    { name: "Web (Next.js)", url: "http://localhost:3000",                                    port: "3000",        description: "Marketing, dashboard, admin, тенант-сайты", ok: true },
    { name: "Postgres 16",   url: "postgres://localhost:5433/nexora",                          port: "5433",        description: "Основная БД, row-level security",          ok: true },
    { name: "Redis 7",       url: "redis://localhost:6380",                                    port: "6380",        description: "Кеш, очереди (BullMQ), сессии",            ok: true },
    { name: "MinIO (S3)",    url: "http://localhost:9002",                                     port: "9002 / 9003", description: "Объектное хранилище для бренд-ассетов",   ok: true },
    { name: "MailHog",       url: "http://localhost:8025",                                     port: "1025 / 8025", description: "Локальная ловушка SMTP в dev",            ok: true },
  ];

  const okCount = services.filter((s) => s.ok).length;
  const allOk = okCount === services.length;

  return (
    <>
      <PageHeader
        eyebrow="Платформа"
        title="Система"
        subtitle="Состояние сервисов, окружение и сводные метрики"
        action={
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
            allOk ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"
          }`}>
            <span className={`size-1.5 rounded-full ${allOk ? "bg-emerald-500" : "bg-amber-500"}`} />
            {allOk ? "Все сервисы работают" : `${okCount} / ${services.length} сервисов`}
          </span>
        }
      />

      <div className="mx-auto max-w-7xl space-y-6 px-8 py-6">
        <section className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
          <Metric label="Тенантов в системе" value={(stats.tenants ?? 0).toLocaleString("ru-RU")} />
          <Metric label="Пользователей"      value={(stats.users ?? 0).toLocaleString("ru-RU")} />
          <Metric label="MRR" value={`$${(((stats.mrrCents ?? 0) / 100) | 0).toLocaleString("en-US")}`} mono />
        </section>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center justify-between border-b border-zinc-100 px-5">
            <div>
              <h2 className="text-[13px] font-semibold text-zinc-900">Сервисы</h2>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400">Локальное dev-окружение</span>
          </div>
          <ul className="divide-y divide-zinc-100">
            {services.map((s) => (
              <li key={s.name} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-5 py-3">
                <span className={`size-2 rounded-full ${s.ok ? "bg-emerald-500" : "bg-rose-500"}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-zinc-900">{s.name}</span>
                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600">:{s.port}</span>
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-zinc-500">{s.description}</div>
                </div>
                <code className="hidden truncate font-mono text-[11px] text-zinc-500 md:block">{s.url}</code>
                <span className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                  s.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                }`}>
                  {s.ok ? "OK" : "DOWN"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <div className="flex h-11 items-center border-b border-zinc-100 px-5">
              <h2 className="text-[13px] font-semibold text-zinc-900">Окружение</h2>
            </div>
            <dl className="divide-y divide-zinc-100">
              <Row k="NODE_ENV"     v={process.env.NODE_ENV ?? "—"} />
              <Row k="ROOT_DOMAIN"  v={process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "nexora.app"} />
              <Row k="API_URL"      v={process.env.NEXT_PUBLIC_API_URL ?? "—"} />
              <Row k="Node runtime" v={process.version} />
              <Row k="Platform"     v={`${process.platform} · ${process.arch}`} />
            </dl>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <div className="flex h-11 items-center border-b border-zinc-100 px-5">
              <h2 className="text-[13px] font-semibold text-zinc-900">Полезные ссылки</h2>
            </div>
            <ul className="divide-y divide-zinc-100">
              <LinkRow href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/docs`} label="Swagger / OpenAPI" hint="Все эндпоинты API" />
              <LinkRow href="http://localhost:3000/docs" label="Документация (RU)" hint="Гайд по запуску и использованию" />
              <LinkRow href="http://localhost:9003" label="MinIO Console" hint="Просмотр S3-бакетов" />
              <LinkRow href="http://localhost:8025" label="MailHog" hint="Локальная почта в dev" />
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

function Metric({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="bg-white px-5 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">{label}</div>
      <div className={`mt-1.5 text-[22px] font-semibold tracking-tight tabular-nums text-zinc-900 ${mono ? "font-mono text-[20px]" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-2.5">
      <dt className="font-mono text-[11px] text-zinc-500">{k}</dt>
      <dd className="truncate font-mono text-[11px] text-zinc-900">{v}</dd>
    </div>
  );
}

function LinkRow({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <li>
      <a
        target="_blank"
        rel="noreferrer"
        href={href}
        className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-zinc-50"
      >
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-zinc-900">{label}</div>
          <div className="mt-0.5 text-[11px] text-zinc-500">{hint}</div>
        </div>
        <ExternalLink className="size-3.5 text-zinc-400" />
      </a>
    </li>
  );
}
