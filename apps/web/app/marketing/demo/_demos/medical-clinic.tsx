import { ArrowRight, Calendar, Phone, ShieldCheck, Stethoscope, MapPin, Star, Heart } from "lucide-react";

/* LUMEN MEDICAL — trustworthy private clinic.
   Palette: soft white #f7f9fc, ink #0f1d33, ocean #1e5fa8, mint #19a48a.
   Type: Inter body + Manrope display. */

export const ClinicMeta = {
  brand: "Lumen Medical",
  description: "Демо: частная клиника с онлайн-записью к врачам, услугами и страховыми партнёрами.",
  color: "#1e5fa8",
};

const SPECIALISTS = [
  { name: "Татьяна Орлова",  role: "Терапевт · кардиолог",     years: 18, rating: 4.98, init: "Т", color: "#1e5fa8" },
  { name: "Артём Дробышев",  role: "Невролог · сомнолог",       years: 22, rating: 4.96, init: "А", color: "#19a48a" },
  { name: "Ирина Серебряная",role: "Эндокринолог · диетолог",   years: 14, rating: 4.99, init: "И", color: "#a44819" },
  { name: "Лусине Манукян",  role: "Дерматолог · косметолог",   years: 11, rating: 4.94, init: "Л", color: "#7a19a4" },
];

const SERVICES = [
  ["Терапия",       "Прием, диагностика, ведение терапевтом", 3500],
  ["Кардиология",   "ЭКГ, УЗИ сердца, холтер 24ч",            4800],
  ["Эндокринология","Анализы, контроль гормонов, диабет",     4200],
  ["Дерматология",  "Дерматоскопия, удаление, биопсия",       3900],
  ["Неврология",    "Консультация, ЭЭГ, лечение мигрени",     4500],
  ["Чек-ап PRO",    "Полное обследование за 3 часа",         24000],
];

export function ClinicDemo() {
  return (
    <div
      className="min-h-screen bg-[#f7f9fc] text-[#0f1d33] antialiased"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Top utility */}
      <div className="bg-[#0f1d33] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-2 text-[12px]">
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#19a48a]" />
            Работаем сегодня · 08:00 — 22:00
          </span>
          <span className="hidden sm:inline">Скорая помощь 24/7 · +7 (495) 123-58-58</span>
          <span className="hidden md:inline">Кутузовский проспект 33</span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-[#0f1d33]/8 bg-[#f7f9fc]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#1e5fa8] to-[#19a48a]">
              <Heart className="size-4.5 fill-white text-white" />
            </div>
            <div>
              <div className="text-[19px] font-bold tracking-tight leading-none" style={{ fontFamily: "Manrope, Inter, sans-serif" }}>Lumen</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#0f1d33]/55">medical · est. 2014</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-[13px] text-[#0f1d33]/75 md:flex">
            <a href="#specialists" className="hover:text-[#1e5fa8]">Врачи</a>
            <a href="#services" className="hover:text-[#1e5fa8]">Услуги и цены</a>
            <a href="#" className="hover:text-[#1e5fa8]">Чек-апы</a>
            <a href="#" className="hover:text-[#1e5fa8]">Страховые</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+74951235858" className="hidden h-10 items-center gap-2 rounded-full border border-[#0f1d33]/15 px-4 text-[12.5px] font-medium hover:border-[#1e5fa8] hover:text-[#1e5fa8] md:inline-flex">
              <Phone className="size-3.5" /> +7 495 123-58-58
            </a>
            <a href="#book" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1e5fa8] px-5 text-[13px] font-semibold text-white hover:bg-[#173f70]">
              <Calendar className="size-3.5" />
              Записаться
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#0f1d33]/8">
        <div aria-hidden className="absolute right-0 top-0 -z-10 size-[680px] -translate-y-1/3 translate-x-1/4 rounded-full" style={{ background: "radial-gradient(circle, #c3dffb 0%, transparent 60%)" }} />
        <div aria-hidden className="absolute -bottom-32 left-0 -z-10 size-[600px] rounded-full" style={{ background: "radial-gradient(circle, #b8e8dd 0%, transparent 65%)" }} />
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#19a48a]/10 px-3 py-1.5 text-[12px] font-medium text-[#19a48a]">
              <ShieldCheck className="size-3.5" /> Лицензия Минздрава Л041-01137-77
            </div>
            <h1 className="mt-6 text-[clamp(40px,6vw,76px)] font-bold leading-[1.04] tracking-[-0.02em]" style={{ fontFamily: "Manrope, sans-serif" }}>
              Семейная клиника<br />
              <span className="text-[#1e5fa8]">с человеческим</span> отношением.
            </h1>
            <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-[#0f1d33]/70">
              23 специалиста, собственная лаборатория, КТ и МРТ.
              Принимаем взрослых и&nbsp;детей с&nbsp;3&nbsp;лет. Работаем с&nbsp;ДМС от&nbsp;42&nbsp;страховых компаний.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#book" className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#1e5fa8] px-6 text-[14px] font-semibold text-white hover:bg-[#173f70]">
                Записаться к врачу
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#" className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#0f1d33]/15 px-5 text-[14px] font-semibold hover:border-[#19a48a] hover:text-[#19a48a]">
                Вызов врача на дом
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[#0f1d33]/10 pt-6">
              {[
                ["23", "врача"],
                ["12 лет", "на рынке"],
                ["49 800", "пациентов"],
              ].map(([n, l]) => (
                <div key={n}>
                  <div className="text-[22px] font-bold text-[#1e5fa8]" style={{ fontFamily: "Manrope, sans-serif" }}>{n}</div>
                  <div className="text-[11.5px] uppercase tracking-wider text-[#0f1d33]/55">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking card on right */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(15,29,51,0.18)]">
              <div className="flex items-center justify-between">
                <div className="text-[12.5px] font-semibold uppercase tracking-wider text-[#1e5fa8]">Быстрая запись</div>
                <div className="text-[10.5px] text-[#0f1d33]/55">90 сек</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Терапевт", "от 3 500 ₽"],
                  ["Кардиолог", "от 4 800 ₽"],
                  ["Невролог", "от 4 500 ₽"],
                  ["Дерматолог", "от 3 900 ₽"],
                ].map(([n, p], i) => (
                  <button key={n} className={`rounded-xl border p-3 text-left transition ${i === 0 ? "border-[#1e5fa8] bg-[#1e5fa8]/5" : "border-[#0f1d33]/10 hover:border-[#1e5fa8]"}`}>
                    <div className="text-[13.5px] font-semibold">{n}</div>
                    <div className="mt-0.5 text-[11.5px] text-[#0f1d33]/60">{p}</div>
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-wider text-[#0f1d33]/55">Свободное время сегодня</div>
                <div className="mt-2 grid grid-cols-5 gap-1.5">
                  {["10:30","11:15","12:00","14:30","15:45","16:30","17:15","18:00","19:30","20:15"].map((t, i) => (
                    <button key={t} className={`rounded-md py-1.5 text-[11.5px] font-medium ${i === 2 ? "bg-[#19a48a] text-white" : "bg-[#0f1d33]/[0.04] text-[#0f1d33] hover:bg-[#1e5fa8]/10"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <button className="mt-5 w-full rounded-full bg-[#0f1d33] py-3 text-[13px] font-semibold text-white hover:bg-[#1e5fa8]">
                Записаться · 12:00
              </button>
              <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-[#0f1d33]/55">
                <Star className="size-3 fill-amber-500 text-amber-500" />
                4.97 · 2 318 отзывов на Яндексе
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section id="services" className="border-b border-[#0f1d33]/8">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[36px] font-bold tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
              Что мы лечим
            </h2>
            <a href="#" className="hidden text-[13px] font-semibold text-[#1e5fa8] hover:text-[#173f70] md:inline">
              Все направления (28) →
            </a>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SERVICES.map(([n, d, p]) => (
              <div key={n as string} className="group flex flex-col rounded-2xl border border-[#0f1d33]/10 bg-white p-6 transition hover:border-[#1e5fa8] hover:shadow-[0_12px_28px_-18px_rgba(30,95,168,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="grid size-10 place-items-center rounded-lg bg-[#1e5fa8]/10 text-[#1e5fa8]">
                    <Stethoscope className="size-5" />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#19a48a]">от {(p as number).toLocaleString("ru-RU")} ₽</div>
                </div>
                <div className="mt-4 text-[18px] font-bold tracking-tight">{n}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-[#0f1d33]/65">{d}</p>
                <a href="#book" className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#1e5fa8] hover:text-[#173f70]">
                  Записаться <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists */}
      <section id="specialists" className="border-b border-[#0f1d33]/8 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <h2 className="text-[36px] font-bold tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            Наши врачи
          </h2>
          <p className="mt-2 max-w-2xl text-[14.5px] text-[#0f1d33]/65">
            Все врачи с категорией ВАК, средний стаж 16 лет, регулярные стажировки в EU и&nbsp;Израиле.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {SPECIALISTS.map((s) => (
              <div key={s.name} className="rounded-2xl border border-[#0f1d33]/10 bg-white p-5">
                <div className="grid h-32 w-full place-items-center rounded-xl text-[64px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}99 100%)`, fontFamily: "Manrope, sans-serif" }}>
                  {s.init}
                </div>
                <div className="mt-4 text-[15.5px] font-bold tracking-tight">{s.name}</div>
                <div className="text-[12px] text-[#0f1d33]/60">{s.role}</div>
                <div className="mt-3 flex items-center justify-between text-[11.5px]">
                  <span className="text-[#0f1d33]/55">{s.years} лет стажа</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="size-3 fill-current" /> {s.rating}
                  </span>
                </div>
                <button className="mt-4 w-full rounded-full border border-[#1e5fa8] py-2 text-[12.5px] font-semibold text-[#1e5fa8] hover:bg-[#1e5fa8] hover:text-white">
                  Выбрать время
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance partners + footer */}
      <section className="border-b border-[#0f1d33]/8 bg-[#0f1d33] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-14">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#19a48a]">Работаем по ДМС</div>
              <h3 className="mt-2 text-[24px] font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
                42 страховые компании
              </h3>
              <p className="mt-2 text-[13px] text-white/65">
                Прямые расчёты — без авансов, без бумажной возни.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
              {["AlfaСтрах", "ВТБ-МС", "СОГАЗ", "Ингосстрах", "РЕСО", "Allianz"].map((c) => (
                <div key={c} className="grid h-14 place-items-center rounded-lg border border-white/10 bg-white/5 text-[11.5px] font-semibold text-white/85">{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3 text-[13px]">
          <div className="flex items-start gap-3 text-[#0f1d33]/75">
            <MapPin className="size-4 mt-0.5 shrink-0 text-[#1e5fa8]" />
            Кутузовский 33, Москва<br /> метро «Парк Победы», 5 мин пешком
          </div>
          <div className="flex items-start gap-3 text-[#0f1d33]/75">
            <Phone className="size-4 mt-0.5 shrink-0 text-[#1e5fa8]" />
            +7 (495) 123-58-58<br /> Скорая помощь — 24/7
          </div>
          <div className="text-[#0f1d33]/75">
            Пн–Пт · 08:00 — 22:00<br />
            Сб–Вс · 09:00 — 20:00
          </div>
        </div>
        <div className="border-t border-[#0f1d33]/10 py-4 text-center text-[11px] uppercase tracking-wider text-[#0f1d33]/55">
          © Lumen Medical · 2014 — 2026 · Имеются противопоказания, необходима консультация специалиста
        </div>
      </footer>
    </div>
  );
}
