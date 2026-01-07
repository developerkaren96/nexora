import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame, Tag, CtaBand } from "../../_components/page-frame";
import { TEMPLATES } from "../../_data/templates";
import {
  Rocket, ArrowLeft, Check, Smartphone, LayoutDashboard, Users,
  Globe, ExternalLink, Sparkles,
} from "lucide-react";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ code: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const tpl = TEMPLATES.find((t) => t.slug === code);
  return { title: tpl ? `Шаблон «${tpl.name}» — Nexora` : "Шаблон — Nexora" };
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const tpl = TEMPLATES.find((t) => t.slug === code);
  if (!tpl) notFound();

  const Icon = tpl.icon;

  return (
    <PageFrame
      eyebrow={`Шаблон · ${tpl.name}`}
      title={tpl.name}
      lede={tpl.hero}
      badge={tpl.badge ? <Tag tone="indigo">{tpl.badge}</Tag> : <Tag tone="zinc">{tpl.count.toLocaleString("ru-RU")} запусков</Tag>}
    >
      {/* Quick actions */}
      <div className="mb-12 flex flex-wrap items-center gap-3">
        <Link
          href={`http://app.localhost:3000/projects/new?type=${tpl.code}`}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          <Rocket className="size-4" /> Запустить шаблон
        </Link>
        <Link
          href={`/demo/${tpl.slug}`}
          className="inline-flex h-11 items-center gap-2 rounded-md border border-zinc-200 bg-white px-5 text-[13px] font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          <ExternalLink className="size-4" /> Открыть живое демо
        </Link>
        <Link
          href="/templates"
          className="inline-flex h-11 items-center gap-2 text-[12.5px] text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="size-3.5" /> Все шаблоны
        </Link>
      </div>

      {/* Mock preview */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="size-2.5 rounded-full bg-red-300" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-emerald-300" />
          <div className="ml-4 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1 font-mono text-[10.5px] text-zinc-500 dark:bg-zinc-950">
            <Globe className="size-3" /> {tpl.slug}-demo.nexora.app
          </div>
        </div>
        {/* faux page */}
        <div className={`relative aspect-[16/8] bg-gradient-to-br ${tpl.bg} dark:opacity-50`}>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.7) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* faux nav */}
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between border-b border-black/5 px-6 py-3 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className={`grid size-6 place-items-center rounded bg-white/80 shadow-sm dark:bg-zinc-950 ${tpl.accent}`}>
                <Icon className="size-3.5" />
              </span>
              <span className="text-[12px] font-semibold tracking-tight">{tpl.name}</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
              {tpl.pages.slice(0, 4).map((p) => <span key={p}>{p}</span>)}
              <span className="rounded bg-zinc-900 px-2 py-0.5 text-white dark:bg-zinc-100 dark:text-zinc-900">Заказать</span>
            </div>
          </div>
          {/* faux hero */}
          <div className="absolute inset-x-0 bottom-0 grid gap-3 px-8 pb-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="font-serif text-[28px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[34px]">
                {tpl.name.split(" ").slice(0, 4).join(" ")} —<br />в живом эфире
              </div>
              <div className="mt-2 max-w-md text-[11.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                {tpl.tagline}
              </div>
            </div>
            <div className="hidden grid-cols-2 gap-2 md:grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-md bg-white/70 shadow-sm backdrop-blur dark:bg-zinc-950/60" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="mt-20">
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          Что входит
        </p>
        <h2 className="mt-2 text-[26px] font-semibold tracking-tight">Готовые модули для {tpl.name.toLowerCase()}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {tpl.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span className="grid size-9 place-items-center rounded-md border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
                <Sparkles className="size-4" />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pages + CRM + Mobile */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <ChecklistCard icon={Globe}           title="Страницы сайта"  items={tpl.pages} />
        <ChecklistCard icon={LayoutDashboard} title="Поля CRM"        items={tpl.crmFields} />
        <ChecklistCard icon={Smartphone}      title="Экраны приложения" items={tpl.mobileScreens} />
      </section>

      {/* Cases */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[22px] font-semibold tracking-tight">Кто уже запустил</h2>
          <Link href="/#cases" className="text-[12.5px] font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Все кейсы →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tpl.demoCases.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-md bg-zinc-900 font-serif text-[18px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {c.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-[16px] font-semibold tracking-tight">{c.name}</div>
                <div className="text-[11.5px] text-zinc-500">{c.city}</div>
              </div>
              <Tag tone="emerald">{c.metric}</Tag>
            </div>
          ))}
        </div>
      </section>

      {/* Compare to other templates */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Другие шаблоны</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {TEMPLATES.filter((x) => x.code !== tpl.code).slice(0, 4).map((other) => {
            const OIcon = other.icon;
            return (
              <Link
                key={other.code}
                href={`/templates/${other.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-md bg-zinc-100 dark:bg-zinc-800 ${other.accent}`}>
                  <OIcon className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold tracking-tight transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {other.name}
                  </div>
                  <div className="text-[10.5px] text-zinc-500">{other.count.toLocaleString("ru-RU")} запусков</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </PageFrame>
  );
}

function ChecklistCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          <Icon className="size-4" />
        </span>
        <h3 className="text-[14px] font-semibold tracking-tight">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-[12.5px] text-zinc-700 dark:text-zinc-300">
            <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" /> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
