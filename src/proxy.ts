import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((s) => s.split(";")[0].trim().slice(0, 2))
    .find((lang) => locales.includes(lang));
  return preferred ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
