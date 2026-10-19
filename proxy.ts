import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic gate for the admin area: visitors without a session cookie go
 * straight to the login page. The real check (signature and expiry) happens in
 * requireAdmin() on every admin page and Server Action.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
  matcher: ["/admin", "/admin/:path*"],
};
