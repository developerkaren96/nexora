import Link from "next/link";
import { cookies } from "next/headers";
import { ssrApi } from "@/lib/api";
import { Plus, ArrowUpRight, Layers, Globe } from "lucide-react";
import { PageHeader } from "./_components/dashboard-shell";

async function getProjects() {
  const c = (await cookies()).toString();
  try { return await ssrApi<any[]>("/projects", c); } catch { return [] as any[]; }
}

export default async function DashboardHome() {
  const projects = await getProjects();
  const active = projects.filter((p) => p.status === "ACTIVE").length;
  const provisioning = projects.filter((p) => ["PENDING", "PROVISIONING"].includes(p.status)).length;
  const failed = projects.filter((p) => p.status === "FAILED").length;

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Обзор"
        subtitle="Ваше рабочее пространство — проекты, домены, состояние"
        action={
          <Link
            href="/projects/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800"
          >
            <Plus className="size-3.5" /> Новый проект
          </Link>
        }
      />

      <div className="mx-auto max-w-7xl space-y-6 px-8 py-6">
        <section className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200">
          <Stat label="Активные"      value={active} tone="emerald" />
          <Stat label="Развёртывание" value={provisioning} tone="amber" />
          <Stat label="С ошибкой"     value={failed} tone="rose" />
        </section>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center justify-between border-b border-zinc-100 px-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">Последние проекты</h2>
            {projects.length > 0 && (
              <Link href="/projects" className="inline-flex items-center gap-0.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-900">
                Все <ArrowUpRight className="size-3" />
              </Link>
            )}
          </div>

          {projects.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto mb-3 grid size-10 place-items-center rounded-lg bg-zinc-100">
                <Layers className="size-5 text-zinc-500" />
              </div>
              <p className="text-[13px] font-medium text-zinc-900">Пока нет проектов</p>
              <p className="mt-1 text-[12px] text-zinc-500">Создайте первый — мы развернём сайт, CRM и&nbsp;поддомен.</p>
              <Link
                href="/projects/new"
                className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800"
              >
                <Plus className="size-3.5" /> Создать первый проект
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {projects.slice(0, 8).map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-5 py-3 hover:bg-zinc-50">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-zinc-100">
                    <Layers className="size-3.5 text-zinc-600" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/projects/${p.id}`} className="block truncate text-[13px] font-medium text-zinc-900 hover:underline">
                      {p.name}
                    </Link>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-zinc-500">
                      <span>{ruBusinessType(p.businessType)}</span>
                      <span className="size-0.5 rounded-full bg-zinc-300" />
                      <StatusDot status={p.status} />
                      <span>{ruStatus(p.status)}</span>
                    </div>
                  </div>
                  {p.domains?.[0]?.hostname && (
                    <a
                      href={`https://${p.domains[0].hostname}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500 hover:text-zinc-900"
                    >
                      <Globe className="size-3" /> {p.domains[0].hostname}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "emerald" | "amber" | "rose" }) {
  const dot = { emerald: "bg-emerald-500", amber: "bg-amber-500", rose: "bg-rose-500" }[tone];
  return (
    <div className="bg-white px-5 py-4">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
        <span className={`size-1.5 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="mt-1.5 text-[22px] font-semibold tabular-nums text-zinc-900">{value}</div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const cls =
    status === "ACTIVE" ? "bg-emerald-500" :
    status === "FAILED" ? "bg-rose-500" :
    ["PENDING", "PROVISIONING"].includes(status) ? "bg-amber-500" :
    "bg-zinc-400";
  return <span className={`size-1.5 rounded-full ${cls}`} />;
}

function ruStatus(s: string) {
  return ({
    ACTIVE: "Активен",
    PENDING: "Ожидает",
    PROVISIONING: "Развёртывание",
    FAILED: "Ошибка",
    SUSPENDED: "Заморожен",
    DELETED: "Удалён",
  } as Record<string, string>)[s] ?? s;
}

function ruBusinessType(t: string) {
  return ({
    ECOMMERCE: "Интернет-магазин",
    RESTAURANT: "Ресторан",
    BEAUTY_SALON: "Салон красоты",
    MEDICAL_CLINIC: "Клиника",
    LAW_FIRM: "Юр. фирма",
    REAL_ESTATE: "Недвижимость",
    DELIVERY: "Доставка",
    SAAS_CRM: "SaaS / CRM",
    ONLINE_SCHOOL: "Онлайн-школа",
    BOOKING: "Бронирование",
    CORPORATE: "Корпоративный сайт",
    AUTOMOTIVE: "Авто",
  } as Record<string, string>)[t] ?? t;
}
