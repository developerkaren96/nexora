import { PageFrame, Tag } from "../_components/page-frame";
import { Mail, MessageSquare, ShieldAlert, Newspaper, Briefcase, MapPin, Send } from "lucide-react";

export const metadata = { title: "Контакты — Nexora" };

const CHANNELS = [
  {
    icon: MessageSquare,
    title: "Поддержка клиентов",
    desc: "Технические вопросы, биллинг, аккаунт. Отвечаем в течение часа в рабочее время.",
    cta: "support@nexora.app",
    href: "mailto:support@nexora.app",
    note: "9:00 — 21:00 CET, 7 дней",
  },
  {
    icon: Briefcase,
    title: "Отдел продаж",
    desc: "Тарифы Business+, индивидуальные шаблоны, корпоративные внедрения и пилоты.",
    cta: "sales@nexora.app",
    href: "mailto:sales@nexora.app",
    note: "Демо в течение 24 часов",
  },
  {
    icon: Newspaper,
    title: "Пресса и партнёрства",
    desc: "Интервью, комментарии для СМИ, совместные публикации, мероприятия.",
    cta: "press@nexora.app",
    href: "mailto:press@nexora.app",
    note: "Пресс-кит: /press",
  },
  {
    icon: ShieldAlert,
    title: "Безопасность",
    desc: "Сообщения об уязвимостях. У нас публичная политика bug-bounty с выплатами до $10 000.",
    cta: "security@nexora.app",
    href: "mailto:security@nexora.app",
    note: "PGP ключ: /security",
  },
];

const OFFICES = [
  { city: "Берлин",   country: "Германия",   address: "Torstraße 138, 10119 Berlin",                        ts: "CET / UTC+1" },
  { city: "Лиссабон", country: "Португалия", address: "Avenida da Liberdade 110, 1269-046 Lisboa",          ts: "WET / UTC+0" },
  { city: "Тбилиси",  country: "Грузия",     address: "Marjanishvili St. 5, 0102 Tbilisi",                  ts: "GET / UTC+4" },
];

export default function ContactPage() {
  return (
    <PageFrame
      eyebrow="Контакты"
      title="Поговорим"
      lede="Выберите канал — мы написали, кто и за сколько отвечает. Никаких форм с тикетами в чёрный ящик: за каждым адресом — живой человек."
      badge={<Tag tone="emerald">обычный ответ за 1 час</Tag>}
    >
      {/* Channels */}
      <div className="grid gap-4 md:grid-cols-2">
        {CHANNELS.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
              <c.icon className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{c.desc}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12.5px] font-medium text-indigo-600 transition group-hover:underline dark:text-indigo-400">
                  {c.cta}
                </span>
                <span className="text-[11px] text-zinc-500">· {c.note}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Form */}
      <section className="mt-16 grid gap-10 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 md:grid-cols-[1fr_1.2fr] md:p-10">
        <div>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
            Запрос на демо
          </p>
          <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-tight">
            Покажем платформу под ваш сценарий за 25 минут
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Расскажите, какой бизнес вы запускаете или масштабируете — мы соберём демо именно
            под вашу отрасль. Без презентаций «о нас», только релевантные сценарии.
          </p>
          <ul className="mt-5 space-y-2.5 text-[13px] text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-indigo-500" /> Ответ в течение 1 рабочего часа.</li>
            <li className="flex items-start gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-indigo-500" /> Демо ведёт человек из вашей отрасли.</li>
            <li className="flex items-start gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-indigo-500" /> После — sandbox-аккаунт на 30 дней без карты.</li>
          </ul>
        </div>

        <form action="/api/contact" method="post" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Имя" name="name" placeholder="Иван Петров" />
            <Field label="E-mail" name="email" type="email" placeholder="ivan@company.ru" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Компания" name="company" placeholder="Acme Coffee" />
            <Field label="Телефон (необязательно)" name="phone" placeholder="+7 (___)" />
          </div>
          <div>
            <label htmlFor="topic" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700 dark:text-zinc-300">
              Тип бизнеса
            </label>
            <select
              id="topic"
              name="topic"
              className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
              defaultValue=""
            >
              <option value="" disabled>Выберите…</option>
              <option>Ресторан / кафе</option>
              <option>Салон красоты</option>
              <option>Медцентр / клиника</option>
              <option>Интернет-магазин</option>
              <option>Онлайн-школа</option>
              <option>Юридическая фирма</option>
              <option>Другое</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700 dark:text-zinc-300">
              Расскажите коротко
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Что хотите получить от платформы?"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-zinc-900 px-5 text-[13.5px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            <Send className="size-4" /> Отправить запрос
          </button>
          <p className="text-[11px] text-zinc-500">
            Отправляя форму, вы соглашаетесь с нашей{" "}
            <a href="/privacy" className="underline">политикой конфиденциальности</a>.
          </p>
        </form>
      </section>

      {/* Offices */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Где мы физически</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-zinc-500">
                <MapPin className="size-3" /> {o.country}
              </div>
              <h3 className="mt-2 text-[18px] font-semibold tracking-tight">{o.city}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{o.address}</p>
              <p className="mt-2 font-mono text-[11px] text-zinc-500">{o.ts}</p>
            </div>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[11.5px] font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
      />
    </div>
  );
}
