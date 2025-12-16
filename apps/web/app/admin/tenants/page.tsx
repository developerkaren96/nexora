import { cookies } from "next/headers";
import { ssrApi } from "@/lib/api";
import { PageHeader, StatusPill } from "../_components/page-chrome";

type Tenant = {
  id: string;
  slug: string;
  name: string;
  status: string;
  brandColor?: string;
  createdAt: string;
  subscription?: { planCode?: string; status?: string };
  _count: { projects: number; memberships: number };
};

export default async function AdminTenants() {
  const c = (await cookies()).toString();
  const tenants: Tenant[] = await ssrApi<Tenant[]>("/admin/tenants", c).catch(() => []);

  const byStatus = tenants.reduce<Record<string, number>>((acc, t) => {
    acc[t.status] = (acc[t.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Платформа"
        title="Тенанты"
        subtitle="Все клиенты платформы — компании, их подписки и проекты"
        action={
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-medium text-zinc-500">
              Всего: <span className="font-mono tabular-nums text-zinc-900">{tenants.length}</span>
            </span>
            {Object.entries(byStatus).map(([s, n]) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <StatusPill status={s} />
                <span className="font-mono tabular-nums text-zinc-500">{n}</span>
              </span>
            ))}
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <table className="w-full text-[13px]">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              <tr>
                <th className="px-5 py-2.5 font-semibold">Тенант</th>
                <th className="px-3 py-2.5 font-semibold">Тариф</th>
                <th className="px-3 py-2.5 font-semibold">Статус</th>
                <th className="px-3 py-2.5 text-right font-semibold">Проекты</th>
                <th className="px-3 py-2.5 text-right font-semibold">Участники</th>
                <th className="px-5 py-2.5 text-right font-semibold">Создан</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-zinc-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid size-7 shrink-0 place-items-center rounded-md text-[11px] font-semibold text-white"
                        style={{ background: t.brandColor || "#18181B" }}
                      >
                        {t.name.slice(0, 1).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-zinc-900">{t.name}</div>
                        <div className="truncate font-mono text-[11px] text-zinc-500">{t.slug}.nexora.app</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {t.subscription?.planCode ? (
                      <span className="inline-flex rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-zinc-700">
                        {t.subscription.planCode}
                      </span>
                    ) : (
                      <span className="text-zinc-400">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <StatusPill status={t.status} />
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums text-[12px] text-zinc-700">{t._count.projects}</td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums text-[12px] text-zinc-700">{t._count.memberships}</td>
                  <td className="px-5 py-3 text-right text-[11px] text-zinc-500">
                    {new Date(t.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
              {tenants.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-20 text-center">
                    <p className="text-[13px] font-medium text-zinc-900">Пока нет тенантов</p>
                    <p className="mt-1 text-[12px] text-zinc-500">
                      Как только кто-то зарегистрируется через app.nexora.app — они появятся здесь.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
