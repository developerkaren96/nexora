import Link from "next/link";
import { PageFrame, Tag } from "../_components/page-frame";
import { Clock, ArrowUpRight } from "lucide-react";
import { POSTS } from "../_data/blog";

export const metadata = { title: "Блог — Nexora" };

const CATEGORIES = ["Все", "Кейсы", "CRM", "Маркетинг", "Технологии", "Аналитика", "Мобайл"];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <PageFrame
      eyebrow="Блог"
      title="Истории, цифры и идеи о запуске бизнеса"
      lede="Кейсы наших клиентов, разборы лучших практик, обзоры рынка и техническая внутрянка. Без воды и без рекламы — пишем как для друзей."
      badge={<Tag tone="indigo">7 свежих публикаций</Tag>}
    >
      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c, i) => (
          <button
            key={c}
            className={`h-8 rounded-full border px-3.5 text-[12px] font-medium transition ${
              i === 0
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group mb-12 block overflow-hidden rounded-2xl border border-zinc-200 transition hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
      >
        <div className="grid md:grid-cols-2">
          <div className={`relative aspect-[4/3] bg-gradient-to-br ${featured.gradient} md:aspect-auto`}>
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.7) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute left-5 top-5 flex gap-2">
              <Tag tone="amber">главное</Tag>
              <Tag tone="zinc">{featured.category}</Tag>
            </div>
          </div>
          <div className="flex flex-col justify-between p-8 md:p-10">
            <div>
              <h2 className="text-[26px] font-semibold leading-[1.2] tracking-tight transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {featured.title}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">{featured.excerpt}</p>
            </div>
            <div className="mt-6 flex items-center gap-3 text-[12px] text-zinc-500">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{featured.author}</span>
              <span>·</span>
              <time>{featured.date}</time>
              <span>·</span>
              <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {featured.readTime}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 transition hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
          >
            <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.gradient}`}>
              <div className="absolute left-4 top-4">
                <Tag tone="zinc">{p.category}</Tag>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-[16px] font-semibold leading-snug tracking-tight transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{p.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-4 text-[11.5px] text-zinc-500">
                <span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{p.author}</span> · {p.date}
                </span>
                <ArrowUpRight className="size-4 opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-8 text-center dark:border-indigo-900/40 dark:bg-indigo-950/20">
        <h3 className="text-[18px] font-semibold tracking-tight">Подпишитесь на еженедельный дайджест</h3>
        <p className="mx-auto mt-1.5 max-w-md text-[13px] text-zinc-600 dark:text-zinc-400">
          Каждую пятницу — лучшие статьи недели, новые шаблоны и тихие апдейты. Без спама, отписка в один клик.
        </p>
        <form action="/api/newsletter" method="post" className="mx-auto mt-5 flex max-w-md gap-2">
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            required
            className="h-10 flex-1 rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
          />
          <button
            type="submit"
            className="h-10 rounded-md bg-zinc-900 px-4 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Подписаться
          </button>
        </form>
      </div>
    </PageFrame>
  );
}
