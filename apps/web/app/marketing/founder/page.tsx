import Link from "next/link";
import {
  Rocket, KeyRound, LayoutDashboard, ShieldCheck, Smartphone, Globe,
  Server, Database, Terminal, Lock,
} from "lucide-react";

export const metadata = {
  title: "Founder docs — внутреннее руководство Nexora",
  robots: { index: false, follow: false }, // не индексировать
};

const SECTIONS = [
  { id: "quickstart", title: "1. Быстрый старт",                   icon: Rocket },
  { id: "accounts",   title: "2. Тестовые учётные записи",         icon: KeyRound },
  { id: "dashboard",  title: "3. Дашборд тенанта",                  icon: LayoutDashboard },
  { id: "admin",      title: "4. Админ-панель платформы",           icon: ShieldCheck },
  { id: "mobile",     title: "5. Мобильное приложение",             icon: Smartphone },
  { id: "domains",    title: "6. Поддомены и кастомные домены",     icon: Globe },
  { id: "ports",      title: "7. Порты и сервисы",                  icon: Server },
  { id: "database",   title: "8. База данных и сиды",               icon: Database },
  { id: "cli",        title: "9. Полезные команды",                 icon: Terminal },
];

export default function FounderDocs() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-zinc-50/60">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-[12.5px] text-zinc-500 hover:text-zinc-900">← На главную</Link>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-amber-700">
              <Lock className="size-3" /> Internal · Founder only
            </span>
          </div>
          <h1 className="mt-4 text-[36px] font-semibold tracking-tight text-zinc-900">
            Founder docs
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-zinc-600">
            Внутреннее руководство по запуску и эксплуатации платформы — порты, сервисы,
            seed-учётки, CLI, схема БД. Это страница не для конечных пользователей.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <nav className="space-y-0.5 text-[13px]">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              >
                <s.icon className="size-3.5 text-zinc-400" />
                <span>{s.title}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-12">
          <Section id="quickstart" icon={Rocket} title="Быстрый старт">
            <p>За одну команду поднимаются все сервисы платформы (Postgres, Redis, MinIO, API, Web, фоновые воркеры):</p>
            <Code>
{`./scripts/start.sh        # запустить всё
./scripts/stop.sh          # остановить
./scripts/stop.sh --wipe   # остановить + удалить тома и пометку сидинга`}
            </Code>
            <p>После запуска откройте в браузере:</p>
            <ul>
              <li><Mono>http://localhost:3000</Mono> — лендинг (3 языка: EN / RU / HY)</li>
              <li><Mono>http://app.localhost:3000</Mono> — дашборд тенанта (логин / регистрация / проекты)</li>
              <li><Mono>http://admin.localhost:3000</Mono> — админ-панель платформы</li>
              <li><Mono>http://acme.localhost:3000</Mono> — сайт демо-тенанта Acme</li>
              <li><Mono>http://localhost:4000/docs</Mono> — Swagger API</li>
            </ul>
          </Section>

          <Section id="accounts" icon={KeyRound} title="Тестовые учётные записи">
            <p>Скрипт сидинга создаёт две учётные записи. Используйте их для входа:</p>
            <div className="not-prose grid gap-4 md:grid-cols-2">
              <Cred role="Админ платформы" host="http://admin.localhost:3000" email="admin@nexora.app" password="Admin123!" hint="Полный доступ ко всем тенантам, журналу событий, статистике." />
              <Cred role="Владелец тенанта Acme" host="http://app.localhost:3000/login" email="owner@acme.test" password="Owner123!" hint="Видит только свой тенант, может создавать проекты, управлять CRM, доменами." />
            </div>
            <p className="text-[12.5px] text-zinc-500">
              Пароли заданы в <Mono>packages/database/src/seed.ts</Mono> — поменяйте перед прод-деплоем.
            </p>
          </Section>

          <Section id="dashboard" icon={LayoutDashboard} title="Дашборд тенанта">
            <p>Заходите на <Mono>http://app.localhost:3000/login</Mono> как <Mono>owner@acme.test</Mono>. Внутри:</p>
            <ul>
              <li><b>Onboarding</b> — мастер создания нового проекта (выбор типа бизнеса, шаблона, бренда).</li>
              <li><b>Projects</b> — список проектов (сайт + мобильное приложение + CRM на каждом).</li>
              <li><b>CRM</b> — клиенты, сделки, заказы, воронки.</li>
              <li><b>Billing</b> — текущий тариф, лимиты, апгрейд.</li>
              <li><b>Domains</b> — подключение собственного домена (Business+) с автоматическим SSL.</li>
            </ul>
            <p>Регистрация нового тенанта: <Mono>http://app.localhost:3000/register</Mono>.</p>
          </Section>

          <Section id="admin" icon={ShieldCheck} title="Админ-панель платформы">
            <p>Зайдите как <Mono>admin@nexora.app</Mono> на <Mono>http://admin.localhost:3000</Mono>. Внутри:</p>
            <ul>
              <li><b>Обзор</b> — счётчики (тенанты, пользователи, активные подписки, MRR), распределение по тарифам, статусы тенантов, последние регистрации.</li>
              <li><b>Тенанты</b> — таблица всех клиентов с тарифом, статусом, кол-вом проектов и участников.</li>
              <li><b>Журнал событий</b> — аудит входов, изменений, провижининга, оплат.</li>
            </ul>
            <p className="text-[12.5px] text-zinc-500">
              Доступ закрыт декоратором <Mono>@Roles("PLATFORM_ADMIN")</Mono> в API и проверкой роли в <Mono>app/admin/layout.tsx</Mono>.
            </p>
          </Section>

          <Section id="mobile" icon={Smartphone} title="Мобильное приложение">
            <p>Flutter-приложение лежит в <Mono>apps/mobile</Mono>. Первый запуск:</p>
            <Code>
{`cd apps/mobile
flutter create . --platforms=ios,android --org app.nexora --project-name nexora_mobile
flutter pub get
flutter run                          # на подключённом устройстве / симуляторе
flutter run -d chrome                # быстрый предпросмотр в браузере`}
            </Code>
            <p>
              UI адаптивный: NavigationBar для телефонов, NavigationRail для планшетов. Темы — Material 3
              с seed-цветом из бренда тенанта. Скрины: Home, Catalog, Booking, Orders, Account.
            </p>
          </Section>

          <Section id="domains" icon={Globe} title="Поддомены и кастомные домены">
            <p>Middleware (<Mono>apps/web/middleware.ts</Mono>) роутит по хосту:</p>
            <ul>
              <li><Mono>nexora.app</Mono>, <Mono>www.nexora.app</Mono> → лендинг</li>
              <li><Mono>app.nexora.app</Mono> → дашборд тенанта</li>
              <li><Mono>admin.nexora.app</Mono> → админ-панель</li>
              <li><Mono>{`<slug>`}.nexora.app</Mono> → публичный сайт тенанта</li>
              <li>Любой кастомный домен → ищем тенант по host (<Mono>/t/_byhost</Mono>)</li>
            </ul>
            <p>
              Локально используем <Mono>.localhost</Mono>: <Mono>app.localhost:3000</Mono>,{" "}
              <Mono>admin.localhost:3000</Mono>, <Mono>acme.localhost:3000</Mono>. Они уже резолвятся в 127.0.0.1
              на macOS / Linux без правки <Mono>/etc/hosts</Mono>.
            </p>
          </Section>

          <Section id="ports" icon={Server} title="Порты и сервисы">
            <div className="not-prose overflow-hidden rounded-xl border border-zinc-200">
              <table className="w-full text-[13px]">
                <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-[10.5px] font-semibold uppercase tracking-wider text-zinc-500">
                  <tr><th className="px-4 py-2.5">Сервис</th><th className="px-4 py-2.5">Порт</th><th className="px-4 py-2.5">URL</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <Row name="Web (Next.js)" port="3000" url="http://localhost:3000" />
                  <Row name="API (NestJS)" port="4000" url="http://localhost:4000" />
                  <Row name="Postgres" port="5433" url="postgres://localhost:5433" />
                  <Row name="Redis" port="6380" url="redis://localhost:6380" />
                  <Row name="MinIO (S3)" port="9002" url="http://localhost:9002" />
                  <Row name="MinIO Console" port="9003" url="http://localhost:9003" />
                </tbody>
              </table>
            </div>
            <p className="text-[12.5px] text-zinc-500">
              Порты Postgres/Redis/MinIO смещены, чтобы не конфликтовать с другими локальными проектами.
              Внутри Docker-сети сервисы видят друг друга по дефолтным портам.
            </p>
          </Section>

          <Section id="database" icon={Database} title="База данных и сиды">
            <p>Prisma-схема: <Mono>packages/database/prisma/schema.prisma</Mono>. Основные модели:</p>
            <ul>
              <li><b>User</b>, <b>Tenant</b>, <b>Membership</b> — пользователи и принадлежность к тенантам.</li>
              <li><b>Plan</b>, <b>Subscription</b>, <b>Invoice</b> — биллинг.</li>
              <li><b>Project</b>, <b>Page</b>, <b>MobileConfig</b>, <b>Domain</b> — сами бизнесы.</li>
              <li><b>Customer</b>, <b>CrmDeal</b>, <b>Order</b> — CRM.</li>
              <li><b>AuditEvent</b>, <b>AnalyticsEvent</b> — аудит и аналитика.</li>
            </ul>
            <p>RLS (row-level security) включён на уровне Postgres: каждый запрос автоматически фильтруется по <Mono>tenantId</Mono> из контекста сессии. Bypass — только для seed/admin.</p>
            <Code>
{`# Применить схему вручную
pnpm --filter @nexora/database prisma db push

# Перезапустить сиды
pnpm --filter @nexora/database run seed

# Открыть Prisma Studio
pnpm --filter @nexora/database prisma studio`}
            </Code>
          </Section>

          <Section id="cli" icon={Terminal} title="Полезные команды">
            <Code>
{`# Запустить всё
./scripts/start.sh

# Только dev-серверы (контейнеры должны уже работать)
pnpm dev

# Только web / только api / только воркеры
pnpm --filter @nexora/web dev
pnpm --filter @nexora/api dev
pnpm --filter @nexora/worker dev

# Типы и линт
pnpm -r typecheck
pnpm -r lint

# Собрать shared-пакет (нужно после правок в packages/shared)
pnpm --filter @nexora/shared build`}
            </Code>
          </Section>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-[15px] font-semibold text-zinc-900">Что-то не работает?</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] text-zinc-700">
              <li>Убедитесь, что Docker запущен (<Mono>docker ps</Mono>).</li>
              <li>Проверьте, что порты 3000, 4000, 5433, 6380, 9002 свободны.</li>
              <li>Если БД ругается — пересиньте: <Mono>./scripts/stop.sh --wipe && ./scripts/start.sh</Mono>.</li>
              <li>Если фронт показывает старое — перезапустите <Mono>pnpm dev</Mono>.</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ id, icon: Icon, title, children }: { id: string; icon: any; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700">
          <Icon className="size-4" />
        </span>
        <h2 className="text-[20px] font-semibold tracking-tight text-zinc-900">{title}</h2>
      </div>
      <div className="space-y-3 text-[13.5px] leading-relaxed text-zinc-700 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_b]:font-semibold [&_b]:text-zinc-900 [&_p]:my-0">
        {children}
      </div>
    </section>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return <code className="rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-700">{children}</code>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="not-prose overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-[12px] leading-relaxed text-zinc-100">
      <code>{children}</code>
    </pre>
  );
}

function Cred({ role, host, email, password, hint }: { role: string; host: string; email: string; password: string; hint: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-500">{role}</div>
      <div className="mt-2 space-y-1.5 text-[12.5px]">
        <div className="flex items-center gap-2"><span className="w-16 text-zinc-500">URL:</span> <Mono>{host}</Mono></div>
        <div className="flex items-center gap-2"><span className="w-16 text-zinc-500">Email:</span> <Mono>{email}</Mono></div>
        <div className="flex items-center gap-2"><span className="w-16 text-zinc-500">Пароль:</span> <Mono>{password}</Mono></div>
      </div>
      <p className="mt-3 text-[11.5px] text-zinc-500">{hint}</p>
    </div>
  );
}

function Row({ name, port, url }: { name: string; port: string; url: string }) {
  return (
    <tr>
      <td className="px-4 py-2 font-medium text-zinc-900">{name}</td>
      <td className="px-4 py-2 font-mono text-[12px] text-zinc-700">{port}</td>
      <td className="px-4 py-2 font-mono text-[12px] text-zinc-500">{url}</td>
    </tr>
  );
}
