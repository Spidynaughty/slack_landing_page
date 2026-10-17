# Sluck marketing site

A portfolio recreation of a modern team-collaboration product's marketing site: about 215 pages built with
**Next.js 16 (App Router, Cache Components)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion** and
**Lucide** icons. The brand, logo, palette, copy, people and customer companies are all original or fictional.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the build
npm run check:links  # after a build: verifies every required route, every internal link/anchor and per-page SEO
npm run lint
npm run typecheck
```

## Renaming the brand

The brand name comes from `site.name` in `lib/site.ts`, and every page, data file and component reads it from there.
Change it once and the whole site updates. The logo mark is in `components/ui/logo.tsx`, and the colour tokens are at
the top of `app/globals.css`.

## How it's organised

| Path | What lives there |
| --- | --- |
| `data/nav.ts` | The site architecture as typed config. The header mega menus, mobile menu, footer, search palette and sitemap all render from it. |
| `data/*.ts` | Typed content: features (18), solutions (18), pricing, stories and testimonials, posts, help, events, jobs, templates, resources, integrations, releases, comparisons |
| `components/templates/` | **A** `feature-template`, **B** `solution-template`, **C** `listing` (search, filters, pagination, preview modal), **D** `article` (TOC scroll-spy, author, share, related) |
| `components/mockups/` | Product UI built in HTML/CSS: the animated typing chat plus huddle, canvas, lists, AI, workflow, search, code, CRM, agent, clips, files, Atlas, security, platform. Pick one by name with `<Mockup kind="…" />`. |
| `components/sections/` | Shared sections: hero, stats band with count-up, split feature, card grids, FAQ (with JSON-LD), CTA band, logo marquee, testimonial carousel, pricing, marketplace, demo player, product tour, and more |
| `components/nav/` | Header (mega menus that open on hover, click or keyboard), mobile drawer, Ctrl/⌘ K search palette, footer, cookie banner with preference modals |
| `lib/` | `seo.ts` (per-page metadata and OpenGraph), `routes.ts` (all routes, used by `app/sitemap.ts`), `theme.ts` (light/dark/system with no flash), `listing-items.ts` |
| `scripts/check-links.mjs` | Crawls the production build and fails on missing routes, broken links, missing anchors, duplicate titles or descriptions, or pages without exactly one `<h1>` |

## Design system

- **Identity:** an electric violet → fuchsia → orange brand gradient (`--brand-gradient`) with teal, amber and cyan accents.
  All colours are CSS variables in `app/globals.css`, redefined for dark mode under `[data-theme="dark"]`.
- **Layout language:** a floating glass pill navigation with floating mega-menu panels, centred heroes with the product
  shown in a tilted glowing frame, bento grids, panel-style feature rows, sticky scroll storytelling, and an inset
  footer card with a giant gradient wordmark.
- **Effects:** aurora backgrounds (`bg-aurora`), film grain (`grain`), gradient borders (`border-gradient`) and a
  cursor-following glow on cards (`glow-card` + `components/ui/pointer-glow.tsx`).
- **Type:** Bricolage Grotesque (display), Inter (text), JetBrains Mono (code), with a fluid scale (`text-display-*`, `text-lead`).
- **Motion:** scroll reveals, staggered cards, hover lift, parallax hero chips, a typing AI prompt, marquees (horizontal and
  vertical), count-ups and page transitions (`app/template.tsx`). Everything respects `prefers-reduced-motion`.
- **Accessibility:** skip link, visible focus rings, focus-trapped dialogs, roving-tabindex tabs, labelled form fields, and
  AA contrast for gradient buttons (darker gradient stops in light mode, dark labels in dark mode).

## Notes

- There is no backend. Forms validate and show a success state, sign-in is a UI-only two-step flow, and downloads and checkout are simulated.
- Dynamic routes prerender every known slug with `generateStaticParams`. Their content is wrapped in `<Suspense>` so
  client navigations stay instant under Cache Components. Unknown slugs render the 404 page with `noindex`.
- Some URLs keep the original architecture's slugs (for example `/compare/slack-vs-teams` and `/features/slackbot`),
  because the brief defined them as the source of truth. All visible copy uses the placeholder brand.
