import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** The picture shown when a link to the site is shared (built once at build time). */
export const alt = `${site.name}: where teams and AI get things done`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK = [
  ["#0D55C7", "M0 823 4 802 11 783 22 765 33 752 409 403 417 396 423 393 423 701 410 714 348 771 199 906 175 924 162 931 149 936 126 941 114 942 94 941 75 937 62 932 51 926 41 919 30 909 20 897 12 884 7 873 1 851 0 843Z"],
  ["#1769F5", "M449 123 451 107 454 95 460 79 472 59 482 47 501 31 516 22 530 16 540 13 562 9 584 9 606 13 623 19 637 26 653 37 667 50 682 71 689 86 692 95 695 108 696 117 696 501 692 506 454 664 450 664 449 481Z"],
  ["#2588FF", "M475 681 478 678 494 667 677 544 689 536 695 533 697 533 880 699 985 796 1001 813 1009 825 1016 840 1020 852 1023 866 1024 875 1024 895 1022 909 1019 921 1015 932 1007 948 999 960 983 978 971 988 959 996 941 1005 923 1011 899 1015 877 1015 867 1014 852 1011 835 1005 820 997 801 983 624 821 484 691 475 682Z"],
];

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
              {MARK.map(([fill, d]) => (
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
