"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [showTotp, setShowTotp] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body: Record<string, string> = { email, password };
      if (totp.trim()) body.totp = totp.trim();
      await api("/auth/login", { method: "POST", body: JSON.stringify(body) });
      toast.success("С возвращением!");
      router.push(sp.get("redirect") ?? "/");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? "Не удалось войти");
    } finally {
      setSubmitting(false);
    }
  }

  function fillDemo(role: "owner" | "admin") {
    if (role === "owner") {
      setEmail("owner@acme.test");
      setPassword("Owner123!");
    } else {
      setEmail("admin@nexora.app");
      setPassword("Admin123!");
    }
    setTotp("");
  }

  return (
    <div className="grid min-h-screen place-items-center bg-zinc-50 px-4">
      <div className="w-full max-w-[400px]">
        <Link href="/" className="mb-8 flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-md bg-zinc-950 text-[12px] font-bold text-white">N</div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900">Nexora</span>
        </Link>

        <div className="rounded-xl border border-zinc-200 bg-white p-7 shadow-sm">
          <div>
            <h1 className="text-[20px] font-semibold tracking-tight text-zinc-900">Войти в Nexora</h1>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
              Используйте свою рабочую почту или один из тестовых аккаунтов.
            </p>
          </div>

          {/* Demo creds */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo("owner")}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-left hover:border-zinc-300 hover:bg-zinc-100"
            >
              <div className="text-[12px] font-medium text-zinc-900">Владелец</div>
              <div className="mt-0.5 truncate font-mono text-[10px] text-zinc-500">owner@acme.test</div>
            </button>
            <button
              type="button"
              onClick={() => fillDemo("admin")}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-left hover:border-zinc-300 hover:bg-zinc-100"
            >
              <div className="text-[12px] font-medium text-zinc-900">Админ платформы</div>
              <div className="mt-0.5 truncate font-mono text-[10px] text-zinc-500">admin@nexora.app</div>
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                placeholder="••••••••"
              />
            </div>

            {!showTotp ? (
              <button
                type="button"
                onClick={() => setShowTotp(true)}
                className="text-[11.5px] font-medium text-zinc-500 hover:text-zinc-900"
              >
                Включён 2FA? Ввести код →
              </button>
            ) : (
              <div>
                <label htmlFor="totp" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">
                  Код 2FA
                </label>
                <input
                  id="totp"
                  name="totp"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="123456"
                  value={totp}
                  onChange={(e) => setTotp(e.target.value)}
                  className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 font-mono text-[13px] tracking-[0.2em] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-zinc-900 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
            >
              {submitting ? "Входим…" : (<>Войти <ArrowRight className="size-3.5" /></>)}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[12px] text-zinc-500">
          Ещё нет аккаунта?{" "}
          <Link href="/register" className="font-medium text-zinc-900 hover:underline">
            Создать workspace
          </Link>
        </p>
      </div>
    </div>
  );
}
