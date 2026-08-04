import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  isLocale,
  localeCookieOptions,
  resolvePreferredLocale,
} from "@/lib/locales";

function pathnameLocale(pathname: string): string | null {
  const hit = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  return hit ?? null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const current = pathnameLocale(pathname);

  // Explicit locale in URL → keep it and remember preference
  if (current && isLocale(current)) {
    const response = NextResponse.next();
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    if (saved !== current) {
      response.cookies.set(LOCALE_COOKIE, current, localeCookieOptions());
    }
    return response;
  }

  // No locale prefix → cookie, then browser Accept-Language, then English
  const preferred = resolvePreferredLocale(
    request.cookies.get(LOCALE_COOKIE)?.value,
    request.headers.get("accept-language") ?? ""
  );

  const locale = preferred || DEFAULT_LOCALE;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, localeCookieOptions());
  return response;
}

export const config = {
  matcher: [
    // Skip Next assets, API, monitoring, static files, and brand/PWA icons
    // (Google Search favicon + install icons must stay on the hostname root).
    "/((?!_next|api|favicon\\.ico|icon$|icon-|apple-icon|monitoring|.*\\..*).*)",
  ],
};
