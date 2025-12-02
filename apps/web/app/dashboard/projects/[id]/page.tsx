"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { CheckCircle2, Circle, Loader2, XCircle, ExternalLink } from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { PageHeader } from "../../_components/dashboard-shell";

const STEP_LABELS: Record<string, string> = {
  TENANT_ENSURE: "Тенант",
  SCHEMA_SEED: "Сид базы данных",
  SITE_GENERATE: "Сайт",
  ADMIN_GENERATE: "Админка",
  MOBILE_CONFIG: "Mobile-приложение",
  CRM_BOOTSTRAP: "CRM",
  DOMAIN_PROVISION: "Поддомен",
  TLS_ISSUE: "SSL",
  CDN_PUBLISH: "CDN",
  MONITORING_ACTIVATE: "Мониторинг",
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Активен",
  PENDING: "Ожидает",
  PROVISIONING: "Развёртывание",
  FAILED: "Ошибка",
  SUSPENDED: "Заморожен",
  DELETED: "Удалён",
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try { setProject(await api(`/projects/${id}`)); }
    catch (e: any) { setError(e.message); }
  }

  useEffect(() => { refresh(); }, [id]);

  useEffect(() => {
    const socket: Socket = io(`${API_URL.replace(/^http/, "ws")}/projects`, { withCredentials: true, transports: ["websocket"] });
    socket.emit("watch", id);
    socket.on("progress", () => refresh());
    return () => { socket.disconnect(); };
  }, [id]);

  if (error) {
    return (
      <>
        <PageHeader eyebrow="Проект" title="Ошибка" />
        <div className="mx-auto max-w-3xl px-8 py-6">
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[12.5px] text-rose-700">{error}</div>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <PageHeader eyebrow="Проект" title="Загрузка…" />
      </>
    );
  }

  const primary = project.domains?.find((d: any) => d.isPrimary);

  return (
    <>
      <PageHeader
        eyebrow="Проект"
        title={project.name}
        subtitle={`${project.businessType} · ${STATUS_LABELS[project.status] ?? project.status}`}
        action={
          primary?.hostname && (
            <a
              href={`https://${primary.hostname}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-[13px] font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Открыть сайт <ExternalLink className="size-3.5" />
            </a>
          )
        }
      />

      <div className="mx-auto max-w-4xl space-y-6 px-8 py-6">
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 px-5 py-4">
            <h2 className="text-[13px] font-semibold text-zinc-900">Развёртывание</h2>
            <p className="mt-0.5 text-[11.5px] text-zinc-500">
              {project.status === "ACTIVE" ? "Готово" : "Настраиваем ваш бизнес — обычно 2–5 минут."}
            </p>
          </div>
          <ul className="divide-y divide-zinc-100">
            {project.steps?.map((s: any) => <StepRow key={s.id} step={s} />)}
          </ul>
        </section>

        {project.failureReason && (
          <section className="overflow-hidden rounded-lg border border-rose-200 bg-rose-50">
            <div className="border-b border-rose-200 px-5 py-3">
              <h2 className="text-[13px] font-semibold text-rose-900">Ошибка развёртывания</h2>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[11.5px] text-rose-900">{project.failureReason}</pre>
          </section>
        )}
      </div>
    </>
  );
}

function StepRow({ step }: { step: any }) {
  const icon =
    step.status === "SUCCEEDED" ? <CheckCircle2 className="size-4 text-emerald-500" /> :
    step.status === "RUNNING"   ? <Loader2 className="size-4 animate-spin text-zinc-700" /> :
    step.status === "FAILED"    ? <XCircle className="size-4 text-rose-500" /> :
                                  <Circle className="size-4 text-zinc-300" />;
  return (
    <li className="flex items-center gap-3 px-5 py-2.5">
      {icon}
      <span className="text-[13px] text-zinc-900">{STEP_LABELS[step.name] ?? step.name}</span>
      {step.error && <span className="ml-auto truncate text-[11px] text-rose-600">{step.error}</span>}
    </li>
  );
}
