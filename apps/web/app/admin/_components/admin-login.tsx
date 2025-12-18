"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

export function AdminLogin({ wrongRole }: { wrongRole?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState(wrongRole ? "" : "admin@nexora.app");
  const [password, setPassword] = useState(wrongRole ? "" : "Admin123!");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api<{ user: { systemRole?: string } }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.user?.systemRole !== "PLATFORM_ADMIN") {
        toast.error("У этого аккаунта нет роли PLATFORM_ADMIN");
        await api("/auth/logout", { method: "POST" }).catch(() => {});
        return;
      }
      toast.success("Добро пожаловать, администратор");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Не удалось войти");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-zinc-50 px-4">
      <div className="w-full max-w-[380px]">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-md bg-zinc-950 text-white">
            <ShieldCheck className="size-4" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900">Nexora</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400">admin</span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-zinc-200 bg-white p-7 shadow-sm">
          <div>
            <h1 className="text-[20px] font-semibold tracking-tight text-zinc-900">
              {wrongRole ? "Недостаточно прав" : "Вход в админ-панель"}
            </h1>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
              {wrongRole
                ? "Этот аккаунт не имеет роли PLATFORM_ADMIN. Войдите как администратор платформы."
                : "Используйте учётную запись администратора платформы."}
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-3.5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none transition-shadow placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none transition-shadow placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-1 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-zinc-900 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
            >
              {submitting ? "Входим…" : (<>Войти <ArrowRight className="size-3.5" /></>)}
            </button>
          </form>

          <div className="mt-5 rounded-md border border-dashed border-zinc-200 bg-zinc-50 px-3 py-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Тестовый аккаунт</div>
            <div className="mt-1 font-mono text-[11.5px] text-zinc-700">admin@nexora.app · Admin123!</div>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-zinc-400">
          © {new Date().getFullYear()} Nexora · Restricted access
        </p>
      </div>
    </div>
  );
}
