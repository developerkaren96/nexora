import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-zinc-50 px-4">
      <div className="w-full max-w-[460px] rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 grid size-10 place-items-center rounded-lg bg-zinc-900 text-white">
          <Sparkles className="size-5" />
        </div>
        <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900">Добро пожаловать в Nexora</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
          Workspace готов. Запустите первый проект — это займёт 2–5 минут.
        </p>
        <Link
          href="/projects/new"
          className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-md bg-zinc-900 px-4 text-[13px] font-medium text-white hover:bg-zinc-800"
        >
          Создать первый проект <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
