import { ArrowRight, MapPin, Bed, Bath, Square, Search, Heart, Phone, Star } from "lucide-react";

/* VELLA ESTATES — magazine-style premium real estate.
   Palette: sand #efe9df, ink #1c1815, terracotta #b35e3d, jade #2f5d4f.
   Type: Cormorant Garamond display + Inter body. */

export const RealEstateMeta = {
  brand: "Vella Estates",
  description: "Демо: агентство недвижимости с витриной объектов, поиском и контактами агентов.",
  color: "#b35e3d",
};

const LISTINGS = [
  { title: "Penthouse Tverskaya 18", area: "Москва, Тверская", beds: 4, baths: 3, sqm: 280, price: "₽ 240 М",  tag: "exclusive", grad: "linear-gradient(135deg,#c98463 0%,#5b3424 100%)" },
  { title: "Loft Cite Patriarshie",  area: "Москва, Патриаршие", beds: 2, baths: 2, sqm: 142, price: "₽ 96 М",  tag: "new",       grad: "linear-gradient(135deg,#7a8a6d 0%,#2f4035 100%)" },
  { title: "Villa Tsaghkadzor",      area: "Армения, Цахкадзор",  beds: 5, baths: 4, sqm: 410, price: "$ 1.6 М", tag: "outdoor",   grad: "linear-gradient(135deg,#9c7e54 0%,#5b3f1f 100%)" },
  { title: "Townhouse Berlin Mitte", area: "Германия, Берлин",   beds: 3, baths: 2, sqm: 198, price: "€ 1.8 М", tag: "EU",        grad: "linear-gradient(135deg,#5e6a78 0%,#2a2f37 100%)" },
];

const AGENTS = [
  { name: "Анна Зубкова",     role: "Старший брокер · Premium",      since: "2014", init: "АЗ", deals: 184 },
  { name: "Артур Сейранян",  role: "Брокер · коммерческая недвижимость", since: "2017", init: "АС", deals: 132 },
  { name: "Полина Войтенко",  role: "Брокер · загородные дома",      since: "2019", init: "ПВ", deals: 96  },
];

export function RealEstateDemo() {
  return (
    <div
      className="min-h-screen bg-[#efe9df] text-[#1c1815] antialiased"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Top strip */}
      <div className="border-b border-[#1c1815]/15 bg-[#1c1815] text-[#efe9df]">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-6 py-2 text-[11px] uppercase tracking-[0.2em]">
          <span>Premium real estate · 2009 — 2026</span>
          <span className="hidden sm:inline">Москва · Берлин · Ереван · Лиссабон</span>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b border-[#1c1815]/15">
        <div className="mx-auto grid max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center px-6 py-6">
          <nav className="flex items-center gap-7 text-[13px] text-[#1c1815]/80">
            <a href="#listings" className="hover:text-[#b35e3d]">Каталог</a>
            <a href="#agents" className="hover:text-[#b35e3d]">Агенты</a>
            <a href="#" className="hidden hover:text-[#b35e3d] sm:inline">Журнал</a>
            <a href="#" className="hidden hover:text-[#b35e3d] sm:inline">Услуги</a>
          </nav>
          <a href="#" className="text-center text-[28px] font-bold tracking-tight leading-none" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            VELLA <span className="font-light italic text-[#b35e3d]">·</span> ESTATES
          </a>
          <div className="flex items-center justify-end gap-3">
            <a href="tel:+7..." className="hidden text-[13px] text-[#1c1815]/80 hover:text-[#b35e3d] md:inline">+7 (495) 60 60 600</a>
            <a href="#listings" className="inline-flex h-10 items-center gap-2 border-2 border-[#1c1815] px-4 text-[12px] font-bold uppercase tracking-[0.16em] hover:bg-[#1c1815] hover:text-[#efe9df]">
              <Search className="size-3.5" /> Подобрать
            </a>
          </div>
        </div>
      </header>

      {/* Hero — magazine spread */}
      <section className="border-b border-[#1c1815]/15">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 px-6 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <div className="md:col-span-5 md:row-start-1">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#b35e3d]">Каталог № 41 · лето&nbsp;2026</div>
            <h1 className="mt-7 text-[clamp(54px,8vw,108px)] font-bold leading-[0.94] tracking-[-0.02em]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Дом —<br /><span className="italic text-[#b35e3d]">не&nbsp;инвестиция.</span><br />
              <span className="text-[0.85em] text-[#1c1815]/85">Это место, где вы&nbsp;дышите.</span>
            </h1>
            <p className="mt-8 max-w-[42ch] text-[15.5px] leading-relaxed text-[#1c1815]/70">
              Бутиковое агентство премиальной недвижимости.
              312&nbsp;объектов в&nbsp;четырёх странах, средний срок сделки — 38&nbsp;дней.
              Берём процент только при&nbsp;закрытии.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#listings" className="group inline-flex h-12 items-center gap-2 bg-[#1c1815] px-6 text-[13px] font-semibold text-[#efe9df] hover:bg-[#b35e3d]">
                Смотреть каталог
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#" className="inline-flex h-12 items-center text-[13px] underline underline-offset-8 decoration-[#b35e3d] hover:text-[#b35e3d]">
                Скачать pdf-журнал
              </a>
            </div>
          </div>
          <div className="mt-12 md:col-span-7 md:row-start-1 md:mt-0">
            <div className="grid grid-cols-12 gap-3">
              {/* large featured */}
              <div className="col-span-12 row-span-2 aspect-[4/3]" style={{ background: "linear-gradient(135deg,#c98463 0%,#3a2114 100%)" }}>
                <div className="size-full p-7 text-[#efe9df]">
                  <div className="text-[10px] uppercase tracking-[0.32em]">главное на этой неделе</div>
                  <div className="mt-auto pt-32" />
                  <div className="font-bold leading-tight tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(28px, 4vw, 52px)" }}>
                    Penthouse Tverskaya 18
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div className="text-[13px] opacity-85">280 м² · 4 спальни · ₽ 240 М</div>
                    <a href="#" className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4">смотреть →</a>
                  </div>
                </div>
              </div>
              <div className="col-span-6 aspect-[4/5]" style={{ background: "linear-gradient(135deg,#7a8a6d 0%,#2f4035 100%)" }} />
              <div className="col-span-6 aspect-[4/5]" style={{ background: "linear-gradient(135deg,#9c7e54 0%,#5b3f1f 100%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="border-b border-[#1c1815]/15 bg-[#1c1815] text-[#efe9df]">
        <div className="mx-auto max-w-[1320px] grid grid-cols-2 gap-3 px-6 py-6 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-end">
          <label className="text-[11px] uppercase tracking-[0.18em] text-[#efe9df]/70">Локация
            <input defaultValue="Москва, центр" className="mt-1.5 w-full bg-[#efe9df]/10 border border-[#efe9df]/20 px-3 py-2.5 text-[14px] text-[#efe9df] outline-none focus:border-[#b35e3d] placeholder:text-[#efe9df]/40" />
          </label>
          <label className="text-[11px] uppercase tracking-[0.18em] text-[#efe9df]/70">Тип
            <select className="mt-1.5 w-full bg-[#efe9df]/10 border border-[#efe9df]/20 px-3 py-2.5 text-[14px] text-[#efe9df] outline-none focus:border-[#b35e3d]">
              <option>Квартира</option><option>Дом</option><option>Пентхаус</option>
            </select>
          </label>
          <label className="text-[11px] uppercase tracking-[0.18em] text-[#efe9df]/70">Спален
            <select className="mt-1.5 w-full bg-[#efe9df]/10 border border-[#efe9df]/20 px-3 py-2.5 text-[14px] text-[#efe9df] outline-none focus:border-[#b35e3d]">
              <option>2+</option><option>3+</option><option>4+</option>
            </select>
          </label>
          <label className="text-[11px] uppercase tracking-[0.18em] text-[#efe9df]/70">Бюджет
            <select className="mt-1.5 w-full bg-[#efe9df]/10 border border-[#efe9df]/20 px-3 py-2.5 text-[14px] text-[#efe9df] outline-none focus:border-[#b35e3d]">
              <option>до ₽ 100 М</option><option>₽ 100 — 300 М</option><option>₽ 300 М+</option>
            </select>
          </label>
          <button className="inline-flex h-12 items-center justify-center gap-2 bg-[#b35e3d] px-6 text-[12px] font-bold uppercase tracking-[0.18em] text-[#efe9df] hover:bg-[#8e4a30]">
            <Search className="size-4" /> Найти
          </button>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="border-b border-[#1c1815]/15">
        <div className="mx-auto max-w-[1320px] px-6 py-20">
          <div className="flex items-end justify-between border-b border-[#1c1815]/30 pb-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#b35e3d]">Свежие предложения</div>
              <h2 className="mt-2 text-[44px] font-bold tracking-tight leading-none" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Четыре объекта недели
              </h2>
            </div>
            <a href="#" className="hidden text-[13px] uppercase tracking-[0.16em] underline underline-offset-4 hover:text-[#b35e3d] sm:inline">
              Все 312 объектов →
            </a>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {LISTINGS.map((l) => (
              <a key={l.title} href="#" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: l.grad }}>
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-[#efe9df] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1815]">
                    {l.tag}
                  </div>
                  <button className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[#efe9df]/90 text-[#1c1815] hover:bg-[#b35e3d] hover:text-[#efe9df]">
                    <Heart className="size-4" />
                  </button>
                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-[#1c1815]/85 px-3 py-1.5 text-[12.5px] font-bold text-[#efe9df]">
                    {l.price}
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="text-[24px] font-bold tracking-tight transition group-hover:text-[#b35e3d]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    {l.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#1c1815]/55">ID 0{Math.floor(Math.random() * 999)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[12.5px] text-[#1c1815]/65">
                  <MapPin className="size-3.5" /> {l.area}
                </div>
                <div className="mt-4 flex items-center gap-6 text-[12.5px] text-[#1c1815]/80">
                  <span className="inline-flex items-center gap-1.5"><Bed className="size-4 text-[#b35e3d]" /> {l.beds} спальни</span>
                  <span className="inline-flex items-center gap-1.5"><Bath className="size-4 text-[#b35e3d]" /> {l.baths} с/у</span>
                  <span className="inline-flex items-center gap-1.5"><Square className="size-4 text-[#b35e3d]" /> {l.sqm} м²</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="border-b border-[#1c1815]/15 bg-[#1c1815] text-[#efe9df]">
        <div className="mx-auto max-w-[1320px] px-6 py-20">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#b35e3d]">Наши агенты</div>
            <h2 className="mt-3 text-[44px] font-bold tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Личный брокер на&nbsp;каждую сделку
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {AGENTS.map((a) => (
              <div key={a.name} className="border border-[#efe9df]/20 p-7">
                <div className="grid size-16 place-items-center rounded-full bg-[#b35e3d] text-[24px] font-bold text-[#efe9df]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  {a.init}
                </div>
                <h3 className="mt-5 text-[22px] font-bold tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{a.name}</h3>
                <div className="mt-1 text-[12.5px] italic text-[#efe9df]/70">{a.role}</div>
                <div className="mt-5 flex items-center justify-between border-t border-[#efe9df]/15 pt-4 text-[11.5px] uppercase tracking-[0.18em] text-[#efe9df]/60">
                  <span>с {a.since}</span>
                  <span>{a.deals} сделок</span>
                </div>
                <button className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 bg-[#b35e3d] text-[12px] font-bold uppercase tracking-[0.18em] text-[#efe9df] hover:bg-[#8e4a30]">
                  <Phone className="size-3.5" /> Связаться
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-[11.5px] uppercase tracking-[0.16em] text-[#1c1815]/65">
          <span>© Vella Estates · 2009 — 2026</span>
          <span className="inline-flex items-center gap-1.5"><Star className="size-3 fill-[#b35e3d] text-[#b35e3d]" /> 4.96 · 384 отзыва на циан</span>
          <span>Лицензия № 77-CRE-0842</span>
        </div>
      </footer>
    </div>
  );
}
