import { ArrowRight, BookOpen, GraduationCap, Users, Play, Award, Sparkles, Clock } from "lucide-react";

/* SAPERE ACADEMY — friendly editorial online school, warm earth tones.
   Palette: parchment #f6efe1, ink #2b211c, terracotta #c0512f, sage #6c8a5f, ochre #d8a83d.
   Type: Fraunces (warm serif) + Inter. Inspired by Maven, Domestika. */

export const SchoolMeta = {
  brand: "Sapere Academy",
  description: "Демо: онлайн-школа с программой курсов, преподавателями и кейсами выпускников.",
  color: "#c0512f",
};

const COURSES = [
  { code: "01", title: "Веб-разработка с нуля", dur: "16 недель", lvl: "junior", price: "от 4 900 ₽/мес", color: "#c0512f", icon: <BookOpen className="size-5" /> },
  { code: "02", title: "Продуктовый дизайн",    dur: "12 недель", lvl: "middle", price: "от 5 900 ₽/мес", color: "#6c8a5f", icon: <Sparkles className="size-5" /> },
  { code: "03", title: "Data Science на Python", dur: "20 недель", lvl: "от middle", price: "от 7 400 ₽/мес", color: "#d8a83d", icon: <GraduationCap className="size-5" /> },
  { code: "04", title: "Английский для IT",     dur: "8 недель",  lvl: "B1 → B2", price: "от 2 900 ₽/мес", color: "#2b211c", icon: <BookOpen className="size-5" /> },
];

const TUTORS = [
  { name: "Анна Кудрина",   role: "Lead Designer, Yandex",     pic: "linear-gradient(135deg,#e8b89c,#c0512f)" },
  { name: "Михаил Дронов",  role: "Staff Engineer, Tinkoff",   pic: "linear-gradient(135deg,#cdd9b8,#6c8a5f)" },
  { name: "Елена Прохорова",role: "Ex-Avito · Data Lead",      pic: "linear-gradient(135deg,#f0d68a,#d8a83d)" },
  { name: "Григорий Шпак",  role: "Founder · Cyrillic Studio", pic: "linear-gradient(135deg,#cfc1b0,#2b211c)" },
];

const ALUMNI = [
  { name: "Алексей",     was: "Бариста", now: "Junior Frontend → 120K ₽" },
  { name: "Маша",        was: "Менеджер по продажам", now: "Product Designer → 180K ₽" },
  { name: "Тимур",       was: "Студент 3 курса", now: "Data Analyst → 150K ₽" },
];

export function SchoolDemo() {
  return (
    <div className="min-h-screen bg-[#f6efe1] text-[#2b211c]" style={{ fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}</style>

      {/* NAV */}
      <header className="border-b border-[#2b211c]/10">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5">
          <a href="#" className="flex items-baseline gap-2">
            <span className="text-[28px] font-semibold leading-none tracking-tight" style={{ fontFamily: '"Fraunces", serif', fontVariationSettings: '"SOFT" 100' }}>
              Sapere
            </span>
            <span className="text-[12px] uppercase tracking-[0.22em] text-[#2b211c]/50">academy</span>
          </a>
          <nav className="hidden gap-7 text-[14px] text-[#2b211c]/80 md:flex">
            <a href="#courses" className="hover:text-[#c0512f]">Курсы</a>
            <a href="#tutors" className="hover:text-[#c0512f]">Преподаватели</a>
            <a href="#alumni" className="hover:text-[#c0512f]">Выпускники</a>
            <a href="#" className="hover:text-[#c0512f]">Журнал</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#" className="hidden text-[14px] text-[#2b211c]/80 md:block">Войти</a>
            <a href="#courses" className="inline-flex items-center gap-1.5 rounded-full bg-[#c0512f] px-4 py-2 text-[13px] font-medium text-[#f6efe1] hover:bg-[#2b211c]">
              Каталог курсов <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#2b211c]/10">
        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-[520px] rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(circle, #d8a83d 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-[480px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #c0512f 0%, transparent 70%)" }} />

        <div className="relative mx-auto grid max-w-[1240px] grid-cols-12 gap-8 px-6 py-24">
          <div className="col-span-12 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2b211c]/20 bg-white/50 px-3 py-1 text-[12px] backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#6c8a5f]" />
              Новый поток стартует 1 сентября
            </div>
            <h1 className="mt-6 text-[clamp(54px,8vw,116px)] font-medium leading-[0.95] tracking-[-0.025em]" style={{ fontFamily: '"Fraunces", serif', fontVariationSettings: '"SOFT" 50, "opsz" 144' }}>
              Учитесь у тех, кто <em className="italic text-[#c0512f]">делает</em>.
              <br />
              Не у тех, кто <span className="line-through decoration-[#c0512f]/40">рассказывает</span>.
            </h1>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-[#2b211c]/70">
              Онлайн-академия с программами по дизайну, разработке и данным. Маленькие группы по 12 человек, индивидуальный ментор на весь курс, гарантия трудоустройства после защиты диплома.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#courses" className="inline-flex items-center gap-2 rounded-full bg-[#2b211c] px-6 py-3 text-[14px] font-medium text-[#f6efe1] hover:bg-[#c0512f]">
                Подобрать курс <ArrowRight className="size-4" />
              </a>
              <a href="#" className="group inline-flex items-center gap-2 text-[14px] text-[#2b211c]/80 hover:text-[#c0512f]">
                <span className="grid size-10 place-items-center rounded-full bg-white shadow-md transition group-hover:scale-110">
                  <Play className="size-3.5 fill-current" />
                </span>
                Смотреть открытый урок (4 мин)
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[#2b211c]/10 pt-6 text-[14px]">
              <div><dt className="text-[12px] uppercase tracking-[0.18em] text-[#2b211c]/50">Студентов</dt><dd className="mt-1 text-[26px]" style={{ fontFamily: '"Fraunces", serif' }}>14 200</dd></div>
              <div><dt className="text-[12px] uppercase tracking-[0.18em] text-[#2b211c]/50">Курсов</dt><dd className="mt-1 text-[26px]" style={{ fontFamily: '"Fraunces", serif' }}>28</dd></div>
              <div><dt className="text-[12px] uppercase tracking-[0.18em] text-[#2b211c]/50">Трудоустр.</dt><dd className="mt-1 text-[26px]" style={{ fontFamily: '"Fraunces", serif' }}>91%</dd></div>
            </dl>
          </div>

          {/* Visual stack */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-[520px]">
              {/* Card 1 — course card */}
              <div className="absolute left-2 top-4 w-[290px] rotate-[-3deg] rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#c0512f]">
                  <BookOpen className="size-3.5" /> неделя 04
                </div>
                <h3 className="mt-3 text-[22px] leading-tight" style={{ fontFamily: '"Fraunces", serif' }}>
                  Композиция и сетки
                </h3>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f6efe1]"><div className="h-full w-[62%] bg-[#c0512f]" /></div>
                <div className="mt-2 flex justify-between text-[11px] text-[#2b211c]/60"><span>62%</span><span>осталось 3 модуля</span></div>
                <div className="mt-4 flex items-center gap-2 text-[12px] text-[#2b211c]/70"><Clock className="size-3.5" /> Дедлайн 14 марта</div>
              </div>

              {/* Card 2 — tutor */}
              <div className="absolute right-0 top-32 w-[280px] rotate-[3deg] overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="h-32" style={{ background: "linear-gradient(135deg,#e8b89c,#c0512f)" }} />
                <div className="p-4">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#6c8a5f]">ваш ментор</div>
                  <div className="mt-1 text-[18px] font-medium" style={{ fontFamily: '"Fraunces", serif' }}>Анна Кудрина</div>
                  <div className="text-[12px] text-[#2b211c]/60">Lead Designer, Yandex · 8 лет в индустрии</div>
                </div>
              </div>

              {/* Card 3 — certificate */}
              <div className="absolute bottom-6 left-10 w-[300px] rotate-[2deg] rounded-2xl border-2 border-[#2b211c] bg-[#f6efe1] p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <Award className="size-5 text-[#d8a83d]" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#2b211c]/50">cert · 0042</span>
                </div>
                <div className="mt-3 text-[12px] uppercase tracking-[0.18em] text-[#2b211c]/60">сертификат</div>
                <div className="mt-1 text-[22px] leading-tight" style={{ fontFamily: '"Fraunces", serif' }}>
                  Веб-разработка
                  <br />
                  <span className="italic text-[#c0512f]">с отличием</span>
                </div>
                <div className="mt-3 border-t border-dashed border-[#2b211c]/30 pt-2 text-[11px] text-[#2b211c]/60">Sapere Academy · подпись ректора</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="border-b border-[#2b211c]/10">
        <div className="mx-auto max-w-[1240px] px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-[#c0512f]">— программа —</div>
              <h2 className="mt-2 text-[52px] font-medium leading-[1.02] tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
                Выберите свой путь.
              </h2>
            </div>
            <a href="#" className="hidden text-[14px] text-[#2b211c]/70 hover:text-[#c0512f] md:inline">Все 28 курсов →</a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COURSES.map((c) => (
              <article key={c.code} className="group flex flex-col overflow-hidden rounded-2xl border border-[#2b211c]/10 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-32 items-end justify-between p-5 text-white" style={{ background: c.color }}>
                  <div className="text-[11px] uppercase tracking-[0.22em] opacity-80">№ {c.code}</div>
                  <div className="opacity-90">{c.icon}</div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[22px] leading-tight" style={{ fontFamily: '"Fraunces", serif' }}>{c.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em] text-[#2b211c]/60">
                    <span className="rounded-full border border-[#2b211c]/15 px-2 py-0.5">{c.dur}</span>
                    <span className="rounded-full border border-[#2b211c]/15 px-2 py-0.5">{c.lvl}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <div className="text-[13px] font-medium">{c.price}</div>
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-[#2b211c]/10 bg-[#2b211c] text-[#f6efe1]">
        <div className="mx-auto max-w-[1240px] px-6 py-24">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-5">
              <div className="text-[12px] uppercase tracking-[0.22em] text-[#d8a83d]">— почему мы —</div>
              <h2 className="mt-3 text-[44px] leading-[1.05] tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
                Образование, в котором не стыдно <em className="text-[#d8a83d]">признаться</em>.
              </h2>
            </div>
            <div className="col-span-12 grid grid-cols-2 gap-8 md:col-span-7">
              {[
                { i: <Users className="size-5" />, t: "Группа 12 человек", b: "Не «потоки на 800 студентов». Каждого видим, каждому отвечаем в течение дня." },
                { i: <GraduationCap className="size-5" />, t: "Ментор-практик", b: "Не диктор курса, а действующий специалист — даёт ревью кода/макетов раз в неделю." },
                { i: <Award className="size-5" />, t: "Защита диплома", b: "Реальный проект, реальное жюри из CTO и Design-директоров. Не «галочка»." },
                { i: <Sparkles className="size-5" />, t: "Помощь с работой", b: "Резюме, тренировочные собеседования, рекомендации в 30+ компаний-партнёров." },
              ].map((x) => (
                <div key={x.t}>
                  <div className="flex size-10 items-center justify-center rounded-full border border-[#d8a83d]/40 text-[#d8a83d]">{x.i}</div>
                  <h3 className="mt-4 text-[20px]" style={{ fontFamily: '"Fraunces", serif' }}>{x.t}</h3>
                  <p className="mt-2 text-[13px] text-[#f6efe1]/65">{x.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TUTORS */}
      <section id="tutors" className="border-b border-[#2b211c]/10">
        <div className="mx-auto max-w-[1240px] px-6 py-24">
          <div className="mb-10">
            <div className="text-[12px] uppercase tracking-[0.22em] text-[#c0512f]">— наставники —</div>
            <h2 className="mt-2 text-[44px] font-medium leading-tight tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
              Учат те, кому верит индустрия.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {TUTORS.map((t) => (
              <figure key={t.name} className="group overflow-hidden rounded-2xl bg-white">
                <div className="aspect-[3/4]" style={{ background: t.pic }} />
                <figcaption className="p-4">
                  <div className="text-[16px] font-medium" style={{ fontFamily: '"Fraunces", serif' }}>{t.name}</div>
                  <div className="mt-1 text-[12px] text-[#2b211c]/60">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI */}
      <section id="alumni" className="border-b border-[#2b211c]/10 bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-24">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-5">
              <div className="text-[12px] uppercase tracking-[0.22em] text-[#6c8a5f]">— выпускники —</div>
              <h2 className="mt-2 text-[44px] font-medium leading-tight tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
                Свои истории — без приукрас.
              </h2>
              <p className="mt-4 max-w-md text-[14px] text-[#2b211c]/65">
                Не «изменили жизнь за 2 недели». Реальные траектории людей, которые шли по 8–12 месяцев и сейчас работают в продуктовых командах.
              </p>
            </div>
            <div className="col-span-12 grid grid-cols-1 gap-4 md:col-span-7">
              {ALUMNI.map((a, i) => (
                <div key={a.name} className="flex items-center gap-5 rounded-2xl border border-[#2b211c]/10 p-5">
                  <div className="size-16 shrink-0 rounded-full" style={{ background: ["linear-gradient(135deg,#e8b89c,#c0512f)","linear-gradient(135deg,#cdd9b8,#6c8a5f)","linear-gradient(135deg,#f0d68a,#d8a83d)"][i] }} />
                  <div className="flex-1">
                    <div className="text-[18px]" style={{ fontFamily: '"Fraunces", serif' }}>{a.name}</div>
                    <div className="text-[13px] text-[#2b211c]/60">было: {a.was}</div>
                  </div>
                  <div className="text-right text-[14px] font-medium text-[#c0512f]">→ {a.now}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[#2b211c]/10">
        <div className="mx-auto max-w-[1240px] px-6 py-24 text-center">
          <h2 className="mx-auto max-w-3xl text-[clamp(40px,6vw,80px)] font-medium leading-[1.02] tracking-tight" style={{ fontFamily: '"Fraunces", serif' }}>
            Учиться — это <em className="italic text-[#c0512f]">привычка</em>.
            <br />
            Начнём её сегодня?
          </h2>
          <div className="mt-8 flex justify-center gap-3">
            <a href="#courses" className="inline-flex items-center gap-2 rounded-full bg-[#2b211c] px-7 py-4 text-[14px] font-medium text-[#f6efe1] hover:bg-[#c0512f]">
              Подобрать курс <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f6efe1]">
        <div className="mx-auto max-w-[1240px] px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-[#2b211c]/15 pt-8 md:flex-row md:items-center">
            <div>
              <div className="text-[22px]" style={{ fontFamily: '"Fraunces", serif' }}>Sapere Academy</div>
              <div className="text-[12px] text-[#2b211c]/55">Москва · ул. Малая Бронная, 14 · с 2018 года</div>
            </div>
            <div className="flex flex-wrap gap-6 text-[13px] text-[#2b211c]/70">
              <a href="#">Telegram</a><a href="#">VK</a><a href="#">YouTube</a><a href="#">Дзен</a><a href="#">Журнал</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
