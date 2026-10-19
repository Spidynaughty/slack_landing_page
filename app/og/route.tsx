import { timingSafeEqual } from "node:crypto";
import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/lib/logo-paths";
import { DEFAULT_SHARE_IMAGE, OG_SIZE, signOg } from "@/lib/og";
import { site } from "@/lib/site";

/**
 * GET /og?t=<title>&k=<section>&s=<signature>: the share picture for one page,
 * with its title. Links come from buildMetadata (lib/seo.ts); anything unsigned
 * gets the site-wide picture instead.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const title = (params.get("t") ?? "").slice(0, 140);
  const kicker = (params.get("k") ?? "").slice(0, 40);
  const sig = params.get("s") ?? "";
  const expected = signOg(title, kicker);
  if (!title || !expected || sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return new Response(null, { status: 307, headers: { Location: DEFAULT_SHARE_IMAGE } });
  }

  const size = title.length > 70 ? 50 : title.length > 45 ? 60 : 72;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #051121 0%, #0a2a5c 60%, #1462e6 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", width: 68, height: 68, borderRadius: 20, background: "#fff", alignItems: "center", justifyContent: "center" }}>
              <svg width="46" height="46" viewBox="0 0 1024 1024">
                {LOGO_PATHS.map(([fill, d]) => (
                  <path key={fill} fill={fill} d={d} />
                ))}
              </svg>
            </div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
              <span>kt</span>
              <span style={{ color: "#5db8ff" }}>Teams</span>
            </div>
          </div>
          {kicker && (
            <div style={{ display: "flex", padding: "10px 24px", borderRadius: 999, background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.25)", fontSize: 26, color: "#dbe7f7" }}>
              {kicker}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 1040 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#c7d6ec" }}>
          <div style={{ display: "flex", width: 56, height: 6, borderRadius: 3, background: "#5db8ff" }} />
          {site.domain}
        </div>
      </div>
    ),
    { ...OG_SIZE, headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
  );
}
