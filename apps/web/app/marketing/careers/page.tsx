import Link from "next/link";
import { PageFrame, Tag } from "../_components/page-frame";
import { MapPin, Briefcase, Coffee, Globe2, HeartHandshake, Plane, Wallet, ArrowRight, GraduationCap } from "lucide-react";
import { JOBS } from "../_data/careers";

export const metadata = { title: "Карьера — Nexora" };

const TEAMS = ["Все", "Engineering", "Design", "Product", "Marketing", "Sales", "Customer Success"];

const BENEFITS = [
  { icon: Globe2,        title: "Работа из любой точки",   body: "9 стран в команде, синхрон в CET ±3. Один обязательный ретрит в год." },
  { icon: Wallet,        title: "Доля в компании",          body: "ESOP с понятным графиком вестинга и налоговым консультантом." },
  { icon: Plane,         title: "Релокейт-бюджет",          body: "До €15 000 на переезд в Берлин или Лиссабон, если захотите." },
  { icon: GraduationCap, title: "Обучение — €3 000/год",    body: "Курсы, книги, конференции — без вопросов и одобрений." },
  { icon: Coffee,        title: "4-дневная неделя летом",   body: "С июня по август — пятница выходной без понижения зарплаты." },
  { icon: HeartHandshake,title: "Полная медстраховка",      body: "Для вас и семьи, в любой стране проживания." },
];

export default function CareersPage() {
  return (
    <PageFrame
      eyebrow={`${JOBS.length} открытых позиций`}
      title="Соберитесь со скучными людьми и постройте что-то редкое"
      lede="Мы небольшая команда. Берём людей с вкусом, ремеслом и уважением к чужому времени. Здесь нет вечеринок в офисе и брендированных худи — но есть редкая возможность строить продукт, которым пользуются десятки тысяч предпринимателей."
      badge={<Tag tone="emerald">нанимаем</Tag>}
    >
      {/* Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {TEAMS.map((t, i) => (
          <button
            key={t}
            className={`h-8 rounded-full border px-3.5 text-[12px] font-medium transition ${
              i === 0
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Jobs */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
        {JOBS.map((j, i) => (
          <Link
            key={j.title}
            href={`/careers/${j.slug}`}
            className={`group grid gap-3 px-5 py-4 transition hover:bg-zinc-50 dark:hover:bg-zinc-900 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center ${
              i > 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""
            }`}
          >
            <div>
              <div className="text-[14.5px] font-semibold tracking-tight transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {j.title}
              </div>
              <div className="mt-0.5 inline-flex items-center gap-1.5 text-[11.5px] text-zinc-500">
                <Briefcase className="size-3" /> {j.team}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[12.5px] text-zinc-600 dark:text-zinc-400">
              <MapPin className="size-3.5 text-zinc-400" /> {j.location}
              {j.remote && <Tag tone="emerald">remote</Tag>}
            </div>
            <div className="font-mono text-[12.5px] text-zinc-700 dark:text-zinc-300">{j.salary}</div>
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-500 transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Подробнее <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>

      {/* Benefits */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Что вы получаете</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span className="grid size-9 place-items-center rounded-md border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
                <b.icon className="size-4" />
              </span>
              <h3 className="mt-4 text-[14.5px] font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring process */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Как мы нанимаем</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            ["1", "Заявка",       "15 минут. Никаких CV ради CV — расскажите про лучшую работу, которую сделали."],
            ["2", "Звонок",       "30 минут с рекрутёром. Про роль, ожидания, условия."],
            ["3", "Тех-интервью",  "1.5 часа. Один реальный кейс из нашей работы — без LeetCode."],
            ["4", "Финал",         "Встреча с командой. Обмен ожиданиями. Решение в течение 3 дней."],
          ].map(([n, t, b]) => (
            <li key={n} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="font-mono text-[26px] font-semibold leading-none text-indigo-600 dark:text-indigo-400">{n}</div>
              <div className="mt-3 text-[14px] font-semibold">{t}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-16 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 text-center dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <h3 className="text-[18px] font-semibold tracking-tight">Не нашли свою роль?</h3>
        <p className="mx-auto mt-1.5 max-w-md text-[13px] text-zinc-600 dark:text-zinc-400">
          Если вам кажется, что вы можете быть полезны — напишите. Лучшие сотрудники у нас пришли так.
        </p>
        <a
          href="mailto:join@nexora.app"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          join@nexora.app <ArrowRight className="size-3.5" />
        </a>
      </div>
    </PageFrame>
  );
}
