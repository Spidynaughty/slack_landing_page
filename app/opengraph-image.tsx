import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/lib/logo-paths";
import { site } from "@/lib/site";

/** The picture shown when a link to the site is shared (built once at build time). */
export const alt = `${site.name}: where teams and AI get things done`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #051121 0%, #0a2a5c 55%, #1462e6 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", width: 84, height: 84, borderRadius: 24, background: "#fff", alignItems: "center", justifyContent: "center" }}>
            <svg width="58" height="58" viewBox="0 0 1024 1024">
              {LOGO_PATHS.map(([fill, d]) => (
                <path key={fill} fill={fill} d={d} />
              ))}
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700, letterSpacing: -1 }}>
            <span>kt</span>
            <span style={{ color: "#5db8ff" }}>Teams</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ marginRight: 20 }}>Where teams and AI</span>
            <span style={{ color: "#5db8ff" }}>get things done</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#c7d6ec", maxWidth: 900 }}>
            Channels, huddles, canvases and AI agents in one place.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 24, color: "#dbe7f7" }}>
          {["Team chat", "Huddles", "AI agents", "Workflows"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, border: "2px solid rgba(255,255,255,0.25)" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
