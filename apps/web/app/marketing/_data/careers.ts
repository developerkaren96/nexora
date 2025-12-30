export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: "Полная" | "Контракт";
  salary: string;
  remote: boolean;
  summary: string;
  what: string[];
  need: string[];
  nice: string[];
  process: string[];
};

export const JOBS: Job[] = [
  {
    slug: "senior-backend-engineer",
    title: "Senior Backend Engineer (Node / NestJS)",
    team: "Engineering",
    location: "Берлин / Удалённо",
    type: "Полная",
    salary: "€90–130k",
    remote: true,
    summary: "Вы будете работать над core-API Nexora: multi-tenancy, billing, проектами и автоматизациями. Стек — TypeScript, NestJS, PostgreSQL, Redis, Kafka.",
    what: [
      "Проектировать и реализовывать новые домены API.",
      "Поддерживать и развивать multi-tenant архитектуру (row-level security, изоляция).",
      "Оптимизировать узкие места: запросы, очереди, фоновые задачи.",
      "Ревьюить код коллег, наставлять middle-инженеров.",
    ],
    need: [
      "5+ лет в backend, из них 3+ на Node.js (NestJS / Fastify / Express).",
      "Глубокое понимание PostgreSQL: индексы, EXPLAIN, разделы, репликация.",
      "Опыт работы с очередями (BullMQ, Kafka, RabbitMQ) в продакшне.",
      "Английский B2+ (вся документация и ревью на английском).",
    ],
    nice: [
      "Опыт многотенантных SaaS-платформ.",
      "Знакомство с Kubernetes и Helm.",
      "Open-source проекты на GitHub.",
    ],
    process: [
      "Скрин с рекрутёром — 30 минут.",
      "Тех-интервью с тимлидом — 90 минут, реальная задача.",
      "Системный дизайн с CTO — 60 минут.",
      "Финал с командой — 45 минут.",
    ],
  },
  {
    slug: "senior-flutter-engineer",
    title: "Senior Flutter Engineer (iOS / Android)",
    team: "Engineering",
    location: "Удалённо · CET ±3",
    type: "Полная",
    salary: "€85–125k",
    remote: true,
    summary: "Вы будете развивать наш Flutter-фреймворк, который автоматически собирает приложения для тысяч клиентских проектов из шаблонов.",
    what: [
      "Развивать платформу авто-генерации приложений (Flutter + Dart).",
      "Реализовывать новые шаблоны экранов и компоненты.",
      "Поддерживать пайплайн сборки и публикации в App Store / Google Play.",
      "Снижать время сборки и размер бандла.",
    ],
    need: [
      "5+ лет mobile (из них 2+ на Flutter в продакшне).",
      "Знание особенностей iOS и Android (push, deep links, payments).",
      "Опыт публикации в обоих сторах.",
      "Английский B2+.",
    ],
    nice: [
      "Опыт code-generation и build-time оптимизаций.",
      "Знание Swift / Kotlin для нативных модулей.",
    ],
    process: [
      "Скрин с рекрутёром.",
      "Live-coding на Flutter — 90 минут.",
      "Архитектура — 60 минут.",
      "Финал с командой.",
    ],
  },
  {
    slug: "infrastructure-engineer",
    title: "Infrastructure Engineer (K8s, Postgres)",
    team: "Engineering",
    location: "Берлин / Лиссабон",
    type: "Полная",
    salary: "€95–135k",
    remote: false,
    summary: "Вы будете отвечать за инфраструктуру, на которой работают 24 000+ клиентских проектов: Kubernetes, Aurora PostgreSQL, CI/CD, observability.",
    what: [
      "Развивать кластеры EKS, helm-чарты, GitOps-пайплайны.",
      "Оптимизировать стоимость и производительность БД.",
      "Развивать observability: метрики, трейсы, логи.",
      "Участвовать в on-call ротации (1 неделя из 6).",
    ],
    need: [
      "5+ лет SRE / DevOps.",
      "Production-опыт с Kubernetes (>2 года), PostgreSQL, Terraform.",
      "Понимание сетей, безопасности, IAM в AWS.",
    ],
    nice: ["FinOps опыт.", "Доклады на конференциях (KubeCon, AWS reInvent)."],
    process: ["Скрин.", "Тех-интервью — incident response сценарий.", "Системный дизайн.", "Финал."],
  },
  {
    slug: "product-designer",
    title: "Product Designer (Multi-tenant SaaS)",
    team: "Design",
    location: "Удалённо · EMEA",
    type: "Полная",
    salary: "€75–105k",
    remote: true,
    summary: "Вы будете дизайнить как наш core-дашборд для предпринимателей, так и шаблоны клиентских сайтов и приложений. Высокая ответственность за визуальный язык.",
    what: [
      "Дизайнить и прототипировать новые фичи дашборда.",
      "Развивать дизайн-систему (Figma + код).",
      "Создавать новые шаблоны бизнесов.",
      "Тестировать с реальными пользователями.",
    ],
    need: [
      "4+ года в product-дизайне SaaS.",
      "Сильное портфолио комплексных интерфейсов.",
      "Опыт работы с дизайн-системами.",
    ],
    nice: ["Знание Tailwind и базовый HTML/CSS.", "Опыт мобильного дизайна."],
    process: ["Скрин.", "Portfolio review.", "Дизайн-задание (4 часа).", "Финал."],
  },
  {
    slug: "product-manager-growth",
    title: "Product Manager — Growth",
    team: "Product",
    location: "Берлин",
    type: "Полная",
    salary: "€90–120k",
    remote: false,
    summary: "Вы будете отвечать за метрики активации и удержания: онбординг, time-to-first-value, конверсия пробного периода в платных.",
    what: [
      "Формулировать гипотезы и запускать эксперименты.",
      "Работать с дашбордами (Mixpanel, dbt) и SQL.",
      "Координировать команду из 3 инженеров и дизайнера.",
    ],
    need: [
      "3+ года в Product (growth-фокус).",
      "Сильные аналитические навыки, SQL.",
      "Опыт SaaS с самостоятельной регистрацией.",
    ],
    nice: ["Опыт работы в стартапе seed/series A.", "Знание поведения SMB-сегмента."],
    process: ["Скрин.", "Case study — 60 минут.", "Метрики и SQL — 45 минут.", "Финал."],
  },
  {
    slug: "performance-marketing-manager",
    title: "Performance Marketing Manager",
    team: "Marketing",
    location: "Удалённо",
    type: "Полная",
    salary: "€60–85k",
    remote: true,
    summary: "Вы будете отвечать за платный трафик: Google Ads, Meta, YouTube. Бюджет — €120k/мес, цель — увеличить активации x2 за полугодие.",
    what: [
      "Запуск и оптимизация кампаний в Google Ads, Meta, TikTok, YouTube.",
      "A/B тестирование креативов и лендингов.",
      "Атрибуция и работа с unit-экономикой.",
    ],
    need: ["3+ года в performance.", "Опыт с CAC < LTV/3.", "Excel / SQL."],
    nice: ["Опыт работы с SMB / SaaS.", "Знание русского и английского."],
    process: ["Скрин.", "Case study с реальными цифрами.", "Финал."],
  },
  {
    slug: "content-lead",
    title: "Content Lead (RU / EN)",
    team: "Marketing",
    location: "Удалённо · CIS",
    type: "Полная",
    salary: "€55–80k",
    remote: true,
    summary: "Вы будете отвечать за наш блог, документацию, рассылки и видео-контент. От стратегии до текста.",
    what: [
      "Стратегия контента: какие темы и в каком формате.",
      "Писать и редактировать материалы (RU + EN).",
      "Работать с гостевыми авторами и фрилансерами.",
    ],
    need: [
      "5+ лет в контенте, идеально в B2B / SaaS.",
      "Сильное портфолио лонгридов и кейсов.",
      "Свободный английский (письменный).",
    ],
    nice: ["Опыт видео и подкастов.", "SEO-навыки."],
    process: ["Скрин.", "Тестовое — статья на 600 слов.", "Финал."],
  },
  {
    slug: "account-executive-ee",
    title: "Account Executive — Eastern Europe",
    team: "Sales",
    location: "Тбилиси / Ереван",
    type: "Полная",
    salary: "€50–70k + бонусы",
    remote: false,
    summary: "Вы будете развивать наши продажи в Восточной Европе — от первого контакта до закрытия сделок на $5k–$50k ACV.",
    what: [
      "Демо для входящих лидов и outbound в SMB / Mid-Market.",
      "Ведение pipeline от discovery до closing.",
      "Сотрудничество с CS и onboarding.",
    ],
    need: ["3+ года в SaaS-продажах.", "Track record выполнения квот.", "Русский C1, английский B2."],
    nice: ["Опыт работы с SMB.", "Знание украинского, грузинского, армянского."],
    process: ["Скрин.", "Mock-demo — 45 минут.", "Финал с VP Sales."],
  },
  {
    slug: "customer-success-manager-ru",
    title: "Customer Success Manager (RU)",
    team: "Customer Success",
    location: "Удалённо",
    type: "Полная",
    salary: "€40–55k",
    remote: true,
    summary: "Вы будете помогать русскоязычным клиентам успешно запустить и развивать их бизнес на Nexora. От онбординга до апселла.",
    what: [
      "Онбординг новых клиентов (звонки, чек-листы).",
      "Quarterly Business Reviews для топ-аккаунтов.",
      "Снижение churn, выявление возможностей апсейла.",
    ],
    need: ["2+ года в CS или поддержке SaaS.", "Эмпатия и терпение.", "Русский C1, английский B1."],
    nice: ["Опыт работы с малым бизнесом.", "Технический бэкграунд."],
    process: ["Скрин.", "Role-play с клиентом.", "Финал."],
  },
];
