import { ArrowRight, Calendar, MapPin, Sun, Wind, Leaf, Moon } from "lucide-react";

/* TIDELINE YOGA — calm wellness studio booking.
   Palette: cream #f3eee2, ink #2c3a32, sage #6e8a72, sand #d6c4a8, terracotta #b66a4c.
   Type: Sentient (lyrical serif) + Switzer body. Generous whitespace, soft curves. */

export const BookingMeta = {
  brand: "Tideline Yoga",
  description: "Демо: студия йоги с расписанием классов, бронированием и подпиской.",
  color: "#6e8a72",
};

const TODAY = [
  { time: "07:00", name: "Slow Flow",       teacher: "Дарья К.", level: "all",     spots: 4,  dur: "60 мин", room: "Tideline I",  icon: <Sun className="size-4" /> },
  { time: "09:30", name: "Pranayama & Med", teacher: "Сергей В.", level: "all",     spots: 9,  dur: "45 мин", room: "Tideline II", icon: <Wind className="size-4" /> },
  { time: "12:15", name: "Vinyasa Mid",     teacher: "Анна Д.",   level: "II–III",  spots: 2,  dur: "75 мин", room: "Tideline I",  icon: <Leaf className="size-4" /> },
  { time: "18:00", name: "Yin & Sound",     teacher: "Кира Т.",   level: "all",     spots: 11, dur: "90 мин", room: "Tideline III",icon: <Moon className="size-4" /> },
  { time: "20:00", name: "Restorative",     teacher: "Алексей М.", level: "all",     spots: 6,  dur: "75 мин", room: "Tideline II", icon: <Moon className="size-4" /> },
];

const PASSES = [
  { name: "Drop-in",   price: "1 400 ₽",  desc: "разовое занятие" },
  { name: "5 классов", price: "6 200 ₽",  desc: "действует 30 дней",   featured: false },
  { name: "Месяц безлимит", price: "12 900 ₽", desc: "лучший выбор",   featured: true },
  { name: "Квартал безлимит", price: "32 000 ₽", desc: "экономия 21%" },
];

const WEEK = ["Пн 22", "Вт 23", "Ср 24", "Чт 25", "Пт 26", "Сб 27", "Вс 28"];

export function BookingDemo() {
  return (
    <div className="min-h-screen bg-[#f3eee2] text-[#2c3a32]" style={{ fontFamily: '"Switzer", "Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500&display=swap');`}</style>

      {/* NAV */}
      <header className="border-b border-[#2c3a32]/10">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-8 py-6">
          <a href="#" className="flex items-baseline gap-3">
            <span className="text-[28px] font-light tracking-[-0.02em]" style={{ fontFamily: '"Fraunces", serif' }}>tideline</span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#2c3a32]/50">yoga · studio</span>
          </a>
          <nav className="hidden gap-9 text-[13px] tracking-wide text-[#2c3a32]/75 md:flex">
            <a href="#schedule" className="hover:text-[#6e8a72]">Расписание</a>
            <a href="#teachers" className="hover:text-[#6e8a72]">Преподаватели</a>
            <a href="#passes" className="hover:text-[#6e8a72]">Абонементы</a>
            <a href="#studio" className="hover:text-[#6e8a72]">Студия</a>
          </nav>
          <a href="#book" className="inline-flex items-center gap-2 rounded-full border border-[#2c3a32] px-5 py-2.5 text-[12px] tracking-[0.18em] text-[#2c3a32] hover:bg-[#2c3a32] hover:text-[#f3eee2]">
            ЗАБРОНИРОВАТЬ →
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#2c3a32]/10">
        {/* Wave-like organic SVG */}
        <svg className="pointer-events-none absolute -right-40 top-1/2 size-[820px] -translate-y-1/2 opacity-25" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="orb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6e8a72" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f3eee2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="280" fill="url(#orb)" />
          <path d="M 60 320 Q 200 200 360 320 T 540 320" stroke="#2c3a32" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M 60 360 Q 200 260 360 360 T 540 360" stroke="#2c3a32" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M 60 400 Q 200 320 360 400 T 540 400" stroke="#2c3a32" strokeWidth="1" fill="none" opacity="0.15" />
        </svg>

        <div className="relative mx-auto grid max-w-[1240px] grid-cols-12 gap-10 px-8 py-28">
          <div className="col-span-12 lg:col-span-7">
            <div className="text-[12px] uppercase tracking-[0.32em] text-[#6e8a72]">— основано в 2014, Санкт-Петербург —</div>
            <h1 className="mt-7 text-[clamp(64px,9vw,140px)] font-light leading-[0.95] tracking-[-0.03em]" style={{ fontFamily: '"Fraunces", serif' }}>
              Возвращайтесь
              <br />
              <em className="italic text-[#6e8a72]">к&nbsp;себе</em>
              <br />
              — снова и&nbsp;снова.
            </h1>
            <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-[#2c3a32]/70">
              Камерная студия в четырёх минутах от Невского. Три зала, тёплый дубовый пол, мягкий свет, дыхательные практики на закате. До 12 человек в группе — мы видим вас.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#schedule" className="inline-flex items-center gap-2 rounded-full bg-[#2c3a32] px-7 py-3.5 text-[13px] tracking-[0.12em] text-[#f3eee2] hover:bg-[#6e8a72]">
                Посмотреть расписание <ArrowRight className="size-4" />
              </a>
              <a href="#" className="text-[13px] tracking-[0.12em] text-[#2c3a32]/70 underline-offset-4 hover:text-[#6e8a72] hover:underline">
                Первое занятие — 500 ₽
              </a>
            </div>
          </div>
          <aside className="col-span-12 lg:col-span-5">
            <div className="rounded-3xl border border-[#2c3a32]/10 bg-white/60 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-[#2c3a32]/10 pb-3 text-[11px] uppercase tracking-[0.22em] text-[#2c3a32]/55">
                <span>Сегодня · 23 мая</span>
                <span>5 классов</span>
              </div>
              <ul className="mt-3 divide-y divide-[#2c3a32]/8 text-[14px]">
                {TODAY.slice(0, 4).map((c) => (
                  <li key={c.time} className="flex items-center gap-4 py-3.5">
                    <div className="w-14 text-[15px] font-medium tabular-nums tracking-tight">{c.time}</div>
                    <div className="flex-1">
                      <div className="leading-tight">{c.name}</div>
                      <div className="text-[12px] text-[#2c3a32]/55">{c.teacher} · {c.dur}</div>
                    </div>
                    <span className={`text-[11px] tabular-nums ${c.spots < 5 ? "text-[#b66a4c]" : "text-[#6e8a72]"}`}>{c.spots} мест</span>
                  </li>
                ))}
              </ul>
              <a href="#schedule" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6e8a72] px-5 py-3 text-[12px] tracking-[0.18em] text-[#f3eee2] hover:bg-[#2c3a32]">
                Все занятия недели →
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* MANIFESTO band */}
      <section className="border-b border-[#2c3a32]/10 bg-[#d6c4a8]">
        <div className="mx-auto max-w-[1240px] px-8 py-20">
          <p className="mx-auto max-w-4xl text-center text-[clamp(28px,3.6vw,46px)] font-light leading-[1.25] tracking-[-0.01em]" style={{ fontFamily: '"Fraunces", serif' }}>
            Мы не учим становиться <em className="italic">«гибче»</em>. Мы учим <em className="italic text-[#b66a4c]">слышать дыхание</em> — а гибкость приходит сама, как побочный эффект внимания.
          </p>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="border-b border-[#2c3a32]/10">
        <div className="mx-auto max-w-[1240px] px-8 py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-[12px] uppercase tracking-[0.32em] text-[#6e8a72]">— расписание —</div>
              <h2 className="mt-2 text-[44px] font-light leading-tight tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
                Эта неделя
              </h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {WEEK.map((d, i) => (
                <button key={d} className={`rounded-full border px-4 py-2 text-[12px] tracking-[0.14em] ${i === 1 ? "border-[#2c3a32] bg-[#2c3a32] text-[#f3eee2]" : "border-[#2c3a32]/15 text-[#2c3a32]/75 hover:border-[#6e8a72]"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#2c3a32]/10 bg-white/60">
            <div className="grid grid-cols-[80px_1fr_120px_120px_110px_110px] border-b border-[#2c3a32]/10 px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[#2c3a32]/50">
              <div>время</div><div>класс</div><div>препод.</div><div>уровень</div><div>зал</div><div className="text-right">бронь</div>
            </div>
            {TODAY.map((c) => (
              <div key={c.time} className="grid grid-cols-[80px_1fr_120px_120px_110px_110px] items-center border-b border-[#2c3a32]/8 px-5 py-4 text-[14px] hover:bg-[#f3eee2]/70">
                <div className="font-medium tabular-nums">{c.time}</div>
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-[#f3eee2] text-[#6e8a72]">{c.icon}</span>
                  <div>
                    <div className="leading-tight">{c.name}</div>
                    <div className="text-[11px] text-[#2c3a32]/55">{c.dur}</div>
                  </div>
                </div>
                <div className="text-[13px] text-[#2c3a32]/75">{c.teacher}</div>
                <div className="text-[12px] uppercase tracking-[0.16em] text-[#2c3a32]/60">{c.level}</div>
                <div className="text-[12px] uppercase tracking-[0.14em] text-[#2c3a32]/60">{c.room}</div>
                <div className="text-right">
                  <button className="rounded-full bg-[#6e8a72] px-3.5 py-1.5 text-[11px] tracking-[0.14em] text-[#f3eee2] hover:bg-[#2c3a32]">
                    {c.spots} мест →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING WIDGET */}
      <section id="book" className="border-b border-[#2c3a32]/10 bg-[#2c3a32] text-[#f3eee2]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-10 px-8 py-24">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[12px] uppercase tracking-[0.32em] text-[#d6c4a8]">— бронирование —</div>
            <h2 className="mt-3 text-[52px] font-light leading-[0.95] tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
              Три шага.
              <br />
              Меньше минуты.
            </h2>
            <ol className="mt-8 space-y-4 text-[14px] text-[#f3eee2]/75">
              <li><span className="mr-3 text-[#d6c4a8]">01</span> Выбираете класс из расписания.</li>
              <li><span className="mr-3 text-[#d6c4a8]">02</span> Указываете имя и телефон.</li>
              <li><span className="mr-3 text-[#d6c4a8]">03</span> Получаете подтверждение в WhatsApp.</li>
            </ol>
          </div>
          <form className="col-span-12 grid grid-cols-2 gap-3 md:col-span-7">
            <div className="col-span-2">
              <label className="text-[11px] uppercase tracking-[0.22em] text-[#d6c4a8]">Класс</label>
              <select className="mt-1 w-full rounded-full border border-[#f3eee2]/20 bg-transparent px-4 py-3.5 text-[14px] text-[#f3eee2]">
                <option className="bg-[#2c3a32]">12:15 · Vinyasa Mid · Анна Д.</option>
                <option className="bg-[#2c3a32]">18:00 · Yin & Sound · Кира Т.</option>
                <option className="bg-[#2c3a32]">20:00 · Restorative · Алексей М.</option>
              </select>
            </div>
            <BField label="Имя" placeholder="Анастасия" />
            <BField label="Телефон" placeholder="+7 (___) ___-__-__" />
            <BField label="Опыт практики" placeholder="меньше года" />
            <BField label="Абонемент" placeholder="Drop-in" />
            <div className="col-span-2 mt-3 flex items-center justify-between border-t border-[#f3eee2]/15 pt-5">
              <div className="flex items-center gap-2 text-[12px] text-[#f3eee2]/65">
                <Calendar className="size-3.5" /> Напомним за 2 часа до класса
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-[#d6c4a8] px-7 py-3.5 text-[13px] tracking-[0.14em] text-[#2c3a32] hover:bg-[#f3eee2]">
                Подтвердить место <ArrowRight className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* PASSES */}
      <section id="passes" className="border-b border-[#2c3a32]/10">
        <div className="mx-auto max-w-[1240px] px-8 py-24">
          <div className="mb-10">
            <div className="text-[12px] uppercase tracking-[0.32em] text-[#6e8a72]">— абонементы —</div>
            <h2 className="mt-2 text-[44px] font-light leading-tight tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
              Без подписок-ловушек.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {PASSES.map((p) => (
              <div key={p.name} className={`relative rounded-3xl border p-7 ${p.featured ? "border-[#6e8a72] bg-[#6e8a72] text-[#f3eee2]" : "border-[#2c3a32]/15 bg-white/60"}`}>
                {p.featured && <span className="absolute right-5 top-5 rounded-full bg-[#f3eee2] px-2 py-0.5 text-[10px] tracking-[0.2em] text-[#2c3a32]">★ POPULAR</span>}
                <div className={`text-[11px] uppercase tracking-[0.22em] ${p.featured ? "text-[#d6c4a8]" : "text-[#2c3a32]/55"}`}>{p.desc}</div>
                <div className="mt-5 text-[22px]" style={{ fontFamily: '"Fraunces", serif' }}>{p.name}</div>
                <div className="mt-2 text-[36px] font-light tabular-nums tracking-tight">{p.price}</div>
                <button className={`mt-7 w-full rounded-full px-4 py-3 text-[12px] tracking-[0.18em] ${p.featured ? "bg-[#f3eee2] text-[#2c3a32] hover:bg-[#d6c4a8]" : "bg-[#2c3a32] text-[#f3eee2] hover:bg-[#6e8a72]"}`}>
                  Купить →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO INFO */}
      <section id="studio" className="border-b border-[#2c3a32]/10 bg-[#d6c4a8]/40">
        <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-10 px-8 py-24">
          <div className="col-span-12 md:col-span-6">
            <div className="text-[12px] uppercase tracking-[0.32em] text-[#6e8a72]">— студия —</div>
            <h2 className="mt-2 text-[44px] font-light leading-tight tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
              Малая Конюшенная, 7
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#2c3a32]/70">
              Подъезд со двора, второй этаж, белая дверь с латунной табличкой. Раздевалки с душевыми, фен и полотенце включены. Чай с инжиром — после класса.
            </p>
            <ul className="mt-7 space-y-2 text-[13px] text-[#2c3a32]/70">
              <li className="flex items-center gap-3"><MapPin className="size-4 text-[#6e8a72]" /> 4 минуты пешком от Невского пр.</li>
              <li className="flex items-center gap-3"><Sun className="size-4 text-[#6e8a72]" /> Открыто ежедневно 06:30 — 22:00</li>
              <li className="flex items-center gap-3"><Wind className="size-4 text-[#6e8a72]" /> Вентиляция HEPA · увлажнители</li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <svg viewBox="0 0 400 300" className="size-full">
                <defs>
                  <linearGradient id="studio" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6e8a72" />
                    <stop offset="100%" stopColor="#2c3a32" />
                  </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#studio)" />
                {/* Map abstraction */}
                <path d="M 0 180 L 400 130" stroke="#f3eee2" strokeOpacity="0.25" strokeWidth="22" />
                <path d="M 100 0 L 230 300" stroke="#f3eee2" strokeOpacity="0.15" strokeWidth="14" />
                <path d="M 0 80 L 400 240" stroke="#f3eee2" strokeOpacity="0.1" strokeWidth="8" />
                <circle cx="240" cy="158" r="14" fill="#d6c4a8">
                  <animate attributeName="r" values="12;18;12" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="240" cy="158" r="6" fill="#b66a4c" />
                <text x="258" y="162" fill="#f3eee2" fontSize="13" fontFamily="Fraunces" fontStyle="italic">мы здесь</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="mx-auto max-w-[1240px] px-8 py-12">
          <div className="grid grid-cols-12 items-end gap-6">
            <div className="col-span-12 md:col-span-7">
              <div className="text-[clamp(64px,11vw,160px)] font-light leading-none tracking-[-0.04em] text-[#2c3a32]/85" style={{ fontFamily: '"Fraunces", serif' }}>
                tideline.
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-3 gap-6 text-[12px] text-[#2c3a32]/70 md:col-span-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#2c3a32]/45">студия</div>
                <ul className="mt-2 space-y-1"><li>Расписание</li><li>Преподаватели</li><li>Абонементы</li></ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#2c3a32]/45">связь</div>
                <ul className="mt-2 space-y-1"><li>+7 812 600 60 60</li><li>hello@tideline.studio</li><li>Telegram</li></ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#2c3a32]/45">город</div>
                <ul className="mt-2 space-y-1"><li>СПб, М. Конюшенная 7</li><li>06:30 — 22:00</li></ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#2c3a32]/15 pt-4 text-[11px] uppercase tracking-[0.22em] text-[#2c3a32]/50">
            © 2026 Tideline Studio · breathe in, breathe out
          </div>
        </div>
      </footer>
    </div>
  );
}

function BField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col">
      <span className="text-[11px] uppercase tracking-[0.22em] text-[#d6c4a8]">{label}</span>
      <input placeholder={placeholder} className="mt-1 rounded-full border border-[#f3eee2]/20 bg-transparent px-4 py-3.5 text-[14px] text-[#f3eee2] outline-none placeholder:text-[#f3eee2]/35 focus:border-[#d6c4a8]" />
    </label>
  );
}
