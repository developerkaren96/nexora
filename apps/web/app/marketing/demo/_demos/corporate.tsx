import { ArrowUpRight, Building2, TrendingUp, Globe2, Users, ChevronRight } from "lucide-react";

/* ARAVOX GROUP — institutional, clean, slate/indigo corporate site.
   Palette: porcelain #f4f5f8, ink #0e1424, slate #2c3954, mist #c8d2e3, signal #f25c2b.
   Type: Söhne-like — falling back to system "Inter Tight"; numerals tabular. Quietly confident. */

export const CorporateMeta = {
  brand: "Aravox Group",
  description: "Демо: корпоративный сайт холдинга с подразделениями, репортами и пресс-релизами.",
  color: "#0e1424",
};

const DIVISIONS = [
  { n: "01", name: "Aravox Capital",     desc: "Прямые инвестиции в инфраструктурные проекты СНГ.", region: "MOW / AST / TBS" },
  { n: "02", name: "Aravox Industrial",  desc: "Производство и логистика промышленного оборудования.", region: "MOW / EKB / NSK" },
  { n: "03", name: "Aravox Energy",      desc: "Возобновляемая генерация: ветер, малая гидро, СНГ-ТЭС.", region: "ROV / SCH / KZN" },
  { n: "04", name: "Aravox Real Estate", desc: "Девелопмент офисных и складских кластеров класса A.", region: "MOW / SPB" },
];

const NUMBERS = [
  { k: "Активы под управлением", v: "₽ 412 млрд", note: "+18% YoY" },
  { k: "Сотрудников",            v: "5 240",      note: "в 9 странах" },
  { k: "Проектов завершено",     v: "186",        note: "с 2008 года" },
  { k: "Дивидендная доходность", v: "9.2%",       note: "2025 LTM" },
];

const NEWS = [
  { date: "12 МАЯ 2026", tag: "Сделка",   title: "Aravox Energy закрыла сделку по приобретению 49% Калашиловской ГЭС", body: "Совокупная стоимость — ₽ 18.4 млрд. Закрытие — IV квартал 2026." },
  { date: "30 АПР 2026", tag: "Назначение",title: "Дина Хабибуллина назначена CFO холдинга",                            body: "Ранее — VP Finance в Сибур-Холдинг. Приступает к обязанностям 1 июня." },
  { date: "14 АПР 2026", tag: "Отчёт",    title: "Опубликован годовой ESG-репорт 2025",                                 body: "Сокращение углеродного следа на 23% по отношению к baseline 2019." },
];

export function CorporateDemo() {
  return (
    <div className="min-h-screen bg-[#f4f5f8] text-[#0e1424]" style={{ fontFamily: '"Inter Tight", "Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');`}</style>

      {/* TOP UTILITY */}
      <div className="border-b border-[#0e1424]/8 bg-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-8 py-2 text-[11px] uppercase tracking-[0.18em] text-[#0e1424]/55">
          <div className="flex items-center gap-5">
            <span>MOEX: AVOX <span className="ml-1 text-[#0e1424]">2 184 ₽</span> <span className="text-[#19a48a]">+1.2%</span></span>
            <span className="hidden md:inline">Aravox Group · Холдинг с 2008</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#">Инвесторам</a><a href="#">Пресс-центр</a><a href="#">Карьера</a><a href="#">RU / EN</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-[#0e1424]/8 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-8 py-4">
          <a href="#" className="flex items-center gap-2.5">
            {/* Wordmark */}
            <svg width="28" height="28" viewBox="0 0 28 28" className="text-[#0e1424]"><path d="M14 2 L26 26 H2 Z" fill="currentColor" /><path d="M14 9 L21 22 H7 Z" fill="#f25c2b" /></svg>
            <span className="text-[18px] font-semibold tracking-tight">Aravox</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#0e1424]/55">group</span>
          </a>
          <nav className="hidden gap-7 text-[13.5px] text-[#0e1424]/80 md:flex">
            <a href="#about" className="hover:text-[#0e1424]">О холдинге</a>
            <a href="#divisions" className="hover:text-[#0e1424]">Подразделения</a>
            <a href="#results" className="hover:text-[#0e1424]">Результаты</a>
            <a href="#news" className="hover:text-[#0e1424]">Новости</a>
            <a href="#contact" className="hover:text-[#0e1424]">Контакты</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-1.5 bg-[#0e1424] px-4 py-2 text-[13px] text-white hover:bg-[#2c3954]">
            Связаться <ChevronRight className="size-3.5" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-[#0e1424]/8">
        <div className="mx-auto max-w-[1320px] px-8 pt-24 pb-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-9">
              <div className="text-[12px] uppercase tracking-[0.22em] text-[#0e1424]/55">— годовой отчёт 2025 —</div>
              <h1 className="mt-5 text-[clamp(54px,7vw,108px)] font-medium leading-[0.94] tracking-[-0.025em]">
                Строим инфраструктуру,
                <br />
                которая <span className="text-[#f25c2b]">переживает циклы.</span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-9 lg:col-start-4">
              <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-[#0e1424]/70">
                Aravox Group — диверсифицированный промышленно-инвестиционный холдинг с активами в энергетике, девелопменте, производстве и капитале. Работаем в горизонте 10–25 лет, без шумных IPO и без долгов выше 1.4x EBITDA.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#results" className="inline-flex items-center gap-2 bg-[#0e1424] px-6 py-3 text-[14px] text-white hover:bg-[#2c3954]">
                  Финансовые результаты <ArrowUpRight className="size-4" />
                </a>
                <a href="#" className="inline-flex items-center gap-2 border border-[#0e1424]/20 px-6 py-3 text-[14px] hover:border-[#0e1424]">
                  Годовой отчёт PDF (12 МБ)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Numbers band */}
        <div className="border-t border-[#0e1424]/8 bg-white">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 px-8 md:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <div key={n.k} className={`py-8 ${i !== 3 ? "md:border-r md:border-[#0e1424]/8" : ""} ${i !== 0 ? "md:pl-8" : ""}`}>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#0e1424]/55">{n.k}</div>
                <div className="mt-3 text-[40px] font-medium leading-none tracking-tight tabular-nums">{n.v}</div>
                <div className="mt-2 text-[12px] text-[#19a48a]">{n.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-b border-[#0e1424]/8">
        <div className="mx-auto grid max-w-[1320px] grid-cols-12 gap-10 px-8 py-24">
          <div className="col-span-12 md:col-span-4">
            <div className="text-[12px] uppercase tracking-[0.22em] text-[#0e1424]/55">§ 01 / О холдинге</div>
            <h2 className="mt-3 text-[40px] font-medium leading-tight tracking-tight">Не «экосистема». Группа компаний.</h2>
          </div>
          <div className="col-span-12 grid grid-cols-1 gap-8 md:col-span-8 md:grid-cols-2">
            <p className="text-[15px] leading-relaxed text-[#0e1424]/75">
              Aravox основан в 2008 году как фонд прямых инвестиций. За 18 лет вырос в холдинг с четырьмя операционными вертикалями. Управляемся стратегическим советом из 9 человек; ключевые KPI — возврат на капитал, NPS клиентов и операционная безопасность.
            </p>
            <p className="text-[15px] leading-relaxed text-[#0e1424]/75">
              Не делаем PR ради PR. Не выходим на IPO ради «оценки». Растём за счёт реинвестированной прибыли, M&A с прозрачной synergy-моделью и партнёрств с региональными операторами.
            </p>
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section id="divisions" className="border-b border-[#0e1424]/8 bg-white">
        <div className="mx-auto max-w-[1320px] px-8 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-[#0e1424]/55">§ 02 / Подразделения</div>
              <h2 className="mt-3 text-[44px] font-medium leading-tight tracking-tight">Четыре вертикали. Одно управление.</h2>
            </div>
            <a href="#" className="hidden text-[14px] text-[#0e1424]/70 hover:text-[#0e1424] md:inline">Все компании →</a>
          </div>
          <div className="border-t border-[#0e1424]/10">
            {DIVISIONS.map((d) => (
              <a key={d.n} href="#" className="group grid grid-cols-12 items-center gap-6 border-b border-[#0e1424]/8 py-7 hover:bg-[#f4f5f8]/60">
                <div className="col-span-1 text-[12px] uppercase tracking-[0.22em] text-[#0e1424]/45">{d.n}</div>
                <div className="col-span-12 md:col-span-4">
                  <h3 className="text-[28px] font-medium tracking-tight">{d.name}</h3>
                </div>
                <div className="col-span-12 text-[14px] leading-relaxed text-[#0e1424]/70 md:col-span-5">{d.desc}</div>
                <div className="col-span-6 text-[11px] uppercase tracking-[0.18em] text-[#0e1424]/55 md:col-span-1">{d.region}</div>
                <div className="col-span-6 flex justify-end md:col-span-1">
                  <ArrowUpRight className="size-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / CHART */}
      <section id="results" className="border-b border-[#0e1424]/8">
        <div className="mx-auto grid max-w-[1320px] grid-cols-12 gap-10 px-8 py-24">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[12px] uppercase tracking-[0.22em] text-[#0e1424]/55">§ 03 / Результаты</div>
            <h2 className="mt-3 text-[40px] font-medium leading-tight tracking-tight">EBITDA / 2016 — 2025</h2>
            <p className="mt-5 max-w-md text-[14px] text-[#0e1424]/70">
              Десятилетний график EBITDA, скорректированной на разовые статьи. Без сглаживания, без «pro forma» магии.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 text-[13px]">
              <div className="border-l-2 border-[#f25c2b] pl-3">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-[#0e1424]/55">CAGR 10Y</dt>
                <dd className="text-[24px] font-medium tracking-tight">14.6%</dd>
              </div>
              <div className="border-l-2 border-[#2c3954] pl-3">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-[#0e1424]/55">Margin 25</dt>
                <dd className="text-[24px] font-medium tracking-tight">31.2%</dd>
              </div>
            </dl>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="border border-[#0e1424]/10 bg-white p-6">
              <ChartEbitda />
              <div className="mt-3 grid grid-cols-10 gap-1 text-center text-[10px] uppercase tracking-[0.16em] text-[#0e1424]/45">
                {["16","17","18","19","20","21","22","23","24","25"].map((y) => <div key={y}>’{y}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="border-b border-[#0e1424]/8 bg-white">
        <div className="mx-auto max-w-[1320px] px-8 py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-[#0e1424]/55">§ 04 / Новости</div>
              <h2 className="mt-3 text-[44px] font-medium leading-tight tracking-tight">Пресс-центр</h2>
            </div>
            <a href="#" className="hidden text-[14px] text-[#0e1424]/70 hover:text-[#0e1424] md:inline">Все релизы →</a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {NEWS.map((n) => (
              <article key={n.title} className="group flex flex-col border-t-2 border-[#0e1424] pt-5 hover:border-[#f25c2b]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#0e1424]/55">
                  <span>{n.date}</span>
                  <span className="text-[#f25c2b]">{n.tag}</span>
                </div>
                <h3 className="mt-3 text-[20px] font-medium leading-snug tracking-tight">{n.title}</h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-[#0e1424]/70">{n.body}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-[13px] text-[#0e1424]/70 group-hover:text-[#f25c2b]">
                  Читать <ChevronRight className="size-3.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL */}
      <section className="border-b border-[#0e1424]/8 bg-[#0e1424] text-white">
        <div className="mx-auto grid max-w-[1320px] grid-cols-12 gap-10 px-8 py-24">
          <div className="col-span-12 md:col-span-5">
            <Globe2 className="size-7 text-[#f25c2b]" />
            <h2 className="mt-4 text-[40px] font-medium leading-tight tracking-tight">
              Присутствие в 9 странах.
            </h2>
            <p className="mt-4 max-w-md text-[14px] text-white/65">
              Россия · Казахстан · Узбекистан · Беларусь · Армения · Грузия · Турция · ОАЭ · Сербия. Офисы в 14 городах, производственные площадки в 7.
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-3 gap-px bg-white/10 md:col-span-7">
            {[
              { c: "MOW", t: "Москва", s: "штаб-квартира" },
              { c: "AST", t: "Астана", s: "Aravox Capital" },
              { c: "TBS", t: "Тбилиси", s: "Energy / RE" },
              { c: "DXB", t: "Дубай",  s: "Treasury" },
              { c: "IST", t: "Стамбул", s: "M&A" },
              { c: "BEG", t: "Белград", s: "Industrial" },
            ].map((o) => (
              <div key={o.c} className="bg-[#0e1424] p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">{o.c}</div>
                <div className="mt-1 text-[20px] font-medium tracking-tight">{o.t}</div>
                <div className="mt-1 text-[12px] text-white/55">{o.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact">
        <div className="mx-auto grid max-w-[1320px] grid-cols-12 gap-10 px-8 py-20">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[12px] uppercase tracking-[0.22em] text-[#0e1424]/55">— штаб-квартира —</div>
            <div className="mt-3 text-[28px] font-medium leading-tight tracking-tight">
              Москва, Пресненская наб., 12, Башня «Федерация», 47 эт.
            </div>
            <div className="mt-6 space-y-1 text-[14px] text-[#0e1424]/70">
              <div>+7 (495) 600-08-08</div>
              <div>office@aravox.group</div>
              <div>investors@aravox.group</div>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-8 text-[13px] md:col-span-7 md:grid-cols-4">
            {[
              { h: "Холдинг", l: ["О нас", "Команда", "История", "ESG"] },
              { h: "Бизнес", l: ["Capital", "Industrial", "Energy", "Real Estate"] },
              { h: "Инвесторам", l: ["Отчёты", "Календарь", "Дивиденды", "Контакт IR"] },
              { h: "Карьера", l: ["Вакансии", "Стажировки", "MBA-программа"] },
            ].map((c) => (
              <div key={c.h}>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#0e1424]/45">{c.h}</div>
                <ul className="mt-3 space-y-1.5 text-[#0e1424]/80">{c.l.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[#0e1424]/10">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-[#0e1424]/45">
            <span>© 2026 Aravox Group · все права защищены</span>
            <span>MOEX: AVOX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChartEbitda() {
  const data = [42, 51, 64, 73, 68, 89, 102, 124, 158, 192]; // arbitrary indexed
  const max = Math.max(...data);
  const w = 580, h = 240, pad = 18;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)] as const);
  const path = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");
  const area = `${path} L ${pts[pts.length - 1][0]} ${h - pad} L ${pts[0][0]} ${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      <defs>
        <linearGradient id="ar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f25c2b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f25c2b" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + (h - pad * 2) * (i / 3)} y2={pad + (h - pad * 2) * (i / 3)} stroke="#0e1424" strokeOpacity="0.06" />
      ))}
      <path d={area} fill="url(#ar)" />
      <path d={path} stroke="#0e1424" strokeWidth="2" fill="none" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 5 : 3} fill={i === pts.length - 1 ? "#f25c2b" : "#0e1424"} />
      ))}
      <text x={pts[pts.length - 1][0] - 4} y={pts[pts.length - 1][1] - 12} fontSize="12" fontFamily="Inter Tight" fill="#f25c2b" textAnchor="end" fontWeight="600">
        ₽ 192 млрд
      </text>
    </svg>
  );
}
