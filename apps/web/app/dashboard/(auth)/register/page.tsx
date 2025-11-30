"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [tenantSlug, setTenantSlug] = useState("");

  function autoSlug(v: string) {
    setTenantName(v);
    if (!slugTouched) {
      const s = v.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);
      setTenantSlug(s);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    setSubmitting(true);
    try {
      await api("/auth/register", { method: "POST", body: JSON.stringify(fd) });
      toast.success("Добро пожаловать в Nexora!");
      router.push("/onboarding");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Не удалось создать аккаунт");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-zinc-50 px-4 py-10">
      <div className="w-full max-w-[440px]">
        <Link href="/" className="mb-8 flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-md bg-zinc-950 text-[12px] font-bold text-white">N</div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900">Nexora</span>
        </Link>

        <div className="rounded-xl border border-zinc-200 bg-white p-7 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
              14 дней бесплатно · без карты
            </div>
            <h1 className="mt-2.5 text-[20px] font-semibold tracking-tight text-zinc-900">Создать workspace</h1>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
              Введите данные — мы создадим аккаунт, тенант и подписку STARTER.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="name" label="Ваше имя" required />
              <Field id="email" label="Email" type="email" required />
            </div>
            <Field id="password" label="Пароль" type="password" minLength={10} required hint="Минимум 10 символов." />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                id="tenantName"
                label="Название компании"
                placeholder="Acme Inc."
                required
                value={tenantName}
                onChange={(e) => autoSlug(e.target.value)}
              />
              <div>
                <label htmlFor="tenantSlug" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
                  URL-слаг
                </label>
                <div className="flex h-9 overflow-hidden rounded-md border border-zinc-200 bg-white focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/10">
                  <input
                    id="tenantSlug"
                    name="tenantSlug"
                    placeholder="acme"
                    pattern="[a-z0-9]([a-z0-9-]{1,30}[a-z0-9])?"
                    required
                    value={tenantSlug}
                    onChange={(e) => { setSlugTouched(true); setTenantSlug(e.target.value); }}
                    className="min-w-0 flex-1 bg-transparent px-3 text-[13px] text-zinc-900 outline-none placeholder:text-zinc-400"
                  />
                  <span className="flex items-center bg-zinc-50 px-2 font-mono text-[11px] text-zinc-500">.nexora.app</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-zinc-900 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
            >
              {submitting ? "Создаём…" : (<>Создать аккаунт <ArrowRight className="size-3.5" /></>)}
            </button>

            <p className="text-center text-[10.5px] leading-relaxed text-zinc-500">
              Нажимая «Создать», вы соглашаетесь с{" "}
              <a className="text-zinc-700 underline-offset-4 hover:underline" href="/terms">Условиями</a>{" "}
              и{" "}
              <a className="text-zinc-700 underline-offset-4 hover:underline" href="/privacy">Политикой&nbsp;конфиденциальности</a>.
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-[12px] text-zinc-500">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-medium text-zinc-900 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  required,
  minLength,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  hint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        value={value}
        onChange={onChange}
        className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
      />
      {hint && <p className="mt-1 text-[10.5px] text-zinc-500">{hint}</p>}
    </div>
  );
}
