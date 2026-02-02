import { Phone, MapPin, Clock, ArrowRight, Wine, Utensils, Calendar } from "lucide-react";

/* OSTERIA 41 — Italian editorial restaurant.
   Palette: cream #f4ecd8, ink #2a1f17, olive #5b6f3a, ruby #8b1a1a.
   Type: Cormorant Garamond display + DM Sans body. */

export const RestaurantMeta = {
  brand: "Osteria 41",
  description: "Демо: ресторан с сезонным меню, бронированием столов и винной картой.",
  color: "#8b1a1a",
};

const MENU = {
  antipasti: [
    ["Burrata di Andria",            "молодая буррата, инжир из Сухуми, базилик", 980],
    ["Vitello tonnato",              "телятина low-temp, тунцовая эмульсия, каперсы", 1180],
    ["Carpaccio di manzo",           "бок-чет, страчателла, оливковое масло Toscano", 1240],
  ],
  primi: [
    ["Tagliatelle al ragù",          "паста собственной выделки, томлёная говядина, 8 часов", 1480],
    ["Risotto ai funghi",            "карнароли, белые грибы, пармезан 24 мес.",                1620],
    ["Spaghetti alle vongole",       "вонголе, чили, петрушка, белое вино",                     1740],
  ],
  secondi: [
    ["Branzino al sale",             "сибас в соли, лимон, оливковое масло",                    2480],
    ["Bistecca alla fiorentina",     "флорентийский стейк, 1 кг на двоих",                      6800],
    ["Ossobuco alla milanese",       "телячья голяшка, шафрановое ризотто",                     2180],
  ],
  dolci: [
    ["Tiramisù della casa",          "savoiardi, маскарпоне, espresso Lavazza",                  680],
    ["Panna cotta",                  "ваниль, малиновый кулис",                                   620],
  ],
};

export function RestaurantDemo() {
  return (
    <div
      className="min-h-screen bg-[#f4ecd8] text-[#2a1f17] antialiased"
      style={{ fontFamily: '"DM Sans", Inter, system-ui, sans-serif' }}
    >
      {/* Top reservation strip */}
      <div className="border-b border-[#2a1f17]/15 bg-[#2a1f17] text-[#f4ecd8]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-2.5 text-[11.5px]">
          <span className="hidden md:inline">Открыто сегодня · 12:00 — 23:30</span>
          <span className="font-semibold tracking-wide">Закажите столик · +7 (495) 41 41 410</span>
          <span className="hidden md:inline">Кузнецкий мост 21 · Москва</span>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b border-[#2a1f17]/15">
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 items-center px-6 py-6">
          <nav className="flex items-center gap-8 text-[13.5px]">
            <a href="#menu" className="hover:text-[#8b1a1a]">Меню</a>
            <a href="#" className="hover:text-[#8b1a1a]">Винная карта</a>
            <a href="#" className="hidden hover:text-[#8b1a1a] sm:inline">События</a>
          </nav>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#8b1a1a]">est. 2018</div>
            <div className="font-bold leading-none tracking-tight text-[32px]" style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              Osteria 41
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <a href="#" className="hidden text-[13px] hover:text-[#8b1a1a] sm:inline">Подарочный</a>
            <a href="#book" className="inline-flex h-10 items-center gap-2 bg-[#8b1a1a] px-4 text-[12.5px] font-semibold text-[#f4ecd8] hover:bg-[#5a0d0d]">
              <Calendar className="size-4" />
              Забронировать
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#2a1f17]/15">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#8b1a1a]">Меню сезона · Autunno MMXXVI</div>
            <h1 className="mt-6 font-bold tracking-tight leading-[0.95]" style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              <span className="block text-[clamp(56px,9vw,128px)]">Cucina</span>
              <span className="block italic text-[clamp(56px,9vw,128px)] text-[#8b1a1a]">romana,</span>
              <span className="block text-[clamp(36px,5vw,64px)] mt-1">в десяти минутах от ГУМа.</span>
            </h1>
            <p className="mt-7 max-w-[44ch] text-[15px] leading-[1.7] text-[#2a1f17]/75">
              Открытая кухня, печь на дровах, паста собственной выделки каждое утро.
              Шеф Lorenzo Pellegrini — двенадцать лет в Trattoria del Pesce, Рим.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#book" className="group inline-flex h-12 items-center gap-2 bg-[#8b1a1a] px-6 text-[13px] font-semibold text-[#f4ecd8] hover:bg-[#5a0d0d]">
                Забронировать столик
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#menu" className="inline-flex h-12 items-center gap-2 border-2 border-[#2a1f17] px-5 text-[13px] font-semibold hover:bg-[#2a1f17] hover:text-[#f4ecd8]">
                Посмотреть меню
              </a>
            </div>
          </div>
          <div className="relative">
            {/* faux dish photo */}
            <div className="relative aspect-[4/5]" style={{ background: "radial-gradient(circle at 50% 45%, #c97c2a 0%, #8c4f1a 35%, #5a2f0e 70%, #2a1f17 100%)" }}>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-bold text-[#f4ecd8] tracking-tight text-[26px]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  Tagliatelle al ragù
                </div>
                <div className="text-[12px] text-[#f4ecd8]/75">блюдо недели · ₽ 1 480</div>
              </div>
            </div>
            <div className="absolute -top-3 -left-3 rotate-[-4deg] border-2 border-[#2a1f17] bg-[#f4ecd8] px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
              Forno a legna · 380°C
            </div>
          </div>
        </div>
      </section>

      {/* Menu — editorial */}
      <section id="menu" className="border-b border-[#2a1f17]/15">
        <div className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#8b1a1a]">Il menù della settimana</div>
            <h2 className="mt-3 text-[44px] md:text-[64px] font-bold tracking-tight leading-none" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Меню недели
            </h2>
            <div className="mx-auto mt-5 h-px w-24 bg-[#8b1a1a]" />
            <p className="mx-auto mt-5 max-w-[52ch] italic text-[14.5px] text-[#2a1f17]/70" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Меняется каждый понедельник в зависимости от того, что привёз с рынка Lorenzo.
              Дикорастущие травы — из Армении, рыба — с рынка Цветной.
            </p>
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {[
              ["Antipasti", MENU.antipasti, "I"],
              ["Primi piatti", MENU.primi, "II"],
              ["Secondi", MENU.secondi, "III"],
              ["Dolci", MENU.dolci, "IV"],
            ].map(([title, items, n]: any) => (
              <div key={title}>
                <div className="flex items-baseline gap-3 border-b-2 border-[#2a1f17] pb-2">
                  <span className="text-[14px] italic text-[#8b1a1a]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{n}.</span>
                  <h3 className="text-[26px] font-bold tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    {title}
                  </h3>
                </div>
                <ul className="mt-4 space-y-5">
                  {items.map(([n2, d, p]: any) => (
                    <li key={n2} className="flex items-baseline gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-[16.5px] font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{n2}</div>
                        <div className="text-[12.5px] italic text-[#2a1f17]/65">{d}</div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span aria-hidden className="hidden flex-1 grow border-b border-dotted border-[#2a1f17]/30 sm:block" style={{ minWidth: 24 }} />
                        <span className="shrink-0 tabular-nums text-[14px] font-semibold text-[#8b1a1a]">₽ {p}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-[11.5px] italic text-[#2a1f17]/60">
            Цены в рублях, включают сервис 10%. Просим предупреждать об аллергиях.
          </div>
        </div>
      </section>

      {/* Reservation + map */}
      <section id="book" className="bg-[#2a1f17] text-[#f4ecd8]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#c97c2a]">Prenotazione</div>
            <h2 className="mt-4 text-[44px] md:text-[60px] font-bold leading-none tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Забронировать столик
            </h2>
            <p className="mt-4 max-w-[44ch] text-[14px] leading-relaxed text-[#f4ecd8]/75">
              Бронируем за 30 секунд. Подтверждение придёт в SMS и WhatsApp.
              Депозит — 1 000 ₽ с гостя, засчитывается в счёт.
            </p>
            <form className="mt-8 grid grid-cols-2 gap-3">
              <input placeholder="Имя"             className="col-span-2 bg-[#f4ecd8]/10 border border-[#f4ecd8]/20 px-4 py-3 text-[14px] outline-none placeholder:text-[#f4ecd8]/40" />
              <input placeholder="Телефон"         className="bg-[#f4ecd8]/10 border border-[#f4ecd8]/20 px-4 py-3 text-[14px] outline-none placeholder:text-[#f4ecd8]/40" />
              <input placeholder="Гостей"          defaultValue="2" className="bg-[#f4ecd8]/10 border border-[#f4ecd8]/20 px-4 py-3 text-[14px] outline-none placeholder:text-[#f4ecd8]/40" />
              <input placeholder="Дата"            defaultValue="сб, 28 июня"   className="bg-[#f4ecd8]/10 border border-[#f4ecd8]/20 px-4 py-3 text-[14px] outline-none placeholder:text-[#f4ecd8]/40" />
              <input placeholder="Время"           defaultValue="20:00"          className="bg-[#f4ecd8]/10 border border-[#f4ecd8]/20 px-4 py-3 text-[14px] outline-none placeholder:text-[#f4ecd8]/40" />
              <button className="col-span-2 mt-2 bg-[#8b1a1a] py-3.5 text-[13.5px] font-semibold uppercase tracking-[0.16em] text-[#f4ecd8] hover:bg-[#a13030]">
                Подтвердить бронь
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#f4ecd8]/15 pt-6 text-[12px] text-[#f4ecd8]/75">
              <div className="flex items-start gap-2"><MapPin className="size-4 shrink-0 text-[#c97c2a]" /> Кузнецкий мост 21</div>
              <div className="flex items-start gap-2"><Clock className="size-4 shrink-0 text-[#c97c2a]" /> 12:00 — 23:30</div>
              <div className="flex items-start gap-2"><Phone className="size-4 shrink-0 text-[#c97c2a]" /> +7 (495) 41 41 410</div>
            </div>
          </div>
          <div className="relative min-h-[400px]">
            {/* faux map */}
            <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg,#3a2c20 0px,#3a2c20 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#3a2c20 0px,#3a2c20 1px,transparent 1px,transparent 32px)" }} />
            <div className="absolute left-[42%] top-[44%] -translate-x-1/2 -translate-y-full">
              <div className="rounded-full bg-[#8b1a1a] p-3 shadow-lg">
                <Utensils className="size-5 text-[#f4ecd8]" />
              </div>
              <div className="mt-1 ml-1 size-2 rounded-full bg-[#8b1a1a]" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 border border-[#f4ecd8]/20 bg-[#2a1f17]/90 p-3 text-[12px]">
              <div className="font-semibold">Osteria 41</div>
              <div className="text-[#f4ecd8]/65">Кузнецкий мост 21 · вход с Рождественки · 1 этаж</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a1f17]/15">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-[11.5px]">
          <span className="text-[#2a1f17]/70">© Osteria 41, 2018–2026</span>
          <span className="inline-flex items-center gap-2 text-[#8b1a1a]"><Wine className="size-3.5" /> Лицензия на алкоголь · 77-Б 0048231</span>
          <span className="text-[#2a1f17]/70">Шеф Lorenzo Pellegrini · ИП «Османов А. Р.»</span>
        </div>
      </footer>
    </div>
  );
}
