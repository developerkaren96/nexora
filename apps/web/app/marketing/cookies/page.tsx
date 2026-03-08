import { PageFrame, Section, Tag } from "../_components/page-frame";

export const metadata = { title: "Cookies — Nexora" };

type Row = { name: string; purpose: string; type: "Необходимый" | "Функциональный" | "Аналитика"; ttl: string };

const COOKIES: Row[] = [
  { name: "nx_session",     purpose: "Аутентификация в дашборде",                type: "Необходимый",   ttl: "сессия" },
  { name: "nx_csrf",        purpose: "Защита от CSRF-атак",                       type: "Необходимый",   ttl: "сессия" },
  { name: "nx_locale",      purpose: "Запоминание выбранного языка (RU/EN/HY)",   type: "Функциональный", ttl: "12 месяцев" },
  { name: "nx_theme",       purpose: "Запоминание темы (светлая/тёмная/системная)", type: "Функциональный", ttl: "12 месяцев" },
  { name: "nx_consent",     purpose: "Запись вашего выбора по cookies",            type: "Необходимый",   ttl: "12 месяцев" },
  { name: "nx_sticky_cta",  purpose: "Скрывает плавающий CTA после закрытия",      type: "Функциональный", ttl: "30 дней" },
  { name: "_plausible_*",   purpose: "Анонимная статистика (без cross-site)",      type: "Аналитика",     ttl: "1 день" },
];

const TONE: Record<Row["type"], "emerald" | "indigo" | "amber"> = {
  "Необходимый": "emerald",
  "Функциональный": "indigo",
  "Аналитика": "amber",
};

export default function CookiesPage() {
  return (
    <PageFrame
      eyebrow="Юридическое"
      title="Политика использования cookies"
      lede="Мы стараемся обходиться минимумом. На сайте Nexora — только cookies, которые нужны для работы и удобства. Никакого рекламного трекинга, никаких third-party scripts."
      badge={<Tag tone="zinc">обновлено 1 июня 2026</Tag>}
    >
      <div className="space-y-12">
        <Section title="Что такое cookies">
          <p>
            Cookies — это небольшие текстовые файлы, которые сайт сохраняет в вашем браузере, чтобы
            запомнить вас и ваши настройки между визитами. Они бывают «необходимые» (без них сайт не
            работает), «функциональные» (улучшают опыт) и «аналитические» (помогают понять, как
            люди пользуются сервисом).
          </p>
        </Section>

        <Section title="Что мы используем">
          <p>На сайте nexora.app и в дашборде установлены следующие cookies:</p>
          <div className="not-prose mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-[12.5px]">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Cookie</th>
                  <th className="px-4 py-2.5 font-semibold">Назначение</th>
                  <th className="px-4 py-2.5 font-semibold">Тип</th>
                  <th className="px-4 py-2.5 font-semibold">Срок</th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c, i) => (
                  <tr key={c.name} className={i > 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}>
                    <td className="px-4 py-3 font-mono text-[12px] font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{c.purpose}</td>
                    <td className="px-4 py-3">
                      <Tag tone={TONE[c.type]}>{c.type}</Tag>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11.5px] text-zinc-500">{c.ttl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Чего мы НЕ используем">
          <ul>
            <li><b>Google Analytics, Yandex.Metrica</b> и подобные — отказались в 2024 в пользу Plausible.</li>
            <li><b>Facebook Pixel, TikTok Pixel</b> и любые рекламные трекеры — никогда не было.</li>
            <li><b>Cross-site tracking</b> — все наши cookies строго first-party.</li>
            <li><b>Cookies на ваших клиентских сайтах</b> — по умолчанию только сессионные. Вы можете настроить дополнительные через дашборд.</li>
          </ul>
        </Section>

        <Section title="Согласие">
          <p>
            При первом визите мы показываем баннер с тремя опциями: «Принять всё», «Только необходимые»,
            «Настроить». Ваш выбор сохраняется в cookie <code className="rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[11.5px] dark:border-zinc-700 dark:bg-zinc-900">nx_consent</code>{" "}
            на 12 месяцев.
          </p>
          <p>
            Изменить выбор можно в любой момент: ссылка <a href="#">«Настройки cookies»</a> в футере
            сайта откроет тот же диалог.
          </p>
        </Section>

        <Section title="Как удалить cookies">
          <p>В настройках браузера:</p>
          <ul>
            <li><b>Chrome:</b> Настройки → Конфиденциальность → Файлы cookie.</li>
            <li><b>Safari:</b> Настройки → Конфиденциальность → Управление данными.</li>
            <li><b>Firefox:</b> Настройки → Приватность → Куки и данные сайтов.</li>
          </ul>
          <p>
            Имейте в виду: удаление необходимых cookies приведёт к выходу из аккаунта и сбросу настроек.
          </p>
        </Section>

        <Section title="Связаться">
          <p>
            Вопросы по cookies — <b>privacy@nexora.app</b>. Подробнее об обработке персональных данных —{" "}
            <a href="/privacy">политика конфиденциальности</a>.
          </p>
        </Section>
      </div>
    </PageFrame>
  );
}
