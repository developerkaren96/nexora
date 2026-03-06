import { PageFrame, Section, Tag } from "../_components/page-frame";
import { Download } from "lucide-react";

export const metadata = { title: "DPA — Data Processing Agreement — Nexora" };

const SUBPROCESSORS = [
  { name: "AWS (Amazon Web Services)", purpose: "Хостинг, БД, хранение файлов",  location: "Frankfurt, DE",  cert: "ISO 27001, SOC 2" },
  { name: "Cloudflare",                 purpose: "CDN, WAF, DDoS-защита",         location: "EU (proxy)",      cert: "SOC 2 Type II" },
  { name: "Stripe Payments Europe",     purpose: "Обработка платежей",            location: "Dublin, IE",      cert: "PCI DSS L1" },
  { name: "Postmark (ActiveCampaign)",  purpose: "Транзакционные письма",         location: "US (SCC)",        cert: "SOC 2" },
  { name: "Twilio",                     purpose: "SMS и WhatsApp уведомления",    location: "Ireland",         cert: "ISO 27001" },
  { name: "Sentry (self-hosted)",       purpose: "Мониторинг ошибок",             location: "Frankfurt, DE",   cert: "наша инфраструктура" },
  { name: "Plausible Analytics",        purpose: "Анонимная веб-аналитика",       location: "Frankfurt, DE",   cert: "GDPR-by-design" },
  { name: "Apple Push Notification",    purpose: "Push для iOS",                  location: "US (SCC)",        cert: "—" },
  { name: "Firebase Cloud Messaging",   purpose: "Push для Android",              location: "EU",              cert: "ISO 27001" },
];

export default function DpaPage() {
  return (
    <PageFrame
      eyebrow="GDPR Art. 28"
      title="Соглашение об обработке данных"
      lede="Стандартный DPA для всех клиентов из ЕС и тех, кто хочет соответствовать GDPR. Подписывается автоматически при оплате тарифа Business+. PDF-копия — кнопкой ниже."
      badge={<Tag tone="indigo">v3.2 — 1 июня 2026</Tag>}
    >
      <div className="mb-12 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Скачать подписанную PDF-копию</h2>
          <p className="mt-0.5 text-[12.5px] text-zinc-600 dark:text-zinc-400">
            Версия с подписью CEO, готовая к загрузке в ваш реестр обработки.
          </p>
        </div>
        <a
          href="/legal/nexora-dpa-v3.2.pdf"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          <Download className="size-4" /> DPA v3.2.pdf
        </a>
      </div>

      <div className="space-y-12">
        <Section title="1. Роли сторон">
          <p>
            В рамках использования сервиса Nexora:
          </p>
          <ul>
            <li><b>Клиент</b> (вы) — Контролёр данных (Data Controller) в смысле Art. 4(7) GDPR.</li>
            <li><b>Nexora GmbH</b> — Обработчик данных (Data Processor) в смысле Art. 4(8) GDPR.</li>
          </ul>
          <p>
            Это означает: вы решаете, какие данные клиентов собирать и для каких целей.
            Мы их хранимым и обрабатываем строго по вашим инструкциям.
          </p>
        </Section>

        <Section title="2. Предмет и продолжительность обработки">
          <p>
            Мы обрабатываем персональные данные ваших клиентов (имена, контакты, история заказов
            и т.п.) исключительно в целях предоставления вам сервиса Nexora. Обработка длится в
            течение действия основного договора + 30 дней на экспорт.
          </p>
        </Section>

        <Section title="3. Категории субъектов и данных">
          <ul>
            <li><b>Субъекты:</b> ваши конечные клиенты, посетители сайта, сотрудники.</li>
            <li><b>Данные:</b> идентификаторы (имя, e-mail, телефон), коммерческие данные (заказы, платежи, история взаимодействий), технические данные (IP, устройство).</li>
          </ul>
        </Section>

        <Section title="4. Обязательства Nexora">
          <ul>
            <li>Обрабатывать данные только по документированным инструкциям Контролёра.</li>
            <li>Обеспечивать конфиденциальность (NDA со всеми сотрудниками с доступом).</li>
            <li>Применять технические и организационные меры (см. <a href="/security">security</a>).</li>
            <li>Помогать Контролёру выполнять права субъектов (доступ, удаление, портабельность).</li>
            <li>Уведомлять о нарушениях безопасности в течение 24 часов с момента обнаружения.</li>
            <li>Удалять или возвращать данные после прекращения договора (по выбору Контролёра).</li>
            <li>Предоставлять информацию для подтверждения соответствия, включая аудит раз в год.</li>
          </ul>
        </Section>

        <Section title="5. Подпроцессоры">
          <p>
            Контролёр даёт общее разрешение на привлечение подпроцессоров. Актуальный список —
            ниже. Об изменениях мы уведомляем по e-mail минимум за 30 дней с правом возразить.
          </p>
          <div className="not-prose mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-[12.5px]">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Подпроцессор</th>
                  <th className="px-4 py-2.5 font-semibold">Назначение</th>
                  <th className="px-4 py-2.5 font-semibold">Локация</th>
                  <th className="hidden px-4 py-2.5 font-semibold md:table-cell">Сертификации</th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((s, i) => (
                  <tr key={s.name} className={i > 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}>
                    <td className="px-4 py-2.5 font-medium">{s.name}</td>
                    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">{s.purpose}</td>
                    <td className="px-4 py-2.5 font-mono text-[11.5px] text-zinc-500">{s.location}</td>
                    <td className="hidden px-4 py-2.5 text-zinc-600 dark:text-zinc-400 md:table-cell">{s.cert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="6. Международная передача">
          <p>
            При передаче данных за пределы EEA мы используем Standard Contractual Clauses
            (Module Two, версия 2021/914) и дополнительные технические меры (шифрование, псевдонимизация).
            Подробнее — Annex II документа DPA (PDF).
          </p>
        </Section>

        <Section title="7. Аудит">
          <ul>
            <li>Раз в год — на основе SOC 2 Type II отчёта и независимого pen-test.</li>
            <li>По запросу — углублённый аудит для Enterprise-клиентов (с разумным уведомлением и под NDA).</li>
            <li>В случае инцидента — внеочередной аудит без ограничений.</li>
          </ul>
        </Section>

        <Section title="8. Возврат и удаление данных">
          <p>
            После прекращения договора Контролёр может в течение 30 дней:
          </p>
          <ul>
            <li>Экспортировать все данные в JSON и CSV из настроек проекта.</li>
            <li>Запросить дамп БД (доступно на Enterprise).</li>
            <li>Запросить безвозвратное удаление с письменным подтверждением.</li>
          </ul>
          <p>
            По истечении 30 дней данные удаляются автоматически и невосстановимо.
          </p>
        </Section>

        <Section title="9. Контакты">
          <p>
            DPO Nexora GmbH: <b>dpo@nexora.app</b>. Юридические запросы: <b>legal@nexora.app</b>.
          </p>
        </Section>
      </div>
    </PageFrame>
  );
}
