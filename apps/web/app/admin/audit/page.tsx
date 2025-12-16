import { cookies } from "next/headers";
import { ssrApi } from "@/lib/api";
import { PageHeader } from "../_components/page-chrome";
import { LogIn, UserPlus, Pencil, Trash2, ShieldCheck, Activity } from "lucide-react";

type AuditEvent = {
  id: string;
  tenantId?: string;
  actorId?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  ip?: string;
  metadata?: any;
  createdAt: string;
};

export default async function AdminAudit() {
  const c = (await cookies()).toString();
  const events: AuditEvent[] = await ssrApi<AuditEvent[]>("/admin/audit?take=200", c).catch(() => []);

  // Group by date
  const groups = events.reduce<Record<string, AuditEvent[]>>((acc, e) => {
    const day = new Date(e.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    (acc[day] ||= []).push(e);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Платформа"
        title="Журнал событий"
        subtitle="Все значимые действия на платформе — вход, изменения, провижининг, оплата"
        action={
          <span className="text-[11px] font-medium text-zinc-500">
            События: <span className="font-mono tabular-nums text-zinc-900">{events.length}</span>
          </span>
        }
      />

      <div className="mx-auto max-w-7xl px-8 py-6">
        {events.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white py-16 text-center">
            <p className="text-[13px] font-medium text-zinc-900">Журнал пуст</p>
            <p className="mt-1 text-[12px] text-zinc-500">Как только в системе начнётся активность — события появятся здесь.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groups).map(([day, items]) => (
              <section key={day}>
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                  <span>{day}</span>
                  <span className="h-px flex-1 bg-zinc-200" />
                  <span className="font-mono tabular-nums">{items.length}</span>
                </div>
                <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
                  <ul className="divide-y divide-zinc-100">
                    {items.map((e) => {
                      const meta = actionMeta(e.action);
                      const Icon = meta.icon;
                      return (
                        <li key={e.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-zinc-50">
                          <span className={`grid size-7 shrink-0 place-items-center rounded-md ${meta.bg}`}>
                            <Icon className={`size-3.5 ${meta.fg}`} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-1.5">
                              <span className="font-mono text-[12px] font-medium text-zinc-900">{e.action}</span>
                              {e.entityType && (
                                <span className="text-[11px] text-zinc-500">
                                  on <span className="font-medium text-zinc-700">{e.entityType}</span>
                                  {e.entityId && <span className="font-mono text-zinc-400">#{e.entityId.slice(0, 8)}</span>}
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10.5px] text-zinc-500">
                              {e.actorId && <span>actor <span className="font-mono text-zinc-700">{e.actorId.slice(0, 8)}</span></span>}
                              {e.tenantId && <span>tenant <span className="font-mono text-zinc-700">{e.tenantId.slice(0, 8)}</span></span>}
                              {e.ip && <span>ip <span className="font-mono text-zinc-700">{e.ip}</span></span>}
                            </div>
                          </div>
                          <time className="whitespace-nowrap font-mono text-[11px] text-zinc-500">
                            {new Date(e.createdAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                          </time>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function actionMeta(a: string): { icon: any; bg: string; fg: string } {
  if (a.includes("login") || a.includes("auth"))       return { icon: LogIn,       bg: "bg-indigo-50",  fg: "text-indigo-600" };
  if (a.includes("register") || a.includes("create"))  return { icon: UserPlus,    bg: "bg-emerald-50", fg: "text-emerald-600" };
  if (a.includes("delete") || a.includes("suspend"))   return { icon: Trash2,      bg: "bg-rose-50",    fg: "text-rose-600" };
  if (a.includes("update") || a.includes("change"))    return { icon: Pencil,      bg: "bg-amber-50",   fg: "text-amber-600" };
  if (a.includes("admin") || a.includes("role"))       return { icon: ShieldCheck, bg: "bg-violet-50",  fg: "text-violet-600" };
  return { icon: Activity, bg: "bg-zinc-100", fg: "text-zinc-600" };
}
