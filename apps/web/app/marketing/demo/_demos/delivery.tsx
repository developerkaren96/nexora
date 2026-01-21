import { ArrowRight, Truck, Clock, Package, MapPin, Phone, Zap, ShieldCheck, Box } from "lucide-react";

/* HOPLITE EXPRESS — bold athletic courier service.
   Palette: jet #0c0c0c, signal-yellow #f5e021, off-white #f4f1ea, red #d83a1f.
   Type: heavy condensed display + mono body. Brutalist sport energy. */

export const DeliveryMeta = {
  brand: "Hoplite Express",
  description: "Демо: курьерская служба с тарифами, трекингом и формой заказа.",
  color: "#f5e021",
};

const TARIFFS = [
  { code: "S-1", label: "Spartan",  weight: "до 5 кг",  promise: "60 мин",  price: "от 390 ₽",  note: "по городу" },
  { code: "S-2", label: "Phalanx",  weight: "до 25 кг", promise: "3 часа",  price: "от 890 ₽",  note: "включая ИКЕА-объёмы" },
  { code: "S-3", label: "Chariot",  weight: "до 800 кг",promise: "тот же день",price: "от 4 200 ₽", note: "грузовая газель" },
  { code: "S-4", label: "Olympian", weight: "межгород", promise: "24–48 ч",  price: "по запросу", note: "Москва ↔ СПб ежедневно" },
];

const STAGES = [
  { t: "00:00", e: "Заявка принята",     d: "Подтверждение в мессенджере" },
  { t: "00:08", e: "Курьер назначен",    d: "Маршрут построен, ETA выдан" },
  { t: "00:24", e: "Забор груза",        d: "Фото и подпись отправителя" },
  { t: "00:51", e: "В пути",             d: "GPS-трек доступен по ссылке" },
  { t: "01:14", e: "Доставлено",         d: "Фото получателя в чат" },
];

export function DeliveryDemo() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f4f1ea]" style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');`}</style>

      {/* TOP TICKER */}
      <div className="border-b border-[#f5e021]/30 bg-[#f5e021] text-[#0c0c0c]">
        <div className="overflow-hidden">
          <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="px-6">★ САМОВЫВОЗ ИЗ 14 СКЛАДОВ · СТРАХОВКА ДО 500 000 ₽ · 60-МИНУТНЫЙ ТАРИФ В МКАД · 24/7 ДИСПЕТЧЕР · GPS-ТРЕКИНГ В РЕАЛЬНОМ ВРЕМЕНИ</span>
            ))}
          </div>
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      {/* NAV */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5">
          <a href="#" className="flex items-baseline gap-2" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
            <span className="text-[26px] leading-none text-[#f5e021]">▲</span>
            <span className="text-[26px] leading-none tracking-tight">HOPLITE</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">/ express</span>
          </a>
          <nav className="hidden gap-7 text-[12px] uppercase tracking-[0.18em] text-white/70 md:flex">
            <a href="#tariffs" className="hover:text-[#f5e021]">Тарифы</a>
            <a href="#how" className="hover:text-[#f5e021]">Процесс</a>
            <a href="#track" className="hover:text-[#f5e021]">Трекинг</a>
            <a href="#order" className="hover:text-[#f5e021]">Заказать</a>
          </nav>
          <a href="#order" className="inline-flex items-center gap-2 bg-[#f5e021] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#0c0c0c] hover:bg-white">
            <Zap className="size-3.5" /> +7 (495) 60-60-606
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-8 py-16">
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-4 inline-flex items-center gap-2 border border-[#f5e021]/40 bg-[#f5e021]/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#f5e021]">
              <span className="size-1.5 animate-pulse rounded-full bg-[#f5e021]" /> SQUAD 14 ONLINE · 198 АКТИВНЫХ ЗАКАЗОВ
            </div>
            <h1 className="text-[clamp(56px,9vw,148px)] font-black leading-[0.86] tracking-[-0.04em]" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
              ВЕЗЁМ.
              <br />
              КАК <span className="text-[#f5e021]">СПАРТАНЦЫ.</span>
              <br />
              <span className="text-white/40">БЕЗ ОПРАВДАНИЙ.</span>
            </h1>
            <p className="mt-8 max-w-[520px] text-[14px] leading-relaxed text-white/70">
              Городская и междугородняя доставка для бизнеса. 14 складов, 380 курьеров, среднее время прибытия на адрес 47 минут. Страхуем груз, документируем каждый шаг, не теряем посылки с 2017 года.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#order" className="inline-flex items-center gap-2 bg-[#f5e021] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0c0c0c] hover:bg-white">
                Оформить доставку <ArrowRight className="size-4" />
              </a>
              <a href="#tariffs" className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] hover:border-[#f5e021] hover:text-[#f5e021]">
                Тарифы и зоны
              </a>
            </div>
          </div>
          <aside className="col-span-12 lg:col-span-4">
            <div className="border border-[#f5e021]/30 bg-gradient-to-br from-[#f5e021]/10 to-transparent p-6">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.22em] text-white/40">
                <span>LIVE DASHBOARD</span>
                <span className="text-[#f5e021]">▌▌▌</span>
              </div>
              <dl className="space-y-4 text-[12px]">
                <Stat label="Средн. доставка" value="00:47" sub="мин по МКАД" />
                <Stat label="Активные курьеры" value="380" sub="на смене сейчас" />
                <Stat label="Sucessful rate" value="99.7%" sub="за последние 30 дней" />
                <Stat label="Складов в сети" value="14" sub="Москва + 9 городов" />
              </dl>
            </div>
            <div className="mt-4 border border-white/10 p-5 text-[11px] uppercase tracking-[0.18em] text-white/50">
              ▲ HQ: МОСКВА · СКЛАДЫ В СПБ · КАЗАНИ · ЕКАТЕРИНБУРГЕ · НИЖНЕМ НОВГОРОДЕ · СОЧИ · КРАСНОДАРЕ · НОВОСИБИРСКЕ · РОСТОВЕ · УФЕ
            </div>
          </aside>
        </div>
      </section>

      {/* TARIFFS TABLE */}
      <section id="tariffs" className="border-b border-white/10 bg-[#f4f1ea] text-[#0c0c0c]">
        <div className="mx-auto max-w-[1400px] px-8 py-20">
          <div className="mb-10 flex items-end justify-between border-b-2 border-[#0c0c0c] pb-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0c0c0c]/50">§ 02 / ТАРИФЫ</div>
              <h2 className="mt-1 text-[44px] font-black leading-none tracking-tight" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                ВЫБЕРИ СВОЕГО ВОИНА
              </h2>
            </div>
            <div className="hidden text-right text-[11px] uppercase tracking-[0.18em] text-[#0c0c0c]/60 md:block">
              Цены без НДС / Тариф закрепляется при подписании договора
            </div>
          </div>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
            {TARIFFS.map((t, i) => (
              <div key={t.code} className={`border border-[#0c0c0c] p-6 ${i !== 3 ? "md:border-r-0" : ""} ${i === 1 ? "bg-[#0c0c0c] text-[#f5e021]" : "bg-[#f4f1ea]"}`}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] opacity-60">{t.code}</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] opacity-60">{t.weight}</span>
                </div>
                <h3 className="mt-6 text-[34px] font-black leading-none" style={{ fontFamily: '"Archivo Black", sans-serif' }}>{t.label}</h3>
                <div className="mt-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em]">
                  <Clock className="size-3.5" /> {t.promise}
                </div>
                <div className="mt-3 text-[22px] font-bold">{t.price}</div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] opacity-60">{t.note}</p>
                <button className={`mt-8 w-full border ${i === 1 ? "border-[#f5e021] hover:bg-[#f5e021] hover:text-[#0c0c0c]" : "border-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-[#f5e021]"} py-3 text-[11px] font-bold uppercase tracking-[0.18em]`}>
                  Заказать
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / STAGES */}
      <section id="how" className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-8 py-20">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f5e021]">§ 03 / ПРОЦЕСС</div>
            <h2 className="mt-2 text-[52px] font-black leading-[0.9] tracking-tight" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
              ОТ КЛИКА ДО ПОДПИСИ — <span className="text-[#f5e021]">74 МИНУТЫ.</span>
            </h2>
            <p className="mt-6 text-[13px] text-white/60">
              Реальный лог одного заказа из понедельника. Все события подтверждены отметками времени, GPS и фотофиксацией. Ничего не выдумано — выгрузка из CRM.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-[80px_1fr_2fr] text-[12px] uppercase tracking-[0.18em] text-white/40">
              <div className="border-b border-white/10 px-2 py-2">T+</div>
              <div className="border-b border-white/10 px-2 py-2">Событие</div>
              <div className="border-b border-white/10 px-2 py-2">Детали</div>
            </div>
            {STAGES.map((s, i) => (
              <div key={i} className="grid grid-cols-[80px_1fr_2fr] border-b border-white/10 hover:bg-white/[0.02]">
                <div className="border-r border-white/10 px-2 py-4 font-bold text-[#f5e021]">{s.t}</div>
                <div className="border-r border-white/10 px-2 py-4 text-[14px]">{s.e}</div>
                <div className="px-2 py-4 text-[13px] text-white/60">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING / ORDER */}
      <section id="track" className="border-b border-white/10 bg-[#f5e021] text-[#0c0c0c]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-8 py-20">
          <div className="col-span-12 md:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.22em]">§ 04 / TRACK</div>
            <h2 className="mt-2 text-[64px] font-black leading-[0.88] tracking-tight" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
              ГДЕ
              <br />
              МОЯ
              <br />
              ПОСЫЛКА?
            </h2>
            <div className="mt-8 flex max-w-[440px] border-2 border-[#0c0c0c] bg-[#f4f1ea]">
              <input
                placeholder="HX-2026-•••••••"
                className="flex-1 bg-transparent px-4 py-4 font-mono text-[14px] outline-none placeholder:text-[#0c0c0c]/40"
              />
              <button className="bg-[#0c0c0c] px-6 text-[12px] font-bold uppercase tracking-[0.18em] text-[#f5e021] hover:bg-[#d83a1f] hover:text-white">
                Найти ▶
              </button>
            </div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.18em] opacity-60">
              Номер пришёл в SMS и в чат после оформления
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="border-2 border-[#0c0c0c] bg-[#0c0c0c] p-6 text-[#f5e021]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] opacity-60">
                <span>HX-2026-44A19</span>
                <span>● В ПУТИ</span>
              </div>
              <div className="mt-4 text-[18px] uppercase tracking-tight">
                Курьер: Артём Х. · ВАЗ-2107 чёрный
              </div>
              <div className="mt-1 text-[13px] opacity-70">м. Курская → ул. Никольская, 10 · ETA 14:38</div>
              {/* Faux map */}
              <div className="mt-5 h-44 border border-[#f5e021]/30">
                <svg viewBox="0 0 400 160" className="size-full">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f5e021" strokeOpacity="0.1" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="160" fill="url(#grid)" />
                  <path d="M 30 130 Q 110 60 200 90 T 360 30" stroke="#f5e021" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                  <circle cx="30" cy="130" r="5" fill="#f5e021" />
                  <circle cx="360" cy="30" r="5" fill="#d83a1f" />
                  <circle cx="200" cy="90" r="7" fill="#f5e021" stroke="#0c0c0c" strokeWidth="2">
                    <animate attributeName="r" values="5;9;5" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="38" y="148" fill="#f5e021" fontSize="9" fontFamily="JetBrains Mono">START</text>
                  <text x="328" y="20" fill="#d83a1f" fontSize="9" fontFamily="JetBrains Mono">FINISH</text>
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.18em]">
                <div><div className="opacity-60">Дист.</div><div className="text-[16px]">4.2 км</div></div>
                <div><div className="opacity-60">ETA</div><div className="text-[16px]">12 мин</div></div>
                <div><div className="opacity-60">Скор.</div><div className="text-[16px]">38 км/ч</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-8 py-20">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f5e021]">§ 05 / FOR BUSINESS</div>
            <h2 className="mt-2 text-[48px] font-black leading-[0.9] tracking-tight" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
              ИНТЕГРАЦИЯ ЗА ВЕЧЕР, А НЕ ЗА КВАРТАЛ.
            </h2>
            <p className="mt-6 max-w-md text-[13px] text-white/60">
              REST API, webhook-и на каждое событие, готовые модули для 1С, Tilda, Bitrix, InSales, Shopify, МойСклад. Тестовый ключ выдаём в день обращения, договор подписываем без переговорщиков.
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-px bg-white/10 md:col-span-7 md:grid-cols-3">
            {["1С", "TILDA", "INSALES", "BITRIX", "МОЙСКЛАД", "SHOPIFY"].map((b) => (
              <div key={b} className="flex h-24 items-center justify-center bg-[#0c0c0c] text-[14px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-[#f5e021]">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-8 py-20">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#f5e021]">§ 06 / ORDER</div>
              <h2 className="mt-2 text-[44px] font-black leading-[0.95] tracking-tight" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                ОФОРМИ <span className="text-[#f5e021]">/</span> ЗА 90 СЕКУНД.
              </h2>
              <ul className="mt-8 space-y-3 text-[12px] uppercase tracking-[0.16em] text-white/60">
                <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#f5e021]" /> Страховка груза</li>
                <li className="flex items-center gap-2"><Package className="size-4 text-[#f5e021]" /> Упаковка по запросу</li>
                <li className="flex items-center gap-2"><Truck className="size-4 text-[#f5e021]" /> Безналичный расчёт</li>
                <li className="flex items-center gap-2"><Phone className="size-4 text-[#f5e021]" /> Звонок диспетчера за 5 мин</li>
              </ul>
            </div>
            <form className="col-span-12 grid grid-cols-2 gap-3 md:col-span-8">
              <Field label="Откуда" placeholder="Москва, ул. Большая Дмитровка, 5" />
              <Field label="Куда" placeholder="Москва, Никольская, 10" />
              <Field label="Вес, кг" placeholder="2.5" />
              <Field label="Когда забрать" placeholder="Сегодня, 14:30" />
              <Field label="Тариф" placeholder="Phalanx · 3 часа" />
              <Field label="Телефон" placeholder="+7 (___) ___-__-__" />
              <div className="col-span-2 mt-2 flex items-center justify-between border-t border-white/10 pt-5">
                <div className="text-[12px] uppercase tracking-[0.18em] text-white/60">
                  Итого: <span className="text-[18px] font-bold text-[#f5e021]">890 ₽</span>
                </div>
                <button className="inline-flex items-center gap-3 bg-[#f5e021] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0c0c0c] hover:bg-white">
                  Подтвердить заказ <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f5e021] text-[#0c0c0c]">
        <div className="mx-auto max-w-[1400px] px-8 py-12">
          <div className="grid grid-cols-12 items-end gap-8 border-b-2 border-[#0c0c0c] pb-8">
            <div className="col-span-12 md:col-span-6">
              <div className="text-[clamp(72px,12vw,180px)] font-black leading-[0.85] tracking-[-0.04em]" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                HOPLITE.
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-3 gap-6 text-[11px] uppercase tracking-[0.18em] md:col-span-6">
              <div>
                <div className="font-bold">Сервис</div>
                <ul className="mt-2 space-y-1 opacity-70"><li>Тарифы</li><li>API</li><li>Зоны</li><li>FAQ</li></ul>
              </div>
              <div>
                <div className="font-bold">Связь</div>
                <ul className="mt-2 space-y-1 opacity-70"><li>+7 495 60 60 606</li><li>ops@hoplite.ru</li><li>Чат 24/7</li></ul>
              </div>
              <div>
                <div className="font-bold">Юр.</div>
                <ul className="mt-2 space-y-1 opacity-70"><li>Договор</li><li>Оферта</li><li>Политика</li></ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-5 text-[10px] uppercase tracking-[0.22em] opacity-60">
            <span>© 2026 HOPLITE EXPRESS</span>
            <span>BUILT FOR THE LONG HAUL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="flex items-end justify-between border-b border-white/5 pb-3">
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</div>
        <div className="mt-1 text-[28px] font-bold leading-none text-[#f5e021]" style={{ fontFamily: '"Archivo Black", sans-serif' }}>{value}</div>
      </div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/40">{sub}</div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.22em] text-white/50">{label}</span>
      <input placeholder={placeholder} className="border border-white/15 bg-white/[0.03] px-3 py-3 font-mono text-[13px] outline-none focus:border-[#f5e021]" />
    </label>
  );
}
