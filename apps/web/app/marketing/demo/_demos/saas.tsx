import { ArrowUpRight, Check, Terminal, Activity, Database, Lock, Workflow, Gauge } from "lucide-react";

/* QUILL ANALYTICS — dark technical SaaS, mono accents, data-dense.
   Palette: ink #0a0b0d, paper #fafaf7, ash #1a1c20, mint #7fffb0, citrus #d9ff3d.
   Type: Inter Tight + JetBrains Mono. Inspired by Linear/Vercel restraint. */

export const SaasMeta = {
  brand: "Quill Analytics",
  description: "Демо: SaaS-аналитика продукта с тарифами, метриками и техническим тоном.",
  color: "#7fffb0",
};

const METRICS = [
  { k: "p99 latency", v: "84ms",    d: "−12% за месяц" },
  { k: "Events/sec",  v: "1.4M",    d: "пиково 3.1M" },
  { k: "Uptime SLA",  v: "99.99%",  d: "12 мес скользящ." },
  { k: "Регионов",    v: "11",      d: "Москва, Frankfurt..." },
];

const PLANS = [
  { name: "Indie",     price: "0",     unit: "₽ / мес", desc: "Для пет-проектов и стартапов до 100K событий.", cta: "Начать бесплатно", featured: false,
    inc: ["100K events / мес", "1 проект, 3 сидов", "Дашборды, funnels", "Сообщество в Slack"] },
  { name: "Team",      price: "4 900", unit: "₽ / мес", desc: "Когда уже считаете деньги и пишете runbooks.", cta: "14 дней триал", featured: true,
    inc: ["10M events / мес", "Неогр. проектов", "Алерты, аномалии", "SSO + audit log", "Email-саппорт ≤ 4ч"] },
  { name: "Scale",     price: "Контакт", unit: "договор", desc: "Под нагрузку, под комплаенс, под ваш закон 152-ФЗ.", cta: "Запросить демо", featured: false,
    inc: ["Безлим events", "On-prem / VPC", "Свои регионы", "SLA 99.99%, штрафы", "Solutions-инженер"] },
];

const LOG = [
  { t: "12:41:08", lvl: "INFO",  msg: "deploy quill-ingest v4.18.0 → prod-eu (32 pods)" },
  { t: "12:41:11", lvl: "OK",    msg: "healthcheck passed · p99=78ms · error_rate=0.001%" },
  { t: "12:41:42", lvl: "INFO",  msg: "autoscaler: +4 pods (queue depth 3.2k → 9.8k)" },
  { t: "12:42:03", lvl: "WARN",  msg: "tenant=acme spike 8x baseline · routing to dedicated lane" },
  { t: "12:42:19", lvl: "OK",    msg: "anomaly resolved · backpressure 0 · queue depth 1.1k" },
];

export function SaasDemo() {
  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#fafaf7]" style={{ fontFamily: '"Inter Tight", "Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');`}</style>

      {/* Subtle grid overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* NAV */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 text-[16px] font-semibold tracking-tight">
            <span className="grid size-6 place-items-center bg-[#7fffb0] text-[#0a0b0d]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Q</span>
            <span>Quill</span>
            <span className="ml-1 text-[11px] uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: '"JetBrains Mono", monospace' }}>analytics</span>
          </a>
          <nav className="hidden gap-7 text-[13px] text-white/70 md:flex">
            <a href="#product">Продукт</a>
            <a href="#metrics">Платформа</a>
            <a href="#pricing">Тарифы</a>
            <a href="#docs">Документация</a>
            <a href="#changelog">Changelog</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#" className="hidden text-[13px] text-white/70 hover:text-white md:block">Войти →</a>
            <a href="#pricing" className="inline-flex items-center gap-1 bg-white px-3.5 py-2 text-[13px] font-medium text-[#0a0b0d] hover:bg-[#7fffb0]">
              Начать <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/60" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                <span className="size-1.5 rounded-full bg-[#7fffb0]" /> v4.18 · SOC 2 Type II
              </div>
              <h1 className="mt-6 text-[clamp(48px,7vw,92px)] font-semibold leading-[0.95] tracking-[-0.035em]">
                Продуктовая аналитика
                <br />
                <span className="text-white/40">без</span> компромиссов
                <br />
                <span className="text-[#7fffb0]">с приватностью.</span>
              </h1>
              <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/65">
                Quill — событийная аналитика с собственным OLAP-движком. Self-hosted или managed, sub-секундные запросы по миллиардам событий, открытая схема. Без cookie-баннеров, без перепродажи данных.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <a href="#pricing" className="inline-flex items-center gap-1.5 bg-[#7fffb0] px-5 py-2.5 text-[13px] font-medium text-[#0a0b0d] hover:bg-white">
                  Начать бесплатно <ArrowUpRight className="size-3.5" />
                </a>
                <a href="#metrics" className="inline-flex items-center gap-1.5 border border-white/15 px-5 py-2.5 text-[13px] text-white/80 hover:border-white/40">
                  Live-демо данных
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/35" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                <span>Доверяют:</span>
                <span>WILDBERRIES</span>
                <span>TINKOFF</span>
                <span>OZON</span>
                <span>AVITO</span>
              </div>
            </div>

            {/* Terminal card */}
            <div className="col-span-12 lg:col-span-5">
              <div className="border border-white/10 bg-[#0e1014] shadow-[0_30px_80px_-20px_rgba(127,255,176,0.12)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px] text-white/40" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-white/15" />
                    <span className="size-2 rounded-full bg-white/15" />
                    <span className="size-2 rounded-full bg-white/15" />
                  </div>
                  <span>quill ~ console</span>
                  <Terminal className="size-3.5" />
                </div>
                <div className="px-4 py-5 text-[12.5px] leading-[1.65]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  <div className="text-white/40">$ <span className="text-[#d9ff3d]">quill</span> query --last 7d</div>
                  <div className="mt-1 text-white/85">
                    <span className="text-[#7fffb0]">SELECT</span> event, <span className="text-[#7fffb0]">count</span>(*) <span className="text-[#7fffb0]">AS</span> n
                  </div>
                  <div className="text-white/85"><span className="text-[#7fffb0]">FROM</span> events</div>
                  <div className="text-white/85"><span className="text-[#7fffb0]">WHERE</span> ts &gt; now() − <span className="text-[#d9ff3d]">7d</span></div>
                  <div className="text-white/85"><span className="text-[#7fffb0]">GROUP BY</span> 1 <span className="text-[#7fffb0]">ORDER BY</span> n <span className="text-[#7fffb0]">DESC</span> <span className="text-[#7fffb0]">LIMIT</span> <span className="text-[#d9ff3d]">5</span>;</div>
                  <div className="mt-3 text-white/35">— scanned 1.42B rows in 0.184s</div>
                  <div className="mt-3 border-l-2 border-[#7fffb0]/40 pl-3 text-white/85">
                    <div className="flex justify-between"><span>checkout.completed</span><span className="text-[#7fffb0]">812 449</span></div>
                    <div className="flex justify-between"><span>signup.finished</span><span className="text-[#7fffb0]">644 102</span></div>
                    <div className="flex justify-between"><span>page.viewed</span><span className="text-[#7fffb0]">412 988</span></div>
                    <div className="flex justify-between"><span>session.start</span><span className="text-[#7fffb0]">298 117</span></div>
                    <div className="flex justify-between"><span>error.thrown</span><span className="text-[#7fffb0]">11 023</span></div>
                  </div>
                  <div className="mt-3 text-white/40">$ <span className="animate-pulse text-[#7fffb0]">▌</span></div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-px bg-white/[0.06] text-[11px]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {[
                  ["scanned",  "1.42B"],
                  ["latency",  "184ms"],
                  ["cost",     "$0.0009"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-[#0a0b0d] px-3 py-2">
                    <div className="text-white/40">{k}</div>
                    <div className="text-white">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section id="metrics" className="relative z-10 border-b border-white/[0.06] bg-[#0e1014]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px bg-white/[0.06] px-6 md:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.k} className="bg-[#0e1014] p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: '"JetBrains Mono", monospace' }}>{m.k}</div>
              <div className="mt-2 text-[40px] font-semibold leading-none tracking-tight text-[#7fffb0]">{m.v}</div>
              <div className="mt-2 text-[12px] text-white/50">{m.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT FEATURES — asymmetric */}
      <section id="product" className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 mb-8 md:col-span-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#7fffb0]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>// platform</div>
              <h2 className="mt-3 text-[44px] font-semibold leading-[1.02] tracking-[-0.02em]">
                Один движок. Любая шкала.
                <br />
                <span className="text-white/40">Никакого vendor-lock-а.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-[15px] leading-relaxed text-white/65">
                Quill пишет в свой колоночный store с дедупликацией и компрессией zstd. Можно крутить у нас, можно у себя — формат данных один и тот же, экспорт в Parquet в один клик, миграция в любую сторону без переписывания запросов.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-6">
            <Feature span="md:col-span-7" icon={<Activity />} title="Realtime аномалии" body="Алерты на изменение распределений, не только пороги. Подписка через Slack, PagerDuty, webhook — без отдельной подписки на «AI-tier»." />
            <Feature span="md:col-span-5" icon={<Database />} title="Свои данные" body="Self-hosted или VPC. Шифрование в покое и в полёте, ключи в вашем KMS, audit-лог на каждый запрос." />
            <Feature span="md:col-span-5" icon={<Workflow />} title="SDK без боли" body="JS, Swift, Kotlin, Flutter, Go, Python — типизированные клиенты, авто-батчинг, оффлайн-очередь." />
            <Feature span="md:col-span-7" icon={<Gauge />} title="Запросы за миллисекунды" body="Колоночный store + векторный движок. Тяжёлые funnel-запросы за миллиарды строк отдают за десятки мс — без матвью и предагрегатов." />
          </div>
        </div>
      </section>

      {/* LIVE LOG */}
      <section className="relative z-10 border-b border-white/[0.06] bg-[#0e1014]">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#7fffb0]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>// live · prod-eu</div>
              <h2 className="mt-3 text-[36px] font-semibold leading-tight tracking-tight">
                Прозрачность вместо маркетинга.
              </h2>
              <p className="mt-4 text-[14px] text-white/60">
                Скриншот реального деплоя из нашего собственного кластера. Public status: <a href="#" className="text-[#7fffb0] underline-offset-4 hover:underline">status.quill.dev</a>.
              </p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="border border-white/10 bg-[#0a0b0d] p-1 text-[12.5px]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {LOG.map((l) => (
                  <div key={l.t} className="flex gap-3 border-b border-white/[0.05] px-3 py-2 last:border-b-0">
                    <span className="text-white/40">{l.t}</span>
                    <span className={`w-12 ${l.lvl === "OK" ? "text-[#7fffb0]" : l.lvl === "WARN" ? "text-[#d9ff3d]" : "text-white/60"}`}>{l.lvl}</span>
                    <span className="flex-1 text-white/80">{l.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#7fffb0]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>// pricing</div>
              <h2 className="mt-2 text-[44px] font-semibold leading-[1.02] tracking-[-0.02em]">
                Платите за объём, а не за «места».
              </h2>
            </div>
            <div className="hidden text-right text-[12px] text-white/50 md:block">Все цены без НДС / биллинг в месяц</div>
          </div>
          <div className="grid grid-cols-1 gap-px bg-white/[0.08] md:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.name} className={`${p.featured ? "bg-gradient-to-b from-[#0f1518] to-[#0a0b0d] ring-1 ring-[#7fffb0]/40" : "bg-[#0a0b0d]"} p-7`}>
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-semibold uppercase tracking-[0.16em]">{p.name}</div>
                  {p.featured && <span className="bg-[#7fffb0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a0b0d]">popular</span>}
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-[48px] font-semibold leading-none tracking-tight">{p.price}</span>
                  <span className="text-[12px] uppercase tracking-[0.16em] text-white/45" style={{ fontFamily: '"JetBrains Mono", monospace' }}>{p.unit}</span>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-white/60">{p.desc}</p>
                <a href="#" className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 px-4 py-3 text-[13px] font-medium ${p.featured ? "bg-[#7fffb0] text-[#0a0b0d] hover:bg-white" : "border border-white/15 text-white hover:border-[#7fffb0] hover:text-[#7fffb0]"}`}>
                  {p.cta} <ArrowUpRight className="size-3.5" />
                </a>
                <ul className="mt-7 space-y-2 text-[13px] text-white/75">
                  {p.inc.map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-[#7fffb0]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="relative z-10 border-b border-white/[0.06] bg-[#0e1014]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-8 px-6 py-20">
          <div className="col-span-12 md:col-span-6">
            <Lock className="size-7 text-[#7fffb0]" />
            <h2 className="mt-4 text-[36px] font-semibold leading-tight tracking-tight">Не отдадим данные. Никому.</h2>
            <p className="mt-4 max-w-md text-[14px] text-white/60">
              SOC 2 Type II, ISO 27001, 152-ФЗ. Шифрование AES-256 в покое, TLS 1.3 в полёте, ваши ключи в вашем KMS. Никакой телеметрии в фоне, исходники SDK на GitHub.
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-px bg-white/[0.08] md:col-span-6">
            {["SOC 2 II", "ISO 27001", "152-ФЗ", "GDPR", "HIPAA", "VPC-only"].map((b) => (
              <div key={b} className="bg-[#0e1014] px-5 py-6 text-center text-[12px] uppercase tracking-[0.18em] text-white/70" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-14">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-2 text-[16px] font-semibold">
                <span className="grid size-6 place-items-center bg-[#7fffb0] text-[#0a0b0d]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Q</span>
                Quill
              </div>
              <p className="mt-4 max-w-xs text-[13px] text-white/55">Производственная аналитика для команд, которым нужно знать «почему», а не только «сколько».</p>
            </div>
            {[
              { h: "Продукт", l: ["Платформа", "Интеграции", "Changelog", "Roadmap"] },
              { h: "Ресурсы", l: ["Документация", "Гайды", "Status", "Сообщество"] },
              { h: "Компания", l: ["О нас", "Карьера", "Контакты", "Пресса"] },
            ].map((c) => (
              <div key={c.h} className="col-span-6 md:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">{c.h}</div>
                <ul className="mt-3 space-y-2 text-[13px] text-white/75">{c.l.map((x) => <li key={x}><a href="#">{x}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-5 text-[11px] text-white/40" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            <span>© 2026 Quill Labs · Inc.</span>
            <span>built in Berlin & Belgrade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ span, icon, title, body }: { span: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className={`col-span-12 ${span} group border border-white/[0.08] bg-[#0e1014] p-6 hover:border-[#7fffb0]/40`}>
      <div className="flex size-9 items-center justify-center border border-white/10 text-[#7fffb0] [&>svg]:size-4">{icon}</div>
      <h3 className="mt-5 text-[20px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{body}</p>
    </div>
  );
}
