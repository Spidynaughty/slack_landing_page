import { NextResponse, type NextRequest } from "next/server";

/**
 * Runs before every page and API route.
 *
 * 1. One address per page: every route is lowercase, so /Pricing is sent to
 *    /pricing. This also protects the page cache: on Windows, file names
 *    ignore case, so a cached "not found" for /pricing/Free would land in the
 *    same file as the real /pricing/free and break it.
 * 2. Optimistic gate for the admin area: visitors without a session cookie go
 *    straight to the login page. The real check (signature and expiry) happens
 *    in requireAdmin() on every admin page and Server Action.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lowercase the letters but leave %XX escapes as they are
  const lower = pathname.replace(/%[0-9a-f]{2}|[A-Z]+/gi, (m) => (m.startsWith("%") ? m : m.toLowerCase()));
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }

  if (pathname !== "/admin" && !pathname.startsWith("/admin/")) return NextResponse.next();

  let response = NextResponse.next();
  // API routes answer 401 themselves instead of redirecting to the login page
  const open = pathname.startsWith("/admin/login") || pathname.startsWith("/admin/api/");
  if (!open && !request.cookies.has("kt_admin")) {
    const login = new URL("/admin/login", request.url);
    if (pathname !== "/admin") login.searchParams.set("next", pathname);
    response = NextResponse.redirect(login);
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Everything except Next.js build assets and files with an extension (images, fonts, robots.txt and so on)
  matcher: ["/((?!_next/static|_next/image|.*\\.[^/]+$).*)"],
};
