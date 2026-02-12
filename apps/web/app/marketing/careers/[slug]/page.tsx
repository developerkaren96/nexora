import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame, Tag } from "../../_components/page-frame";
import { JOBS } from "../../_data/careers";
import {
  MapPin, Briefcase, ArrowLeft, ArrowRight, Send, Check, Building2,
} from "lucide-react";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  return { title: job ? `${job.title} — Карьера Nexora` : "Вакансия — Nexora" };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  if (!job) notFound();

  const other = JOBS.filter((j) => j.slug !== job.slug).slice(0, 3);

  return (
    <PageFrame
      eyebrow={`${job.team} · вакансия`}
      title={job.title}
      lede={job.summary}
      badge={<Tag tone="emerald">нанимаем</Tag>}
    >
      {/* Meta strip */}
      <div className="mb-10 grid gap-3 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 sm:grid-cols-4">
        <MetaItem icon={Briefcase} label="Команда"   value={job.team} />
        <MetaItem icon={MapPin}    label="Локация"   value={job.location} />
        <MetaItem icon={Building2} label="Формат"    value={job.remote ? "Удалённо / гибрид" : "Офис"} />
        <MetaItem icon={Send}      label="Зарплата"  value={job.salary} />
      </div>

      {/* Apply CTA */}
      <div className="mb-12 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:join@nexora.app?subject=${encodeURIComponent(`Заявка — ${job.title}`)}`}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          <Send className="size-4" /> Откликнуться
        </a>
        <Link
          href="/careers"
          className="inline-flex h-11 items-center gap-1.5 text-[12.5px] text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="size-3.5" /> Все вакансии
        </Link>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_280px]">
        <article className="space-y-10">
          <Block title="Что будете делать" items={job.what} icon="indigo" />
          <Block title="Что важно"          items={job.need} icon="emerald" />
          <Block title="Будет плюсом"       items={job.nice} icon="amber" />
          <Block title="Процесс найма"      items={job.process} icon="zinc" ordered />
        </article>

        {/* Sidebar */}
        <aside className="space-y-4 md:sticky md:top-6 md:self-start">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              О нас
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              68 человек в 9 странах. $4.2M ARR. 24 000 живых проектов. Среди инвесторов — Index
              Ventures, Y Combinator, Founders Fund.
            </p>
            <Link
              href="/about"
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Подробнее <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Прямой контакт
            </p>
            <a
              href="mailto:join@nexora.app"
              className="mt-2 block font-mono text-[13px] font-medium text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
            >
              join@nexora.app
            </a>
            <p className="mt-1.5 text-[11.5px] text-zinc-500">
              Анна Войтенко · отвечаем в течение 1 рабочего дня.
            </p>
          </div>
        </aside>
      </div>

      {/* Other roles */}
      <section className="mt-16">
        <h2 className="text-[20px] font-semibold tracking-tight">Другие открытые позиции</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {other.map((o) => (
            <Link
              key={o.slug}
              href={`/careers/${o.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
            >
              <Tag tone="zinc">{o.team}</Tag>
              <div className="mt-3 text-[14px] font-semibold leading-snug tracking-tight transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {o.title}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11.5px] text-zinc-500">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {o.location}</span>
                <span className="font-mono">{o.salary}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
        <div className="truncate text-[13px] font-medium">{value}</div>
      </div>
    </div>
  );
}

function Block({
  title,
  items,
  icon,
  ordered,
}: {
  title: string;
  items: string[];
  icon: "indigo" | "emerald" | "amber" | "zinc";
  ordered?: boolean;
}) {
  const tone = {
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300",
    amber: "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300",
    zinc: "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  }[icon];
  return (
    <section>
      <h2 className="mb-4 border-b border-zinc-200 pb-2.5 text-[18px] font-semibold tracking-tight dark:border-zinc-800">
        {title}
      </h2>
      <ol className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border font-mono text-[11px] font-semibold ${tone}`}>
              {ordered ? i + 1 : <Check className="size-3" />}
            </span>
            <span className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">{it}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
