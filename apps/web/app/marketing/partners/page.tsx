import Link from "next/link";
import { PageFrame, Tag, CtaBand } from "../_components/page-frame";
import { Handshake, Percent, BadgeCheck, Megaphone, Wrench, Code2, ArrowRight, Building } from "lucide-react";

export const metadata = { title: "Партнёрская программа — Nexora" };

const TIERS = [
  {
    name: "Affiliate",
    badge: "starter",
    tone: "zinc" as const,
    payout: "20% LTV",
    desc: "Для блогеров, авторов курсов и Telegram-каналов. Реферальные ссылки, дашборд с конверсиями и выплатами раз в месяц.",
    perks: ["Cookie 60 дней", "Минимум $50 для выплаты", "Доступ к промо-материалам", "Партнёрский менеджер для топ-10"],
  },
  {
    name: "Agency",
    badge: "популярный",
    tone: "indigo" as const,
    featured: true,
    payout: "30% LTV + 15% rev share",
    desc: "Для веб-студий и фрилансеров, которые внедряют Nexora клиентам. White-label, ваша печать и поддержка от вашего имени.",
    perks: ["До 50% скидки на тарифы клиентов", "Sandbox-аккаунты бесплатно", "Совместные кейсы и публикации", "Прямая линия с продактами"],
  },
  {
    name: "Technology",
    badge: "энтерпрайз",
    tone: "emerald" as const,
    payout: "по договорённости",
    desc: "Для платформ, CRM, телефонии, аналитики и платёжных систем. Глубокая интеграция через наш Public API.",
    perks: ["Совместный листинг в маркетплейсе", "API-приоритет и SLA", "Совместные go-to-market кампании", "Технический интеграционный партнёр"],
  },
];

const PERKS = [
  { icon: Percent,    title: "Прозрачные комиссии", body: "От 20% до 50% от LTV каждого приведённого клиента. Выплаты в USD / EUR / RUB / GEL." },
  { icon: BadgeCheck, title: "Сертификация",         body: "После 5 успешных внедрений вы получаете значок Certified Partner и место в каталоге." },
  { icon: Megaphone,  title: "Совместный маркетинг", body: "Бюджет на совместные кампании, статьи в нашем блоге, выступления на вебинарах." },
  { icon: Wrench,     title: "Инструменты",          body: "Sandbox, демо-проекты, шаблоны для клиентов, готовые презентации." },
  { icon: Code2,      title: "Public API",           body: "Полный REST + Webhooks. SDK на Node, Python, PHP. Без скрытых лимитов." },
  { icon: Building,   title: "Совместные кейсы",     body: "Помогаем оформить кейс по результатам — это растит ваш собственный бренд." },
];

const PARTNERS_LOGOS = ["Studio Atlas", "Bureau Nord", "Codebase Tbilisi", "Fluent Agency", "Pixel & Pavement", "Mercer Digital", "OneFold", "Hummock"];

export default function PartnersPage() {
  return (
    <PageFrame
      eyebrow="Партнёрская программа"
      title="Запускайте бизнесы клиентам — получайте долю от их роста"
      lede="Мы платим не за регистрации, а за реальную выручку приведённых клиентов. Чем дольше они с нами — тем больше получаете вы. 240+ партнёров уже работают с нами."
      badge={<Tag tone="indigo">240+ активных партнёров</Tag>}
    >
      {/* Tiers */}
      <div className="grid gap-5 lg:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl border p-7 ${
              t.featured
                ? "border-indigo-300 bg-gradient-to-br from-indigo-50 via-white to-violet-50 shadow-md dark:border-indigo-900/60 dark:from-indigo-950/30 dark:via-zinc-900 dark:to-violet-950/30"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-semibold tracking-tight">{t.name}</h3>
              <Tag tone={t.tone}>{t.badge}</Tag>
            </div>
            <div className="mt-3 font-mono text-[22px] font-semibold tracking-tight text-indigo-600 dark:text-indigo-400">
              {t.payout}
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{t.desc}</p>
            <ul className="mt-5 space-y-2">
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[13px] text-zinc-700 dark:text-zinc-300">
                  <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-500" /> {p}
                </li>
              ))}
            </ul>
            <Link
              href="mailto:partners@nexora.app"
              className={`mt-6 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md text-[13px] font-medium transition ${
                t.featured
                  ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                  : "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              Подать заявку <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Perks */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Что входит в программу</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.title} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span className="grid size-9 place-items-center rounded-md border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
                <p.icon className="size-4" />
              </span>
              <h3 className="mt-4 text-[14.5px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Logos */}
      <section className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <p className="text-center font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Среди наших партнёров
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
          {PARTNERS_LOGOS.map((l) => (
            <div key={l} className="text-center font-serif text-[14px] font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
              {l}
            </div>
          ))}
        </div>
      </section>

      {/* How */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Как это работает</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            ["1", "Заявка",        "Заполняете короткую форму — кто вы, чем занимаетесь, с кем работаете."],
            ["2", "Ознакомление",  "30-минутный звонок: расскажем про продукт, цены, ответим на вопросы."],
            ["3", "Активация",     "Получаете партнёрский кабинет, ссылки, материалы и sandbox-аккаунты."],
            ["4", "Доход",         "Запускаете проекты клиентам — получаете долю их подписок ежемесячно."],
          ].map(([n, t, b]) => (
            <li key={n} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="grid size-9 place-items-center rounded-md bg-zinc-900 font-mono text-[14px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {n}
              </div>
              <div className="mt-3 text-[14px] font-semibold">{t}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </PageFrame>
  );
}
