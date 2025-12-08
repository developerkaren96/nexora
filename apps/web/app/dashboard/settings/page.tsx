"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { PageHeader } from "../_components/dashboard-shell";
import { ShieldCheck, Check } from "lucide-react";

export default function SettingsPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [recovery, setRecovery] = useState<string[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { api("/tenants/current").then(setTenant).catch((e) => toast.error(e.message)); }, []);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    setSaving(true);
    try {
      await api("/tenants/current", { method: "PATCH", body: JSON.stringify(fd) });
      toast.success("Сохранено");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function begin2fa() {
    try {
      const { qrDataUrl }: any = await api("/auth/2fa/begin", { method: "POST" });
      setQr(qrDataUrl);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function confirm2fa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = (new FormData(e.currentTarget).get("code") as string).trim();
    try {
      const { recoveryCodes }: any = await api("/auth/2fa/confirm", { method: "POST", body: JSON.stringify({ code }) });
      setRecovery(recoveryCodes);
      setQr(null);
      toast.success("2FA включена");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Workspace" title="Настройки" subtitle="Бренд, безопасность, владелец рабочего пространства" />

      <div className="mx-auto max-w-3xl space-y-6 px-8 py-6">
        {/* Workspace */}
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center border-b border-zinc-100 px-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">Workspace</h2>
          </div>
          {!tenant ? (
            <div className="px-5 py-8 text-center text-[12px] text-zinc-500">Загрузка…</div>
          ) : (
            <form onSubmit={save} className="space-y-4 p-5">
              <Field id="name" label="Название" defaultValue={tenant.name} />
              <Field id="logoUrl" label="URL логотипа" defaultValue={tenant.logoUrl ?? ""} placeholder="https://…" />
              <div>
                <label htmlFor="brandColor" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
                  Цвет бренда
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="brandColor"
                    name="brandColor"
                    type="color"
                    defaultValue={tenant.brandColor}
                    className="size-9 cursor-pointer rounded-md border border-zinc-200 bg-white"
                  />
                  <code className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[12px] text-zinc-700">
                    {tenant.brandColor}
                  </code>
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
              >
                {saving ? "Сохраняем…" : "Сохранить"}
              </button>
            </form>
          )}
        </section>

        {/* 2FA */}
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="flex h-11 items-center gap-2 border-b border-zinc-100 px-5">
            <ShieldCheck className="size-3.5 text-zinc-500" />
            <h2 className="text-[13px] font-semibold text-zinc-900">Двухфакторная аутентификация</h2>
          </div>
          <div className="p-5">
            {!qr && !recovery && (
              <>
                <p className="mb-4 text-[12.5px] text-zinc-500">
                  Используйте приложение-аутентификатор (Google Authenticator, 1Password, Authy).
                </p>
                <button
                  onClick={begin2fa}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-[13px] font-medium hover:bg-zinc-50"
                >
                  Включить 2FA
                </button>
              </>
            )}
            {qr && (
              <form onSubmit={confirm2fa} className="space-y-3">
                <p className="text-[12.5px] text-zinc-500">Отсканируйте QR в приложении-аутентификаторе.</p>
                <div className="inline-block rounded-md border border-zinc-200 bg-white p-2">
                  <Image src={qr} alt="QR" width={180} height={180} />
                </div>
                <div className="max-w-[200px]">
                  <input
                    name="code"
                    placeholder="123456"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 font-mono text-[14px] tracking-[0.2em] outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800"
                >
                  Подтвердить
                </button>
              </form>
            )}
            {recovery && (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-amber-900">
                  <Check className="size-4" /> 2FA включена
                </div>
                <p className="mt-1 text-[12px] text-amber-800">Сохраните эти резервные коды (показываются один раз):</p>
                <ul className="mt-3 grid grid-cols-2 gap-1.5 font-mono text-[11.5px] text-amber-900">
                  {recovery.map((r) => <li key={r} className="rounded bg-white px-2 py-1">{r}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  defaultValue,
  placeholder,
}: {
  id: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">{label}</label>
      <input
        id={id}
        name={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
      />
    </div>
  );
}
