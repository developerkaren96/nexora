"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { PageHeader } from "../_components/dashboard-shell";
import { Search } from "lucide-react";

export default function CrmPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [q, setQ] = useState("");

  async function refresh() {
    setCustomers(await api(`/crm/customers${q ? `?q=${encodeURIComponent(q)}` : ""}`));
  }
  useEffect(() => { refresh().catch((e) => toast.error(e.message)); /* eslint-disable-next-line */ }, [q]);

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="CRM"
        subtitle="Клиенты, заказы, сегменты — всё в одном месте"
        action={
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              placeholder="Поиск клиентов…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-9 w-[260px] rounded-md border border-zinc-200 bg-white pl-8 pr-3 text-[13px] outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <table className="w-full text-[13px]">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              <tr>
                <th className="px-5 py-2.5 font-semibold">Имя</th>
                <th className="px-3 py-2.5 font-semibold">Email</th>
                <th className="px-3 py-2.5 font-semibold">Телефон</th>
                <th className="px-5 py-2.5 text-right font-semibold">Создан</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-50">
                  <td className="px-5 py-2.5 font-medium text-zinc-900">{c.name ?? "—"}</td>
                  <td className="px-3 py-2.5 text-zinc-700">{c.email ?? "—"}</td>
                  <td className="px-3 py-2.5 font-mono text-[12px] text-zinc-700">{c.phone ?? "—"}</td>
                  <td className="px-5 py-2.5 text-right text-[11.5px] text-zinc-500">
                    {new Date(c.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <p className="text-[13px] font-medium text-zinc-900">Пока нет клиентов</p>
                    <p className="mt-1 text-[12px] text-zinc-500">Первые клиенты появятся здесь после оформления заказа.</p>
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
