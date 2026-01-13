import { ArrowRight, Gauge, Fuel, Cog, Calendar, Phone, ShieldCheck } from "lucide-react";

/* MARK VII MOTORS — dark premium automotive showroom.
   Palette: obsidian #0b0b0e, graphite #18181c, bone #ece8e0, brass #c9a25a, signal #d72d2d.
   Type: Bodoni Moda display + Inter body. Cinematic, controlled, expensive. */

export const AutomotiveMeta = {
  brand: "Mark VII Motors",
  description: "Демо: автомобильный шоурум с каталогом, тест-драйвом и сервисом.",
  color: "#c9a25a",
};

const CARS = [
  { code: "M7-RX",  name: "RX Coupe",    year: 2026, hp: 612, kmh: "3.4с до 100", price: "₽ 14 800 000", grad: "linear-gradient(135deg,#3a3a40,#0b0b0e)" },
  { code: "M7-S",   name: "S Berlina",   year: 2026, hp: 488, kmh: "4.1с до 100", price: "₽ 9 200 000",  grad: "linear-gradient(135deg,#6b5f4a,#1a1610)" },
  { code: "M7-X",   name: "X Crossover", year: 2026, hp: 542, kmh: "4.0с до 100", price: "₽ 11 400 000", grad: "linear-gradient(135deg,#4a3a2e,#18120a)" },
  { code: "M7-EV",  name: "EV Concept",  year: 2027, hp: 780, kmh: "2.9с до 100", price: "по запросу",    grad: "linear-gradient(135deg,#1f3a3f,#06141a)" },
];

const SPEC = [
  { l: "Двигатель",  v: "V8 4.4 TT" },
  { l: "Мощность",   v: "612 л.с." },
  { l: "Момент",     v: "780 Н·м" },
  { l: "Привод",     v: "AWD xDrive" },
  { l: "Разгон",     v: "3.4 с" },
  { l: "Макс. ск.",  v: "315 км/ч" },
  { l: "Подвеска",   v: "адаптивная" },
  { l: "Тормоза",    v: "карбон-керамика" },
];

export function AutomotiveDemo() {
  return (
    <div className="min-h-screen bg-[#0b0b0e] text-[#ece8e0]" style={{ fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600;6..96,700&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* NAV */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-6">
          <a href="#" className="flex items-baseline gap-2">
            <span className="text-[26px] tracking-[-0.015em]" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 600 }}>MARK</span>
            <span className="text-[20px] text-[#c9a25a]" style={{ fontFamily: '"Bodoni Moda", serif', fontStyle: "italic" }}>VII</span>
            <span className="ml-2 text-[10px] uppercase tracking-[0.32em] text-[#ece8e0]/55">motors</span>
          </a>
          <nav className="hidden gap-9 text-[12px] uppercase tracking-[0.2em] text-[#ece8e0]/70 md:flex">
            <a href="#models" className="hover:text-[#c9a25a]">Модели</a>
            <a href="#configure" className="hover:text-[#c9a25a]">Конфигуратор</a>
            <a href="#service" className="hover:text-[#c9a25a]">Сервис</a>
            <a href="#showroom" className="hover:text-[#c9a25a]">Шоурум</a>
          </nav>
          <a href="#testdrive" className="inline-flex items-center gap-2 border border-[#c9a25a] px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[#c9a25a] hover:bg-[#c9a25a] hover:text-[#0b0b0e]">
            Тест-драйв →
          </a>
        </div>
      </header>

      {/* HERO — cinematic */}
      <section className="relative overflow-hidden">
        {/* Backdrop: dark studio gradient + light beam */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 65%, #2a2a32 0%, #0b0b0e 65%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a25a]/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-8 pb-32 pt-44">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.32em] text-[#c9a25a]">— РЕЛИЗ 2026 / SERIES VII —</div>
              <h1 className="mt-6 text-[clamp(60px,9vw,128px)] leading-[0.88] tracking-[-0.025em]" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 500 }}>
                Тишина
                <br />
                на скорости
                <br />
                <em className="italic text-[#c9a25a]">315</em>
                <span className="ml-3 text-[36px] uppercase tracking-[0.18em] text-[#ece8e0]/55">км/ч</span>
              </h1>
              <p className="mt-9 max-w-md text-[15px] leading-relaxed text-[#ece8e0]/70">
                RX Coupe — седьмое поколение нашего флагмана. 612 лошадиных сил, карбон-керамические тормоза, ручная сборка в Штутгарте. Полная конфигурация — 9 недель.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#configure" className="inline-flex items-center gap-2 bg-[#c9a25a] px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-[#0b0b0e] hover:bg-[#ece8e0]">
                  Сконфигурировать <ArrowRight className="size-4" />
                </a>
                <a href="#testdrive" className="text-[12px] uppercase tracking-[0.22em] text-[#ece8e0]/70 underline-offset-4 hover:text-[#c9a25a] hover:underline">
                  Записаться на тест-драйв
                </a>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7">
              {/* Stylised car silhouette */}
              <div className="relative">
                <svg viewBox="0 0 800 360" className="h-auto w-full">
                  <defs>
                    <linearGradient id="body" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2c2c34" />
                      <stop offset="55%" stopColor="#0e0e12" />
                      <stop offset="100%" stopColor="#3a3a44" />
                    </linearGradient>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c9a25a" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#c9a25a" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="400" cy="290" rx="380" ry="22" fill="url(#glow)" />
                  {/* Body */}
                  <path d="M 90 230 Q 160 145 320 130 L 470 125 Q 590 130 700 195 L 720 230 Q 690 250 660 250 L 140 250 Q 100 250 90 230 Z" fill="url(#body)" stroke="#c9a25a" strokeOpacity="0.3" strokeWidth="0.5" />
                  {/* Windows */}
                  <path d="M 220 195 Q 280 145 380 138 L 470 135 Q 540 140 580 195 Z" fill="#0a0a0d" stroke="#c9a25a" strokeOpacity="0.5" strokeWidth="0.7" />
                  <line x1="400" y1="138" x2="400" y2="195" stroke="#c9a25a" strokeOpacity="0.4" />
                  {/* Headlight */}
                  <ellipse cx="685" cy="205" rx="22" ry="9" fill="#c9a25a" opacity="0.85" />
                  <ellipse cx="685" cy="205" rx="40" ry="14" fill="#c9a25a" opacity="0.2" />
                  {/* Wheels */}
                  <circle cx="220" cy="252" r="38" fill="#0a0a0d" stroke="#c9a25a" strokeOpacity="0.5" />
                  <circle cx="220" cy="252" r="22" fill="#18181c" stroke="#c9a25a" strokeOpacity="0.7" />
                  <circle cx="600" cy="252" r="38" fill="#0a0a0d" stroke="#c9a25a" strokeOpacity="0.5" />
                  <circle cx="600" cy="252" r="22" fill="#18181c" stroke="#c9a25a" strokeOpacity="0.7" />
                  {/* Spec ticks */}
                  <line x1="100" y1="320" x2="720" y2="320" stroke="#c9a25a" strokeOpacity="0.25" strokeDasharray="2 4" />
                  <text x="100" y="338" fill="#c9a25a" opacity="0.6" fontSize="10" fontFamily="Inter" letterSpacing="3">4 871 MM</text>
                  <text x="640" y="338" fill="#c9a25a" opacity="0.6" fontSize="10" fontFamily="Inter" letterSpacing="3">1 392 KG</text>
                </svg>
                {/* spec corner */}
                <div className="absolute right-0 top-0 text-right text-[10px] uppercase tracking-[0.22em] text-[#c9a25a]/60">
                  CHASSIS №<span className="ml-1 text-[#ece8e0]">VII-2026-0042</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spec strip */}
          <div className="mt-16 grid grid-cols-2 gap-px bg-[#c9a25a]/15 md:grid-cols-4">
            {[
              { i: <Gauge className="size-5" />, l: "Разгон", v: "3.4 с" },
              { i: <Cog className="size-5" />,   l: "Мощность", v: "612 л.с." },
              { i: <Fuel className="size-5" />,  l: "Расход", v: "9.8 л" },
              { i: <ShieldCheck className="size-5" />, l: "Гарантия", v: "5 лет" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-4 bg-[#0b0b0e] px-5 py-5">
                <div className="grid size-10 place-items-center rounded-full border border-[#c9a25a]/40 text-[#c9a25a]">{s.i}</div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#ece8e0]/55">{s.l}</div>
                  <div className="text-[20px] tracking-tight" style={{ fontFamily: '"Bodoni Moda", serif' }}>{s.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="border-y border-[#ece8e0]/8">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-[#c9a25a]">— модельный ряд —</div>
              <h2 className="mt-3 text-[52px] tracking-tight" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 500 }}>
                Серия <em className="italic text-[#c9a25a]">VII</em>
              </h2>
            </div>
            <div className="hidden gap-2 text-[11px] uppercase tracking-[0.22em] text-[#ece8e0]/55 md:flex">
              <span className="border border-[#c9a25a] px-3 py-1 text-[#c9a25a]">Все</span>
              <span className="border border-[#ece8e0]/15 px-3 py-1">Купе</span>
              <span className="border border-[#ece8e0]/15 px-3 py-1">Седан</span>
              <span className="border border-[#ece8e0]/15 px-3 py-1">SUV</span>
              <span className="border border-[#ece8e0]/15 px-3 py-1">EV</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px bg-[#ece8e0]/8 md:grid-cols-2">
            {CARS.map((c) => (
              <article key={c.code} className="group relative overflow-hidden bg-[#0b0b0e] p-7">
                <div className="h-44 w-full" style={{ background: c.grad }} />
                <div className="absolute right-7 top-7 text-[10px] uppercase tracking-[0.22em] text-[#c9a25a]/80">{c.code}</div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.32em] text-[#ece8e0]/55">{c.year} · NEW</div>
                    <h3 className="mt-2 text-[36px] leading-none tracking-tight" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 500 }}>{c.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#ece8e0]/55">от</div>
                    <div className="text-[18px] tracking-tight text-[#c9a25a]" style={{ fontFamily: '"Bodoni Moda", serif' }}>{c.price}</div>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-5 text-[12px] uppercase tracking-[0.18em] text-[#ece8e0]/65">
                  <span>{c.hp} л.с.</span>
                  <span className="text-[#c9a25a]/40">·</span>
                  <span>{c.kmh}</span>
                </div>
                <a href="#" className="mt-6 inline-flex items-center gap-2 border-b border-[#c9a25a]/60 pb-1 text-[11px] uppercase tracking-[0.22em] text-[#c9a25a] group-hover:gap-3">
                  Открыть карточку <ArrowRight className="size-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS DOSSIER */}
      <section className="border-b border-[#ece8e0]/8 bg-[#18181c]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-8 py-24">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#c9a25a]">— технический паспорт —</div>
            <h2 className="mt-3 text-[44px] leading-tight tracking-tight" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 500 }}>
              RX Coupe / <em className="italic text-[#c9a25a]">досье</em>
            </h2>
            <p className="mt-5 max-w-md text-[14px] text-[#ece8e0]/65">
              Двойной турбонаддув, активное рулевое управление задней оси, восьмиступенчатая ZF, адаптивная пневмоподвеска с автоматическим понижением на трассе.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[#c9a25a] hover:text-[#ece8e0]">
              Скачать брошюру (PDF · 6 МБ) →
            </a>
          </div>
          <div className="col-span-12 md:col-span-7">
            <dl className="grid grid-cols-2 gap-px bg-[#ece8e0]/10">
              {SPEC.map((s) => (
                <div key={s.l} className="flex items-baseline justify-between bg-[#18181c] px-5 py-5">
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-[#ece8e0]/55">{s.l}</dt>
                  <dd className="text-[20px] tracking-tight" style={{ fontFamily: '"Bodoni Moda", serif' }}>{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TEST DRIVE */}
      <section id="testdrive" className="border-b border-[#ece8e0]/8">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-8 py-24">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#c9a25a]">— тест-драйв —</div>
            <h2 className="mt-3 text-[clamp(48px,6vw,80px)] leading-[0.95] tracking-tight" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 500 }}>
              45 минут.
              <br />
              <em className="italic text-[#c9a25a]">Закрытый</em> полигон.
              <br />
              Личный пилот.
            </h2>
            <p className="mt-5 max-w-md text-[14px] text-[#ece8e0]/65">
              Записываем три временных слота в день. Полигон «Мячково» — 35 минут от центра Москвы. Подача автомобиля на старт — на ваше усмотрение.
            </p>
          </div>
          <form className="col-span-12 md:col-span-7">
            <div className="grid grid-cols-2 gap-3">
              <AField label="Модель" placeholder="M7-RX Coupe" />
              <AField label="Дата" placeholder="14 июня 2026" />
              <AField label="Имя" placeholder="Алексей" />
              <AField label="Фамилия" placeholder="Хохлов" />
              <AField label="Телефон" placeholder="+7 (___) ___-__-__" />
              <AField label="Email" placeholder="a.hohlov@mail.ru" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#ece8e0]/10 pt-6">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#ece8e0]/55">
                <Calendar className="size-3.5" /> Подтверждение в течение часа
              </div>
              <button className="inline-flex items-center gap-2 bg-[#c9a25a] px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-[#0b0b0e] hover:bg-[#ece8e0]">
                Подать заявку <ArrowRight className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* SHOWROOM */}
      <section id="showroom" className="border-b border-[#ece8e0]/8 bg-[#18181c]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-8 py-20">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#c9a25a]">— шоурум —</div>
            <h2 className="mt-3 text-[40px] leading-tight tracking-tight" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 500 }}>
              Москва, <em className="italic text-[#c9a25a]">Никитский</em> бульвар, 5
            </h2>
            <ul className="mt-7 space-y-2 text-[13px] text-[#ece8e0]/70">
              <li className="flex items-center gap-3"><Phone className="size-4 text-[#c9a25a]" /> +7 (495) 660 07 07</li>
              <li className="flex items-center gap-3"><Calendar className="size-4 text-[#c9a25a]" /> ежедневно 10:00 — 22:00</li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="aspect-[16/9] border border-[#c9a25a]/20">
              <svg viewBox="0 0 640 360" className="size-full">
                <defs>
                  <pattern id="floor" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#c9a25a" strokeOpacity="0.18" />
                  </pattern>
                </defs>
                <rect width="640" height="360" fill="#0b0b0e" />
                <rect width="640" height="360" fill="url(#floor)" />
                <circle cx="320" cy="170" r="120" stroke="#c9a25a" strokeOpacity="0.3" fill="#0b0b0e" />
                <circle cx="320" cy="170" r="80" stroke="#c9a25a" strokeOpacity="0.6" fill="#18181c" />
                <text x="320" y="175" textAnchor="middle" fill="#c9a25a" fontSize="13" fontFamily="Bodoni Moda" fontStyle="italic">SHOWROOM</text>
                <text x="320" y="195" textAnchor="middle" fill="#ece8e0" opacity="0.5" fontSize="9" letterSpacing="3" fontFamily="Inter">MARK VII · MOSCOW</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="mx-auto max-w-[1400px] px-8 py-12">
          <div className="border-b border-[#ece8e0]/10 pb-8">
            <div className="text-[clamp(72px,12vw,180px)] leading-[0.85] tracking-[-0.04em]" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 500 }}>
              MARK <em className="italic text-[#c9a25a]">VII.</em>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.32em] text-[#ece8e0]/45">
            <span>© 2026 Mark VII Motors · авторизованный дилер</span>
            <span className="flex gap-4"><span>Москва</span><span>СПб</span><span>Сочи</span><span>Екатеринбург</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col">
      <span className="text-[10px] uppercase tracking-[0.32em] text-[#c9a25a]/80">{label}</span>
      <input placeholder={placeholder} className="mt-1 border-b border-[#ece8e0]/15 bg-transparent py-3 text-[14px] outline-none placeholder:text-[#ece8e0]/30 focus:border-[#c9a25a]" />
    </label>
  );
}
