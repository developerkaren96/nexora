import { PageFrame, Tag } from "../_components/page-frame";
import { Download, FileText, Image as ImageIcon, Palette, ExternalLink, Mail } from "lucide-react";

export const metadata = { title: "Пресс-центр — Nexora" };

const COVERAGE = [
  { outlet: "TechCrunch",    date: "5 июня 2026", headline: "Nexora raises $8M Seed to give every entrepreneur a full digital business in 5 minutes", url: "#" },
  { outlet: "VC.ru",         date: "5 июня 2026", headline: "Стартап из Берлина и Тбилиси привлёк $8 млн на «бизнес из коробки»", url: "#" },
  { outlet: "The Verge",     date: "12 мая 2026", headline: "The SaaS that wants to replace Tilda, Shopify and your developer at once", url: "#" },
  { outlet: "Forbes Russia", date: "28 апреля 2026", headline: "Как 4 человека в Армении переписывают правила запуска малого бизнеса", url: "#" },
  { outlet: "Sifted",        date: "14 апреля 2026", headline: "Inside Nexora: the multi-tenant beast quietly eating Europe's SMB market", url: "#" },
  { outlet: "Хабр",          date: "30 марта 2026", headline: "Как мы выпускаем SSL за 8 секунд: ACME, edge-кэши и немножко магии", url: "#" },
];

const ASSETS = [
  { icon: Palette, title: "Логотипы",         desc: "SVG + PNG в светлой и тёмной версиях.",          size: "240 KB", href: "#" },
  { icon: ImageIcon, title: "Скриншоты продукта", desc: "12 ключевых экранов в 3 разрешениях.",       size: "18.4 MB", href: "#" },
  { icon: FileText, title: "Bio фаундеров",   desc: "Биографии Карена Симоняна и Анны Войтенко.",     size: "84 KB",   href: "#" },
  { icon: FileText, title: "Описание компании",desc: "One-pager на русском и английском.",            size: "120 KB",  href: "#" },
];

const FACTS = [
  ["Год основания", "2023, Ереван"],
  ["Штаб-квартира", "Берлин, Германия"],
  ["Сотрудники",    "68 в 9 странах"],
  ["Клиенты",       "24 320 активных проектов"],
  ["Инвестиции",    "$9.4M (Pre-seed + Seed)"],
  ["ARR",           "$4.2M (Q2 2026)"],
  ["Языки",         "Русский, английский, армянский"],
  ["NPS",           "72 (G2 4.91 / 5)"],
];

export default function PressPage() {
  return (
    <PageFrame
      eyebrow="Пресс-центр"
      title="Материалы для СМИ"
      lede="Здесь — всё, что может понадобиться журналисту, аналитику или партнёру. Логотипы, скриншоты, биографии, факты о компании. По любым вопросам пишите напрямую — press@nexora.app."
      badge={<Tag tone="amber">для прессы</Tag>}
    >
      {/* Quick contact */}
      <div className="mb-12 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 dark:border-zinc-800 dark:from-amber-950/20 dark:via-zinc-900 dark:to-rose-950/20 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-md border border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
            <Mail className="size-4.5" />
          </span>
          <div>
            <h2 className="text-[16px] font-semibold tracking-tight">Связь с пресс-службой</h2>
            <p className="mt-1 text-[12.5px] text-zinc-600 dark:text-zinc-400">
              Анна Войтенко, Head of Communications. Отвечаем в течение 4 часов в рабочее время.
            </p>
          </div>
        </div>
        <a
          href="mailto:press@nexora.app"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          press@nexora.app
        </a>
      </div>

      {/* Facts */}
      <section>
        <h2 className="text-[22px] font-semibold tracking-tight">Факты о компании</h2>
        <div className="mt-6 grid gap-x-8 gap-y-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 sm:grid-cols-2">
          {FACTS.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-zinc-100 py-2 last:border-0 dark:border-zinc-800">
              <span className="text-[12.5px] text-zinc-500">{k}</span>
              <span className="font-mono text-[13px] font-medium">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Brand assets */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Бренд-активы</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ASSETS.map((a) => (
            <a
              key={a.title}
              href={a.href}
              className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <a.icon className="size-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold tracking-tight">{a.title}</div>
                <p className="mt-0.5 text-[12px] text-zinc-500">{a.desc}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-[11px] text-zinc-500">{a.size}</div>
                <Download className="ml-auto mt-1 size-4 text-zinc-400 transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Публикации о Nexora</h2>
        <div className="mt-6 divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50">
          {COVERAGE.map((c) => (
            <a
              key={c.headline}
              href={c.url}
              className="group flex flex-col gap-1 px-5 py-4 transition hover:bg-zinc-50 dark:hover:bg-zinc-900 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex items-center gap-3 sm:w-44 sm:shrink-0">
                <span className="font-serif text-[14px] font-semibold text-zinc-800 dark:text-zinc-200">{c.outlet}</span>
                <span className="text-[11.5px] text-zinc-500">{c.date}</span>
              </div>
              <div className="flex flex-1 items-center justify-between gap-3">
                <span className="text-[13.5px] text-zinc-700 transition group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400">
                  {c.headline}
                </span>
                <ExternalLink className="size-3.5 shrink-0 text-zinc-400 transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Founder quote */}
      <section className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/40 md:p-10">
        <blockquote className="font-serif text-[22px] leading-snug tracking-tight md:text-[26px]">
          «Мы не пытаемся быть Shopify+. Мы делаем то, что должно было существовать с самого начала:
          один инструмент для всего, что нужно бизнесу в первый день».
        </blockquote>
        <footer className="mt-6 flex items-center gap-3 text-[13px] text-zinc-600 dark:text-zinc-400">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[14px] font-semibold text-white">
            К
          </span>
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">Карен Симонян</div>
            <div className="text-[11.5px] text-zinc-500">CEO & сооснователь, для The Verge</div>
          </div>
        </footer>
      </section>
    </PageFrame>
  );
}
