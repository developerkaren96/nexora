import { NextResponse } from "next/server";
import { LOCALES, type Locale } from "@/lib/i18n/dictionaries";
import { LOCALE_COOKIE } from "@/lib/i18n/get-locale";

export async function POST(req: Request) {
  const { locale } = (await req.json().catch(() => ({}))) as { locale?: string };
  if (!locale || !LOCALES.includes(locale as Locale)) {
    return NextResponse.json({ ok: false, error: "invalid locale" }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: "lax",
  });
  return res;
}
