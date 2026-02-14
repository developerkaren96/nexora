import { PageFrame, Tag } from "../_components/page-frame";
import { Sparkles, Wrench, Bug, Zap } from "lucide-react";

export const metadata = { title: "Changelog — что нового в Nexora" };

type Entry = {
  v: string;
  date: string;
  title: string;
  current?: boolean;
  items: { kind: "feature" | "improvement" | "fix" | "perf"; text: string }[];
};

const ENTRIES: Entry[] = [
  {
    v: "v2.7.0",
    date: "20 июня 2026",
    current: true,
    title: "Тёмная тема и переключатель локали",
    items: [
      { kind: "feature", text: "Системная, светлая и тёмная темы — выбор сохраняется в браузере и применяется ко всем разделам, включая клиентский сайт и CRM." },
      { kind: "feature", text: "Переключатель языка в шапке: RU / EN / HY с автоматической локализацией дат, валют и плюрализации." },
      { kind: "improvement", text: "Кнопки в hero и CTA теперь имеют живую световую анимацию и press-эффект." },
      { kind: "perf", text: "Главная страница ускорена на 38% за счёт перевода тяжёлых блоков в server components." },
    ],
  },
  {
    v: "v2.6.0",
    date: "2 июня 2026",
    title: "ROI-калькулятор и сравнение конкурентов",
    items: [
      { kind: "feature", text: "Интерактивный калькулятор стоимости запуска — сравнивает Nexora с самосборкой за неделю." },
      { kind: "feature", text: "Таблица сравнения с Tilda, Shopify и WordPress по 9 ключевым показателям." },
      { kind: "improvement", text: "Карточки кейсов теперь показывают реальные метрики (+184% записей, 4.5× MRR)." },
    ],
  },
  {
    v: "v2.5.0",
    date: "14 мая 2026",
    title: "Мобильное приложение в один клик",
    items: [
      { kind: "feature", text: "Публикация в App Store и Google Play из дашборда — мы оформляем аккаунты разработчиков." },
      { kind: "feature", text: "Push-уведомления напрямую из CRM, с шаблонами и сегментацией." },
      { kind: "fix", text: "Исправлена ошибка с отображением кастомных шрифтов в Flutter-сборке для iOS." },
    ],
  },
  {
    v: "v2.4.2",
    date: "28 апреля 2026",
    title: "Стабильность платёжного шлюза",
    items: [
      { kind: "fix", text: "Исправлен race condition при двойной отправке формы оплаты — спасибо пользователям, которые сообщили!" },
      { kind: "fix", text: "Устранена утечка памяти в воркере webhooks при пиковых нагрузках." },
      { kind: "perf", text: "Снижение задержки API при создании заказа с 320ms до 110ms." },
    ],
  },
  {
    v: "v2.4.0",
    date: "10 апреля 2026",
    title: "EU-резидентность данных",
    items: [
      { kind: "feature", text: "Для тарифов Professional и Enterprise: данные хранятся в дата-центрах ЕС (Франкфурт)." },
      { kind: "feature", text: "DPA (Data Processing Agreement) генерируется автоматически в разделе «Биллинг»." },
      { kind: "improvement", text: "Расширенный экспорт CSV/JSON: теперь включает все события CRM, не только клиентов." },
    ],
  },
  {
    v: "v2.3.0",
    date: "15 марта 2026",
    title: "Конструктор страниц без кода",
    items: [
      { kind: "feature", text: "Drag-and-drop редактор страниц «О нас», «Контакты», лендинги акций." },
      { kind: "feature", text: "Библиотека из 40+ блоков: hero, FAQ, отзывы, прайс, форма." },
      { kind: "improvement", text: "Мгновенная публикация — без рекэширования и передеплоев." },
    ],
  },
  {
    v: "v2.2.0",
    date: "1 февраля 2026",
    title: "Поддержка собственных доменов",
    items: [
      { kind: "feature", text: "Подключение собственного домена с автоматическим выпуском Let's Encrypt SSL." },
      { kind: "feature", text: "Несколько доменов на проект — для региональных версий или брендов." },
    ],
  },
];

const KIND = {
  feature: { label: "новое", tone: "indigo" as const, icon: Sparkles },
  improvement: { label: "улучшение", tone: "emerald" as const, icon: Wrench },
  fix: { label: "фикс", tone: "amber" as const, icon: Bug },
  perf: { label: "скорость", tone: "rose" as const, icon: Zap },
};

export default function ChangelogPage() {
  return (
    <PageFrame
      eyebrow="Changelog"
      title="Что нового в Nexora"
      lede="Мы релизим каждые 1–2 недели. Здесь — все заметные изменения, по убыванию свежести. Подписывайтесь на RSS, чтобы не пропустить."
      badge={<Tag tone="emerald">обновлено еженедельно</Tag>}
    >
      <div className="relative">
        {/* timeline line */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-700 dark:via-zinc-800"
        />

        <ol className="space-y-12">
          {ENTRIES.map((e) => (
            <li key={e.v} className="relative pl-8">
              <span
                className={`absolute left-0 top-1.5 size-3.5 rounded-full ring-4 ${
                  e.current
                    ? "bg-indigo-500 ring-indigo-100 dark:ring-indigo-950"
                    : "bg-zinc-300 ring-white dark:bg-zinc-600 dark:ring-zinc-950"
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-mono text-[18px] font-semibold tracking-tight">{e.v}</h2>
                {e.current && <Tag tone="indigo">текущий релиз</Tag>}
                <time className="text-[12.5px] text-zinc-500">{e.date}</time>
              </div>
              <p className="mt-1.5 text-[15px] font-medium text-zinc-700 dark:text-zinc-300">{e.title}</p>
              <ul className="mt-4 space-y-2.5">
                {e.items.map((it, i) => {
                  const k = KIND[it.kind];
                  const Icon = k.icon;
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      <span
                        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border ${
                          k.tone === "indigo"
                            ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300"
                            : k.tone === "emerald"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : k.tone === "amber"
                                ? "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
                                : "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
                        }`}
                      >
                        <Icon className="size-3" />
                      </span>
                      <div className="min-w-0">
                        <span className="mr-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          {k.label}
                        </span>
                        <span className="text-[13.5px] text-zinc-700 dark:text-zinc-300">{it.text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
          Полная история до v2.0 — в архиве на{" "}
          <a href="https://github.com/nexora-app" className="font-medium text-indigo-600 underline underline-offset-2 dark:text-indigo-400">
            GitHub
          </a>
          . Хотите узнавать о релизах первыми? Подпишитесь на{" "}
          <a href="/#newsletter" className="font-medium text-indigo-600 underline underline-offset-2 dark:text-indigo-400">
            рассылку
          </a>
          .
        </p>
      </div>
    </PageFrame>
  );
}
