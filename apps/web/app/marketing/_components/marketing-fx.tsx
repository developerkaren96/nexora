"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  ArrowRight, Sparkles, Globe, ShoppingBag, Scissors, UtensilsCrossed, X,
  Smartphone, Database, TrendingDown, Clock, Minus, Plus, Calculator,
  Sun, Moon, Monitor,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * ThemeToggle — three-state switcher (light · system · dark) using
 * next-themes. Renders a sun/moon/monitor icon and a small popover
 * menu. SSR-safe via `mounted` guard.
 * ────────────────────────────────────────────────────────────────────── */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const Current = !mounted
    ? Monitor
    : theme === "system"
      ? Monitor
      : resolvedTheme === "dark"
        ? Moon
        : Sun;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label="Тема оформления"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-8 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <Current className="size-3.5" />
      </button>
      {open && mounted && (
        <div className="absolute right-0 top-9 z-50 w-36 overflow-hidden rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          {[
            { v: "light",  label: "Светлая",   Icon: Sun },
            { v: "dark",   label: "Тёмная",    Icon: Moon },
            { v: "system", label: "Системная", Icon: Monitor },
          ].map(({ v, label, Icon }) => {
            const active = theme === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setTheme(v);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[12.5px] transition ${
                  active
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }`}
              >
                <Icon className="size-3.5" />
                {label}
                {active && <span className="ml-auto size-1.5 rounded-full bg-indigo-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * CountUp — animates a number from 0 → `to` when scrolled into view.
 * Uses prefers-reduced-motion to skip animation for users that want it.
 * ────────────────────────────────────────────────────────────────────── */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.floor(eased * to));
            if (t < 1) requestAnimationFrame(tick);
            else setValue(to);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * ScrollProgress — thin gradient bar pinned to the top of the viewport
 * that tracks page scroll. Adds a sense of "depth" to the landing.
 * ────────────────────────────────────────────────────────────────────── */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * SocialProofToast — floating widget bottom-left that cycles through
 * fake "recent launches" for FOMO / social proof. Appears after a delay
 * so it doesn't compete with the hero on first paint.
 * ────────────────────────────────────────────────────────────────────── */
type Proof = { name: string; verb: string; host: string; city: string; ago: string; icon: "shop" | "salon" | "food" | "site" };
const FEED: Proof[] = [
  { name: "Анна К.",     verb: "запустила", host: "barbershop.nexora.app", city: "Минск",        ago: "2 мин",  icon: "salon" },
  { name: "Tigran S.",   verb: "создал",    host: "coffeelab.nexora.app",  city: "Ереван",       ago: "5 мин",  icon: "food"  },
  { name: "Олег М.",     verb: "запустил",  host: "shop.nexora.app",       city: "Алматы",       ago: "9 мин",  icon: "shop"  },
  { name: "Mariam P.",   verb: "запустила", host: "studio.nexora.app",     city: "Тбилиси",      ago: "12 мин", icon: "salon" },
  { name: "Игорь Б.",    verb: "создал",    host: "pizzeria.nexora.app",   city: "Санкт-Петербург", ago: "17 мин", icon: "food"  },
  { name: "Davit H.",    verb: "запустил",  host: "agency.nexora.app",     city: "Москва",       ago: "21 мин", icon: "site"  },
  { name: "Карина О.",   verb: "создала",   host: "atelier.nexora.app",    city: "Ташкент",      ago: "26 мин", icon: "shop"  },
  { name: "Narek V.",    verb: "запустил",  host: "fitclub.nexora.app",    city: "Ереван",       ago: "33 мин", icon: "salon" },
];
const ICON_MAP = { shop: ShoppingBag, salon: Scissors, food: UtensilsCrossed, site: Globe };

export function SocialProofToast() {
  const [i, setI] = useState(-1);
  const [closed, setClosed] = useState(false);
  const [hidden, setHidden] = useState(true); // false = visible

  useEffect(() => {
    const t = setTimeout(() => {
      setI(0);
      setHidden(false);
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (i < 0 || closed) return;
    const cycle = setInterval(() => {
      setHidden(true);
      setTimeout(() => {
        setI((x) => (x + 1) % FEED.length);
        setHidden(false);
      }, 350);
    }, 6500);
    return () => clearInterval(cycle);
  }, [i, closed]);

  if (closed || i < 0) return null;
  const item = FEED[i];
  const Icon = ICON_MAP[item.icon];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 hidden max-w-[320px] transform-gpu transition-all duration-300 sm:block ${
        hidden ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/95 p-3 pr-9 shadow-[0_20px_50px_-20px_rgba(24,24,27,0.30)] backdrop-blur">
        <span className="relative grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
          <Icon className="size-4" />
          <span className="absolute -right-0.5 -top-0.5 grid size-3 place-items-center rounded-full bg-white">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
          </span>
        </span>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[12.5px] text-zinc-900">
            <span className="font-semibold">{item.name}</span>{" "}
            <span className="text-zinc-500">{item.verb}</span>{" "}
            <span className="font-mono text-[11.5px] text-indigo-700">{item.host}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-zinc-500">
            <span>{item.city}</span>
            <span className="text-zinc-300">·</span>
            <span>{item.ago} назад</span>
            <span className="text-zinc-300">·</span>
            <span className="inline-flex items-center gap-0.5 text-emerald-600">
              <Sparkles className="size-2.5" /> live
            </span>
          </div>
        </div>
        <button
          aria-label="Закрыть"
          onClick={() => setClosed(true)}
          className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * StickyCtaBar — slides up from the bottom after the visitor scrolls
 * past the hero. Keeps the primary action one click away without being
 * obnoxious on first paint. Dismissible for the session.
 * ────────────────────────────────────────────────────────────────────── */
export function StickyCtaBar({
  label,
  cta,
  promo,
}: {
  label: string;
  cta: string;
  promo: string;
}) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      if (sessionStorage.getItem("nx-cta-dismissed") === "1") setDismissed(true);
    }
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transform-gpu transition-transform duration-300 ease-out ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 pb-3 md:px-6 md:pb-4">
        <div className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950 p-3 pl-4 shadow-[0_30px_60px_-30px_rgba(24,24,27,0.6)] md:p-3.5 md:pl-5">
          {/* shine overlay */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ animation: "nx-shine 3.6s ease-in-out infinite" }}
          />
          <span className="relative hidden size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white md:grid">
            <Sparkles className="size-4" />
          </span>
          <div className="relative min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                <span className="size-1 rounded-full bg-emerald-400" /> {promo}
              </span>
            </div>
            <div className="mt-0.5 truncate text-[12.5px] text-white/85 md:text-[13.5px]">
              {label}
            </div>
          </div>
          <Link
            href="http://app.localhost:3000/register"
            className="relative inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-white px-3.5 text-[12.5px] font-semibold text-zinc-900 hover:bg-zinc-100 md:h-10 md:px-4 md:text-[13px]"
          >
            {cta} <ArrowRight className="size-3.5" />
          </Link>
          <button
            aria-label="Закрыть"
            onClick={() => {
              setDismissed(true);
              try {
                sessionStorage.setItem("nx-cta-dismissed", "1");
              } catch {}
            }}
            className="relative grid size-8 shrink-0 place-items-center rounded-md text-white/50 hover:bg-white/10 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * SpotlightCard — wraps children with a cursor-following radial glow.
 * Pure decorative effect, gracefully no-ops when cursor isn't over it.
 * ────────────────────────────────────────────────────────────────────── */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden ${className ?? ""}`}
      style={
        {
          backgroundImage:
            "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.10), transparent 60%)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * RoiCalculator — interactive savings calculator. The single biggest
 * conversion lever on a B2B SaaS landing: it makes the value tangible.
 * Inputs: # of projects, mobile app yes/no, CRM yes/no.
 * Outputs: DIY cost, Nexora cost, savings, time saved.
 * ────────────────────────────────────────────────────────────────────── */
const NEXORA_PER_PROJECT = 149; // $/month, Business plan effective price
const DIY_BASELINE = {
  website: 4500,       // one-time dev cost per site
  websiteHosting: 35,  // $/month per site
  mobile: 25000,       // one-time mobile dev
  mobileMaintenance: 400, // $/month per app
  crm: 89,             // $/month per project (typical CRM SaaS)
  weeksPerProject: 4,
};

export function RoiCalculator() {
  const [projects, setProjects] = useState(2);
  const [mobile, setMobile] = useState(true);
  const [crm, setCrm] = useState(true);

  const diyOneTime =
    projects * DIY_BASELINE.website + (mobile ? projects * DIY_BASELINE.mobile : 0);
  const diyMonthly =
    projects * DIY_BASELINE.websiteHosting +
    (mobile ? projects * DIY_BASELINE.mobileMaintenance : 0) +
    (crm ? projects * DIY_BASELINE.crm : 0);
  const diyYearOne = diyOneTime + diyMonthly * 12;

  const nexMonthly = projects * NEXORA_PER_PROJECT;
  const nexYearOne = nexMonthly * 12;

  const savings = Math.max(0, diyYearOne - nexYearOne);
  const savingsPct = diyYearOne > 0 ? Math.round((savings / diyYearOne) * 100) : 0;
  const weeksSaved = projects * DIY_BASELINE.weeksPerProject;

  const fmt = (n: number) =>
    n.toLocaleString("ru-RU", { maximumFractionDigits: 0 });

  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white md:grid-cols-[1fr_1.1fr]">
      {/* ── Inputs ── */}
      <div className="border-b border-zinc-200 p-6 md:border-b-0 md:border-r md:p-8">
        <div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wider text-zinc-600">
          <Calculator className="size-3" /> Калькулятор
        </div>
        <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-zinc-900 md:text-[22px]">
          Сколько вы сэкономите с Nexora
        </h3>
        <p className="mt-1.5 text-[13px] text-zinc-600">
          Сравнение с типичной сборкой «своими силами» — фриланс-разработчик, отдельный CRM, хостинг.
        </p>

        <div className="mt-7 space-y-6">
          {/* Projects stepper */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[12.5px] font-medium text-zinc-700">Сколько бизнесов запустить?</label>
              <span className="font-mono text-[12px] text-zinc-500">{projects} {pl(projects, ["проект", "проекта", "проектов"])}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="−"
                onClick={() => setProjects((n) => Math.max(1, n - 1))}
                className="grid size-9 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              >
                <Minus className="size-3.5" />
              </button>
              <div className="relative flex-1">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={projects}
                  onChange={(e) => setProjects(parseInt(e.target.value, 10))}
                  className="nx-range h-1.5 w-full appearance-none rounded-full bg-zinc-100 accent-indigo-600"
                  style={{
                    background: `linear-gradient(to right, #6366f1 ${(projects - 1) * (100 / 9)}%, #e4e4e7 ${(projects - 1) * (100 / 9)}%)`,
                  }}
                />
                <div className="mt-1 flex justify-between font-mono text-[9.5px] text-zinc-400">
                  {[1, 2, 3, 5, 10].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                aria-label="+"
                onClick={() => setProjects((n) => Math.min(10, n + 1))}
                className="grid size-9 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid gap-2 sm:grid-cols-2">
            <ToggleRow
              label="Мобильное приложение"
              sub="iOS + Android"
              icon={<Smartphone className="size-4" />}
              on={mobile}
              onChange={setMobile}
            />
            <ToggleRow
              label="CRM-система"
              sub="клиенты, воронки"
              icon={<Database className="size-4" />}
              on={crm}
              onChange={setCrm}
            />
          </div>
        </div>
      </div>

      {/* ── Output ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-950 to-indigo-950 p-6 text-white md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45), transparent 70%)" }}
        />
        <div className="relative">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">Ваша экономия за первый год</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="bg-gradient-to-br from-white to-indigo-200 bg-clip-text text-[44px] font-bold tracking-tight tabular-nums text-transparent md:text-[56px]">
              ${fmt(savings)}
            </span>
            {savingsPct > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                <TrendingDown className="size-3" /> −{savingsPct}%
              </span>
            )}
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-white/60">
            <Clock className="size-3.5" />
            ≈ {weeksSaved} {pl(weeksSaved, ["неделя", "недели", "недель"])} разработки сэкономлено
          </div>

          <div className="mt-7 space-y-3">
            <Row
              label="Сами (фриланс + хостинг + CRM)"
              one={`$${fmt(diyOneTime)} разово`}
              monthly={`$${fmt(diyMonthly)}/мес`}
              year={`$${fmt(diyYearOne)} год`}
              dim
            />
            <Row
              label="С Nexora"
              one={"$0 разово"}
              monthly={`$${fmt(nexMonthly)}/мес`}
              year={`$${fmt(nexYearOne)} год`}
              highlight
            />
          </div>

          <Link
            href="http://app.localhost:3000/register?promo=LAUNCH30"
            className="group mt-7 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-md bg-white px-4 text-[13.5px] font-semibold text-zinc-900 hover:bg-zinc-100"
          >
            Зафиксировать −30% и начать
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
          <p className="mt-3 text-center text-[10.5px] text-white/45">
            Расчёт ориентировочный. Реальные ставки фрилансеров и SaaS-CRM могут быть выше.
          </p>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label, sub, icon, on, onChange,
}: {
  label: string; sub: string; icon: React.ReactNode;
  on: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`flex items-center gap-3 rounded-lg border p-2.5 text-left transition ${
        on
          ? "border-indigo-300 bg-indigo-50/60"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
      }`}
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-md transition ${on ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-500"}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[12.5px] font-semibold text-zinc-900">{label}</span>
        <span className="block text-[10.5px] text-zinc-500">{sub}</span>
      </span>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition ${
          on ? "bg-indigo-600" : "bg-zinc-300"
        }`}
      >
        <span className={`absolute size-4 rounded-full bg-white shadow transition ${on ? "left-[18px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

function Row({
  label, one, monthly, year, dim, highlight,
}: {
  label: string; one: string; monthly: string; year: string; dim?: boolean; highlight?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border px-3 py-2.5 ${
      highlight ? "border-emerald-500/30 bg-emerald-500/10" : dim ? "border-white/10 bg-white/[0.03]" : "border-white/10"
    }`}>
      <div className="min-w-0">
        <div className={`text-[12px] font-semibold ${highlight ? "text-white" : "text-white/75"}`}>{label}</div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[10.5px] text-white/50">
          <span>{one}</span>
          <span className="text-white/25">·</span>
          <span>{monthly}</span>
        </div>
      </div>
      <div className={`shrink-0 text-right font-mono text-[13.5px] font-semibold tabular-nums ${highlight ? "text-emerald-300" : "text-white/70"}`}>
        {year}
      </div>
    </div>
  );
}

// Russian plural helper
function pl(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
