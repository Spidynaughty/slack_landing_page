/**
 * Draws the blog cover illustrations into public/blog/covers/<slug>.svg.
 * Run `npm run covers` after editing a scene. Every cover is 1200x675 and
 * keeps its main subject inside y 140-535, so the short cards on the blog
 * listing (about 3:1) still show it when they crop the top and bottom.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const W = 1200;
const H = 675;
const FONT = "'Google Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', Consolas, Menlo, monospace";
const INK = "#0b1a2e";
const MUTED = "#6b7a90";
const LINE = "#e3e9f2";
const FAINT = "#f3f6fb";
const BLUE = "#1462e6";
const GREEN = "#16a34a";

const palettes = {
  violet: { a: "#0a3bb0", b: "#3aa0ff", glow: "#9ad6ff", deep: "#05276f", solid: "#1462e6", soft: "#e7f0ff", ink: "#0b47b8" },
  sky: { a: "#024f86", b: "#35c0f5", glow: "#b6eeff", deep: "#023459", solid: "#0284c7", soft: "#e1f5fd", ink: "#03659c" },
  sun: { a: "#d26300", b: "#fdc94a", glow: "#fff2bf", deep: "#8a4100", solid: "#f59e0b", soft: "#fff5d9", ink: "#8a4b00" },
  pink: { a: "#a20e45", b: "#ff6d9c", glow: "#ffc9dc", deep: "#6e0a30", solid: "#e51b5b", soft: "#ffe7f0", ink: "#b0124c" },
  mint: { a: "#0a5a2e", b: "#34d39e", glow: "#c6f8e0", deep: "#063f20", solid: "#15803d", soft: "#e2f7ec", ink: "#0f6b37" },
  coral: { a: "#ad1439", b: "#ff9170", glow: "#ffd6c9", deep: "#7a0d27", solid: "#e11d48", soft: "#ffe9e4", ink: "#b3163d" },
};

/* ------------------------------------------------------------------ */
/* Drawing helpers                                                     */
/* ------------------------------------------------------------------ */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attrs = (o = {}) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("");

const rect = (x, y, w, h, rx, fill, extra) => `<rect${attrs({ x, y, width: w, height: h, rx, fill, ...extra })}/>`;
const circle = (cx, cy, r, fill, extra) => `<circle${attrs({ cx, cy, r, fill, ...extra })}/>`;
const line = (x1, y1, x2, y2, stroke, width = 2, extra) =>
  `<line${attrs({ x1, y1, x2, y2, stroke, "stroke-width": width, "stroke-linecap": "round", ...extra })}/>`;
const pathEl = (d, extra) => `<path${attrs({ d, ...extra })}/>`;
const text = (x, y, s, { size = 18, weight = 600, fill = INK, anchor = "start", family = FONT, opacity, spacing } = {}) =>
  `<text${attrs({ x, y, "font-family": family, "font-size": size, "font-weight": weight, fill, "text-anchor": anchor, "fill-opacity": opacity, "letter-spacing": spacing })}>${esc(s)}</text>`;

/** Grey bars standing in for lines of text. */
const bars = (x, y, widths, { h = 10, gap = 20, fill = LINE } = {}) => widths.map((w, i) => rect(x, y + i * gap, w, h, h / 2, fill)).join("");

/** A white panel with a soft shadow; `inner` is drawn on top without the shadow. */
const panel = (x, y, w, h, inner = "", { rx = 22, fill = "#fff", shadow = "shadow" } = {}) =>
  `<g filter="url(#${shadow})">${rect(x, y, w, h, rx, fill)}</g>${inner}`;

/** An app window with traffic-light dots and a title. */
function appWindow(x, y, w, h, title, inner = "", { extra = "" } = {}) {
  return panel(
    x,
    y,
    w,
    h,
    rect(x, y, w, 54, 22, FAINT) +
      rect(x, y + 30, w, 24, 0, FAINT) +
      line(x, y + 54, x + w, y + 54, LINE, 2) +
      circle(x + 26, y + 27, 6, "#ff6b6b") +
      circle(x + 46, y + 27, 6, "#ffc542") +
      circle(x + 66, y + 27, 6, "#3ad29f") +
      (title ? text(x + 92, y + 33, title, { size: 17, weight: 700 }) : "") +
      extra +
      inner,
  );
}

function avatar(cx, cy, r, fill, initials, color = "#fff") {
  return circle(cx, cy, r, fill) + (initials ? text(cx, cy + r * 0.34, initials, { size: Math.round(r * 0.9), weight: 700, fill: color, anchor: "middle" }) : "");
}

function pill(x, y, w, h, fill, label, color, { size = 14, weight = 700, stroke } = {}) {
  return rect(x, y, w, h, h / 2, fill, stroke ? { stroke, "stroke-width": 2 } : undefined) + text(x + w / 2, y + h / 2 + size * 0.36, label, { size, weight, fill: color, anchor: "middle" });
}

/** Icons drawn on a 24x24 grid, placed at (x, y) and scaled to `size`. */
const ICONS = {
  check: { d: "M5 12.5l4.5 4.5L19 7.5", stroke: true },
  sparkle: { d: "M12 1.5C12.9 7.6 16.4 11.1 22.5 12C16.4 12.9 12.9 16.4 12 22.5C11.1 16.4 7.6 12.9 1.5 12C7.6 11.1 11.1 7.6 12 1.5Z" },
  bolt: { d: "M13.5 1.5L3.5 14H11L10 22.5L20.5 9.5H13L13.5 1.5Z" },
  search: { d: "M10.5 3.5a7 7 0 1 1 0 14a7 7 0 0 1 0-14zM15.8 15.8L21 21", stroke: true },
  shield: { d: "M12 1.8l8.5 3.2v6.4c0 5.4-3.6 9.9-8.5 11.6c-4.9-1.7-8.5-6.2-8.5-11.6V5z" },
  lock: { d: "M6 10.5h12a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 18 21.5H6A1.5 1.5 0 0 1 4.5 20v-8A1.5 1.5 0 0 1 6 10.5zM8 10.5V7.5a4 4 0 0 1 8 0v3", stroke: true },
  bell: { d: "M6 17v-6a6 6 0 1 1 12 0v6l2 2H4zM10 21a2 2 0 0 0 4 0", stroke: true },
  moon: { d: "M20.5 14.6A8.8 8.8 0 0 1 9.4 3.5A8.8 8.8 0 1 0 20.5 14.6z" },
  hash: { d: "M9 3.5L7 20.5M17 3.5L15 20.5M4 9h17M3 15h17", stroke: true },
  clock: { d: "M12 2.5a9.5 9.5 0 1 1 0 19a9.5 9.5 0 0 1 0-19zM12 7v5.5l3.5 2", stroke: true },
  arrow: { d: "M4 12h15M13 6l6 6l-6 6", stroke: true },
  plus: { d: "M12 4v16M4 12h16", stroke: true },
  person: { d: "M12 2.2a2.3 2.3 0 1 1 0 4.6a2.3 2.3 0 0 1 0-4.6zM4 8.6l8 1.6l8-1.6M12 10.2v5M12 15.2l-3.6 6.6M12 15.2l3.6 6.6", stroke: true },
  cursor: { d: "M5 2.5l13.5 10.2l-6.2 0.9l3.6 7.2l-2.8 1.4l-3.6-7.2l-4.5 4.4z" },
  pen: { d: "M12 2.5l6 9.5l-6 10l-6-10zM12 12.5v-10M9.5 22h5", stroke: true },
  doc: { d: "M6 2.5h8.5l4.5 4.5v14.5H6zM14.5 2.5V7h4.5" },
  building: { d: "M4 21.5V5.5l8-3v19M12 8.5h8v13M2.5 21.5h19M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2", stroke: true },
  dollar: { d: "M12 2.5v19M16.5 6.5c-1-1.3-2.6-2-4.5-2c-2.6 0-4.5 1.4-4.5 3.5c0 4.8 9.5 2.6 9.5 7.8c0 2.2-2 3.7-5 3.7c-2.2 0-4-0.9-5-2.4", stroke: true },
  speaker: { d: "M3.5 9h4l5-4.5v15l-5-4.5h-4zM16 8.5a5 5 0 0 1 0 7M18.8 5.8a9 9 0 0 1 0 12.4", stroke: true },
  cloud: { d: "M7 19.5h10.5a4.5 4.5 0 0 0 0.6-9a6.5 6.5 0 0 0-12.6 1.6A3.8 3.8 0 0 0 7 19.5z" },
  bellOff: { d: "M6 17v-6a6 6 0 0 1 9.5-4.9M18 11v6l2 2H8M10 21a2 2 0 0 0 4 0M3 3l18 18", stroke: true },
};

function icon(name, x, y, size, color, { width = 2.2 } = {}) {
  const i = ICONS[name];
  const paint = i.stroke ? `fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"` : `fill="${color}"`;
  return `<g transform="translate(${x} ${y}) scale(${size / 24})"><path d="${i.d}" ${paint}/></g>`;
}

/** Sparkle centred on (cx, cy). */
const sparkle = (cx, cy, size, color, opacity = 1) => `<g opacity="${opacity}">${icon("sparkle", cx - size / 2, cy - size / 2, size, color)}</g>`;

/** The agent avatar: a gradient circle with a sparkle. */
const agentAvatar = (cx, cy, r) => circle(cx, cy, r, "url(#agent)") + sparkle(cx, cy, r * 1.15, "#fff");

const toggle = (x, y, on, color) => rect(x, y, 46, 26, 13, on ? color : "#cfd8e3") + circle(on ? x + 33 : x + 13, y + 13, 9, "#fff");

const ring = (cx, cy, r, opacity = 0.22, width = 2) => circle(cx, cy, r, "none", { stroke: "#fff", "stroke-opacity": opacity, "stroke-width": width });

const LOGO_PATHS = [
  ["#0D55C7", "M0 823 4 802 11 783 22 765 33 752 409 403 417 396 423 393 423 701 410 714 348 771 199 906 175 924 162 931 149 936 126 941 114 942 94 941 75 937 62 932 51 926 41 919 30 909 20 897 12 884 7 873 1 851 0 843Z"],
  ["#1769F5", "M449 123 451 107 454 95 460 79 472 59 482 47 501 31 516 22 530 16 540 13 562 9 584 9 606 13 623 19 637 26 653 37 667 50 682 71 689 86 692 95 695 108 696 117 696 501 692 506 454 664 450 664 449 481Z"],
  ["#2588FF", "M475 681 478 678 494 667 677 544 689 536 695 533 697 533 880 699 985 796 1001 813 1009 825 1016 840 1020 852 1023 866 1024 875 1024 895 1022 909 1019 921 1015 932 1007 948 999 960 983 978 971 988 959 996 941 1005 923 1011 899 1015 877 1015 867 1014 852 1011 835 1005 820 997 801 983 624 821 484 691 475 682Z"],
];
const logoMark = (x, y, size) => `<g transform="translate(${x} ${y}) scale(${size / 1024})">${LOGO_PATHS.map(([fill, d]) => pathEl(d, { fill })).join("")}</g>`;

/* ------------------------------------------------------------------ */
/* Page frame: gradient, dots, glows                                   */
/* ------------------------------------------------------------------ */

function svg(tone, title, body) {
  const p = palettes[tone];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="${p.glow}" stop-opacity="0.6"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient>
<radialGradient id="shade"><stop offset="0" stop-color="${p.deep}" stop-opacity="0.55"/><stop offset="1" stop-color="${p.deep}" stop-opacity="0"/></radialGradient>
<linearGradient id="agent" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1462e6"/><stop offset="0.55" stop-color="#7c5cff"/><stop offset="1" stop-color="#ff5c8a"/></linearGradient>
<linearGradient id="tone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/></linearGradient>
<pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#fff" fill-opacity="0.16"/></pattern>
<filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="${p.deep}" flood-opacity="0.38"/></filter>
<filter id="lift" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="${p.deep}" flood-opacity="0.3"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#dots)"/>
${circle(1030, 110, 380, "url(#glow)")}
${circle(120, 660, 360, "url(#shade)")}
${body(p)}
</svg>
`;
}

/* ------------------------------------------------------------------ */
/* Scenes, one per post                                                */
/* ------------------------------------------------------------------ */

const scenes = {
  // Agents are generally available
  "ai-agents-generally-available": {
    tone: "violet",
    title: "A chat channel where an agent has issued a refund",
    draw: (p) =>
      ring(1000, 470, 150) +
      ring(1000, 470, 220, 0.12) +
      sparkle(1010, 430, 64, "#fff", 0.95) +
      sparkle(205, 150, 36, "#fff", 0.8) +
      sparkle(1080, 560, 26, "#fff", 0.7) +
      appWindow(
        250,
        140,
        560,
        392,
        "# customer-support",
        // Dana's question
        avatar(288, 222, 19, "#ff8a65", "DK") +
        text(318, 217, "Dana Kim", { size: 16, weight: 700 }) +
        text(400, 217, "9:41", { size: 13, weight: 500, fill: MUTED }) +
        bars(318, 230, [330, 210]) +
        // The agent's answer
        agentAvatar(288, 300, 19) +
        text(318, 296, "Support Agent", { size: 16, weight: 700 }) +
        pill(440, 280, 70, 22, p.soft, "AGENT", p.ink, { size: 11 }) +
        bars(318, 310, [380, 300]) +
        rect(318, 346, 400, 64, 14, FAINT, { stroke: LINE, "stroke-width": 2 }) +
        circle(348, 378, 15, GREEN) +
        icon("check", 338, 368, 20, "#fff", { width: 3 }) +
        text(374, 374, "Refund issued", { size: 16, weight: 700 }) +
        text(374, 395, "Order #4821 · logged", { size: 13, weight: 500, fill: MUTED }) +
        pill(612, 362, 92, 32, "#fff", "View", BLUE, { size: 13, stroke: LINE }) +
        // A thank-you
        avatar(288, 458, 19, "#7c5cff", "JS") +
        text(318, 453, "Jo Silva", { size: 16, weight: 700 }) +
        bars(318, 466, [260]),
      ) +
      // "Now available" card
      panel(
        760,
        178,
        300,
        150,
        circle(800, 222, 22, "url(#agent)") +
          sparkle(800, 222, 24, "#fff") +
          text(834, 229, "Agents", { size: 20, weight: 700 }) +
          text(786, 280, "Now available", { size: 28, weight: 800, fill: p.ink }) +
          text(786, 306, "on every paid plan", { size: 16, weight: 500, fill: MUTED }),
      ) +
      // Beta teams, beside the window so it doesn't cover a message
      panel(
        820,
        372,
        220,
        78,
        avatar(856, 411, 17, "#ffb020") +
          avatar(878, 411, 17, "#34d399") +
          avatar(900, 411, 17, "#ff5c8a") +
          circle(856, 411, 17, "none", { stroke: "#fff", "stroke-width": 3 }) +
          circle(878, 411, 17, "none", { stroke: "#fff", "stroke-width": 3 }) +
          circle(900, 411, 17, "none", { stroke: "#fff", "stroke-width": 3 }) +
          text(928, 406, "4,000+", { size: 18, weight: 800 }) +
          text(928, 427, "beta teams", { size: 13, weight: 500, fill: MUTED }),
        { rx: 18, shadow: "lift" },
      ),
  },

  // Four billion messages a day
  "scaling-real-time-message-delivery": {
    tone: "sky",
    title: "Messages fanning out from a gateway to many devices",
    draw: (p) => {
      const hub = { x: 600, y: 338 };
      const targets = [
        [905, 196],
        [945, 292],
        [945, 388],
        [905, 484],
      ];
      const sources = [
        [370, 250],
        [370, 430],
      ];
      const curve = ([x1, y1], [x2, y2]) => `M${x1} ${y1} C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}`;
      return (
        ring(600, 338, 210, 0.14) +
        ring(600, 338, 290, 0.08) +
        sources.map((s) => pathEl(curve(s, [hub.x - 70, hub.y]), { fill: "none", stroke: "#fff", "stroke-opacity": 0.6, "stroke-width": 3, "stroke-dasharray": "2 10", "stroke-linecap": "round" })).join("") +
        targets.map((t) => pathEl(curve([hub.x + 70, hub.y], [t[0] - 10, t[1]]), { fill: "none", stroke: "#fff", "stroke-opacity": 0.65, "stroke-width": 3 })).join("") +
        // packets on the wires
        [
          [745, 268],
          [770, 318],
          [770, 362],
          [745, 410],
          [470, 300],
          [470, 384],
        ]
          .map(([x, y]) => circle(x, y, 12, "#fff", { "fill-opacity": 0.25 }) + circle(x, y, 6, "#fff"))
          .join("") +
        // incoming messages
        sources
          .map(([x, y], i) =>
            panel(
              x - 220,
              y - 40,
              220,
              80,
              avatar(x - 182, y, 20, i ? "#ff8a65" : "#7c5cff", i ? "AL" : "MB") + bars(x - 150, y - 14, [120, 84]),
              { rx: 20, shadow: "lift" },
            ),
          )
          .join("") +
        // the gateway
        panel(
          hub.x - 75,
          hub.y - 75,
          150,
          150,
          [0, 1, 2].map((i) => rect(hub.x - 44, hub.y - 46 + i * 30, 88, 22, 7, i === 1 ? p.solid : p.soft) + circle(hub.x + 30, hub.y - 35 + i * 30, 4, i === 1 ? "#fff" : GREEN)).join("") +
            text(hub.x, hub.y + 60, "Gateway", { size: 14, weight: 700, fill: p.ink, anchor: "middle" }),
          { rx: 30 },
        ) +
        // devices receiving them
        targets
          .map(([x, y], i) =>
            panel(
              x,
              y - 32,
              150,
              64,
              avatar(x + 30, y, 16, ["#34d399", "#ffb020", "#ff5c8a", "#37a7ff"][i]) +
                bars(x + 54, y - 11, [60, 40], { h: 8, gap: 16 }) +
                icon("check", x + 112, y - 12, 18, GREEN, { width: 3 }) +
                icon("check", x + 120, y - 12, 18, GREEN, { width: 3 }),
              { rx: 18, shadow: "lift" },
            ),
          )
          .join("") +
        // numbers
        pill(hub.x - 100, 160, 200, 52, "#fff", "4B messages / day", p.ink, { size: 16 }) +
        panel(hub.x - 90, 452, 180, 52, icon("bolt", hub.x - 66, 466, 24, "#f59e0b") + text(hub.x - 34, 485, "< 200 ms", { size: 18, weight: 800, fill: INK }), { rx: 26, shadow: "lift" })
      );
    },
  },

  // Automations in lists
  "list-automations": {
    tone: "sun",
    title: "A project list with an automation rule that posts to a channel",
    draw: (p) => {
      const rows = [
        ["Write launch brief", "#7c5cff", "PR", ["Done", "#dcfce7", "#166534"]],
        ["Final design review", "#ff5c8a", "MB", ["Done", "#dcfce7", "#166534"]],
        ["Pricing page copy", "#37a7ff", "AL", ["In progress", "#dbeafe", "#1e40af"]],
        ["Partner briefing", "#ffb020", "JS", ["Blocked", "#ffe4e6", "#9f1239"]],
        ["Press kit", "#34d399", "DK", ["To do", "#eef2f7", "#475569"]],
      ];
      return (
        icon("bolt", 1010, 120, 70, "#fff") +
        sparkle(150, 170, 34, "#fff", 0.85) +
        ring(1040, 540, 120, 0.25) +
        appWindow(
          170,
          140,
          600,
          392,
          "Q4 launch tracker",
          text(206, 90 + 120, "TASK", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            text(500, 210, "OWNER", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            text(600, 210, "STATUS", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            rows
              .map(([task, color, initials, [status, bg, fg]], i) => {
                const y = 242 + i * 56;
                const done = status === "Done";
                return (
                  line(190, y - 14, 750, y - 14, LINE, 1.5) +
                  rect(206, y + 2, 20, 20, 6, done ? GREEN : "#fff", { stroke: done ? GREEN : "#cbd5e1", "stroke-width": 2 }) +
                  (done ? icon("check", 207, y + 3, 18, "#fff", { width: 3 }) : "") +
                  text(240, y + 18, task, { size: 16, weight: 600, fill: done ? MUTED : INK }) +
                  avatar(518, y + 12, 15, color, initials) +
                  pill(600, y, status.length * 8 + 30, 26, bg, status, fg, { size: 12 })
                );
              })
              .join(""),
        ) +
        // the rule
        pathEl("M668 255 C 700 255 700 236 732 236", { fill: "none", stroke: p.ink, "stroke-width": 3, "stroke-dasharray": "3 8", "stroke-linecap": "round" }) +
        panel(
          730,
          190,
          340,
          260,
          circle(770, 232, 22, p.solid) +
            icon("bolt", 758, 220, 24, "#fff") +
            text(804, 239, "Automation", { size: 19, weight: 700 }) +
            toggle(1000, 220, true, GREEN) +
            text(756, 292, "WHEN", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            pill(756, 302, 190, 34, p.soft, "Status is Done", p.ink, { size: 14 }) +
            text(756, 372, "THEN", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            pill(756, 382, 150, 34, "#e7f0ff", "Post in #launch", "#0b47b8", { size: 14 }) +
            pill(914, 382, 132, 34, "#e7f0ff", "Notify owner", "#0b47b8", { size: 14 }),
        )
      );
    },
  },

  // Prism 3 design system
  "inside-our-design-system": {
    tone: "pink",
    title: "Design tokens for colour, type and spacing feeding a button component",
    draw: (p) => {
      const swatches = ["#1462e6", "#37a7ff", "#e51b5b", "#ff5c8a", "#f59e0b", "#15803d", "#34d399", "#7c5cff", "#0b1a2e", "#94a3b8"];
      return (
        ring(1030, 150, 110, 0.3) +
        ring(1030, 150, 170, 0.14) +
        icon("plus", 96, 110, 34, "#fff", { width: 3 }) +
        icon("plus", 1060, 540, 26, "#fff", { width: 3 }) +
        panel(
          160,
          140,
          540,
          392,
          text(196, 192, "Prism 3", { size: 22, weight: 800 }) +
            pill(296, 172, 74, 26, p.soft, "Tokens", p.ink, { size: 12 }) +
            text(196, 236, "COLOUR", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            swatches.map((c, i) => rect(196 + (i % 5) * 92, 250 + Math.floor(i / 5) * 62, 76, 48, 12, c)).join("") +
            text(196, 400, "TYPE", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            text(196, 478, "Aa", { size: 72, weight: 800 }) +
            text(306, 478, "Aa", { size: 46, weight: 700 }) +
            text(378, 478, "Aa", { size: 30, weight: 600 }) +
            text(428, 478, "Aa", { size: 20, weight: 500 }) +
            text(500, 400, "SPACE", { size: 12, weight: 700, fill: MUTED, spacing: 1 }) +
            [8, 16, 24, 32, 48]
              .map((s, i) => rect(500, 414 + i * 20, s * 3, 12, 6, p.solid, { "fill-opacity": 0.25 + i * 0.15 }))
              .join(""),
        ) +
        // A component built from the tokens
        panel(
          650,
          200,
          400,
          270,
          text(686, 246, "Button", { size: 19, weight: 700 }) +
            text(686, 268, "built from tokens", { size: 14, weight: 500, fill: MUTED }) +
            rect(686, 292, 180, 52, 26, BLUE) +
            text(776, 324, "Get started", { size: 17, weight: 700, fill: "#fff", anchor: "middle" }) +
            rect(882, 292, 132, 52, 26, "#fff", { stroke: LINE, "stroke-width": 2 }) +
            text(948, 324, "Cancel", { size: 17, weight: 700, fill: INK, anchor: "middle" }) +
            rect(686, 372, 328, 40, 10, FAINT) +
            text(700, 398, "color.action.primary", { size: 14, weight: 600, fill: p.ink, family: MONO }) +
            rect(980, 382, 20, 20, 6, BLUE) +
            rect(686, 420, 328, 32, 10, FAINT) +
            text(700, 441, "radius.pill", { size: 14, weight: 600, fill: p.ink, family: MONO }),
        )
      );
    },
  },

  // Agent approvals
  "designing-agent-approvals": {
    tone: "violet",
    title: "An agent asking a person to approve a refund",
    draw: (p) =>
      ring(600, 340, 300, 0.12) +
      sparkle(1000, 170, 44, "#fff", 0.9) +
      sparkle(190, 520, 30, "#fff", 0.75) +
      // shield
      panel(176, 196, 150, 150, icon("shield", 211, 226, 80, "#dcfce7") + icon("check", 225, 240, 52, GREEN, { width: 2.6 }), { rx: 30, shadow: "lift" }) +
      panel(
        320,
        142,
        540,
        392,
        agentAvatar(370, 196, 24) +
          text(406, 193, "Billing Agent", { size: 19, weight: 700 }) +
          text(406, 215, "wants to do something", { size: 14, weight: 500, fill: MUTED }) +
          pill(684, 180, 146, 30, "#fff4d6", "Needs approval", "#8a4b00", { size: 13 }) +
          rect(356, 244, 468, 96, 16, FAINT, { stroke: LINE, "stroke-width": 2 }) +
          circle(400, 292, 24, p.soft) +
          icon("dollar", 387, 279, 26, p.ink, { width: 2.6 }) +
          text(440, 286, "Issue a $40 refund", { size: 22, weight: 800 }) +
          text(440, 312, "Order #4821 · Ana Lopez", { size: 15, weight: 500, fill: MUTED }) +
          bars(356, 362, [440, 330], { h: 10, gap: 20 }) +
          rect(356, 432, 220, 56, 28, GREEN) +
          icon("check", 392, 448, 24, "#fff", { width: 3 }) +
          text(482, 467, "Approve", { size: 18, weight: 700, fill: "#fff", anchor: "middle" }) +
          rect(592, 432, 180, 56, 28, "#fff", { stroke: LINE, "stroke-width": 2 }) +
          text(682, 467, "Decline", { size: 18, weight: 700, fill: INK, anchor: "middle" }),
      ) +
      // pointer on Approve
      // (a plain offset copy for the shadow: a blur filter here left a grey box)
      `<g transform="translate(523 467) scale(${44 / 24})"><path d="${ICONS.cursor.d}" fill="${p.deep}" fill-opacity="0.25"/></g>` +
      `<g transform="translate(520 462) scale(${44 / 24})"><path d="${ICONS.cursor.d}" fill="${INK}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></g>` +
      // activity log
      panel(
        820,
        360,
        250,
        140,
        text(846, 394, "Activity log", { size: 16, weight: 700 }) +
          [0, 1, 2]
            .map((i) => circle(852, 422 + i * 26, 5, i === 2 ? GREEN : "#cbd5e1") + rect(866, 417 + i * 26, [150, 120, 170][i], 10, 5, i === 2 ? "#bbf7d0" : LINE))
            .join(""),
        { rx: 20, shadow: "lift" },
      ),
  },

  // WCAG 2.2 AA
  "accessibility-conformance-wcag-2-2": {
    tone: "mint",
    title: "An accessibility symbol with contrast, keyboard focus and screen reader checks",
    draw: (p) =>
      ring(600, 320, 150, 0.4, 3) +
      ring(600, 320, 200, 0.2, 2) +
      ring(600, 320, 260, 0.1, 2) +
      `<g filter="url(#shadow)">${circle(600, 320, 118, "#fff")}</g>` +
      circle(600, 320, 96, p.soft) +
      icon("person", 528, 248, 144, p.solid, { width: 2 }) +
      pill(495, 466, 210, 52, "#fff", "WCAG 2.2 AA", p.ink, { size: 18, weight: 800 }) +
      // contrast
      panel(
        150,
        168,
        270,
        156,
        text(176, 204, "Contrast", { size: 17, weight: 700 }) +
          rect(176, 222, 64, 64, 14, INK) +
          text(208, 265, "Aa", { size: 26, weight: 800, fill: "#fff", anchor: "middle" }) +
          rect(248, 222, 64, 64, 14, FAINT, { stroke: LINE, "stroke-width": 2 }) +
          text(280, 265, "Aa", { size: 26, weight: 800, fill: INK, anchor: "middle" }) +
          text(326, 252, "7.4:1", { size: 22, weight: 800 }) +
          pill(326, 264, 66, 26, "#dcfce7", "AA ✓", "#166534", { size: 12 }),
        { rx: 22, shadow: "lift" },
      ) +
      // keyboard focus
      panel(
        790,
        168,
        270,
        140,
        text(816, 204, "Keyboard", { size: 17, weight: 700 }) +
          rect(812, 226, 140, 52, 30, "none", { stroke: BLUE, "stroke-width": 4 }) +
          rect(820, 234, 124, 36, 18, BLUE) +
          text(882, 258, "Submit", { size: 15, weight: 700, fill: "#fff", anchor: "middle" }) +
          rect(970, 230, 66, 44, 10, "#fff", { stroke: "#cbd5e1", "stroke-width": 2 }) +
          rect(970, 266, 66, 8, 4, "#cbd5e1") +
          text(1003, 258, "Tab", { size: 15, weight: 700, fill: INK, anchor: "middle" }),
        { rx: 22, shadow: "lift" },
      ) +
      // screen reader
      panel(
        170,
        386,
        250,
        112,
        circle(208, 442, 24, p.soft) +
          icon("speaker", 194, 428, 28, p.ink) +
          text(246, 432, "Screen reader", { size: 16, weight: 700 }) +
          [10, 22, 14, 30, 18, 26, 12, 20, 8]
            .map((h, i) => rect(248 + i * 16, 462 - h / 2, 8, h, 4, p.solid, { "fill-opacity": 0.75 }))
            .join(""),
        { rx: 22, shadow: "lift" },
      ) +
      // mobile
      panel(820, 360, 200, 130, rect(846, 386, 46, 80, 10, INK) + rect(851, 394, 36, 60, 6, "#37a7ff") + text(908, 418, "Web,", { size: 15, weight: 700 }) + text(908, 440, "desktop", { size: 15, weight: 700 }) + text(908, 462, "& mobile", { size: 15, weight: 700 }), { rx: 22, shadow: "lift" }),
  },

  // AI recaps
  "designing-ai-recaps": {
    tone: "sun",
    title: "A morning recap that sums up three busy channels",
    draw: (p) => {
      const channels = [
        ["# design-crit", "#ffe7f0", "#b0124c", [300, 240]],
        ["# launch", "#e7f0ff", "#0b47b8", [330, 200]],
        ["# support", "#e2f7ec", "#0f6b37", [280, 230]],
      ];
      return (
        circle(1040, 150, 70, "#fff", { "fill-opacity": 0.9 }) +
        ring(1040, 150, 100, 0.5, 3) +
        ring(1040, 150, 135, 0.25, 3) +
        sparkle(170, 540, 32, "#fff", 0.8) +
        panel(
          310,
          140,
          520,
          392,
          circle(356, 192, 24, "url(#agent)") +
            sparkle(356, 192, 26, "#fff") +
            text(392, 188, "Your morning recap", { size: 20, weight: 800 }) +
            text(392, 211, "3 channels · 2 min read", { size: 14, weight: 500, fill: MUTED }) +
            channels
              .map(([name, bg, fg, widths], i) => {
                const y = 246 + i * 92;
                return (
                  pill(346, y, name.length * 9 + 26, 28, bg, name, fg, { size: 13 }) +
                  bars(346, y + 42, widths, { h: 9, gap: 19 }) +
                  avatar(762, y + 14, 13, ["#ff8a65", "#7c5cff", "#34d399"][i]) +
                  avatar(784, y + 14, 13, ["#37a7ff", "#ffb020", "#ff5c8a"][i])
                );
              })
              .join(""),
        ) +
        // before
        panel(140, 170, 190, 104, text(166, 220, "142", { size: 36, weight: 800, fill: p.ink }) + text(166, 248, "unread messages", { size: 14, weight: 500, fill: MUTED }), { rx: 22, shadow: "lift" }) +
        // after
        panel(
          770,
          396,
          290,
          104,
          circle(808, 448, 22, "#dcfce7") +
            icon("clock", 795, 435, 26, GREEN) +
            text(842, 441, "Recap ready", { size: 17, weight: 700 }) +
            text(842, 465, "saved you 25 minutes", { size: 14, weight: 500, fill: MUTED }),
          { rx: 22, shadow: "lift" },
        )
      );
    },
  },

  // Shared channels
  "shared-channels-at-scale": {
    tone: "mint",
    title: "A channel shared between several partner organisations",
    draw: (p) => {
      const msgs = [
        ["#7c5cff", "PR", "Acme", "#e7f0ff", "#0b47b8", [280, 200]],
        ["#ff8a65", "LN", "Northwind", "#fff1e6", "#9a3412", [240]],
        ["#34d399", "TG", "Globex", "#e2f7ec", "#0f6b37", [300, 180]],
      ];
      const logos = ["#1462e6", "#ff5c8a", "#f59e0b", "#15803d", "#7c5cff", "#0284c7", "#e11d48", "#0b1a2e", "#34d399"];
      return (
        ring(160, 180, 90, 0.25) +
        sparkle(1060, 560, 30, "#fff", 0.8) +
        pathEl("M320 266 C 360 266 340 300 380 300", { fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-dasharray": "3 9", "stroke-linecap": "round" }) +
        pathEl("M820 300 C 860 300 840 266 880 266", { fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-dasharray": "3 9", "stroke-linecap": "round" }) +
        appWindow(
          340,
          140,
          520,
          392,
          "# acme-partners",
          msgs
            .map(([c, ini, org, bg, fg, widths], i) => {
              const y = 206 + i * 104;
              return (
                rect(370, y, 40, 40, 12, c) +
                text(390, y + 26, ini, { size: 15, weight: 700, fill: "#fff", anchor: "middle" }) +
                rect(426, y + 4, 110, 12, 6, "#cbd5e1") +
                pill(548, y - 2, org.length * 8.5 + 24, 24, bg, org, fg, { size: 12 }) +
                bars(426, y + 28, widths, { h: 9, gap: 18 })
              );
            })
            .join(""),
          { extra: pill(720, 14 + 140, 112, 28, p.soft, "Shared ⇄", p.ink, { size: 13 }) },
        ) +
        // your org
        panel(140, 214, 200, 116, circle(184, 272, 26, p.soft) + icon("building", 169, 257, 30, p.ink) + text(222, 266, "Acme", { size: 18, weight: 700 }) + text(222, 290, "your org", { size: 14, weight: 500, fill: MUTED }), { rx: 22, shadow: "lift" }) +
        // partners
        panel(
          860,
          180,
          210,
          250,
          logos.map((c, i) => rect(888 + (i % 3) * 54, 206 + Math.floor(i / 3) * 54, 42, 42, 12, c)).join("") +
            text(888, 390, "312", { size: 24, weight: 800, fill: p.ink }) +
            text(888, 412, "partner orgs", { size: 14, weight: 500, fill: MUTED }),
          { rx: 22, shadow: "lift" },
        )
      );
    },
  },

  // Search indexing
  "rebuilding-search-indexing": {
    tone: "coral",
    title: "A search box returning fresh results in under half a second",
    draw: (p) => {
      const results = [
        ["#e11d48", "Launch plan", " · Q4 roadmap", [420, 300], "#marketing · just now"],
        ["#1462e6", "Launch checklist", " (final)", [380, 260], "#launch · 2 min ago"],
        ["#15803d", "Launch retro notes", "", [400], "Canvas · yesterday"],
      ];
      return (
        // speed lines
        [
          [60, 172, 150],
          [100, 196, 110],
          [40, 220, 170],
        ]
          .map(([x, y, w]) => rect(x, y, w, 8, 4, "#fff", { "fill-opacity": 0.5 }))
          .join("") +
        sparkle(1060, 150, 40, "#fff", 0.85) +
        ring(1050, 560, 110, 0.25) +
        panel(
          250,
          150,
          700,
          76,
          icon("search", 280, 176, 26, MUTED, { width: 2.6 }) +
            text(322, 197, "launch plan", { size: 22, weight: 600 }) +
            rect(446, 172, 3, 32, 1.5, BLUE) +
            rect(806, 170, 118, 36, 18, p.soft) +
            icon("bolt", 818, 176, 22, p.solid) +
            text(846, 195, "0.4 s", { size: 16, weight: 800, fill: p.ink }),
          { rx: 38 },
        ) +
        panel(
          250,
          246,
          700,
          288,
          results
            .map(([c, title, rest, widths, meta], i) => {
              const y = 274 + i * 86;
              return (
                icon("doc", 278, y, 34, c) +
                rect(326, y - 2, 70, 28, 6, "#fde68a") +
                // One <text> so the muted part always follows the title, whatever font renders it
                `<text x="328" y="${y + 19}" font-family="${FONT}" font-size="18" font-weight="700" fill="${INK}">${esc(title)}<tspan font-weight="500" fill="${MUTED}">${esc(rest)}</tspan></text>` +
                text(326, y + 44, meta, { size: 13, weight: 500, fill: MUTED }) +
                bars(560, y + 34, widths.map((w) => w / 2), { h: 8, gap: 14 })
              );
            })
            .join(""),
        ) +
        panel(880, 420, 200, 90, circle(912, 465, 9, GREEN) + circle(912, 465, 16, GREEN, { "fill-opacity": 0.2 }) + text(936, 460, "Indexed", { size: 17, weight: 700 }) + text(936, 482, "as you type", { size: 13, weight: 500, fill: MUTED }), { rx: 22, shadow: "lift" })
      );
    },
  },

  // Meridian Cloud partnership
  "meridian-cloud-partnership": {
    tone: "violet",
    title: "The ktTeams logo and a cloud logo joined by a plus sign",
    draw: (p) =>
      icon("cloud", 110, 120, 150, "#fff", {}).replace("<path", '<path fill-opacity="0.18"') +
      icon("cloud", 930, 420, 190, "#fff", {}).replace("<path", '<path fill-opacity="0.14"') +
      ring(600, 335, 240, 0.12) +
      panel(330, 212, 230, 230, logoMark(380, 262, 130), { rx: 44 }) +
      panel(640, 212, 230, 230, icon("cloud", 680, 236, 150, "url(#tone)") + text(755, 412, "Meridian", { size: 22, weight: 800, fill: p.ink, anchor: "middle" }), { rx: 44 }) +
      `<g filter="url(#lift)">${circle(600, 327, 32, "#fff")}</g>` +
      icon("plus", 584, 311, 32, p.solid, { width: 3.2 }) +
      // regulated industries
      panel(420, 470, 360, 58, icon("lock", 446, 486, 26, p.ink, { width: 2.4 }) + text(484, 506, "Built for regulated industries", { size: 17, weight: 700 }), { rx: 29, shadow: "lift" }) +
      pill(180, 200, 120, 40, "#fff", "Finance", p.ink, { size: 15 }) +
      pill(150, 270, 140, 40, "#fff", "Healthcare", p.ink, { size: 15 }) +
      pill(905, 190, 150, 40, "#fff", "Public sector", p.ink, { size: 15 }) +
      pill(930, 262, 110, 40, "#fff", "Energy", p.ink, { size: 15 }),
  },

  // Focus time
  "protecting-focus-time": {
    tone: "sky",
    title: "A week calendar with a two-hour focus block every morning",
    draw: (p) => {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      const x0 = 300;
      const colW = 100;
      const y0 = 236;
      const rowH = 48;
      const meetings = [
        [0, 3, 1, "#ffe7f0", "#b0124c"],
        [1, 4, 1, "#fff5d9", "#8a4b00"],
        [2, 3.5, 1, "#ffe7f0", "#b0124c"],
        [3, 4.2, 0.8, "#e2f7ec", "#0f6b37"],
        [4, 3, 1.2, "#fff5d9", "#8a4b00"],
        [0, 5, 0.7, "#e2f7ec", "#0f6b37"],
      ];
      return (
        sparkle(1060, 150, 36, "#fff", 0.8) +
        ring(150, 200, 90, 0.25) +
        appWindow(
          220,
          140,
          600,
          392,
          "Week of Oct 12",
          days.map((d, i) => text(x0 + i * colW + colW / 2, y0 - 12, d, { size: 14, weight: 700, fill: MUTED, anchor: "middle" })).join("") +
            ["9", "10", "11", "12", "1", "2"].map((h, i) => text(270, y0 + i * rowH + 16, h, { size: 13, weight: 600, fill: MUTED, anchor: "end" }) + line(x0, y0 + i * rowH, x0 + 5 * colW, y0 + i * rowH, LINE, 1.5)).join("") +
            // focus blocks, 9-11 every day
            days.map((_, i) => rect(x0 + i * colW + 6, y0 + 4, colW - 12, rowH * 2 - 8, 12, p.solid) + icon("moon", x0 + i * colW + 16, y0 + 14, 18, "#fff") + text(x0 + i * colW + 16, y0 + 58, "Focus", { size: 14, weight: 700, fill: "#fff" })).join("") +
            meetings.map(([d, start, len, bg, fg]) => rect(x0 + d * colW + 6, y0 + (start - 1) * rowH + 4, colW - 12, len * rowH - 8, 10, bg) + rect(x0 + d * colW + 6, y0 + (start - 1) * rowH + 4, 4, len * rowH - 8, 2, fg)).join(""),
        ) +
        panel(
          796,
          170,
          280,
          132,
          circle(838, 220, 24, INK) +
            icon("moon", 826, 208, 24, "#fde68a") +
            text(874, 216, "Do not disturb", { size: 18, weight: 700 }) +
            text(874, 240, "until 11:00", { size: 14, weight: 500, fill: MUTED }) +
            text(822, 281, "Notifications paused", { size: 13, weight: 600, fill: MUTED }) +
            toggle(1006, 263, true, GREEN),
          { rx: 22, shadow: "lift" },
        ) +
        panel(104, 400, 120, 104, icon("bellOff", 134, 422, 60, p.ink, { width: 2 }), { rx: 26, shadow: "lift" })
      );
    },
  },

  // Illustration language
  "new-illustration-language": {
    tone: "coral",
    title: "An illustration of a mug and a plant being drawn with a pen tool",
    draw: (p) => {
      const tools = ["cursor", "pen", "sparkle", "plus"];
      const palette = ["#e11d48", "#ff9170", "#f59e0b", "#15803d", "#0284c7", "#7c5cff"];
      return (
        ring(1050, 150, 100, 0.25) +
        sparkle(1070, 540, 34, "#fff", 0.8) +
        panel(
          240,
          140,
          560,
          392,
          rect(270, 170, 500, 332, 16, "#fff7f2") +
            // sun
            circle(690, 238, 40, "#fbbf24") +
            // ground
            pathEl("M270 450 C 400 420 600 470 770 440 L770 486 Q770 502 754 502 L286 502 Q270 502 270 486 Z", { fill: "#ffe1d6" }) +
            // mug
            rect(340, 330, 110, 120, 18, "#0284c7") +
            pathEl("M450 352 C 500 352 500 420 450 420", { fill: "none", stroke: "#0284c7", "stroke-width": 14 }) +
            rect(340, 330, 110, 22, 11, "#38bdf8") +
            pathEl("M372 310 C 362 290 382 280 372 258 M402 310 C 392 290 412 280 402 258", { fill: "none", stroke: "#94a3b8", "stroke-width": 4, "stroke-linecap": "round" }) +
            // plant
            pathEl("M560 450 L 580 380 L 660 380 L 680 450 Z", { fill: p.solid }) +
            pathEl("M620 380 C 600 330 560 320 540 300 C 580 300 620 320 620 380", { fill: "#15803d" }) +
            pathEl("M620 380 C 640 320 690 300 710 290 C 700 330 660 360 620 380", { fill: "#22c55e" }) +
            pathEl("M620 380 C 618 330 630 290 620 250 C 640 290 640 340 620 380", { fill: "#16a34a" }) +
            // the path being edited
            pathEl("M300 240 C 360 180 460 300 540 220", { fill: "none", stroke: BLUE, "stroke-width": 3 }) +
            line(300, 240, 360, 180, BLUE, 1.5) +
            line(540, 220, 460, 300, BLUE, 1.5) +
            circle(360, 180, 6, "#fff", { stroke: BLUE, "stroke-width": 2 }) +
            circle(460, 300, 6, "#fff", { stroke: BLUE, "stroke-width": 2 }) +
            rect(293, 233, 14, 14, 3, "#fff", { stroke: BLUE, "stroke-width": 2.5 }) +
            rect(533, 213, 14, 14, 3, BLUE),
        ) +
        `<g filter="url(#lift)">${icon("pen", 545, 200, 46, INK, { width: 2 }).replace('fill="none"', 'fill="#fff"')}</g>` +
        // tool rail
        panel(
          150,
          196,
          70,
          260,
          tools.map((name, i) => rect(161, 210 + i * 60, 48, 48, 14, i === 1 ? p.soft : "#fff") + icon(name, 173, 222 + i * 60, 24, i === 1 ? p.ink : INK, { width: 2 })).join(""),
          { rx: 22, shadow: "lift" },
        ) +
        // palette
        panel(
          760,
          370,
          300,
          120,
          text(786, 404, "Palette", { size: 16, weight: 700 }) + palette.map((c, i) => circle(806 + i * 44, 448, 17, c) + (i === 0 ? circle(806, 448, 23, "none", { stroke: INK, "stroke-width": 2.5 }) : "")).join(""),
          { rx: 22, shadow: "lift" },
        )
      );
    },
  },

  // Fewer meetings
  "fewer-meetings-better-work": {
    tone: "mint",
    title: "A calendar with half its meetings removed and a chart of focus hours going up",
    draw: (p) => {
      const blocks = [
        [0, 0, true],
        [1, 0, false],
        [2, 1, true],
        [3, 0, false],
        [4, 1, true],
        [0, 2, false],
        [1, 3, true],
        [2, 3, false],
        [3, 2, true],
        [4, 3, false],
      ];
      const before = [70, 80, 66, 74];
      const after = [120, 150, 170, 196];
      return (
        sparkle(112, 124, 32, "#fff", 0.8) +
        ring(1060, 560, 110, 0.25) +
        appWindow(
          160,
          150,
          470,
          382,
          "Recurring meetings",
          ["M", "T", "W", "T", "F"].map((d, i) => text(214 + i * 84, 232, d, { size: 14, weight: 700, fill: MUTED, anchor: "middle" })).join("") +
            blocks
              .map(([d, row, kept]) => {
                const x = 180 + d * 84;
                const y = 250 + row * 64;
                return kept
                  ? rect(x, y, 68, 52, 10, p.soft) + rect(x, y, 5, 52, 2.5, p.solid) + rect(x + 14, y + 14, 40, 8, 4, p.solid, { "fill-opacity": 0.5 })
                  : rect(x, y, 68, 52, 10, "none", { stroke: "#cbd5e1", "stroke-width": 2, "stroke-dasharray": "5 6" }) + line(x + 14, y + 26, x + 54, y + 26, "#cbd5e1", 3);
              })
              .join(""),
        ) +
        panel(
          600,
          200,
          440,
          300,
          text(632, 244, "Focus hours per week", { size: 18, weight: 700 }) +
            pill(632, 258, 96, 30, "#dcfce7", "+38%", "#166534", { size: 15, weight: 800 }) +
            line(632, 462, 1010, 462, LINE, 2) +
            before.map((h, i) => rect(648 + i * 90, 462 - h, 28, h, 8, "#cbd5e1")).join("") +
            after.map((h, i) => rect(682 + i * 90, 462 - h, 28, h, 8, p.solid)).join("") +
            pathEl("M696 330 C 760 320 820 300 870 280 S 960 250 980 246", { fill: "none", stroke: "#f59e0b", "stroke-width": 4, "stroke-linecap": "round" }) +
            circle(980, 246, 7, "#f59e0b") +
            text(648, 484, "Before", { size: 12, weight: 600, fill: MUTED }) +
            text(920, 484, "After", { size: 12, weight: 600, fill: MUTED }),
        ) +
        pill(860, 140, 200, 50, "#fff", "−50% meetings", p.ink, { size: 17, weight: 800 })
      );
    },
  },
};

/* ------------------------------------------------------------------ */
/* Write the files                                                     */
/* ------------------------------------------------------------------ */

const out = path.join(process.cwd(), "public", "blog", "covers");
mkdirSync(out, { recursive: true });
for (const [slug, scene] of Object.entries(scenes)) {
  writeFileSync(path.join(out, `${slug}.svg`), svg(scene.tone, scene.title, scene.draw));
}
console.log(`Wrote ${Object.keys(scenes).length} covers to public/blog/covers`);
