/**
 * True when a request comes from this site's own pages. Compares the Origin
 * header with the Host the browser used. (request.url is not reliable here:
 * when the server listens on 0.0.0.0 it reports that address instead.)
 */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin GETs and some older browsers omit it
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
}
