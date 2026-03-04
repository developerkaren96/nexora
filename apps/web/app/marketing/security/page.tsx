import { PageFrame, Section, Tag } from "../_components/page-frame";
import { Shield, Lock, KeyRound, Server, Eye, Bell, BadgeCheck, FileCheck, AlertTriangle } from "lucide-react";

export const metadata = { title: "Безопасность — Nexora" };

const PILLARS = [
  { icon: Lock,    title: "Шифрование", body: "TLS 1.3 при передаче, AES-256-GCM в покое. Ключи в AWS KMS с ротацией каждые 90 дней." },
  { icon: KeyRound,title: "2FA / SSO",   body: "Двухфакторная аутентификация на всех тарифах. SAML SSO и SCIM-провижининг — на Enterprise." },
  { icon: Server,  title: "Изоляция",    body: "Row-level security в Postgres, отдельные namespaces в Kubernetes, изолированные блобы в S3." },
  { icon: Eye,     title: "Аудит",       body: "Полный лог действий в админ-панели и API. Экспорт в SIEM (Datadog, Splunk) на Enterprise." },
  { icon: Bell,    title: "Мониторинг",  body: "24/7 SOC, alerting на аномальные паттерны входа, географию, brute-force и подозрительные API-запросы." },
  { icon: Shield,  title: "Резервы",     body: "Снимки БД каждые 6 часов, хранение 30 дней. Geo-replicated в Дублине. Тесты восстановления — еженедельно." },
];

const COMPLIANCE = [
  { name: "GDPR",        status: "соответствует",   tone: "emerald" as const, desc: "EU-резидентность, DPO, DPA, право на удаление." },
  { name: "SOC 2 Type II", status: "прошли аудит",   tone: "emerald" as const, desc: "Отчёт за 2025 доступен по запросу под NDA." },
  { name: "ISO 27001",   status: "в процессе",     tone: "amber" as const,   desc: "Сертификация ожидается Q3 2026." },
  { name: "HIPAA",       status: "BAA доступен",   tone: "indigo" as const,  desc: "Для клиник на Enterprise — Business Associate Agreement." },
  { name: "PCI DSS",     status: "через Stripe",   tone: "zinc" as const,    desc: "Платёжные данные не проходят через нашу инфраструктуру." },
  { name: "152-ФЗ",      status: "соответствует",   tone: "emerald" as const, desc: "Опция хранения в РФ — Yandex Cloud (Москва)." },
];

export default function SecurityPage() {
  return (
    <PageFrame
      eyebrow="Безопасность"
      title="Мы относимся к данным как к чужой собственности — потому что это так"
      lede="За три года работы — ноль утечек, ноль инцидентов с потерей данных, два внешних аудита. Мы не идеальны, но прозрачны: всё, что вы прочитаете ниже — реальная картина инфраструктуры."
      badge={<Tag tone="emerald">SOC 2 Type II</Tag>}
    >
      {/* Pillars */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <span className="grid size-10 place-items-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              <p.icon className="size-4.5" />
            </span>
            <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Compliance */}
      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-tight">Соответствие и сертификаты</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
          {COMPLIANCE.map((c, i) => (
            <div
              key={c.name}
              className={`flex flex-wrap items-center gap-4 px-5 py-4 ${i > 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}`}
            >
              <div className="flex items-center gap-3 sm:w-48">
                <BadgeCheck className="size-4 text-emerald-500" />
                <span className="font-mono text-[14px] font-semibold">{c.name}</span>
              </div>
              <Tag tone={c.tone}>{c.status}</Tag>
              <p className="flex-1 text-[12.5px] text-zinc-600 dark:text-zinc-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 space-y-12">
        <Section title="Архитектура и инфраструктура">
          <p>
            Платформа развёрнута в AWS, основной регион — Frankfurt (eu-central-1). Все сервисы
            работают в Kubernetes (EKS) с автоматическим масштабированием. Базы данных — Aurora
            PostgreSQL в multi-AZ конфигурации с автоматическим failover.
          </p>
          <p>
            Каждый клиентский проект изолирован на уровне:
          </p>
          <ul>
            <li><b>Базы данных</b> — row-level security с принудительным фильтром по project_id во всех запросах.</li>
            <li><b>Хранилища файлов</b> — отдельный bucket-prefix и IAM-политика на уровне объектов.</li>
            <li><b>Сетевого трафика</b> — Cloudflare WAF с правилами на per-project уровне.</li>
            <li><b>Фоновых задач</b> — отдельные очереди и пулы воркеров для критичных тенантов.</li>
          </ul>
        </Section>

        <Section title="Управление доступом сотрудников">
          <ul>
            <li>Прод-доступ — только у 6 инженеров, через ephemeral-сессии (15 минут) с одобрением.</li>
            <li>Все сотрудники — обязательный SSO с 2FA через YubiKey (без TOTP).</li>
            <li>Polная аудит-история любого доступа к данным клиента — экспортируется по запросу.</li>
            <li>Background-checks для всех сотрудников с доступом к данным.</li>
          </ul>
        </Section>

        <Section title="Bug bounty и vulnerability disclosure">
          <p>
            У нас открытая программа bug bounty с выплатами от <b>$50 до $10 000</b> в зависимости
            от критичности. Сообщить об уязвимости — <b>security@nexora.app</b>{" "}
            (<a href="/security/pgp.txt">PGP key</a>).
          </p>
          <p>
            Мы ответим в течение 24 часов, подтвердим воспроизведение в течение 72 часов, и
            публично поблагодарим вас (если вы не против) в нашем Hall of Fame.
          </p>
          <div className="not-prose mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="text-[12.5px] leading-relaxed text-amber-900 dark:text-amber-200">
              Пожалуйста, <b>не</b> проводите DoS-атаки, не используйте чужие данные для PoC, не
              публикуйте уязвимости до того, как мы выпустим патч.
            </div>
          </div>
        </Section>

        <Section title="Incident response">
          <p>
            У нас есть формальный план реагирования на инциденты с регулярными drills (четыре
            раза в год). При обнаружении инцидента мы:
          </p>
          <ol>
            <li>Изолируем затронутые системы в течение 15 минут.</li>
            <li>Уведомляем затронутых клиентов в течение 24 часов (или быстрее по GDPR).</li>
            <li>Публикуем post-mortem на <a href="/status">status.nexora.app</a> в течение 7 дней.</li>
          </ol>
        </Section>

        <Section title="Документы по запросу">
          <p>Под NDA доступны:</p>
          <ul>
            <li>SOC 2 Type II отчёт за 2025 (актуальный).</li>
            <li>Pen-test отчёт от Cure53 (Q4 2025).</li>
            <li>Архитектурная диаграмма с зонами безопасности.</li>
            <li>Политики (Acceptable Use, Incident Response, Data Retention).</li>
            <li>BAA для HIPAA, DPA для GDPR.</li>
          </ul>
          <p>
            Запросить — <b>security@nexora.app</b> или у вашего account-менеджера.
          </p>
        </Section>
      </div>

      <div className="mt-16 flex items-center gap-4 rounded-2xl border border-zinc-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 dark:border-zinc-800 dark:from-emerald-950/20 dark:via-zinc-900 dark:to-teal-950/20">
        <FileCheck className="size-7 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p className="text-[13.5px] text-zinc-700 dark:text-zinc-300">
          Хотите больше деталей или прошить требования вашего комплаенса? Запишитесь на 30-минутный
          security review — <a href="mailto:security@nexora.app" className="font-medium text-emerald-700 underline dark:text-emerald-400">security@nexora.app</a>.
        </p>
      </div>
    </PageFrame>
  );
}
