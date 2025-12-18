export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 px-8 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{eyebrow}</p>
          )}
          <h1 className="mt-0.5 text-[22px] font-semibold tracking-tight text-zinc-900">{title}</h1>
          {subtitle && <p className="mt-1 text-[13px] text-zinc-500">{subtitle}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, { dot: string; bg: string; text: string; label: string }> = {
    ACTIVE:    { dot: "bg-emerald-500", bg: "bg-emerald-50",  text: "text-emerald-700", label: "Активен" },
    TRIALING:  { dot: "bg-amber-500",   bg: "bg-amber-50",    text: "text-amber-700",   label: "Триал" },
    TRIAL:     { dot: "bg-amber-500",   bg: "bg-amber-50",    text: "text-amber-700",   label: "Триал" },
    SUSPENDED: { dot: "bg-rose-500",    bg: "bg-rose-50",     text: "text-rose-700",    label: "Заморожен" },
    DELETED:   { dot: "bg-zinc-400",    bg: "bg-zinc-100",    text: "text-zinc-700",    label: "Удалён" },
    CANCELED:  { dot: "bg-zinc-400",    bg: "bg-zinc-100",    text: "text-zinc-700",    label: "Отменён" },
  };
  const s = map[status] ?? { dot: "bg-zinc-400", bg: "bg-zinc-100", text: "text-zinc-700", label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${s.bg} ${s.text}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
