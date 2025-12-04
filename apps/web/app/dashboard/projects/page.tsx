import Link from "next/link";
import { cookies } from "next/headers";
import { ssrApi } from "@/lib/api";
import { Plus, Layers, Globe } from "lucide-react";
import { PageHeader } from "../_components/dashboard-shell";

export default async function ProjectsPage() {
  const c = (await cookies()).toString();
  const projects = await ssrApi<any[]>("/projects", c).catch(() => []);

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Проекты"
        subtitle="Все бизнесы и сайты этого рабочего пространства"
        action={
          <Link
            href="/projects/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800"
          >
            <Plus className="size-3.5" /> Новый проект
          </Link>
        }
      />

      <div className="mx-auto max-w-7xl px-8 py-6">
        {projects.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-3 grid size-10 place-items-center rounded-lg bg-zinc-100">
              <Layers className="size-5 text-zinc-500" />
            </div>
            <p className="text-[13px] font-medium text-zinc-900">Пока нет проектов</p>
            <p className="mt-1 text-[12px] text-zinc-500">Создайте первый — мастер за 4 шага.</p>
            <Link
              href="/projects/new"
              className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800"
            >
              <Plus className="size-3.5" /> Создать проект
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-semibold text-zinc-900">{p.name}</div>
                    <div className="mt-0.5 text-[11.5px] text-zinc-500">{ruBusinessType(p.businessType)}</div>
                  </div>
                  <StatusPill status={p.status} />
                </div>
                {p.domains?.[0]?.hostname && (
                  <div className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                    <Globe className="size-3" /> {p.domains[0].hostname}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { dot: string; bg: string; text: string; label: string }> = {
    ACTIVE:       { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", label: "Активен" },
    PROVISIONING: { dot: "bg-amber-500",   bg: "bg-amber-50",   text: "text-amber-700",   label: "Развёртывание" },
    PENDING:      { dot: "bg-amber-500",   bg: "bg-amber-50",   text: "text-amber-700",   label: "Ожидает" },
    FAILED:       { dot: "bg-rose-500",    bg: "bg-rose-50",    text: "text-rose-700",    label: "Ошибка" },
    SUSPENDED:    { dot: "bg-rose-500",    bg: "bg-rose-50",    text: "text-rose-700",    label: "Заморожен" },
  };
  const s = map[status] ?? { dot: "bg-zinc-400", bg: "bg-zinc-100", text: "text-zinc-700", label: status };
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${s.bg} ${s.text}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
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
