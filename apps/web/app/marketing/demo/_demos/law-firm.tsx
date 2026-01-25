import { ArrowRight, Phone, Mail, Scale, Award, FileText, Briefcase } from "lucide-react";

/* KARP & STEIN — conservative editorial law firm.
   Palette: ivory #f8f5ee, navy #0b1f44, gold #b58a40, ink #1c1b18.
   Type: Caslon-style serif (Source Serif 4) + sans body. */

export const LawFirmMeta = {
  brand: "Karp & Stein Associates",
  description: "Демо: юридическая фирма с практиками, партнёрами и кейсами.",
  color: "#0b1f44",
};

const PRACTICES = [
  ["Корпоративное право",   "M&A, реструктуризации, корпоративные споры", "01"],
  ["Налоги и финансы",      "Сопровождение крупных сделок, IPO, налоговая защита", "02"],
  ["Антимонопольное",       "Защита перед ФАС, согласование сделок", "03"],
  ["IP и технологии",       "Патенты, торговые марки, лицензионные споры", "04"],
  ["Trust и наследство",    "Семейные офисы, частные фонды, эмиграция", "05"],
  ["Уголовное и комплаенс", "Защита бизнеса, KYC/AML, расследования", "06"],
];

const PARTNERS = [
  { name: "Михаил Карп",     role: "Управляющий партнёр", since: "1998", init: "МК" },
  { name: "Анна Штейн",      role: "Старший партнёр · M&A", since: "2002", init: "АШ" },
  { name: "Игорь Левченко",  role: "Партнёр · налоги",     since: "2008", init: "ИЛ" },
  { name: "Лусине Маркарян", role: "Партнёр · IP",         since: "2011", init: "ЛМ" },
];

const CASES = [
  ["№ 41-2024",     "Защита крупнейшего ритейлера в споре с ФАС на 18 млрд ₽", "выиграно"],
  ["№ 38-2024",     "Сопровождение трансграничной сделки M&A на €240 млн", "закрыто"],
  ["№ 22-2024",     "Реструктуризация группы из 14 компаний для IPO в Лондоне", "в работе"],
  ["№ 09-2023",     "Защита патентов клиента в трёх юрисдикциях", "выиграно"],
];

export function LawFirmDemo() {
  return (
    <div
      className="min-h-screen bg-[#f8f5ee] text-[#1c1b18] antialiased"
      style={{ fontFamily: '"Source Serif 4", "PT Serif", Georgia, serif' }}
    >
      {/* Masthead */}
      <div className="border-b border-[#1c1b18]/15 bg-[#0b1f44] text-[#f8f5ee]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-2 text-[11px] uppercase tracking-[0.2em]">
          <span>Москва · Лондон · Цюрих · Дубай</span>
          <span className="hidden sm:inline">Member of ILS · 2008</span>
          <span className="hidden md:inline">+7 (495) 41 84 200</span>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b-2 border-[#1c1b18]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto_1fr] items-end px-6 py-7">
          <nav className="flex items-baseline gap-8 text-[13px] uppercase tracking-[0.15em] text-[#1c1b18]/80">
            <a href="#practices" className="hover:text-[#0b1f44]">Практики</a>
            <a href="#partners" className="hover:text-[#0b1f44]">Партнёры</a>
            <a href="#cases" className="hidden hover:text-[#0b1f44] sm:inline">Дела</a>
          </nav>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#b58a40]">est. mcmxcviii · Moscow</div>
            <div className="mt-1 text-[34px] font-bold tracking-tight leading-none">
              KARP <span className="font-light italic">&amp;</span> STEIN
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#1c1b18]/55">associates</div>
          </div>
          <div className="flex items-baseline justify-end gap-3">
            <a href="#" className="hidden text-[13px] uppercase tracking-[0.15em] text-[#1c1b18]/75 hover:text-[#0b1f44] md:inline">Публикации</a>
            <a href="#contact" className="inline-flex h-10 items-center gap-2 border-2 border-[#0b1f44] px-5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#0b1f44] hover:bg-[#0b1f44] hover:text-[#f8f5ee]">
              Консультация
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#1c1b18]/15">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#b58a40]">Двадцать восемь лет в&nbsp;корпоративной практике</div>
            <h1 className="mt-7 text-[clamp(54px,8.5vw,124px)] font-bold leading-[0.94] tracking-[-0.018em]">
              Защищаем тех, кто <span className="italic font-normal text-[#0b1f44]">строит.</span>
            </h1>
            <p className="mt-8 max-w-[52ch] text-[17.5px] leading-[1.65] text-[#1c1b18]/75">
              Корпоративное право, M&amp;A, налоги, IP, антимонопольное.
              42&nbsp;юриста, 4&nbsp;офиса, 600+&nbsp;завершённых сделок на&nbsp;общую сумму свыше &euro;&nbsp;38&nbsp;млрд.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#contact" className="group inline-flex h-12 items-center gap-2 bg-[#0b1f44] px-6 text-[13px] font-bold uppercase tracking-[0.18em] text-[#f8f5ee] hover:bg-[#1c2f54]">
                Записаться на встречу
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#practices" className="text-[13px] uppercase tracking-[0.18em] underline underline-offset-8 decoration-[#b58a40] hover:text-[#b58a40]">
                Наши практики
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="border-l-4 border-[#b58a40] pl-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#b58a40]">Рейтинги</div>
              <ul className="mt-3 space-y-2 text-[14px]">
                <li>Chambers Europe · Band 1, Corporate / M&amp;A</li>
                <li>Legal 500 · Top Tier · Tax</li>
                <li>Forbes 500 · Best Law Firm 2024</li>
                <li>Pravo.ru-300 · #4 по выручке</li>
              </ul>
            </div>
            <div className="border-l-4 border-[#0b1f44] pl-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0b1f44]">Команда</div>
              <ul className="mt-3 space-y-2 text-[14px]">
                <li>42 юриста, 11&nbsp;партнёров</li>
                <li>4 офиса · Москва, Лондон, Цюрих, Дубай</li>
                <li>EN · DE · FR · AR · RU · HY</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Practices */}
      <section id="practices" className="border-b border-[#1c1b18]/15 bg-[#f1ecdf]/50">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid grid-cols-[auto_1fr] items-end gap-8 border-b border-[#1c1b18]/30 pb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#b58a40]">Глава I</div>
              <div className="mt-1 text-[44px] font-bold tracking-tight">Практики</div>
            </div>
            <div className="text-right text-[13px] italic text-[#1c1b18]/60">
              Шесть направлений · единый стандарт
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {PRACTICES.map(([t, d, n], i) => (
              <div key={t} className={`group border-b border-[#1c1b18]/15 p-6 md:p-8 ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} ${i % 3 === 2 ? "lg:border-r-0" : ""}`}>
                <div className="flex items-baseline justify-between">
                  <div className="text-[44px] font-bold leading-none text-[#0b1f44]" style={{ fontVariantNumeric: "lining-nums" }}>{n}</div>
                  <Scale className="size-4 text-[#b58a40] opacity-60" />
                </div>
                <h3 className="mt-5 text-[24px] font-bold tracking-tight">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#1c1b18]/70">{d}</p>
                <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-[#0b1f44] hover:text-[#b58a40]">
                  Подробнее <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="border-b border-[#1c1b18]/15">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#b58a40]">Глава II</div>
            <h2 className="mt-2 text-[56px] font-bold tracking-tight">Партнёры</h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[14.5px] italic text-[#1c1b18]/65">
              Каждый партнёр лично ведёт ваше дело. Никаких «направим помощника».
            </p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-4">
            {PARTNERS.map((p) => (
              <div key={p.name}>
                <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-[#1c1b18] bg-[#0b1f44]">
                  <div className="grid size-full place-items-center font-bold leading-none text-[#b58a40]" style={{ fontSize: "clamp(60px, 7vw, 96px)" }}>
                    {p.init}
                  </div>
                  <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-[#f8f5ee]/70">с {p.since}</div>
                </div>
                <div className="mt-5">
                  <div className="text-[20px] font-bold tracking-tight leading-snug">{p.name}</div>
                  <div className="mt-1 text-[12.5px] italic text-[#0b1f44]">{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="border-b border-[#1c1b18]/15 bg-[#0b1f44] text-[#f8f5ee]">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid grid-cols-[1fr_auto] items-end gap-8 border-b border-[#f8f5ee]/15 pb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#b58a40]">Глава III</div>
              <div className="mt-1 text-[44px] font-bold tracking-tight">Избранные дела</div>
            </div>
            <Award className="size-7 text-[#b58a40]" />
          </div>
          <div className="divide-y divide-[#f8f5ee]/15">
            {CASES.map(([n, d, s]) => (
              <div key={n as string} className="grid grid-cols-1 gap-3 py-6 md:grid-cols-[140px_1fr_120px] md:items-center md:gap-8">
                <div className="text-[12px] uppercase tracking-[0.22em] text-[#b58a40] tabular-nums">{n}</div>
                <div className="text-[19px] leading-snug">{d}</div>
                <div className="text-right">
                  <span className={`inline-block border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${s === "выиграно" ? "border-emerald-300 text-emerald-300" : s === "закрыто" ? "border-[#b58a40] text-[#b58a40]" : "border-[#f8f5ee]/40 text-[#f8f5ee]/70"}`}>{s}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + footer */}
      <section id="contact">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-6 py-24 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#b58a40]">Глава IV — Контакты</div>
            <h2 className="mt-4 text-[48px] font-bold tracking-tight leading-[1.04]">
              Запишитесь на<br /><span className="italic text-[#0b1f44]">первую консультацию.</span>
            </h2>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-[#1c1b18]/70">
              45 минут, бесплатно, без обязательств. Мы оцениваем перспективу
              и обсуждаем стратегию. По итогам — фиксированный гонорар или почасовая ставка.
            </p>
            <div className="mt-8 space-y-3 text-[14px]">
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-[#b58a40]" />
                <span>+7 (495) 41 84 200 — основной</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-[#b58a40]" />
                <a href="mailto:office@karpstein.law" className="underline underline-offset-4 hover:text-[#0b1f44]">office@karpstein.law</a>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="size-4 text-[#b58a40]" />
                <span>Романов переулок 4, Москва · 8 этаж</span>
              </div>
            </div>
          </div>
          <form className="border-2 border-[#1c1b18] p-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#b58a40]">Форма обращения</div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <label className="col-span-2 text-[11.5px] uppercase tracking-[0.16em] text-[#1c1b18]/65">ФИО
                <input className="mt-1.5 w-full border-b-2 border-[#1c1b18]/30 bg-transparent py-2 text-[15px] outline-none focus:border-[#0b1f44]" />
              </label>
              <label className="text-[11.5px] uppercase tracking-[0.16em] text-[#1c1b18]/65">Компания
                <input className="mt-1.5 w-full border-b-2 border-[#1c1b18]/30 bg-transparent py-2 text-[15px] outline-none focus:border-[#0b1f44]" />
              </label>
              <label className="text-[11.5px] uppercase tracking-[0.16em] text-[#1c1b18]/65">Телефон
                <input className="mt-1.5 w-full border-b-2 border-[#1c1b18]/30 bg-transparent py-2 text-[15px] outline-none focus:border-[#0b1f44]" />
              </label>
              <label className="col-span-2 text-[11.5px] uppercase tracking-[0.16em] text-[#1c1b18]/65">Практика
                <select className="mt-1.5 w-full border-b-2 border-[#1c1b18]/30 bg-transparent py-2 text-[15px] outline-none focus:border-[#0b1f44]">
                  {PRACTICES.map(([t]) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="col-span-2 text-[11.5px] uppercase tracking-[0.16em] text-[#1c1b18]/65">Кратко о ситуации
                <textarea rows={3} className="mt-1.5 w-full border-b-2 border-[#1c1b18]/30 bg-transparent py-2 text-[15px] outline-none focus:border-[#0b1f44]" />
              </label>
            </div>
            <button className="mt-6 w-full bg-[#0b1f44] py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#f8f5ee] hover:bg-[#b58a40]">
              Отправить заявку
            </button>
            <p className="mt-3 text-center text-[10.5px] italic text-[#1c1b18]/55">
              <FileText className="mr-1 inline size-3" /> Конфиденциальность по правилам адвокатуры РФ.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t-2 border-[#1c1b18]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-6 text-[11.5px] uppercase tracking-[0.18em] text-[#1c1b18]/65">
          <span>© Karp &amp; Stein Associates · 1998 — 2026</span>
          <span>Реестр адвокатов № 77/12-481</span>
        </div>
      </footer>
    </div>
  );
}
