import Link from "next/link";
import { ArrowRight, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

/** Top bar that floats above every demo — clearly marks it as a Nexora preview and
 *  funnels visitors back into the wizard. */
export function DemoBar({ name, slug }: { name: string; slug: string }) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-5 py-2 text-[12px]">
        <div className="flex items-center gap-3">
          <Link href="/templates" className="inline-flex items-center gap-1 text-zinc-300 hover:text-white">
            <ArrowLeft className="size-3.5" /> Все шаблоны
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
            <Sparkles className="size-3" /> Демо · {name}
          </span>
          <span className="hidden text-zinc-400 md:inline">
            Это работающий пример. Запустите такой же за 5 минут.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/templates/${slug}`}
            className="hidden text-zinc-300 hover:text-white sm:inline-flex"
          >
            Что внутри шаблона
          </Link>
          <Link
            href={`http://app.localhost:3000/register?type=${slug}`}
            className="group inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Запустить как этот
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Footer banner at the end of every demo — second conversion point with a
 *  different visual treatment so it doesn't feel like a duplicate. */
export function DemoOutro({ name, slug, color = "#0f172a" }: { name: string; slug: string; color?: string }) {
  return (
    <section className="relative border-t border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          <span className="size-1.5 rounded-full" style={{ background: color }} />
          Демо завершён
        </div>
        <h2 className="mx-auto mt-5 max-w-2xl text-[28px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[36px]">
          Нравится этот <span style={{ color }}>{name.toLowerCase()}</span>? Получите такой же — под вашим брендом, за 5 минут.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[14px] text-zinc-600 dark:text-zinc-400">
          Контент, фото и цвета подставите свои. Всё остальное — сайт, мобильное приложение, CRM, оплата, домен, SSL — соберётся автоматически.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`http://app.localhost:3000/register?type=${slug}`}
            className="group inline-flex h-11 items-center gap-2 rounded-md px-5 text-[13.5px] font-semibold text-white shadow-sm"
            style={{ background: color }}
          >
            Запустить за 5 минут
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={`/templates/${slug}`}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-zinc-300 bg-white px-5 text-[13.5px] font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <ExternalLink className="size-4" />
            Что входит в шаблон
          </Link>
        </div>
        <p className="mt-4 font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">
          Без карты · 14 дней trial · отмена в один клик
        </p>
      </div>
    </section>
  );
}
