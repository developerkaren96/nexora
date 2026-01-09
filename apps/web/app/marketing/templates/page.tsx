import Link from "next/link";
import { PageFrame, Tag } from "../_components/page-frame";
import { ArrowRight, Eye, Rocket } from "lucide-react";
import { TEMPLATES } from "../_data/templates";

export const metadata = { title: "Шаблоны бизнесов — Nexora" };

export default function TemplatesPage() {
  return (
    <PageFrame
      eyebrow="Шаблоны"
      title="12 готовых бизнесов из коробки"
      lede="Каждый шаблон — это полностью настроенный продукт: сайт с нужными страницами, CRM с правильными полями, приложение с релевантными экранами. Выбираете тип, мы разворачиваем за минуты."
      badge={<Tag tone="indigo">{TEMPLATES.length} шаблонов · 74 580 запусков</Tag>}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => {
          const Icon = t.icon;
          return (
            <article
              key={t.code}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
            >
              {/* preview band */}
              <div className={`relative h-32 bg-gradient-to-br ${t.bg} dark:opacity-40`}>
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.7) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className={`grid size-8 place-items-center rounded-md bg-white/80 shadow-sm backdrop-blur dark:bg-zinc-900/80 ${t.accent}`}>
                    <Icon className="size-4" />
                  </span>
                  {t.badge && <Tag tone="emerald">{t.badge}</Tag>}
                </div>
                {/* mock browser dots */}
                <div className="absolute right-3 top-3 flex gap-1">
                  <span className="size-1.5 rounded-full bg-red-300/70" />
                  <span className="size-1.5 rounded-full bg-amber-300/70" />
                  <span className="size-1.5 rounded-full bg-emerald-300/70" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-[15px] font-semibold tracking-tight">{t.name}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{t.tagline}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">
                    {t.count.toLocaleString("ru-RU")} запусков
                  </span>
                  <div className="flex gap-1.5">
                    <Link
                      href={`/templates/${t.slug}`}
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-zinc-200 px-2 text-[11.5px] font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <Eye className="size-3" /> Демо
                    </Link>
                    <Link
                      href={`http://app.localhost:3000/projects/new?type=${t.code}`}
                      className="inline-flex h-7 items-center gap-1 rounded-md bg-zinc-900 px-2 text-[11.5px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    >
                      <Rocket className="size-3" /> Запустить
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-14 grid gap-5 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h3 className="text-[18px] font-semibold tracking-tight">Не нашли свой тип бизнеса?</h3>
          <p className="mt-1.5 text-[13px] text-zinc-600 dark:text-zinc-400">
            Мы делаем индивидуальные шаблоны для Enterprise-клиентов — за 2–4 недели под ваш домен.
            Расскажите про бизнес — обсудим.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Заказать шаблон <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </PageFrame>
  );
}
