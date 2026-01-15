import { ArrowRight, Calendar, MapPin, Phone, Instagram, Heart } from "lucide-react";

/* GARNET ATELIER — luxe beauty studio.
   Palette: champagne #f7eee7, ink #2c1f1f, garnet #6b1d3c, blush #d8a4a0.
   Type: Tenor Sans display + Inter body. */

export const BeautySalonMeta = {
  brand: "Garnet Atelier",
  description: "Демо: бьюти-студия с онлайн-записью, мастерами и прайс-листом.",
  color: "#6b1d3c",
};

const SERVICES = [
  { group: "Стрижка и укладка", items: [
    ["Стрижка женская",       60,  "от 4 500"],
    ["Укладка вечерняя",      45,  "от 3 200"],
    ["Окрашивание классика",  120, "от 8 900"],
    ["Балаяж · Airtouch",     240, "от 22 000"],
  ]},
  { group: "Уход", items: [
    ["Реконструкция Olaplex", 90,  "6 500"],
    ["Ботокс для волос",      75,  "5 800"],
  ]},
  { group: "Маникюр", items: [
    ["Маникюр + покрытие",    90,  "4 200"],
    ["Японский маникюр",      120, "5 600"],
    ["Дизайн (1 ноготь)",     15,  "от 350"],
  ]},
];

const MASTERS = [
  { name: "Дарья К.",   role: "со-основатель · колорист",  years: 14, since: 2018, init: "Д" },
  { name: "Сабина А.",  role: "мастер по уходу · трихолог", years: 9,  since: 2020, init: "С" },
  { name: "Лусине М.",  role: "мастер маникюра",            years: 12, since: 2019, init: "Л" },
  { name: "Ани Х.",     role: "стилист · стрижки",          years: 7,  since: 2022, init: "А" },
];

export function BeautySalonDemo() {
  return (
    <div
      className="min-h-screen bg-[#f7eee7] text-[#2c1f1f] antialiased"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Nav */}
      <header className="border-b border-[#2c1f1f]/10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 items-center px-6 py-7">
          <nav className="flex items-center gap-7 text-[12.5px] text-[#2c1f1f]/80">
            <a href="#services" className="hover:text-[#6b1d3c]">Услуги</a>
            <a href="#masters" className="hover:text-[#6b1d3c]">Мастера</a>
            <a href="#" className="hidden hover:text-[#6b1d3c] sm:inline">Подарочные карты</a>
          </nav>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#6b1d3c]">est. 2018 · Москва</div>
            <div className="mt-1 text-[26px] tracking-[0.04em] leading-none" style={{ fontFamily: '"Tenor Sans", "Cormorant Garamond", serif' }}>
              GARNET <span className="text-[#6b1d3c]">·</span> ATELIER
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <a href="#" aria-label="Instagram" className="hidden text-[#2c1f1f]/65 hover:text-[#6b1d3c] sm:inline"><Instagram className="size-4" /></a>
            <a href="#book" className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#6b1d3c] px-5 text-[12.5px] font-medium text-[#f7eee7] hover:bg-[#491025]">
              <Calendar className="size-3.5" /> Записаться
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#2c1f1f]/10">
        {/* soft blush gradient */}
        <div aria-hidden className="absolute right-0 top-0 -z-10 size-[700px] rounded-full opacity-50" style={{ background: "radial-gradient(circle, #d8a4a0 0%, transparent 60%)" }} />
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.36em] text-[#6b1d3c]">salon · spa · studio</div>
            <h1 className="mt-6 leading-[0.95] tracking-[-0.01em]" style={{ fontFamily: '"Tenor Sans", serif', fontSize: "clamp(56px, 9vw, 124px)" }}>
              Тише, чем<br /> в&nbsp;<span className="italic text-[#6b1d3c]">парикмахерской.</span>
            </h1>
            <p className="mt-8 max-w-[42ch] text-[15px] leading-[1.7] text-[#2c1f1f]/70">
              Камерная бьюти-студия в&nbsp;тихом переулке у&nbsp;Патриарших.
              Четыре мастера, два рабочих места, никакой музыки.
              Кофе из&nbsp;«La Marzocco», вода без пузырьков.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#book" className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#2c1f1f] px-6 text-[13px] font-medium text-[#f7eee7] hover:bg-[#6b1d3c]">
                Записаться онлайн
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#services" className="text-[13px] underline underline-offset-4 decoration-[#6b1d3c] hover:text-[#6b1d3c]">
                Прайс-лист
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] text-[#2c1f1f]/60">
              <span className="inline-flex items-center gap-1.5"><Heart className="size-3.5 fill-[#6b1d3c] text-[#6b1d3c]" /> 4.97 на TripAdvisor</span>
              <span>· 2 318 отзывов</span>
              <span>· 6 наград InStyle</span>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full" style={{ background: "radial-gradient(ellipse at 30% 30%, #d8a4a0 0%, #b87870 40%, #6b1d3c 90%)" }} />
            <div className="absolute -bottom-5 -left-5 w-[200px] rotate-[-3deg] border border-[#2c1f1f]/15 bg-[#f7eee7] p-4 shadow-sm">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#6b1d3c]">Сегодня</div>
              <div className="mt-1 text-[20px]" style={{ fontFamily: '"Tenor Sans", serif' }}>14:30</div>
              <div className="text-[11.5px] text-[#2c1f1f]/60">Балаяж · Дарья К.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Price list */}
      <section id="services" className="border-b border-[#2c1f1f]/10">
        <div className="mx-auto max-w-[1100px] px-6 py-24">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_2fr] md:items-end">
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.32em] text-[#6b1d3c]">II — Прайс-лист</div>
              <div className="mt-3 h-px w-16 bg-[#6b1d3c]" />
            </div>
            <h2 className="text-[42px] md:text-[58px] leading-[1.02]" style={{ fontFamily: '"Tenor Sans", serif' }}>
              Услуги
            </h2>
          </div>

          <div className="mt-12 grid gap-12">
            {SERVICES.map(({ group, items }) => (
              <div key={group}>
                <h3 className="border-b border-[#2c1f1f]/15 pb-3 text-[22px]" style={{ fontFamily: '"Tenor Sans", serif' }}>
                  {group}
                </h3>
                <ul className="mt-4 divide-y divide-[#2c1f1f]/10">
                  {items.map(([n, min, p]) => (
                    <li key={n as string} className="grid grid-cols-[1fr_70px_120px] items-baseline gap-3 py-3 md:gap-6">
                      <span className="text-[15px]">{n}</span>
                      <span className="text-right text-[11.5px] uppercase tracking-wider text-[#2c1f1f]/55 tabular-nums">{min} мин</span>
                      <span className="text-right text-[14px] font-medium tabular-nums text-[#6b1d3c]">{p} ₽</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-[11.5px] italic text-[#2c1f1f]/60">
            Все цены ориентировочные. Финальная стоимость уточняется на консультации.
          </p>
        </div>
      </section>

      {/* Masters */}
      <section id="masters" className="border-b border-[#2c1f1f]/10 bg-[#efe1d6]/50">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="text-center">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-[#6b1d3c]">III — Команда</div>
            <h2 className="mt-4 text-[44px] md:text-[58px] leading-none" style={{ fontFamily: '"Tenor Sans", serif' }}>
              Наши мастера
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-[14px] text-[#2c1f1f]/70">
              Все мастера — с обучением Vidal Sassoon, средний стаж — 10 лет.
              Запись напрямую к нужному мастеру, без «свободного слота».
            </p>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-4">
            {MASTERS.map((m) => (
              <div key={m.name} className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#d8a4a0]/40">
                  <div className="size-full" style={{ background: `linear-gradient(150deg, rgba(216,164,160,0.7) 0%, rgba(107,29,60,0.5) 100%)` }} />
                  <div className="absolute inset-0 grid place-items-center text-[120px] text-[#6b1d3c]/40" style={{ fontFamily: '"Tenor Sans", serif' }}>
                    {m.init}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-[#f7eee7] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#6b1d3c]">с {m.since}</div>
                </div>
                <div className="mt-4">
                  <div className="text-[18px]" style={{ fontFamily: '"Tenor Sans", serif' }}>{m.name}</div>
                  <div className="text-[12.5px] text-[#2c1f1f]/60">{m.role}</div>
                  <div className="mt-2 text-[11.5px] uppercase tracking-wider text-[#6b1d3c]">{m.years} лет опыта</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking widget */}
      <section id="book" className="border-b border-[#2c1f1f]/10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-6 py-24 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-[#6b1d3c]">IV — Запись</div>
            <h2 className="mt-4 text-[44px] md:text-[58px] leading-[1.02]" style={{ fontFamily: '"Tenor Sans", serif' }}>
              Записаться<br /><span className="italic text-[#6b1d3c]">сегодня вечером.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-[#2c1f1f]/70">
              Свободные слоты на сегодня и&nbsp;завтра — без депозита.
              Запись на&nbsp;окрашивание — депозит 2&nbsp;000&nbsp;₽ возвращается в&nbsp;конце визита.
            </p>
            <div className="mt-8 inline-flex flex-col gap-2 rounded-md border border-[#2c1f1f]/15 bg-[#f7eee7] p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#6b1d3c]">Сейчас открыто</div>
              <div className="text-[14px]">Сегодня · 11:00 — 22:00</div>
              <div className="mt-2 grid grid-cols-4 gap-1.5 text-[11px]">
                {["14:30", "15:00", "16:45", "18:00", "19:30", "20:15", "21:00", "21:45"].map((t, i) => (
                  <button key={t} className={`rounded px-2 py-1.5 ${i === 0 ? "bg-[#6b1d3c] text-[#f7eee7]" : "border border-[#2c1f1f]/15 hover:border-[#6b1d3c]"}`}>{t}</button>
                ))}
              </div>
            </div>
          </div>

          <form className="rounded-2xl border border-[#2c1f1f]/15 bg-[#f7eee7] p-7">
            <div className="grid grid-cols-2 gap-3">
              <label className="col-span-2 text-[11.5px] uppercase tracking-wider text-[#2c1f1f]/60">Имя
                <input defaultValue="Алина" className="mt-1.5 w-full rounded-md border border-[#2c1f1f]/15 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#6b1d3c]" />
              </label>
              <label className="text-[11.5px] uppercase tracking-wider text-[#2c1f1f]/60">Телефон
                <input defaultValue="+7 (___) ___-__-__" className="mt-1.5 w-full rounded-md border border-[#2c1f1f]/15 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#6b1d3c]" />
              </label>
              <label className="text-[11.5px] uppercase tracking-wider text-[#2c1f1f]/60">Мастер
                <select className="mt-1.5 w-full rounded-md border border-[#2c1f1f]/15 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#6b1d3c]">
                  <option>Любой свободный</option>
                  {MASTERS.map((m) => <option key={m.name}>{m.name}</option>)}
                </select>
              </label>
              <label className="col-span-2 text-[11.5px] uppercase tracking-wider text-[#2c1f1f]/60">Услуга
                <select className="mt-1.5 w-full rounded-md border border-[#2c1f1f]/15 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#6b1d3c]">
                  <option>Балаяж · Airtouch — от 22 000 ₽</option>
                  <option>Стрижка женская — от 4 500 ₽</option>
                  <option>Окрашивание классика — от 8 900 ₽</option>
                  <option>Маникюр + покрытие — 4 200 ₽</option>
                </select>
              </label>
            </div>
            <button className="mt-5 w-full rounded-full bg-[#6b1d3c] py-3.5 text-[13px] font-medium text-[#f7eee7] hover:bg-[#491025]">
              Подтвердить запись
            </button>
            <p className="mt-3 text-center text-[10.5px] text-[#2c1f1f]/55">
              SMS-подтверждение придёт в течение 30 секунд.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
          <div className="flex items-start gap-3 text-[13px] text-[#2c1f1f]/75">
            <MapPin className="size-4 mt-0.5 shrink-0 text-[#6b1d3c]" />
            Большой Палашёвский 7<br /> Москва, метро Тверская
          </div>
          <div className="flex items-start gap-3 text-[13px] text-[#2c1f1f]/75">
            <Phone className="size-4 mt-0.5 shrink-0 text-[#6b1d3c]" />
            +7 (495) 123-45-67<br />ежедневно · 10:00 — 22:00
          </div>
          <div className="flex items-start gap-3 text-[13px] text-[#2c1f1f]/75">
            <Instagram className="size-4 mt-0.5 shrink-0 text-[#6b1d3c]" />
            @garnet.atelier<br />48 200 подписчиков
          </div>
        </div>
        <div className="border-t border-[#2c1f1f]/10">
          <div className="mx-auto max-w-[1280px] px-6 py-5 text-center text-[11px] uppercase tracking-[0.18em] text-[#2c1f1f]/55">
            © Garnet Atelier 2018 — 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
