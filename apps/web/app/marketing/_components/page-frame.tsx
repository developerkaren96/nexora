import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageFrame({
  eyebrow,
  title,
  lede,
  badge,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-64 opacity-60 dark:opacity-30"
          style={{
            background:
              "radial-gradient(28rem 16rem at 30% 30%, rgba(99,102,241,0.16), transparent), radial-gradient(24rem 14rem at 70% 50%, rgba(168,85,247,0.12), transparent)",
          }}
        />
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12.5px] text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="size-3.5" /> На главную
            </Link>
            {badge}
          </div>
          {eyebrow && (
            <p className="mt-6 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 max-w-3xl text-balance text-[36px] font-semibold leading-[1.05] tracking-tight md:text-[48px]">
            {title}
          </h1>
          {lede && (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {lede}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-14">{children}</div>
    </main>
  );
}

export function Tag({
  children,
  tone = "indigo",
}: {
  children: React.ReactNode;
  tone?: "indigo" | "emerald" | "amber" | "rose" | "zinc";
}) {
  const tones: Record<string, string> = {
    indigo:
      "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300",
    emerald:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300",
    amber:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300",
    rose:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300",
    zinc:
      "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="mb-4 border-b border-zinc-200 pb-3 text-[20px] font-semibold tracking-tight dark:border-zinc-800">
        {title}
      </h2>
      <div className="space-y-4 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300 [&_a]:text-indigo-600 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-indigo-400 [&_b]:font-semibold [&_b]:text-zinc-900 dark:[&_b]:text-zinc-100 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <div className="mt-16 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-8 text-center dark:border-zinc-800 dark:from-indigo-950/30 dark:via-zinc-900 dark:to-violet-950/30">
      <h3 className="text-[20px] font-semibold tracking-tight">Запустите бизнес за 5 минут</h3>
      <p className="mx-auto mt-1.5 max-w-md text-[13px] text-zinc-600 dark:text-zinc-400">
        Сайт, приложение, CRM и домен — из одного мастера. Без карты, отмена в один клик.
      </p>
      <Link
        href="http://app.localhost:3000/register"
        className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        Создать аккаунт
      </Link>
    </div>
  );
}
