import { PageFrame, Tag } from "../_components/page-frame";
import { Activity, CheckCircle2, AlertTriangle, AlertCircle, Calendar } from "lucide-react";

export const metadata = { title: "Статус системы — Nexora" };

type Status = "operational" | "degraded" | "outage" | "maintenance";

const SERVICES: { name: string; desc: string; status: Status; uptime: string }[] = [
  { name: "API",                   desc: "REST API api.nexora.app",         status: "operational", uptime: "99.99%" },
  { name: "Дашборд",               desc: "app.nexora.app",                  status: "operational", uptime: "99.98%" },
  { name: "Клиентские сайты",       desc: "*.nexora.app + кастомные домены",status: "operational", uptime: "99.97%" },
  { name: "Мобильные приложения",  desc: "iOS / Android push, синхронизация", status: "operational", uptime: "99.96%" },
  { name: "База данных",           desc: "PostgreSQL primary + replicas",   status: "operational", uptime: "100.00%" },
  { name: "Хранилище файлов",       desc: "S3-совместимое для медиа",        status: "operational", uptime: "99.99%" },
  { name: "Платежи",                desc: "Stripe webhooks и checkout",      status: "operational", uptime: "99.99%" },
  { name: "Транзакционные письма",  desc: "Postmark + бэкап через SES",      status: "degraded",    uptime: "99.42%" },
  { name: "DNS / SSL provisioning", desc: "Выпуск сертификатов и поддоменов",status: "operational", uptime: "99.98%" },
  { name: "CDN",                    desc: "Cloudflare edge",                 status: "operational", uptime: "99.99%" },
];

const INCIDENTS = [
  {
    date: "21 июня 2026 · 14:18 UTC",
    title: "Замедление транзакционных писем",
    severity: "degraded" as const,
    status: "Расследуем",
    body: "Видим увеличение задержки при отправке писем через основного провайдера (Postmark). Резервный канал через AWS SES активирован — критичные письма (подтверждение, восстановление пароля) уже доставляются нормально. ETA восстановления — 30 минут.",
    updates: [
      { ts: "14:42", text: "Включили резервный канал, критичные письма доставляются за 8 секунд." },
      { ts: "14:25", text: "Подтвердили проблему на стороне upstream-провайдера." },
      { ts: "14:18", text: "Получили первые алерты от мониторинга." },
    ],
  },
  {
    date: "18 июня 2026 · 09:04 UTC",
    title: "Плановое обслуживание PostgreSQL",
    severity: "maintenance" as const,
    status: "Завершено",
    body: "Обновили PostgreSQL до версии 16.3. Окно обслуживания — 12 минут, read-only режим. Никаких потерь данных, все воркеры подхватили накопившиеся задачи в течение 4 минут.",
    updates: [
      { ts: "09:16", text: "Обновление завершено, все системы в нормальном режиме." },
      { ts: "09:04", text: "Начало планового окна обслуживания." },
    ],
  },
  {
    date: "11 июня 2026 · 22:47 UTC",
    title: "Сбой провижининга поддоменов",
    severity: "outage" as const,
    status: "Завершено",
    body: "Часть новых проектов получала ошибку при выпуске SSL-сертификата из-за rate-limit на стороне Let's Encrypt. Перешли на использование staging endpoint для ретраев + увеличили квоту через ACME-аккаунт. 14 проектов потребовали ручного повторного выпуска.",
    updates: [
      { ts: "23:31", text: "Все 14 проектов восстановлены, SSL активен." },
      { ts: "23:02", text: "Найдена причина — обновили квоту." },
      { ts: "22:47", text: "Получили алерт от провижинера." },
    ],
  },
];

const META: Record<Status, { label: string; tone: "emerald" | "amber" | "rose" | "indigo"; icon: React.ComponentType<{ className?: string }>; dot: string }> = {
  operational: { label: "В норме",         tone: "emerald", icon: CheckCircle2, dot: "bg-emerald-500" },
  degraded:    { label: "Деградация",      tone: "amber",   icon: AlertTriangle, dot: "bg-amber-500" },
  outage:      { label: "Сбой",            tone: "rose",    icon: AlertCircle,   dot: "bg-rose-500" },
  maintenance: { label: "Обслуживание",    tone: "indigo",  icon: Activity,      dot: "bg-indigo-500" },
};

// Generate fake 90-day history with mostly green, occasional yellow
function buildHistory(seed: number): Status[] {
  const days: Status[] = [];
  for (let i = 0; i < 90; i++) {
    const r = (seed * 31 + i * 17 + i * i) % 100;
    days.push(r < 3 ? "degraded" : r < 1 ? "outage" : "operational");
  }
  return days;
}

export default function StatusPage() {
  const anyIssue = SERVICES.some((s) => s.status !== "operational");
  const overall: Status = anyIssue ? "degraded" : "operational";
  const overallMeta = META[overall];

  return (
    <PageFrame
      eyebrow="Status"
      title="Состояние систем в реальном времени"
      lede="Прозрачный обзор работоспособности всех сервисов Nexora. Подписывайтесь на инциденты по RSS / e-mail / Telegram — мы пишем туда же, куда сами."
      badge={<Tag tone="emerald">99.97% за 90 дней</Tag>}
    >
      {/* Overall banner */}
      <div
        className={`mb-10 flex items-center gap-4 rounded-2xl border p-6 ${
          overall === "operational"
            ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30"
            : "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30"
        }`}
      >
        <span className="relative grid size-12 shrink-0 place-items-center">
          <span className={`absolute inline-flex size-12 animate-ping rounded-full opacity-40 ${overallMeta.dot}`} />
          <span className={`relative grid size-12 place-items-center rounded-full ${overallMeta.dot} text-white`}>
            <overallMeta.icon className="size-5" />
          </span>
        </span>
        <div className="flex-1">
          <h2 className={`text-[18px] font-semibold tracking-tight ${overall === "operational" ? "text-emerald-900 dark:text-emerald-100" : "text-amber-900 dark:text-amber-100"}`}>
            {overall === "operational" ? "Все системы работают штатно" : "Есть деградация в одном сервисе"}
          </h2>
          <p className={`mt-1 text-[12.5px] ${overall === "operational" ? "text-emerald-800 dark:text-emerald-300" : "text-amber-800 dark:text-amber-300"}`}>
            Обновлено только что · {SERVICES.filter((s) => s.status === "operational").length} из {SERVICES.length} сервисов в норме
          </p>
        </div>
        <div className="hidden text-right sm:block">
          <div className="font-mono text-[22px] font-semibold tracking-tight">99.97%</div>
          <div className="text-[10.5px] uppercase tracking-wider text-zinc-500">аптайм 90 дней</div>
        </div>
      </div>

      {/* Services with sparkline */}
      <section>
        <h2 className="text-[15px] font-semibold tracking-tight">Сервисы</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
          {SERVICES.map((s, i) => {
            const m = META[s.status];
            const history = buildHistory(i + 1);
            return (
              <div
                key={s.name}
                className={`grid gap-4 px-5 py-4 sm:grid-cols-[1.4fr_1.5fr_auto] sm:items-center ${
                  i > 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block size-2 rounded-full ${m.dot}`} />
                    <span className="text-[14px] font-semibold tracking-tight">{s.name}</span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-zinc-500">{s.desc}</p>
                </div>
                {/* 90-day sparkline */}
                <div className="flex h-7 items-end gap-[2px]">
                  {history.map((d, idx) => (
                    <span
                      key={idx}
                      title={`день -${90 - idx}`}
                      className={`block flex-1 rounded-[1.5px] transition hover:opacity-70 ${
                        d === "operational"
                          ? "bg-emerald-400/80 dark:bg-emerald-500/60"
                          : d === "degraded"
                            ? "bg-amber-400 dark:bg-amber-500"
                            : "bg-rose-500"
                      }`}
                      style={{ height: `${d === "operational" ? 100 : d === "degraded" ? 65 : 40}%` }}
                    />
                  ))}
                </div>
                <div className="text-right">
                  <div className="font-mono text-[13px] font-semibold">{s.uptime}</div>
                  <Tag tone={m.tone}>{m.label}</Tag>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-right font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">
          90 дней · слева → старее, справа → сегодня
        </p>
      </section>

      {/* Incidents */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[15px] font-semibold tracking-tight">История инцидентов</h2>
          <a
            href="/status/rss"
            className="text-[12.5px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            RSS · подписаться
          </a>
        </div>
        <ol className="mt-6 space-y-5">
          {INCIDENTS.map((inc) => {
            const m = META[inc.severity];
            return (
              <li
                key={inc.title}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className={`flex flex-wrap items-center gap-3 border-b px-5 py-3 ${
                  inc.severity === "maintenance"
                    ? "border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
                    : inc.severity === "degraded"
                      ? "border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20"
                      : "border-rose-200 bg-rose-50/60 dark:border-rose-900/40 dark:bg-rose-950/20"
                }`}>
                  <Tag tone={m.tone}>{m.label}</Tag>
                  <h3 className="text-[14.5px] font-semibold tracking-tight">{inc.title}</h3>
                  <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11.5px] text-zinc-500">
                    <Calendar className="size-3" /> {inc.date}
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">{inc.body}</p>
                  <ol className="mt-4 space-y-2">
                    {inc.updates.map((u) => (
                      <li key={u.ts} className="flex gap-3 text-[12.5px]">
                        <span className="w-12 shrink-0 font-mono text-zinc-500">{u.ts}</span>
                        <span className="text-zinc-700 dark:text-zinc-300">{u.text}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 text-[11.5px] text-zinc-500">
                    Статус: <span className="font-medium text-zinc-700 dark:text-zinc-300">{inc.status}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Subscribe */}
      <section className="mt-16 grid gap-6 rounded-2xl border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-8 dark:border-zinc-800 dark:from-indigo-950/20 dark:via-zinc-900 dark:to-violet-950/20 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-[18px] font-semibold tracking-tight">Получать уведомления об инцидентах</h2>
          <p className="mt-1.5 text-[13px] text-zinc-600 dark:text-zinc-400">
            E-mail при заведении и закрытии инцидента. Никаких алертов о других делах.
          </p>
        </div>
        <form action="/api/status/subscribe" method="post" className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            required
            className="h-10 w-64 rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
          />
          <button
            type="submit"
            className="h-10 rounded-md bg-zinc-900 px-4 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Подписаться
          </button>
        </form>
      </section>
    </PageFrame>
  );
}
