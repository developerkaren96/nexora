import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Sparkles, Check, ChevronRight, X,
  Globe, Smartphone, BarChart3, Shield, Zap, Layers,
  ShoppingBag, UtensilsCrossed, Scissors, Stethoscope, Scale, Home as HomeIcon,
  Truck, Database, GraduationCap, CalendarCheck2, Building2, Car,
  Star, Quote, Flame, Timer, TrendingUp, Users,
  CreditCard, Receipt, Link2, Languages, UserCog, Plug,
} from "lucide-react";
import { ssrApi } from "@/lib/api";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  CountUp, ScrollProgress, SocialProofToast, StickyCtaBar, SpotlightCard, ThemeToggle,
} from "./_components/marketing-fx";

type Plan = {
  code: string; name: string; monthlyPriceUsd: number;
  maxProjects: number; maxDomains: number; maxStorageGb: number; maxSeats: number;
  features: Record<string, unknown>;
};

const BIZ_ICONS = [
  ShoppingBag, UtensilsCrossed, Scissors, Stethoscope, Scale, HomeIcon,
  Truck, Database, GraduationCap, CalendarCheck2, Building2, Car,
];

const FEATURE_ICONS = [
  Globe, Smartphone, Users, BarChart3,
  CreditCard, Receipt, Link2, Languages,
  Shield, Layers, UserCog, Plug,
];

/* Rotating business types in the hero — same Russian list everywhere. */
/* Fallback rotating list — used only if the locale dictionary doesn't provide one. */
const ROTATING_FALLBACK = ["salon", "store", "clinic", "restaurant", "school", "service"];

export default async function MarketingHome() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const plans = await ssrApi<Plan[]>("/billing/plans").catch(() => [] as Plan[]);

  return (
    <main className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-indigo-200/60 dark:bg-zinc-950 dark:text-zinc-100">
      <Keyframes />
      <ScrollProgress />
      <PromoBar />
      <Nav locale={locale} t={t} />
      <Hero t={t} />
      <ActivityTicker />
      <Trust t={t} />
      <Metrics t={t} />
      <Features t={t} />
      <ShowcaseStack t={t} />
      <Compare t={t} />
      <Businesses t={t} />
      <HowItWorks t={t} />
      <Testimonials t={t} />
      <Pricing t={t} plans={plans} />
      <Faq t={t} />
      <CtaBand t={t} />
      <Footer t={t} />
      <SocialProofToast />
      <StickyCtaBar
        label={t.sticky.label}
        cta={t.sticky.cta}
        promo="LAUNCH30 · −30%"
      />
    </main>
  );
}

/* ─────────── Inline keyframes (server component-safe) ─────────── */
function Keyframes() {
  return (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
@keyframes nx-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes nx-marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
@keyframes nx-rotate-words {
  0%, 14%   { transform: translateY(0);          }
  16%, 30%  { transform: translateY(-1.04em);    }
  32%, 46%  { transform: translateY(-2.08em);    }
  48%, 62%  { transform: translateY(-3.12em);    }
  64%, 78%  { transform: translateY(-4.16em);    }
  80%, 94%  { transform: translateY(-5.20em);    }
  96%,100%  { transform: translateY(-6.24em);    }
}
@keyframes nx-float       { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes nx-float-slow  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
@keyframes nx-bob         { 0%,100% { transform: translate(0,0) rotate(-1deg); } 50% { transform: translate(0,-5px) rotate(1deg); } }
@keyframes nx-blink       { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
@keyframes nx-draw        { from { stroke-dashoffset: var(--len, 800); } to { stroke-dashoffset: 0; } }
@keyframes nx-grow-y      { from { transform: scaleY(0.05); } to { transform: scaleY(1); } }
@keyframes nx-shine       { 0% { transform: translateX(-120%); } 60%,100% { transform: translateX(220%); } }
@keyframes nx-underline   { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes nx-fade-up     { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes nx-spin-slow   { from { transform: rotate(0); } to { transform: rotate(360deg); } }
@keyframes nx-pulse-ring  { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(2.2); opacity: 0; } }
@keyframes nx-type        { from { width: 0ch; } to { width: 22ch; } }

.nx-marquee-track   { animation: nx-marquee 28s linear infinite; will-change: transform; }
.nx-marquee-track-2 { animation: nx-marquee 38s linear infinite; will-change: transform; }
.nx-ticker-track    { animation: nx-marquee 42s linear infinite; will-change: transform; }
.nx-float           { animation: nx-float 4.5s ease-in-out infinite; }
.nx-float-slow      { animation: nx-float-slow 6s ease-in-out infinite; }
.nx-bob             { animation: nx-bob 5.5s ease-in-out infinite; }
.nx-blink           { animation: nx-blink 1.1s steps(1, end) infinite; }
.nx-shine::after    { content:""; position:absolute; inset:0; background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%); transform: translateX(-120%); animation: nx-shine 3.6s ease-in-out 1.6s infinite; pointer-events:none; }
.nx-fade-up         { animation: nx-fade-up 0.7s ease-out both; }
.nx-spin-slow       { animation: nx-spin-slow 30s linear infinite; }
.nx-draw            { stroke-dasharray: var(--len, 800); stroke-dashoffset: var(--len, 800); animation: nx-draw 2.4s ease-out 0.3s forwards; }
.nx-grow-y          { transform-origin: bottom; animation: nx-grow-y 1.1s cubic-bezier(0.2,0.8,0.2,1) both; }
.nx-rotate          { display: inline-flex; flex-direction: column; line-height: 1; animation: nx-rotate-words 12s cubic-bezier(0.65,0,0.35,1) infinite; }
.nx-tilt            { transition: transform 400ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 400ms ease; }
.nx-tilt:hover      { transform: translateY(-4px) rotate(-0.3deg); box-shadow: 0 28px 60px -30px rgba(24,24,27,0.30); }
.nx-btn-shine       { transform: translateX(-120%); will-change: transform; backface-visibility: hidden; }
.group:hover > .nx-btn-shine { animation: nx-shine 1.1s cubic-bezier(0.2,0.8,0.2,1); }
.nx-typed           { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: nx-type 3.5s steps(22) 0.3s forwards; }
.nx-underline::after{ content:""; position:absolute; left:0; right:0; bottom:-2px; height:3px; border-radius:9999px; background: linear-gradient(90deg, #6366f1, #a855f7, #6366f1); transform: scaleX(0); transform-origin: left; animation: nx-underline 1.2s cubic-bezier(0.2,0.8,0.2,1) 0.4s forwards; }

@media (prefers-reduced-motion: reduce) {
  .nx-marquee-track, .nx-marquee-track-2, .nx-ticker-track,
  .nx-float, .nx-float-slow, .nx-bob, .nx-blink, .nx-shine::after,
  .nx-spin-slow, .nx-draw, .nx-grow-y, .nx-rotate, .nx-typed, .nx-underline::after { animation: none !important; }
  .nx-typed { width: auto !important; }
  .nx-draw  { stroke-dashoffset: 0 !important; }
}
        `,
      }}
    />
  );
}

/* ─────────── Promo bar (urgency hook) ─────────── */
function PromoBar() {
  return (
    <div className="relative overflow-hidden border-b border-indigo-900/60 bg-gradient-to-r from-indigo-950 via-violet-950 to-indigo-950 text-white">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ animation: "nx-shine 5s ease-in-out infinite" }}
      />
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-[12px] md:gap-4 md:text-[12.5px]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-amber-300">
          <Flame className="size-3" /> Запуск
        </span>
        <span className="hidden text-white/85 md:inline">
          До конца месяца — <span className="font-semibold text-white">−30%</span> на первый год для новых проектов.
        </span>
        <span className="text-white/80 md:hidden">−30% на первый год</span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/5 px-1.5 py-0.5 font-mono text-[10.5px] text-white/90">
          <Timer className="size-3" />
          код <span className="font-semibold text-white">LAUNCH30</span>
        </span>
        <Link
          href="http://app.localhost:3000/register?promo=LAUNCH30"
          className="ml-1 hidden items-center gap-1 text-[11.5px] font-medium text-white underline-offset-4 hover:underline sm:inline-flex"
        >
          Активировать <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}

/* ─────────── Nav ─────────── */
function Nav({ locale, t }: { locale: Locale; t: any }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Logo />
          Nexora
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] text-zinc-600 md:flex dark:text-zinc-400">
          <Link href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100">{t.nav.features}</Link>
          <Link href="#how" className="hover:text-zinc-900 dark:hover:text-zinc-100">{t.how.title.split(" ").slice(0, 2).join(" ")}</Link>
          <Link href="#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-100">{t.nav.pricing}</Link>
          <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-100">{t.nav.docs}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher current={locale} />
          <Link
            href="http://app.localhost:3000/login"
            className="hidden h-8 items-center rounded-md px-3 text-[13px] font-medium text-zinc-700 hover:bg-zinc-100 md:inline-flex dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {t.nav.login}
          </Link>
          <Link
            href="http://app.localhost:3000/register"
            className="group relative inline-flex h-8 items-center gap-1 overflow-hidden rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            <span className="relative">{t.nav.start}</span>
            <ArrowRight className="relative size-3.5 transition group-hover:translate-x-0.5" />
            <span
              aria-hidden
              className="nx-btn-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative grid size-7 place-items-center overflow-hidden rounded-md bg-zinc-900 text-[12px] font-bold text-white">
      N
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-md bg-gradient-to-br from-indigo-500/40 via-transparent to-violet-500/40 opacity-0 transition group-hover:opacity-100"
      />
    </span>
  );
}

/* ─────────── Hero ─────────── */
function Hero({ t }: { t: any }) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      {/* aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-[560px] opacity-70"
        style={{
          background:
            "radial-gradient(40rem 24rem at 30% 30%, rgba(99,102,241,0.18), transparent), radial-gradient(36rem 22rem at 70% 40%, rgba(168,85,247,0.14), transparent), radial-gradient(28rem 18rem at 50% 70%, rgba(56,189,248,0.10), transparent)",
        }}
      />
      {/* slow orbiting conic glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[680px] -translate-x-1/2 rounded-full opacity-30 nx-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(99,102,241,0.18), rgba(168,85,247,0.08), rgba(56,189,248,0.18), rgba(99,102,241,0.18))",
          filter: "blur(40px)",
        }}
      />
      {/* hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(228 228 231) 1px, transparent 1px), linear-gradient(90deg, rgb(228 228 231) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(60% 50% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 50% at 50% 30%, black, transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <LiveBadge text={t.hero.badge} />
          {(() => {
            const rotating: string[] = (t.hero.rotating?.length ? t.hero.rotating : ROTATING_FALLBACK);
            return (
              <h1 className="mt-6 text-balance text-[40px] font-semibold leading-[1.04] tracking-tight text-zinc-900 md:text-[68px] dark:text-zinc-100">
                {t.hero.launch_verb}{" "}
                <span
                  className="relative"
                  aria-label={rotating.join(", ")}
                  style={{
                    display: "inline-grid",
                    alignItems: "baseline",
                    verticalAlign: "baseline",
                    lineHeight: 1.04,
                  }}
                >
                  {/* Ghost layer (in grid flow): invisible words reserve max width + donate baseline */}
                  {rotating.map((w, i) => (
                    <span
                      key={`g${i}`}
                      aria-hidden
                      className="invisible whitespace-nowrap pr-1"
                      style={{
                        gridArea: "1 / 1",
                        lineHeight: 1.04,
                        alignSelf: "baseline",
                      }}
                    >
                      {w}
                    </span>
                  ))}
                  {/* Animated stack: absolute, NOT a grid item — won't inflate row height */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    style={{ lineHeight: 1.04 }}
                  >
                    <span className="nx-rotate" style={{ lineHeight: 1.04 }}>
                      {[...rotating, rotating[0]].map((w, i) => (
                        <span
                          key={i}
                          className="block whitespace-nowrap bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text pr-1 text-transparent"
                          style={{ lineHeight: 1.04 }}
                        >
                          {w}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
                <br className="hidden md:block" />
                <span className="relative inline-block">
                  <span className="relative z-10">{t.hero.time_phrase}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 -z-0 h-3 origin-left bg-indigo-500/15 md:h-4"
                    style={{ animation: "nx-underline 1.2s cubic-bezier(0.2,0.8,0.2,1) 0.6s both" }}
                  />
                </span>
              </h1>
            );
          })()}
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[15px] leading-relaxed text-zinc-600 md:text-[17px] dark:text-zinc-400">
            {t.hero.value_prop}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="http://app.localhost:3000/register"
              className="group relative inline-flex h-11 items-center gap-1.5 overflow-hidden rounded-md bg-zinc-900 px-5 text-[14px] font-medium text-white shadow-[0_8px_24px_-12px_rgba(24,24,27,0.45)] transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              <span className="relative">{t.hero.cta_primary}</span>
              <ArrowRight className="relative size-4 transition group-hover:translate-x-0.5" />
              <span
                aria-hidden
                className="nx-btn-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex h-11 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-5 text-[14px] font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-emerald-600" /> Без карты
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-emerald-600" /> 14 дней trial
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-emerald-600" /> Отмена в один клик
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-600">
              <Star className="size-3 fill-amber-400 text-amber-400" /> 4.9 · 1,247 запусков
            </span>
          </div>
        </div>

        <ProductPreview />
      </div>
    </section>
  );
}

function LiveBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3.5 py-1 text-[11.5px] font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-300">
      <span className="relative grid size-2 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50" />
        <span className="relative size-1.5 rounded-full bg-emerald-500" />
      </span>
      {text}
      <span className="text-zinc-300">·</span>
      <span className="font-mono tabular-nums text-zinc-500">
        <CountUp to={1247} /> запусков
      </span>
    </span>
  );
}

function ProductPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      {/* shadow glow */}
      <div
        aria-hidden
        className="absolute -inset-x-12 -bottom-10 -top-6 -z-10 rounded-[36px] bg-gradient-to-b from-indigo-500/[0.07] via-zinc-900/[0.03] to-transparent blur-3xl"
      />

      {/* floating side cards */}
      <div className="nx-float-slow absolute -left-4 top-10 z-10 hidden md:block">
        <FloatChip
          icon={<Globe className="size-3.5" />}
          label="acme.nexora.app"
          sub="SSL · CDN"
        />
      </div>
      <div className="nx-bob absolute -right-4 top-32 z-10 hidden md:block">
        <FloatChip
          icon={<Smartphone className="size-3.5" />}
          label="iOS + Android"
          sub="Flutter · push"
        />
      </div>
      <div className="nx-float absolute -left-8 bottom-10 z-10 hidden md:block">
        <FloatChip
          icon={<BarChart3 className="size-3.5" />}
          label="+24% MRR"
          sub="за 30 дней"
          accent
        />
      </div>

      <div className="relative rounded-2xl border border-zinc-200 bg-zinc-50/70 p-2 shadow-[0_30px_70px_-30px_rgba(24,24,27,0.35)] dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/80 px-4 py-2.5 dark:border-zinc-900 dark:bg-zinc-900/60">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-zinc-300" />
              <span className="size-2.5 rounded-full bg-zinc-300" />
              <span className="size-2.5 rounded-full bg-zinc-300" />
            </div>
            <span className="ml-4 inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[10.5px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="size-1 rounded-full bg-emerald-500" />
              <span className="nx-typed">app.nexora.app/dashb</span>
              <span className="nx-blink ml-px inline-block h-[10px] w-[1px] bg-zinc-700 align-middle" />
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-600">
              <span className="relative grid size-1.5 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>

          <div className="grid gap-px bg-zinc-100 md:grid-cols-[200px_1fr] dark:bg-zinc-800">
            <aside className="hidden bg-white p-4 md:block dark:bg-zinc-950">
              <div className="mb-4 flex items-center gap-2 text-[12.5px] font-semibold">
                <Logo /> Acme Coffee
              </div>
              {[
                ["Обзор", false],
                ["Проекты", true],
                ["Домены", false],
                ["CRM", false],
                ["Аналитика", false],
                ["Биллинг", false],
                ["Настройки", false],
              ].map(([l, active]) => (
                <div
                  key={String(l)}
                  className={`mb-0.5 flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] ${
                    active ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-500"
                  }`}
                >
                  <span className={`size-1 rounded-full ${active ? "bg-indigo-500" : "bg-zinc-300"}`} />
                  {l}
                </div>
              ))}
              <div className="mt-3 rounded-md border border-indigo-200 bg-indigo-50/60 p-2.5">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-700">PRO trial</div>
                <div className="mt-1 text-[10.5px] text-indigo-700/80">осталось 11 дней</div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-indigo-200/60">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: "78%", animation: "nx-grow-y 1.4s ease-out 0.5s both" }}
                  />
                </div>
              </div>
            </aside>

            <div className="bg-white p-5 dark:bg-zinc-950">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">Workspace</p>
                  <h3 className="mt-0.5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Проекты</h3>
                </div>
                <span className="inline-flex h-7 items-center gap-1 rounded-md bg-zinc-900 px-2.5 text-[11.5px] font-medium text-white dark:bg-white dark:text-zinc-900">
                  + Создать
                </span>
              </div>

              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
                {[
                  ["Просмотры", "12,480", "+18%"],
                  ["Заказы", "324", "+9%"],
                  ["Выручка", "$8,210", "+24%"],
                ].map(([l, v, d]) => (
                  <div key={l} className="bg-white px-3 py-2.5 dark:bg-zinc-950">
                    <div className="text-[9.5px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{l}</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-[15px] font-semibold tabular-nums">{v}</span>
                      <span className="text-[10px] font-medium text-emerald-600">{d}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
                <PreviewSpark />
              </div>

              <div className="mt-3 divide-y divide-zinc-100 rounded-md border border-zinc-200 dark:divide-zinc-900 dark:border-zinc-800">
                {[
                  ["Acme Coffee", "acme.nexora.app", "Активен"],
                  ["Nova Salon", "nova.nexora.app", "Развёртывание"],
                ].map(([n, h, s]) => (
                  <div key={n} className="flex items-center gap-3 px-3 py-2">
                    <span
                      className="grid size-6 place-items-center rounded-md text-[10px] font-semibold text-white"
                      style={{ background: n === "Acme Coffee" ? "#4f46e5" : "#a855f7" }}
                    >
                      {n.slice(0, 1)}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-medium text-zinc-900 dark:text-zinc-100">{n}</div>
                      <div className="truncate font-mono text-[10px] text-zinc-500">{h}</div>
                    </div>
                    <span
                      className={`ml-auto inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${
                        s === "Активен"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {s === "Развёртывание" && (
                        <span className="grid size-1.5 place-items-center">
                          <span className="absolute size-1.5 animate-ping rounded-full bg-amber-400/60" />
                          <span className="relative size-1 rounded-full bg-amber-500" />
                        </span>
                      )}
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatChip({
  icon, label, sub, accent,
}: { icon: React.ReactNode; label: string; sub?: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-3 py-1.5 shadow-[0_8px_24px_-12px_rgba(24,24,27,0.25)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <span
        className={`grid size-6 place-items-center rounded-full ${
          accent ? "bg-indigo-600 text-white" : "bg-zinc-900 text-white"
        }`}
      >
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-[11.5px] font-semibold text-zinc-900 dark:text-zinc-100">{label}</div>
        {sub && <div className="text-[10px] text-zinc-500">{sub}</div>}
      </div>
    </div>
  );
}

function PreviewSpark() {
  const values = [3, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 17];
  const w = 600, h = 56, pad = 2;
  const max = Math.max(...values);
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${(pad + (values.length - 1) * step).toFixed(1)},${h - pad} L${pad},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-12 w-full">
      <defs>
        <linearGradient id="hSpark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#hSpark)" />
      <path
        d={d}
        fill="none"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="nx-draw"
        style={{ ["--len" as any]: 800 }}
      />
    </svg>
  );
}

/* ─────────── Activity ticker (social proof / FOMO) ─────────── */
function ActivityTicker() {
  const items = [
    ["Анна",       "запустила", "barbershop.nexora.app", "Минск"],
    ["Tigran",     "создал",    "coffeelab.nexora.app",  "Ереван"],
    ["Олег",       "запустил",  "shop.nexora.app",       "Алматы"],
    ["Mariam",     "запустила", "studio.nexora.app",     "Тбилиси"],
    ["Игорь",      "создал",    "pizzeria.nexora.app",   "СПб"],
    ["Davit",      "запустил",  "agency.nexora.app",     "Москва"],
    ["Карина",     "создала",   "atelier.nexora.app",    "Ташкент"],
    ["Narek",      "запустил",  "fitclub.nexora.app",    "Ереван"],
    ["Sofya",      "создала",   "florist.nexora.app",    "Бишкек"],
    ["Артём",      "запустил",  "kitchen.nexora.app",    "Киев"],
  ];
  const doubled = [...items, ...items];
  return (
    <section
      aria-label="Recent launches"
      className="relative overflow-hidden border-b border-zinc-200 bg-zinc-950 text-white dark:border-zinc-800"
    >
      {/* fade edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent"
      />
      <div className="relative flex items-center gap-3 py-3">
        <span className="ml-4 hidden shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wider text-white/80 md:inline-flex">
          <span className="relative grid size-1.5 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative size-1.5 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="nx-ticker-track flex w-max items-center gap-8">
            {doubled.map((it, i) => (
              <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap text-[12.5px]">
                <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[9.5px] font-bold text-white">
                  {it[0][0]}
                </span>
                <span className="font-semibold text-white">{it[0]}</span>
                <span className="text-white/55">{it[1]}</span>
                <span className="font-mono text-[11.5px] text-indigo-300">{it[2]}</span>
                <span className="text-white/40">· {it[3]}</span>
                <span className="text-white/25">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Trust strip — infinite marquee of wordmarks ─────────── */
function Trust({ t }: { t: any }) {
  const doubled = [...WORDMARKS, ...WORDMARKS];
  return (
    <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-[10.5px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          {t.hero.trusted}
        </p>
        <div className="relative mt-6 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
          />
          <div className="nx-marquee-track flex w-max items-center gap-14 text-zinc-400 dark:text-zinc-500">
            {doubled.map((m, i) => (
              <div key={i} className="flex h-7 shrink-0 items-center transition hover:text-zinc-700 dark:hover:text-zinc-300">
                {m.body}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const WORDMARKS = [
  {
    name: "Acme",
    body: (
      <svg viewBox="0 0 90 24" className="h-5">
        <circle cx="12" cy="12" r="6" fill="currentColor" />
        <text x="24" y="17" fill="currentColor" fontSize="14" fontWeight="700" fontFamily="ui-sans-serif, system-ui">
          ACME
        </text>
      </svg>
    ),
  },
  {
    name: "Lumen",
    body: (
      <svg viewBox="0 0 90 24" className="h-5">
        <path d="M6 6 L12 18 L18 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="24" y="17" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="ui-sans-serif, system-ui">
          lumen
        </text>
      </svg>
    ),
  },
  {
    name: "Quasar",
    body: (
      <svg viewBox="0 0 100 24" className="h-5">
        <path d="M6 12a6 6 0 1 0 12 0a6 6 0 1 0-12 0" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="22" y="17" fill="currentColor" fontSize="13" fontWeight="700" fontFamily="ui-sans-serif, system-ui" letterSpacing="0.5">
          QUASAR
        </text>
      </svg>
    ),
  },
  {
    name: "Vertex",
    body: (
      <svg viewBox="0 0 100 24" className="h-5">
        <path d="M4 18 L12 4 L20 18 Z" fill="currentColor" />
        <text x="26" y="17" fill="currentColor" fontSize="13" fontWeight="700" fontFamily="ui-sans-serif, system-ui">
          Vertex
        </text>
      </svg>
    ),
  },
  {
    name: "Northwind",
    body: (
      <svg viewBox="0 0 120 24" className="h-5">
        <path d="M4 16 L4 4 L14 16 L14 4" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="20" y="17" fill="currentColor" fontSize="12.5" fontWeight="700" fontFamily="ui-sans-serif, system-ui">
          Northwind
        </text>
      </svg>
    ),
  },
  {
    name: "Polaris",
    body: (
      <svg viewBox="0 0 100 24" className="h-5">
        <path d="M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z" fill="currentColor" />
        <text x="26" y="17" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="ui-sans-serif, system-ui">
          Polaris
        </text>
      </svg>
    ),
  },
];

/* ─────────── Metrics (with count-up) ─────────── */
function Metrics({ t }: { t: any }) {
  // Numeric values for the four metrics so we can animate.
  const stats: Array<{ to: number; prefix?: string; suffix?: string; label: string; icon: React.ReactNode }> = [
    { to: 1247, suffix: "+",  label: "запусков",          icon: <Sparkles className="size-3.5" /> },
    { to: 5,    suffix: " мин", label: "среднее время",   icon: <Timer className="size-3.5" /> },
    { to: 99,   suffix: "%",  label: "uptime",            icon: <Shield className="size-3.5" /> },
    { to: 24,   prefix: "+", suffix: "%", label: "MRR за 30 дней", icon: <TrendingUp className="size-3.5" /> },
  ];
  // Use translated labels if present, else fallback.
  const labels: string[] = Array.isArray(t.metrics) ? t.metrics.map((m: any) => m.label) : [];
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="group px-5 py-3 text-center">
            <div className="mb-1 inline-flex items-center gap-1 text-zinc-400 transition group-hover:text-indigo-600 dark:text-zinc-500">
              {s.icon}
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 bg-clip-text text-[34px] font-semibold tracking-tight tabular-nums text-transparent md:text-[40px]">
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {labels[i] ?? s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── Features ─────────── */
function Features({ t }: { t: any }) {
  return (
    <section id="features" className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow={t.sections.features} title={t.features.title} subtitle={t.features.subtitle} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
          {t.features.items.map((f: any, i: number) => {
            const Icon = FEATURE_ICONS[i] ?? Sparkles;
            return (
              <SpotlightCard
                key={f.title}
                className="bg-white p-7 transition dark:bg-zinc-950"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-transparent to-violet-50/0 opacity-0 transition group-hover:from-indigo-50/60 group-hover:to-violet-50/40 group-hover:opacity-100"
                />
                <div className="relative mb-5 inline-flex size-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition group-hover:-translate-y-0.5 group-hover:border-indigo-300 group-hover:bg-indigo-50 group-hover:text-indigo-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <Icon className="size-4" />
                </div>
                <h3 className="relative text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{f.title}</h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{f.body}</p>
                <ChevronRight className="absolute bottom-5 right-5 size-4 -translate-x-1 text-zinc-300 opacity-0 transition group-hover:translate-x-0 group-hover:text-indigo-500 group-hover:opacity-100" />
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Showcase / bento ─────────── */
function ShowcaseStack({ t }: { t: any }) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t.sections.stack}
          title={t.sections.stack_title}
          subtitle={t.sections.stack_subtitle}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Tile className="md:col-span-4" badge="Web" title="SSR-сайт на поддомене" body="Next.js, изображения через CDN, индексация в поиске с первого дня.">
            <BrowserMock />
          </Tile>
          <Tile className="md:col-span-2" badge="Mobile" title="Flutter под ваш бренд" body="iOS + Android из одного билда.">
            <PhoneMock />
          </Tile>
          <Tile className="md:col-span-3" badge="CRM" title="Воронка из коробки" body="Клиенты, заказы, сегменты — без интеграций.">
            <PipelineMock />
          </Tile>
          <Tile className="md:col-span-3" badge="Analytics" title="Метрики в реальном времени" body="Просмотры, заказы, выручка — без сторонних счётчиков.">
            <ChartMock />
          </Tile>
        </div>
      </div>
    </section>
  );
}

function Tile({
  children, className, badge, title, body,
}: { children: React.ReactNode; className?: string; badge: string; title: string; body: string }) {
  return (
    <div className={`nx-tilt group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 ${className ?? ""}`}>
      <div className="mb-1 inline-flex rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        {badge}
      </div>
      <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-1 max-w-md text-[13px] text-zinc-600 dark:text-zinc-400">{body}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-1.5 border-b border-zinc-100 px-3 py-1.5 dark:border-zinc-900">
        <span className="size-2 rounded-full bg-zinc-300" />
        <span className="size-2 rounded-full bg-zinc-300" />
        <span className="size-2 rounded-full bg-zinc-300" />
        <span className="ml-3 inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500">
          <span className="size-1 rounded-full bg-emerald-500" /> acme.nexora.app
        </span>
      </div>
      <div className="grid gap-3 p-4">
        <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[
            "from-indigo-100 to-indigo-200",
            "from-violet-100 to-violet-200",
            "from-sky-100 to-sky-200",
          ].map((g, i) => (
            <div key={i} className={`aspect-[5/4] rounded-md bg-gradient-to-br ${g}`} />
          ))}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex h-6 items-center rounded-md bg-zinc-900 px-2 text-[10px] font-medium text-white dark:bg-white dark:text-zinc-900">Купить</span>
          <span className="font-mono text-[10px] text-zinc-500">$24.00</span>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="mx-auto w-[150px] overflow-hidden rounded-[22px] border border-zinc-300 bg-white p-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="rounded-[16px] bg-zinc-50 p-3 dark:bg-zinc-900">
        <div className="mb-3 flex items-center justify-between">
          <span className="grid size-5 place-items-center rounded-md bg-indigo-600 text-[9px] font-bold text-white">N</span>
          <div className="size-1.5 rounded-full bg-zinc-300" />
        </div>
        <div className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-1 h-1.5 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {[
            "from-indigo-100 to-indigo-200",
            "from-violet-100 to-violet-200",
            "from-sky-100 to-sky-200",
            "from-rose-100 to-rose-200",
          ].map((g, i) => (
            <div key={i} className={`aspect-square rounded-md bg-gradient-to-br ${g}`} />
          ))}
        </div>
        <div className="mt-3 h-6 rounded-md bg-zinc-900" />
      </div>
    </div>
  );
}

function PipelineMock() {
  const cols = [
    { name: "Новый", count: 12, color: "bg-zinc-100" },
    { name: "Контакт", count: 7, color: "bg-indigo-50" },
    { name: "Сделка", count: 4, color: "bg-violet-50" },
    { name: "Закрыт", count: 9, color: "bg-emerald-50" },
  ];
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {cols.map((c) => (
        <div key={c.name} className={`rounded-md border border-zinc-200 dark:border-zinc-800 ${c.color} p-2`}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">{c.name}</span>
            <span className="font-mono text-[9px] text-zinc-500">{c.count}</span>
          </div>
          <div className="space-y-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 rounded bg-white shadow-[0_1px_0_rgb(228,228,231)]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartMock() {
  const values = [4, 6, 5, 9, 8, 11, 10, 14, 12, 15, 13, 18];
  const max = Math.max(...values);
  return (
    <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="flex items-end gap-1.5">
        {values.map((v, i) => (
          <span
            key={i}
            className="nx-grow-y flex-1 rounded-sm bg-gradient-to-t from-indigo-200 to-indigo-600"
            style={{ height: `${(v / max) * 80 + 6}px`, animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9px] text-zinc-500">
        <span>Янв</span><span>Мар</span><span>Май</span><span>Июл</span><span>Сен</span><span>Дек</span>
      </div>
    </div>
  );
}

/* ─────────── Compare: DIY vs Nexora ─────────── */
function Compare({ t }: { t: any }) {
  const rows: Array<[string, string | false, string | false]> = [
    ["Запуск сайта",        "2–4 недели",            "за минуты"],
    ["Мобильное приложение", "$15–50k разработка",   "включено"],
    ["CRM-система",          "Отдельная подписка",   "встроено"],
    ["Подключение домена",   "DNS, SSL вручную",     "автоматически"],
    ["Команда",              "3–5 человек",          "не нужна"],
    ["Поддержка",            "Своими силами",        "24/7 от нас"],
  ];
  return (
    <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t.sections.compare}
          title={t.sections.compare_title}
          subtitle={t.sections.compare_subtitle}
        />
        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-3 border-b border-zinc-200 bg-zinc-50 text-[12px] font-semibold uppercase tracking-[0.1em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="px-5 py-3"></div>
            <div className="border-l border-zinc-200 px-5 py-3 text-center dark:border-zinc-800">Самостоятельно</div>
            <div className="border-l border-zinc-200 bg-gradient-to-b from-indigo-50/60 to-transparent px-5 py-3 text-center text-indigo-700 dark:border-zinc-800">
              С Nexora
            </div>
          </div>
          {rows.map(([label, diy, nx], i) => (
            <div
              key={label}
              className={`grid grid-cols-3 items-center text-[13.5px] transition hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 ${i > 0 ? "border-t border-zinc-100 dark:border-zinc-900" : ""}`}
            >
              <div className="px-5 py-3.5 font-medium text-zinc-900 dark:text-zinc-100">{label}</div>
              <div className="flex items-center justify-center gap-2 border-l border-zinc-100 px-5 py-3.5 text-zinc-500 dark:border-zinc-900">
                <X className="size-3.5 text-zinc-400 dark:text-zinc-500" />
                {diy || "—"}
              </div>
              <div className="flex items-center justify-center gap-2 border-l border-zinc-100 bg-indigo-50/30 px-5 py-3.5 font-medium text-indigo-900 dark:border-zinc-900">
                <Check className="size-3.5 text-emerald-600" />
                {nx || "—"}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <TrendingUp className="size-3.5 text-emerald-600" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">−93%</span> времени до запуска
          </span>
          <span className="text-zinc-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 text-indigo-600" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">−3 человека</span> в команде
          </span>
          <span className="text-zinc-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="size-3.5 text-violet-600" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">99.9%</span> uptime SLA
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Businesses ─────────── */
function Businesses({ t }: { t: any }) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow={t.sections.industries} title={t.businesses.title} subtitle={t.businesses.subtitle} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
          {t.businesses.items.map((item: [string, string], i: number) => {
            const Icon = BIZ_ICONS[i] ?? ShoppingBag;
            return (
              <div key={item[0]} className="group flex items-start gap-4 bg-white p-5 transition hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900">
                <div className="grid size-10 shrink-0 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition group-hover:-rotate-3 group-hover:scale-110 group-hover:border-indigo-300 group-hover:bg-indigo-50 group-hover:text-indigo-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">{item[0]}</h3>
                  <p className="mt-0.5 text-[12.5px] text-zinc-600 dark:text-zinc-400">{item[1]}</p>
                </div>
                <ChevronRight className="ml-auto size-4 shrink-0 -translate-x-1 text-zinc-400 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 dark:text-zinc-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── How it works (with animated connector) ─────────── */
function HowItWorks({ t }: { t: any }) {
  return (
    <section id="how" className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow={t.sections.process} title={t.how.title} />

        {/* Animated connector line (decorative) */}
        <div className="relative mt-14">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-9 hidden h-2 w-[calc(100%-6rem)] md:block"
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="conn" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0" />
                <stop offset="20%" stopColor="#6366f1" />
                <stop offset="80%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 4 L 1000 4"
              stroke="url(#conn)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              className="nx-draw"
              style={{ ["--len" as any]: 1000 }}
            />
          </svg>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 md:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
            {t.how.steps.map((s: any, i: number) => (
              <div key={s.title} className="group relative bg-white p-6 transition hover:bg-zinc-50/60 dark:bg-zinc-950 dark:hover:bg-zinc-900/40">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-indigo-600">
                  Шаг {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{s.body}</p>
                <div className="relative mt-5 inline-flex size-7 items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 font-mono text-[12px] font-semibold text-indigo-700">
                  {i + 1}
                  <span className="absolute inset-0 -z-10 rounded-md bg-indigo-400/40 opacity-0 transition group-hover:opacity-100" style={{ animation: "nx-pulse-ring 1.4s ease-out infinite" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Testimonials ─────────── */
function Testimonials({ t }: { t: any }) {
  const items = [
    {
      quote: "Мы запустили три магазина за месяц вместо двух кварталов на старой команде. Это другой темп бизнеса.",
      author: "Ани Карапетян",
      role: "Основатель, Lumière",
      color: "#4f46e5",
    },
    {
      quote: "Сайт, приложение и CRM — всё под одной кнопкой. Я перестал нанимать подрядчиков, которые срывают сроки.",
      author: "Артём Соколов",
      role: "CTO, Nova Group",
      color: "#a855f7",
    },
    {
      quote: "Поддержка и SLA на уровне, какого я не видел даже у крупных вендоров. Деплой за минуты, не за вечера.",
      author: "Davit Hovhannisyan",
      role: "Product Lead, Polaris",
      color: "#0ea5e9",
    },
  ];
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t.sections.reviews}
          title={t.sections.reviews_title}
          subtitle={t.sections.reviews_subtitle}
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.author}
              className="nx-tilt group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <Quote className="size-5 text-zinc-300" />
              <blockquote className="mt-3 text-[14px] leading-relaxed text-zinc-800 dark:text-zinc-200">
                «{t.quote}»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className="grid size-9 place-items-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: t.color }}
                >
                  {t.author.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <div className="text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100">{t.author}</div>
                  <div className="text-[11.5px] text-zinc-500">{t.role}</div>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Pricing ─────────── */
function Pricing({ t, plans }: { t: any; plans: Plan[] }) {
  const fallback: Plan[] = [
    { code: "STARTER",      name: "Starter",      monthlyPriceUsd: 4900,  maxProjects: 1,  maxDomains: 0,  maxStorageGb: 5,   maxSeats: 1,  features: {} },
    { code: "BUSINESS",     name: "Business",     monthlyPriceUsd: 14900, maxProjects: 3,  maxDomains: 1,  maxStorageGb: 25,  maxSeats: 5,  features: {} },
    { code: "PROFESSIONAL", name: "Professional", monthlyPriceUsd: 39900, maxProjects: 10, maxDomains: 5,  maxStorageGb: 100, maxSeats: 20, features: {} },
    { code: "ENTERPRISE",   name: "Enterprise",   monthlyPriceUsd: 99900, maxProjects: -1, maxDomains: -1, maxStorageGb: -1,  maxSeats: -1, features: {} },
  ];
  const list = plans.length ? plans : fallback;

  return (
    <section id="pricing" className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow={t.sections.pricing} title={t.pricing.title} subtitle={t.pricing.subtitle} />
        <div className="mx-auto mt-6 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11.5px] font-medium text-amber-800">
          <Flame className="size-3 text-amber-600" />
          Промо <span className="font-mono font-semibold">LAUNCH30</span> — −30% на первый год
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <PricingCard key={p.code} plan={p} t={t} highlighted={p.code === "BUSINESS"} />
          ))}
        </div>
        <p className="mt-8 text-center text-[12px] text-zinc-500">
          Все тарифы включают: SSR-сайт · CRM · поддомен · SSL · аналитика
        </p>
      </div>
    </section>
  );
}

function PricingCard({ plan, highlighted, t }: { plan: Plan; highlighted?: boolean; t: any }) {
  const unlimited = (n: number) => (n < 0 ? t.pricing.unlimited : n);
  const monthly = plan.monthlyPriceUsd / 100;
  const discounted = Math.round(monthly * 0.7);
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 transition dark:bg-zinc-950 ${
        highlighted
          ? "-translate-y-1 border-indigo-600 shadow-[0_20px_50px_-20px_rgba(79,70,229,0.35)]"
          : "border-zinc-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_20px_50px_-25px_rgba(24,24,27,0.20)] dark:border-zinc-800 dark:hover:border-zinc-700"
      }`}
    >
      {highlighted && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-50/60 to-transparent"
          />
          <span className="nx-shine relative absolute -top-2.5 left-6 inline-flex items-center gap-1 overflow-hidden rounded-md bg-indigo-600 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white">
            <Sparkles className="size-2.5" /> {t.pricing.popular}
          </span>
        </>
      )}
      <span className="absolute -top-2.5 right-6 inline-flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
        <Flame className="size-2.5" /> −30%
      </span>
      <div className="relative">
        <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-[36px] font-semibold tracking-tight tabular-nums text-zinc-900 dark:text-zinc-100">
            ${discounted}
          </span>
          <span className="text-[12.5px] text-zinc-500">{t.pricing.per_month}</span>
          <span className="ml-1 text-[12px] text-zinc-400 line-through tabular-nums dark:text-zinc-500">${monthly}</span>
        </div>

        <ul className="mt-5 space-y-2 text-[13px] text-zinc-700 dark:text-zinc-300">
          <Li>{unlimited(plan.maxProjects)} {t.pricing.projects}</Li>
          <Li>{unlimited(plan.maxDomains)} {t.pricing.domains}</Li>
          <Li>{plan.maxStorageGb < 0 ? t.pricing.unlimited : `${plan.maxStorageGb} GB`} {t.pricing.storage}</Li>
          <Li>{unlimited(plan.maxSeats)} {t.pricing.seats}</Li>
        </ul>

        <Link
          href={`http://app.localhost:3000/register?plan=${plan.code}&promo=LAUNCH30`}
          className={`group mt-7 inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition ${
            highlighted
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "border border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          }`}
        >
          {t.pricing.cta} {plan.name}
          <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
      <span>{children}</span>
    </li>
  );
}

/* ─────────── FAQ ─────────── */
function Faq({ t }: { t: any }) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow="FAQ" title={t.faq.title} />
        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          {t.faq.items.map((item: any, i: number) => (
            <details
              key={item.q}
              className={`group px-5 py-4 transition hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 ${i > 0 ? "border-t border-zinc-100 dark:border-zinc-900" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-medium text-zinc-900 dark:text-zinc-100">
                <span>{item.q}</span>
                <ChevronRight className="size-4 shrink-0 text-zinc-500 transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CTA band ─────────── */
function CtaBand({ t }: { t: any }) {
  return (
    <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 px-8 py-14 text-center md:px-16 md:py-20">
          {/* slow spinning conic */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-32 -z-0 opacity-50 nx-spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(99,102,241,0.45), rgba(168,85,247,0.20), rgba(56,189,248,0.40), rgba(99,102,241,0.45))",
              filter: "blur(60px)",
            }}
          />
          {/* hairline grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(60% 60% at 50% 50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(60% 60% at 50% 50%, black, transparent)",
            }}
          />
          <span className="relative inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11.5px] font-medium text-white/90">
            <Flame className="size-3 text-amber-300" /> Промо LAUNCH30 — −30% на первый год
          </span>
          <h2 className="relative mt-5 text-balance text-[32px] font-semibold tracking-tight text-white md:text-[48px]">
            {t.hero.title1}{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
              {t.hero.title_accent}
            </span>{" "}
            {t.hero.title2}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-balance text-[14px] text-white/70 md:text-[15px]">
            {t.hero.subtitle}
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="http://app.localhost:3000/register?promo=LAUNCH30"
              className="group relative inline-flex h-11 items-center gap-1.5 overflow-hidden rounded-md bg-white px-5 text-[14px] font-medium text-zinc-900 hover:bg-zinc-100"
            >
              <span className="relative">{t.hero.cta_primary}</span>
              <ArrowUpRight className="relative size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span
                aria-hidden
                className="nx-btn-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
              />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex h-11 items-center gap-1.5 rounded-md border border-white/20 bg-transparent px-5 text-[14px] font-medium text-white hover:bg-white/10"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-emerald-400" /> 14 дней trial
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-emerald-400" /> Без карты
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-emerald-400" /> Отмена в один клик
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function Footer({ t }: { t: any }) {
  return (
    <footer className="bg-white pb-24 md:pb-16 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-6">
        <div className="md:col-span-2">
          <Link href="/" className="group flex items-center gap-2 text-[14px] font-semibold tracking-tight">
            <Logo /> Nexora
          </Link>
          <p className="mt-3 max-w-sm text-[13px] text-zinc-600 dark:text-zinc-400">{t.footer.tagline}</p>
          <div className="mt-5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-[12px] text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">4.9/5</span> · <CountUp to={1247} /> запусков
            </span>
          </div>
        </div>
        <FooterCol title={t.footer.product} links={[
          [t.footer.features, "#features"],
          [t.footer.pricing, "#pricing"],
          ["Шаблоны", "/templates"],
          ["Changelog", "/changelog"],
          [t.footer.docs, "/docs"],
        ]} />
        <FooterCol title="Ресурсы" links={[
          [t.footer.blog, "/blog"],
          ["Кейсы", "/#cases"],
          ["Гайд основателя", "/founder"],
          ["Status", "/status"],
        ]} />
        <FooterCol title={t.footer.company} links={[
          [t.footer.about, "/about"],
          ["Карьера", "/careers"],
          ["Партнёрам", "/partners"],
          ["Пресс-кит", "/press"],
          [t.footer.contact, "/contact"],
        ]} />
        <FooterCol title={t.footer.legal} links={[
          [t.footer.privacy, "/privacy"],
          [t.footer.terms, "/terms"],
          [t.footer.security, "/security"],
          ["DPA", "/dpa"],
          ["Cookies", "/cookies"],
        ]} />
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[11.5px] text-zinc-500">
          <span>© {new Date().getFullYear()} Nexora. {t.footer.rights}</span>
          <span className="flex items-center gap-1.5">
            <span className="relative grid size-1.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">{title}</h4>
      <ul className="space-y-2 text-[13px] text-zinc-700 dark:text-zinc-300">
        {links.map(([label, href]) => (
          <li key={label}><Link href={href} className="transition hover:text-zinc-900 hover:underline underline-offset-4 dark:hover:text-zinc-100">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────── Shared section heading ─────────── */
function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <span className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wider text-indigo-700">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-balance text-[28px] font-semibold tracking-tight text-zinc-900 md:text-[40px] dark:text-zinc-100">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-balance text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
    </div>
  );
}
