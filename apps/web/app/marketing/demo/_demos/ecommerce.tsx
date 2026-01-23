import Link from "next/link";
import { Search, ShoppingBag, Heart, User, ArrowRight, Star, Truck, Shield, RotateCcw } from "lucide-react";

/* NORTHWIND — Swiss-minimalist boutique e-commerce.
   Palette: bone #f5f1ea, ink #1a1a1a, terracotta #c5582b.
   Type: Helvetica Neue-style sans + DM Serif Display for editorial moments. */

export const EcommerceMeta = {
  brand: "NORTHWIND",
  description: "Демо: бутиковый интернет-магазин с каталогом, корзиной и редакционным контентом.",
  color: "#c5582b",
};

const PRODUCTS = [
  { id: 1, name: "Linen Overshirt", cat: "Outerwear", price: "₽ 12 400", color: "stone", tag: "new" },
  { id: 2, name: "Wide-leg Trouser", cat: "Bottoms",  price: "₽ 8 900",  color: "neutral" },
  { id: 3, name: "Cropped Tee 02",   cat: "Tops",     price: "₽ 3 600",  color: "amber", tag: "best" },
  { id: 4, name: "Knit Vest",        cat: "Knitwear", price: "₽ 14 200", color: "rose" },
  { id: 5, name: "Wool Coat 41",     cat: "Outerwear", price: "₽ 38 000", color: "zinc", tag: "drop" },
  { id: 6, name: "Suede Loafer",     cat: "Footwear", price: "₽ 22 500", color: "yellow" },
  { id: 7, name: "Canvas Tote",      cat: "Bags",     price: "₽ 4 100",  color: "lime" },
  { id: 8, name: "Silk Scarf 09",    cat: "Accessories", price: "₽ 5 800", color: "sky" },
];

const SWATCH: Record<string, string> = {
  stone: "linear-gradient(135deg,#a8a29e 0%,#e7e5e4 100%)",
  neutral: "linear-gradient(135deg,#737373 0%,#d4d4d4 100%)",
  amber: "linear-gradient(135deg,#d97706 0%,#fcd34d 100%)",
  rose: "linear-gradient(135deg,#9f1239 0%,#fda4af 100%)",
  zinc: "linear-gradient(135deg,#27272a 0%,#71717a 100%)",
  yellow: "linear-gradient(135deg,#a16207 0%,#fde047 100%)",
  lime: "linear-gradient(135deg,#65a30d 0%,#d9f99d 100%)",
  sky: "linear-gradient(135deg,#0369a1 0%,#bae6fd 100%)",
};

export function EcommerceDemo() {
  return (
    <div
      className="min-h-screen bg-[#f5f1ea] text-[#1a1a1a] antialiased"
      style={{ fontFamily: '"Helvetica Neue", Inter, system-ui, sans-serif' }}
    >
      {/* Top utility strip */}
      <div className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-[#f5f1ea]">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between px-6 py-2 text-[11px] uppercase tracking-[0.18em]">
          <span>Free shipping over ₽ 10 000</span>
          <span className="hidden sm:inline">FW26 — Volume One</span>
          <span>RU · EUR · USD</span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-[42px] z-10 border-b border-[#1a1a1a]/10 bg-[#f5f1ea]/95 backdrop-blur">
        <div className="mx-auto max-w-[1280px] grid grid-cols-3 items-center px-6 py-5">
          <nav className="flex items-center gap-7 text-[12.5px] uppercase tracking-[0.16em]">
            <a href="#">Shop</a>
            <a href="#" className="hidden sm:inline">Journal</a>
            <a href="#" className="hidden sm:inline">Stockists</a>
          </nav>
          <Link href="#" className="text-center text-[28px] font-bold tracking-[-0.02em]" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            NORTHWIND
          </Link>
          <div className="flex items-center justify-end gap-4 text-[#1a1a1a]">
            <Search className="size-4" />
            <User className="size-4" />
            <Heart className="size-4" />
            <span className="relative">
              <ShoppingBag className="size-4" />
              <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#c5582b] text-[9px] font-bold text-white">3</span>
            </span>
          </div>
        </div>
      </header>

      {/* Editorial hero */}
      <section className="relative border-b border-[#1a1a1a]/10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-24">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#c5582b]">Volume One · FW26</div>
            <h1 className="mt-5 text-[clamp(48px,7vw,96px)] font-bold leading-[0.95] tracking-[-0.02em]" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
              Linen, wool,<br />
              <span className="italic text-[#c5582b]">and quiet&nbsp;rooms.</span>
            </h1>
            <p className="mt-7 max-w-[44ch] text-[15px] leading-relaxed text-[#1a1a1a]/75">
              Сорок одна вещь, отшитая в Грузии и Армении. Без сезонных коллекций,
              без скидок, без распродаж. Только то, что мы носим сами.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#shop" className="group inline-flex h-12 items-center gap-2 bg-[#1a1a1a] px-6 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#f5f1ea] hover:bg-[#c5582b]">
                Shop the volume
                <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
              </a>
              <a href="#" className="inline-flex h-12 items-center border-b-2 border-[#1a1a1a] px-1 text-[12.5px] font-semibold uppercase tracking-[0.16em] hover:text-[#c5582b] hover:border-[#c5582b]">
                The journal
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#e7e1d5]">
              <div className="size-full" style={{ background: "linear-gradient(180deg,#d4cbb8 0%,#a8a09a 60%,#5b504a 100%)" }} />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#f5f1ea] border border-[#1a1a1a]/15 px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#1a1a1a]/60">Look 12</div>
              <div className="mt-1 text-[14px] font-semibold">Wool Coat 41 · Wide-leg Trouser</div>
              <div className="mt-1 text-[12px] text-[#c5582b]">₽ 38 000 + ₽ 8 900</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b border-[#1a1a1a]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {["Outerwear", "Knitwear", "Tops", "Bottoms", "Footwear", "Accessories"].map((c, i) => (
              <a key={c} href="#" className="group flex items-center justify-between border-b border-[#1a1a1a]/10 py-3 hover:border-[#c5582b]">
                <span className="text-[12.5px] uppercase tracking-[0.14em] group-hover:text-[#c5582b]">{c}</span>
                <span className="text-[11px] text-[#1a1a1a]/40">{(48 - i * 3)}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section id="shop" className="border-b border-[#1a1a1a]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#c5582b]">FW26 · 41 pieces</div>
              <h2 className="mt-3 text-[36px] font-semibold tracking-tight" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
                The volume
              </h2>
            </div>
            <div className="hidden items-center gap-4 text-[12px] uppercase tracking-[0.14em] text-[#1a1a1a]/60 md:flex">
              <span>Sort: Newest</span>
              <span>·</span>
              <span>Filter (3)</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
            {PRODUCTS.map((p) => (
              <a key={p.id} href="#" className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e1d5]">
                  <div className="size-full transition group-hover:scale-[1.03]" style={{ background: SWATCH[p.color] }} />
                  {p.tag && (
                    <div className="absolute left-3 top-3 bg-[#1a1a1a] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#f5f1ea]">
                      {p.tag === "new" ? "New" : p.tag === "best" ? "Bestseller" : "Final pieces"}
                    </div>
                  )}
                  <button className="absolute bottom-3 right-3 grid size-8 place-items-center bg-[#f5f1ea] text-[#1a1a1a] opacity-0 transition group-hover:opacity-100">
                    <Heart className="size-3.5" />
                  </button>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[10.5px] uppercase tracking-[0.16em] text-[#1a1a1a]/55">{p.cat}</div>
                    <div className="mt-0.5 truncate text-[14px] font-semibold">{p.name}</div>
                  </div>
                  <div className="shrink-0 text-[13px] font-semibold tabular-nums text-[#c5582b]">{p.price}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split */}
      <section className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-[#f5f1ea]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:gap-20">
          <div className="aspect-[4/3] w-full" style={{ background: "linear-gradient(135deg,#c5582b 0%,#7c1d0a 100%)" }} />
          <div className="flex flex-col justify-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#c5582b]">From the journal</div>
            <h3 className="mt-4 text-[36px] font-semibold leading-tight tracking-tight" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
              Зачем мы шьём в Гюмри.
            </h3>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-[#f5f1ea]/75">
              Один цех, девятнадцать швей, восемь лет вместе. Минимальный заказ —
              сорок одна вещь. Никаких посредников. Никаких «коллекций к чёрной пятнице».
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 border-b-2 border-[#c5582b] py-2 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#f5f1ea] w-fit">
              Read the essay <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-[#1a1a1a]/10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {[
            [Truck,    "Доставка завтра",  "СДЭК · Boxberry · Почта России"],
            [RotateCcw, "30 дней на возврат", "Бесплатно, без вопросов"],
            [Shield,    "Гарантия года",    "На все вещи — обмен или ремонт"],
            [Star,      "4.9 / 5",         "По отзывам 2 318 клиентов"],
          ].map(([Icon, t, s]: any) => (
            <div key={t} className="flex items-start gap-3">
              <Icon className="size-5 text-[#c5582b]" />
              <div>
                <div className="text-[13px] font-semibold">{t}</div>
                <div className="text-[11.5px] text-[#1a1a1a]/55">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f1ea]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="text-[26px] font-bold" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>NORTHWIND</div>
            <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-[#1a1a1a]/65">
              Гончарная 12, Москва. Studio open Wed–Sun, 12:00–20:00.
            </p>
            <form className="mt-5 flex border border-[#1a1a1a]/15">
              <input placeholder="email" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[12.5px] outline-none placeholder:text-[#1a1a1a]/50" />
              <button className="bg-[#1a1a1a] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[#f5f1ea]">Join</button>
            </form>
          </div>
          {[
            ["Shop", ["Outerwear", "Knitwear", "Tops", "Bottoms", "Footwear"]],
            ["Help", ["Shipping", "Returns", "Sizing", "FAQ", "Contact"]],
            ["About", ["The studio", "Journal", "Stockists", "Wholesale", "Press"]],
          ].map(([h, items]: any) => (
            <div key={h}>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#c5582b]">{h}</div>
              <ul className="mt-3 space-y-2 text-[12.5px]">
                {items.map((x: string) => <li key={x}><a href="#" className="hover:text-[#c5582b]">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1a1a1a]/10">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.16em] text-[#1a1a1a]/55">
            <span>© NORTHWIND, 2023–2026</span>
            <span>RU · EUR · USD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
