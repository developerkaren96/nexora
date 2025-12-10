"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { PageHeader } from "../_components/dashboard-shell";
import { Globe, Plus, Check } from "lucide-react";

export default function DomainsPage() {
  const [domains, setDomains] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [hostname, setHostname] = useState("");
  const [projectId, setProjectId] = useState("");

  async function refresh() {
    setDomains(await api("/domains"));
    setProjects(await api("/projects"));
  }
  useEffect(() => { refresh().catch((e) => toast.error(e.message)); }, []);

  async function add() {
    try {
      await api("/domains", { method: "POST", body: JSON.stringify({ hostname, projectId }) });
      setHostname("");
      refresh();
      toast.success("Домен добавлен — настройте DNS-записи");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function verify(id: string) {
    try {
      await api(`/domains/${id}/verify`, { method: "POST" });
      refresh();
      toast.success("Запущена проверка DNS");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Домены"
        subtitle="Поддомены nexora.app и собственные кастомные домены"
      />

      <div className="mx-auto max-w-7xl space-y-6 px-8 py-6">
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center border-b border-zinc-100 px-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">Подключить домен</h2>
            <span className="ml-auto text-[11px] text-zinc-500">Требуется тариф Business+</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 p-5">
            <select
              className="h-9 rounded-md border border-zinc-200 bg-white px-2 text-[13px] outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">Выберите проект…</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <input
              className="h-9 min-w-[240px] flex-1 rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
              placeholder="shop.example.com"
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
            />
            <button
              onClick={add}
              disabled={!hostname || !projectId}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              <Plus className="size-3.5" /> Добавить
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center border-b border-zinc-100 px-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">Ваши домены</h2>
          </div>
          <ul className="divide-y divide-zinc-100">
            {domains.map((d) => (
              <li key={d.id} className="flex items-center gap-3 px-5 py-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-zinc-100">
                  <Globe className="size-3.5 text-zinc-600" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-[12.5px] font-medium text-zinc-900">{d.hostname}</div>
                  <div className="mt-0.5 text-[11px] text-zinc-500">
                    {ruDomainKind(d.kind)} · {ruDomainStatus(d.status)}
                    {d.verifyToken && (
                      <span className="ml-1 text-zinc-400">
                        · TXT <span className="font-mono">_nexora-verify.{d.hostname}</span> = <span className="font-mono">{d.verifyToken}</span>
                      </span>
                    )}
                  </div>
                </div>
                {d.status === "ACTIVE" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                    <Check className="size-3" /> Активен
                  </span>
                ) : d.kind === "CUSTOM" ? (
                  <button
                    onClick={() => verify(d.id)}
                    className="inline-flex h-7 items-center rounded-md border border-zinc-200 bg-white px-2.5 text-[11.5px] font-medium hover:bg-zinc-50"
                  >
                    Проверить
                  </button>
                ) : null}
              </li>
            ))}
            {domains.length === 0 && (
              <li className="px-5 py-10 text-center text-[12px] text-zinc-500">Пока нет доменов.</li>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}

function ruDomainKind(k: string) {
  return ({ SUBDOMAIN: "Поддомен", CUSTOM: "Кастомный" } as Record<string, string>)[k] ?? k;
}
function ruDomainStatus(s: string) {
  return ({ ACTIVE: "Активен", PENDING: "Ожидает DNS", FAILED: "Ошибка", VERIFYING: "Проверка" } as Record<string, string>)[s] ?? s;
}
