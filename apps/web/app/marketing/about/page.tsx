import Link from "next/link";
import { PageFrame, Tag, CtaBand } from "../_components/page-frame";
import { Heart, Compass, Users, Sparkles, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export const metadata = { title: "О нас — Nexora" };

const VALUES = [
  {
    icon: Compass,
    title: "Ясность важнее объёма",
    body: "Мы предпочитаем одно решение, которое работает, десяти, в которых надо разбираться. Меньше настроек, меньше путаницы, меньше тревоги у предпринимателя.",
  },
  {
    icon: Heart,
    title: "Сделано с уважением",
    body: "Каждая кнопка и каждое письмо проходят через ревью на «уважает ли это время человека». Если вызывает раздражение — переделываем.",
  },
  {
    icon: Sparkles,
    title: "Тихие апдейты, громкие результаты",
    body: "Мы релизим часто и незаметно. Заметить новое можно только потому, что ваш бизнес стал работать чуть лучше.",
  },
  {
    icon: Users,
    title: "Сообщество — это продукт",
    body: "Тысячи предпринимателей в наших Telegram и Discord — они задают вектор не меньше, чем команда инженеров.",
  },
];

const TEAM = [
  { name: "Карен Симонян",     role: "CEO & co-founder",        city: "Ереван",       initial: "К", color: "from-indigo-500 to-violet-500" },
  { name: "Анна Войтенко",     role: "Head of Product",         city: "Берлин",       initial: "А", color: "from-rose-500 to-pink-500" },
  { name: "Дмитрий Ким",       role: "VP Engineering",          city: "Алматы",       initial: "Д", color: "from-emerald-500 to-teal-500" },
  { name: "Ольга Кравченко",   role: "Design Lead",             city: "Лиссабон",     initial: "О", color: "from-amber-500 to-orange-500" },
  { name: "Михаил Петров",     role: "Head of Marketing",       city: "Тбилиси",      initial: "М", color: "from-sky-500 to-cyan-500" },
  { name: "Лиза Хоффман",      role: "Customer Success",        city: "Прага",        initial: "Л", color: "from-fuchsia-500 to-purple-500" },
];

const TIMELINE = [
  { year: "2023", event: "Идея. Карен делает третий MVP подряд для друга-ресторатора. Понимает: каждый раз одно и то же." },
  { year: "2024", event: "Прототип в гараже на 4 человека. Первые 12 платящих клиентов из чата выпускников ИТМО." },
  { year: "2025", event: "Pre-seed $1.4M от Index Ventures. Запуск публичной беты, 3 000 регистраций за первый месяц." },
  { year: "2026", event: "Seed $8M. Открыли офисы в Берлине и Тбилиси. 24 000 живых проектов, $4.2M ARR." },
];

export default function AboutPage() {
  return (
    <PageFrame
      eyebrow="О компании"
      title="Мы делаем запуск бизнеса делом одного вечера"
      lede="Nexora — это инструмент для людей, у которых есть идея и нет года разбираться с подрядчиками. Мы верим, что предпринимательство — нормальная человеческая профессия, а не геройство."
      badge={<Tag tone="indigo">основано в 2023</Tag>}
    >
      {/* Manifesto */}
      <section className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
            Манифест
          </p>
          <h2 className="mt-3 text-balance text-[28px] font-semibold leading-[1.15] tracking-tight">
            Сегодня&nbsp;для&nbsp;того, чтобы запустить кафе, нужен <span className="text-indigo-600 dark:text-indigo-400">разработчик</span>,
            <br /> дизайнер, маркетолог и юрист.
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Это абсурд. Кафе — это про еду, людей и атмосферу. Так же как клиника — про лечение,
            салон — про красоту, школа — про знания. Цифровая часть не должна занимать больше времени,
            чем выбор названия.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Мы строим инструмент, который снимает эту нагрузку до нуля — чтобы предприниматель
            мог заняться тем, ради чего он начал.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          {[
            ["24 320", "проектов запущено"],
            ["$4.2M", "ARR в 2026"],
            ["68", "сотрудников в 9 странах"],
            ["4.91 / 5", "рейтинг G2"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="font-mono text-[26px] font-semibold tracking-tight">{n}</div>
              <div className="mt-1 text-[11.5px] uppercase tracking-wider text-zinc-500">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight">Во что мы верим</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span className="grid size-9 place-items-center rounded-md border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
                <v.icon className="size-4" />
              </span>
              <h3 className="mt-4 text-[15.5px] font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight">Как мы пришли сюда</h2>
        <ol className="mt-6 relative space-y-6 border-l border-zinc-200 pl-8 dark:border-zinc-800">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[33px] grid size-4 place-items-center rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950" />
              <div className="font-mono text-[13px] font-semibold text-indigo-600 dark:text-indigo-400">{t.year}</div>
              <p className="mt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">{t.event}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[22px] font-semibold tracking-tight">Команда</h2>
          <Link href="/careers" className="text-[12.5px] font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Открыто 9 вакансий →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((p) => (
            <div key={p.name} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${p.color} text-[16px] font-semibold text-white`}
              >
                {p.initial}
              </span>
              <div className="min-w-0">
                <div className="truncate text-[14px] font-semibold">{p.name}</div>
                <div className="truncate text-[12px] text-zinc-500">{p.role}</div>
                <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-zinc-400">
                  <MapPin className="size-3" /> {p.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Backers + socials */}
      <section className="mt-20 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Инвесторы и ангелы
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
            <span>Index Ventures</span>
            <span>Y Combinator W25</span>
            <span>Founders Fund</span>
            <span>Calm Company</span>
            <span>+ 14 ангелов</span>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Подписывайтесь
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {[
              { icon: Twitter,  label: "X / Twitter", href: "https://twitter.com/nexora" },
              { icon: Github,   label: "GitHub",      href: "https://github.com/nexora-app" },
              { icon: Linkedin, label: "LinkedIn",    href: "https://linkedin.com/company/nexora" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 px-3 text-[12.5px] font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <s.icon className="size-3.5" /> {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </PageFrame>
  );
}
