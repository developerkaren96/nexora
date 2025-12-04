"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Utensils, Scissors, Stethoscope, Gavel, Home, Bike, Cog, GraduationCap, Calendar, Briefcase, Car, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { api } from "@/lib/api";

const TYPES = [
  { code: "ECOMMERCE",      label: "Интернет-магазин", icon: <Building2 className="size-5" /> },
  { code: "RESTAURANT",     label: "Ресторан",         icon: <Utensils className="size-5" /> },
  { code: "BEAUTY_SALON",   label: "Салон красоты",    icon: <Scissors className="size-5" /> },
  { code: "MEDICAL_CLINIC", label: "Клиника",          icon: <Stethoscope className="size-5" /> },
  { code: "LAW_FIRM",       label: "Юр. фирма",        icon: <Gavel className="size-5" /> },
  { code: "REAL_ESTATE",    label: "Недвижимость",     icon: <Home className="size-5" /> },
  { code: "DELIVERY",       label: "Доставка",         icon: <Bike className="size-5" /> },
  { code: "SAAS_CRM",       label: "SaaS / CRM",       icon: <Cog className="size-5" /> },
  { code: "ONLINE_SCHOOL",  label: "Онлайн-школа",     icon: <GraduationCap className="size-5" /> },
  { code: "BOOKING",        label: "Бронирование",     icon: <Calendar className="size-5" /> },
  { code: "CORPORATE",      label: "Корп. сайт",       icon: <Briefcase className="size-5" /> },
  { code: "AUTOMOTIVE",     label: "Авто",             icon: <Car className="size-5" /> },
];

export default function NewProjectWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ businessType: "", name: "", slug: "", logoUrl: "", brandColor: "#6366F1" });
  const [submitting, setSubmitting] = useState(false);

  function patch(p: Partial<typeof data>) { setData((d) => ({ ...d, ...p })); }

  async function submit() {
    setSubmitting(true);
    try {
      // Strip empty optional fields — empty strings fail @IsUrl on the API and
      // would silently reject the whole payload.
      const payload: Record<string, unknown> = {
        businessType: data.businessType,
        name: data.name.trim(),
        slug: data.slug.trim(),
        brandColor: data.brandColor,
      };
      if (data.logoUrl.trim()) payload.logoUrl = data.logoUrl.trim();

      const project: any = await api("/projects", { method: "POST", body: JSON.stringify(payload) });
      toast.success("Проект создан — разворачиваем…");
      router.push(`/projects/${project.id}`);
    } catch (e: any) {
      toast.error(e.message ?? "Не удалось создать проект");
    } finally {
      setSubmitting(false);
    }
  }

  const steps = ["Тип", "Идентичность", "Бренд", "Проверка"];
  const canNext =
    (step === 0 && !!data.businessType) ||
    (step === 1 && data.name.length >= 2 && /^[a-z0-9]([a-z0-9-]{1,30}[a-z0-9])?$/.test(data.slug)) ||
    (step === 2) ||
    step === 3;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-8 py-8">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Workspace</p>
        <h1 className="mt-0.5 text-[22px] font-semibold tracking-tight text-zinc-900">Создать проект</h1>
        <p className="mt-1 text-[13px] text-zinc-500">Четыре шага — и у вас живой бизнес с сайтом и поддоменом.</p>
      </header>

      <ol className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`flex flex-1 items-center gap-2 rounded-md border px-3 py-2 text-[12px] ${
              i === step
                ? "border-zinc-900 bg-zinc-900 text-white"
                : i < step
                  ? "border-zinc-300 bg-white text-zinc-900"
                  : "border-zinc-200 bg-white text-zinc-400"
            }`}
          >
            <span className={`inline-flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${
              i === step ? "border-white/40 bg-white/10" : i < step ? "border-zinc-300 bg-zinc-100" : "border-zinc-200"
            }`}>
              {i < step ? <Check className="size-3" /> : i + 1}
            </span>
            <span className="font-medium">{s}</span>
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
            {step === 0 && (
              <div>
                <h2 className="mb-4 text-[15px] font-semibold text-zinc-900">Какой у вас бизнес?</h2>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {TYPES.map((t) => {
                    const selected = data.businessType === t.code;
                    return (
                      <button
                        key={t.code}
                        type="button"
                        onClick={() => patch({ businessType: t.code })}
                        className={`flex items-center gap-2.5 rounded-md border p-3 text-left transition-colors ${
                          selected
                            ? "border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900"
                            : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                      >
                        <span className={`grid size-8 shrink-0 place-items-center rounded-md ${selected ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"}`}>
                          {t.icon}
                        </span>
                        <span className="text-[12.5px] font-medium text-zinc-900">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-[15px] font-semibold text-zinc-900">Название и URL</h2>
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">Название бизнеса</label>
                  <input
                    id="name"
                    value={data.name}
                    onChange={(e) => patch({ name: e.target.value, slug: data.slug || slugify(e.target.value) })}
                    className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                    placeholder="Acme Coffee"
                  />
                </div>
                <div>
                  <label htmlFor="slug" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">Слаг</label>
                  <div className="flex h-9 overflow-hidden rounded-md border border-zinc-200 bg-white focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/10">
                    <input
                      id="slug"
                      value={data.slug}
                      onChange={(e) => patch({ slug: e.target.value })}
                      className="min-w-0 flex-1 bg-transparent px-3 text-[13px] outline-none"
                      placeholder="acme"
                    />
                    <span className="flex items-center bg-zinc-50 px-2 font-mono text-[11px] text-zinc-500">.nexora.app</span>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-[15px] font-semibold text-zinc-900">Брендинг</h2>
                <div>
                  <label htmlFor="logoUrl" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">URL логотипа</label>
                  <input
                    id="logoUrl"
                    placeholder="https://…"
                    value={data.logoUrl}
                    onChange={(e) => patch({ logoUrl: e.target.value })}
                    className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-[13px] outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                  />
                </div>
                <div>
                  <label htmlFor="brandColor" className="mb-1.5 block text-[11.5px] font-medium text-zinc-700">Цвет бренда</label>
                  <div className="flex items-center gap-3">
                    <input
                      id="brandColor"
                      type="color"
                      value={data.brandColor}
                      onChange={(e) => patch({ brandColor: e.target.value })}
                      className="size-9 cursor-pointer rounded-md border border-zinc-200 bg-white"
                    />
                    <code className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[12px] text-zinc-700">
                      {data.brandColor}
                    </code>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3">
                <h2 className="text-[15px] font-semibold text-zinc-900">Проверка</h2>
                <div className="overflow-hidden rounded-md border border-zinc-200">
                  <Row k="Тип" v={data.businessType} />
                  <Row k="Название" v={data.name} />
                  <Row k="URL" v={`${data.slug}.nexora.app`} />
                  <Row
                    k="Цвет бренда"
                    v={
                      <span className="inline-flex items-center gap-2 font-mono text-[12px]">
                        <span className="inline-block size-3.5 rounded border border-zinc-200" style={{ background: data.brandColor }} />
                        {data.brandColor}
                      </span>
                    }
                  />
                </div>
                <p className="mt-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-[11.5px] text-zinc-600">
                  Мы развернём сайт, mobile-конфиг, CRM, поддомен и SSL — обычно 2–5 минут.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-[13px] font-medium text-zinc-900 hover:bg-zinc-50 disabled:opacity-50"
        >
          <ArrowLeft className="size-3.5" /> Назад
        </button>
        {step < 3 ? (
          <button
            type="button"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            Далее <ArrowRight className="size-3.5" />
          </button>
        ) : (
          <button
            type="button"
            disabled={submitting}
            onClick={submit}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            <Check className="size-3.5" /> {submitting ? "Создаём…" : "Запустить"}
          </button>
        )}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 bg-white px-4 py-2.5 last:border-0">
      <span className="text-[11.5px] text-zinc-500">{k}</span>
      <span className="text-[12.5px] font-medium text-zinc-900">{v}</span>
    </div>
  );
}
function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32); }
