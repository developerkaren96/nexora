"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/dictionaries";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();

  async function pick(loc: Locale) {
    setOpen(false);
    if (loc === current) return;
    await fetch("/api/locale", { method: "POST", body: JSON.stringify({ locale: loc }) });
    startTransition(() => router.refresh());
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setOpen(false);
        }}
        className="inline-flex items-center gap-1.5 rounded-md border bg-background/60 px-2.5 py-1.5 text-sm font-medium text-foreground/80 hover:bg-background"
      >
        <Globe className="size-3.5" />
        <span>{LOCALE_LABELS[current].native}</span>
        <ChevronDown className="size-3.5 opacity-60" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border bg-background/95 shadow-lg backdrop-blur"
        >
          {LOCALES.map((loc) => {
            const { native, flag } = LOCALE_LABELS[loc];
            const active = loc === current;
            return (
              <button
                key={loc}
                role="option"
                aria-selected={active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(loc)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <span className="text-base leading-none">{flag}</span>
                <span className="flex-1 font-medium">{native}</span>
                {active && <Check className="size-4 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
