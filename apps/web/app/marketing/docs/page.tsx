import Link from "next/link";
import {
  Compass, UserPlus, Rocket, Palette, Globe2, Users, BarChart3,
  Smartphone, CreditCard, Shield, HelpCircle, ArrowRight, BookOpen, Sparkles,
} from "lucide-react";

export const metadata = { title: "Документация — как работать с Nexora" };

const SECTIONS = [
  { id: "overview",   title: "Что такое Nexora",            icon: Compass },
  { id: "signup",     title: "Регистрация и вход",          icon: UserPlus },
  { id: "create",     title: "Создание первого проекта",    icon: Rocket },
  { id: "brand",      title: "Брендинг и контент",          icon: Palette },
  { id: "domain",     title: "Подключение домена",          icon: Globe2 },
  { id: "crm",        title: "CRM и клиенты",               icon: Users },
  { id: "analytics",  title: "Аналитика и метрики",         icon: BarChart3 },
  { id: "mobile",     title: "Мобильное приложение",        icon: Smartphone },
  { id: "billing",    title: "Биллинг и тарифы",            icon: CreditCard },
  { id: "security",   title: "Безопасность данных",         icon: Shield },
  { id: "faq",        title: "Частые вопросы",              icon: HelpCircle },
];

export default function UserDocs() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Hero />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            <BookOpen className="size-3.5" /> Содержание
          </div>
          <nav className="space-y-0.5 text-[13px]">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2.5 rounded-md px-3 py-2 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
              >
                <s.icon className="size-3.5 text-zinc-400 group-hover:text-indigo-600" />
                <span>{s.title}</span>
              </a>
            ))}
          </nav>
          <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Нужна помощь?</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-600">
              Напишите нам — отвечаем в течение часа в рабочее время.
            </p>
            <a
              href="mailto:support@nexora.app"
              className="mt-3 inline-flex h-8 items-center gap-1 rounded-md bg-zinc-900 px-3 text-[11.5px] font-medium text-white hover:bg-zinc-800"
            >
              Связаться с поддержкой <ArrowRight className="size-3" />
            </a>
          </div>
        </aside>

        <div className="space-y-14">
          {/* Overview */}
          <Section id="overview" icon={Compass} title="Что такое Nexora">
            <p>
              Nexora — это платформа, которая разворачивает <b>готовый цифровой бизнес</b> из одного мастера.
              Вы выбираете тип бизнеса, заполняете название и цвет — мы генерируем сайт, мобильное приложение,
              CRM, админ-панель и подключаем поддомен с SSL.
            </p>
            <CalloutGrid
              items={[
                ["Сайт", "Брендированный SSR-сайт на поддомене или вашем домене"],
                ["Приложение", "Flutter-приложение для iOS и Android"],
                ["CRM", "Клиенты, сделки и заказы с первого дня"],
                ["Аналитика", "Просмотры, продажи и удержание в реальном времени"],
              ]}
            />
          </Section>

          {/* Signup */}
          <Section id="signup" icon={UserPlus} title="Регистрация и вход">
            <Steps
              items={[
                ["Создайте аккаунт", "Зайдите на nexora.app и нажмите «Начать». Введите email и пароль — мы отправим письмо с подтверждением."],
                ["Подтвердите почту", "Нажмите на ссылку в письме — после этого активируется 14-дневный бесплатный пробный период."],
                ["Войдите в дашборд", "После подтверждения вы попадёте на app.nexora.app — это ваш личный кабинет, откуда вы управляете всеми бизнесами."],
              ]}
            />
            <Note>
              Если письмо не пришло — проверьте спам и нажмите «Отправить заново» на странице входа.
            </Note>
          </Section>

          {/* Create */}
          <Section id="create" icon={Rocket} title="Создание первого проекта">
            <p>
              «Проект» в Nexora — это один цельный бизнес: сайт, приложение, CRM и поддомен. У одного аккаунта может
              быть несколько проектов (например, если у вас сеть кафе и салон красоты).
            </p>
            <Steps
              items={[
                ["Выберите тип бизнеса", "12 готовых шаблонов: интернет-магазин, ресторан, салон красоты, клиника, юр. фирма и другие. Каждый шаблон уже включает нужные страницы и поля CRM."],
                ["Назовите проект", "Название — то, как вас увидит клиент. Слаг — это адрес в интернете (например, acme → acme.nexora.app)."],
                ["Брендирование", "Загрузите логотип и выберите фирменный цвет. Цвет автоматически применится к сайту, приложению и кнопкам."],
                ["Запустите развёртывание", "Мы параллельно создадим сайт, приложение, CRM, поддомен и выпустим SSL-сертификат. Обычно занимает 2–5 минут."],
              ]}
            />
            <p>
              Пока проект разворачивается, вы видите прогресс-чеклист в дашборде — каждый шаг помечается зелёной
              галочкой, когда готов.
            </p>
          </Section>

          {/* Brand */}
          <Section id="brand" icon={Palette} title="Брендинг и контент">
            <p>Раздел «Сайт» внутри проекта позволяет редактировать:</p>
            <ul>
              <li><b>Главную страницу</b> — заголовок, подзаголовок, hero-картинка, кнопки призыва.</li>
              <li><b>Каталог / меню / услуги</b> — в зависимости от типа бизнеса.</li>
              <li><b>Страницы «О нас», «Контакты»</b> — текст, контакты, карта.</li>
              <li><b>SEO</b> — заголовки и описания для поисковиков, OG-картинка.</li>
              <li><b>Тему</b> — палитра, шрифт, скругление углов.</li>
            </ul>
            <p>Все изменения публикуются мгновенно — без передеплоев и кэшей.</p>
          </Section>

          {/* Domain */}
          <Section id="domain" icon={Globe2} title="Подключение собственного домена">
            <p>
              По умолчанию проект доступен на поддомене <Mono>your-slug.nexora.app</Mono>. Чтобы подключить свой
              домен (например, <Mono>your-shop.com</Mono>):
            </p>
            <Steps
              items={[
                ["Откройте раздел «Домены»", "В дашборде проекта найдите вкладку «Домены» и нажмите «Добавить домен»."],
                ["Добавьте DNS-записи", "Мы покажем вам две записи — CNAME и TXT. Скопируйте их в панель управления вашим доменом (GoDaddy, Cloudflare, REG.ru и др.)."],
                ["Дождитесь верификации", "Обычно DNS обновляется за 5–30 минут. Как только мы получим записи — статус станет «Активен» и автоматически выпустится SSL."],
              ]}
            />
            <Note variant="info">
              Подключение собственного домена доступно с тарифа <b>Business</b>. SSL-сертификаты — Let's Encrypt,
              продлеваются автоматически.
            </Note>
          </Section>

          {/* CRM */}
          <Section id="crm" icon={Users} title="CRM и работа с клиентами">
            <p>В разделе CRM есть всё, чтобы вести продажи:</p>
            <CalloutGrid
              items={[
                ["Клиенты", "База контактов: имя, email, телефон, история покупок"],
                ["Воронка", "Канбан со стадиями: новый → контакт → сделка → закрыт"],
                ["Заказы", "Все покупки и оплаты — статусы, суммы, чеки"],
                ["Сегменты", "Фильтры по поведению: вернувшиеся, неактивные, VIP"],
              ]}
            />
            <p>
              Все клиенты, которые регистрируются на сайте или в приложении, автоматически появляются в CRM.
              Заказы и платежи тоже синхронизированы.
            </p>
          </Section>

          {/* Analytics */}
          <Section id="analytics" icon={BarChart3} title="Аналитика и метрики">
            <p>В дашборде «Аналитика» вы видите ключевые показатели бизнеса:</p>
            <ul>
              <li><b>Трафик</b> — уникальные посетители, источники, страны, устройства.</li>
              <li><b>Конверсия</b> — что покупают, на каком шаге уходят.</li>
              <li><b>Выручка</b> — MRR (для подписок), средний чек, повторные покупки.</li>
              <li><b>Удержание</b> — когорты по неделям и месяцам.</li>
            </ul>
            <p>
              Все метрики обновляются в реальном времени — без сторонних счётчиков и cookie-баннеров.
            </p>
          </Section>

          {/* Mobile */}
          <Section id="mobile" icon={Smartphone} title="Мобильное приложение">
            <p>
              Каждому проекту автоматически создаётся брендированное приложение для iOS и Android. Внутри:
            </p>
            <ul>
              <li><b>Каталог / меню</b> — товары или услуги синхронизированы с сайтом.</li>
              <li><b>Корзина и оплата</b> — Apple Pay, Google Pay, банковские карты.</li>
              <li><b>Личный кабинет</b> — заказы, бонусы, профиль.</li>
              <li><b>Push-уведомления</b> — отправляйте напрямую из CRM.</li>
            </ul>
            <p>
              Публикация в App Store и Google Play выполняется в один клик с тарифа <b>Professional</b>.
              Мы поможем оформить аккаунты разработчиков и провести модерацию.
            </p>
          </Section>

          {/* Billing */}
          <Section id="billing" icon={CreditCard} title="Биллинг и тарифы">
            <p>
              На странице «Биллинг» вы видите текущий тариф, использованные лимиты (проекты, домены, хранилище,
              пользователи команды) и историю счетов. Апгрейд тарифа — за один клик.
            </p>
            <CalloutGrid
              items={[
                ["Starter", "$49 / мес — 1 проект, поддомен, 5 GB"],
                ["Business", "$149 / мес — 3 проекта, 1 свой домен, 25 GB"],
                ["Professional", "$399 / мес — 10 проектов, 5 доменов, 100 GB"],
                ["Enterprise", "$999 / мес — безлимитно, SLA, выделенный менеджер"],
              ]}
            />
            <Note>
              Можно отменить подписку в любой момент. Данные доступны для экспорта в течение 30 дней после отмены.
            </Note>
          </Section>

          {/* Security */}
          <Section id="security" icon={Shield} title="Безопасность данных">
            <ul>
              <li><b>Изоляция</b> — данные каждого клиента хранятся в изолированном пространстве (row-level security).</li>
              <li><b>Резервные копии</b> — ежедневные snapshot'ы, хранение 30 дней.</li>
              <li><b>Шифрование</b> — все данные шифруются и при передаче (TLS 1.3), и в покое (AES-256).</li>
              <li><b>2FA</b> — двухфакторная аутентификация по приложению (Authenticator, 1Password).</li>
              <li><b>GDPR</b> — EU-резидентность данных доступна на Professional и Enterprise.</li>
            </ul>
            <p>
              На Enterprise предоставляем DPA (Data Processing Agreement) и SOC 2 Type II отчёт по запросу.
            </p>
          </Section>

          {/* FAQ */}
          <Section id="faq" icon={HelpCircle} title="Частые вопросы">
            <Faq
              items={[
                ["Сколько занимает запуск нового проекта?", "Обычно меньше 5 минут от заполнения формы до живого сайта, приложения и CRM."],
                ["Можно ли перенести существующий сайт?", "Да — мы импортируем контент с большинства платформ (Tilda, Wix, WordPress, Shopify). Свяжитесь с поддержкой для миграции."],
                ["Можно ли отменить подписку?", "Да, в любой момент в разделе «Биллинг». Доступ сохраняется до конца оплаченного периода, данные экспортируются 30 дней."],
                ["Кому принадлежат данные?", "Вам. Полный экспорт CSV / JSON доступен на всех тарифах, дампы БД — на Enterprise."],
                ["Поддерживаете ли вы Россию / Армению / Беларусь?", "Да, интерфейс на русском, армянском и английском. Принимаем платежи Visa/MC/МИР, поддержка на русском."],
              ]}
            />
          </Section>

          {/* Final CTA */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-8 text-center">
            <Sparkles className="mx-auto size-5 text-indigo-600" />
            <h3 className="mt-2 text-[18px] font-semibold text-zinc-900">Готовы запустить бизнес?</h3>
            <p className="mx-auto mt-1.5 max-w-md text-[13px] text-zinc-600">
              Бесплатный 14-дневный пробный период. Без карты. Отмена в один клик.
            </p>
            <Link
              href="http://app.localhost:3000/register"
              className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-md bg-zinc-900 px-5 text-[13px] font-medium text-white hover:bg-zinc-800"
            >
              Создать аккаунт <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─────────── Pieces ─────────── */

function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-zinc-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-64 opacity-70"
        style={{
          background:
            "radial-gradient(28rem 16rem at 30% 30%, rgba(99,102,241,0.16), transparent), radial-gradient(24rem 14rem at 70% 50%, rgba(168,85,247,0.12), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[12.5px] text-zinc-500 hover:text-zinc-900">← На главную</Link>
          <span className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wider text-indigo-700">
            Документация
          </span>
        </div>
        <h1 className="mt-5 max-w-2xl text-balance text-[36px] font-semibold leading-[1.1] tracking-tight text-zinc-900 md:text-[48px]">
          Как пользоваться Nexora
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600">
          Пошаговое руководство: от регистрации до запуска первого проекта, подключения собственного домена,
          работы с CRM и публикации мобильного приложения.
        </p>
      </div>
    </header>
  );
}

function Section({ id, icon: Icon, title, children }: { id: string; icon: any; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-md border border-indigo-200 bg-indigo-50 text-indigo-700">
          <Icon className="size-4" />
        </span>
        <h2 className="text-[22px] font-semibold tracking-tight text-zinc-900">{title}</h2>
      </div>
      <div className="space-y-4 text-[14px] leading-relaxed text-zinc-700 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_b]:font-semibold [&_b]:text-zinc-900 [&_p]:my-0">
        {children}
      </div>
    </section>
  );
}

function Steps({ items }: { items: [string, string][] }) {
  return (
    <ol className="not-prose space-y-3">
      {items.map(([title, body], i) => (
        <li key={title} className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4">
          <span className="grid size-7 shrink-0 place-items-center rounded-md border border-indigo-200 bg-indigo-50 font-mono text-[12px] font-semibold text-indigo-700">
            {i + 1}
          </span>
          <div>
            <div className="text-[13.5px] font-semibold text-zinc-900">{title}</div>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function CalloutGrid({ items }: { items: [string, string][] }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {items.map(([title, body]) => (
        <div key={title} className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-[13.5px] font-semibold text-zinc-900">{title}</div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-600">{body}</p>
        </div>
      ))}
    </div>
  );
}

function Note({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "info" }) {
  const styles = variant === "info"
    ? "border-indigo-200 bg-indigo-50/60 text-indigo-900"
    : "border-zinc-200 bg-zinc-50 text-zinc-700";
  return (
    <div className={`not-prose rounded-xl border px-4 py-3 text-[13px] leading-relaxed ${styles}`}>
      {children}
    </div>
  );
}

function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {items.map(([q, a], i) => (
        <details key={q} className={`group px-4 py-3.5 ${i > 0 ? "border-t border-zinc-100" : ""}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13.5px] font-medium text-zinc-900">
            <span>{q}</span>
            <span className="text-zinc-400 transition group-open:rotate-45">＋</span>
          </summary>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">{a}</p>
        </details>
      ))}
    </div>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return <code className="rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-700">{children}</code>;
}
