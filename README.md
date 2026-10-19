# ktTeams marketing site

The marketing site for ktTeams: about 215 public pages plus an admin panel, built with
**Next.js 16 (App Router, Cache Components)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion**,
**Lucide** icons and a **SQLite / libSQL** database.

## Getting started

```bash
npm install
cp .env.example .env.local   # then set ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET
npm run dev          # http://localhost:3000, admin at /admin
npm run build        # production build
npm run start        # serve the build
npm run check:links  # after a build: verifies every required route, every internal link/anchor and per-page SEO
npm run lint
npm run typecheck
```

## Admin panel

Sign in at `/admin` with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your environment. Changes show on the live site as
soon as you save.

| Section | What it controls |
| --- | --- |
| Site text | Change any words on the public site. Click **Edit on the site** to open it in editing mode and click any text (headings, paragraphs, buttons, menus, footer, prices) to change it, or add changes by hand, including replace-everywhere rules. Every change can be undone. |
| Reviews | Write, edit, publish, feature and delete reviews. Published reviews fill the home page review wall, the customer stories carousel, the contact sales card and the hero's average rating; featured ones fill the large quotes on solution, pricing, careers, enterprise and other pages. Every review section stays hidden until at least one review is published. |
| Home page | The announcement badge, hero headline, subtitle and buttons, the numbers band, the reviews heading and the closing call to action. Each section can be reset to its original text. |
| Customer logos | The scrolling strip of company names and its heading. |
| Pricing FAQs | The questions and answers on the pricing page. |
| Login & password | Change the admin email and password. The current password is required, the new one is stored as a scrypt hash in the database, and every other session is signed out. Forgot it? Run `npm run admin:reset-login` to fall back to `ADMIN_EMAIL` / `ADMIN_PASSWORD`. |
| Inbox | Every form submission (demo requests, contact forms, sign-ups, newsletter, applications, article feedback), with filters, read/archive states, email replies and CSV export. |

The session is a signed, httpOnly cookie that lasts 8 hours. Changing `ADMIN_PASSWORD` signs every session out, and five
failed sign-ins lock an address out for 15 minutes.

## Backend

| Piece | Where |
| --- | --- |
| Database | `lib/db.ts`. Tables are created on first use. Defaults to the local file `.data/ktteams.db`. |
| Cached content reads | `lib/content.ts`. Public pages read through `use cache` functions tagged per section, and admin saves call `updateTag()` so pages refresh straight away. |
| Admin actions | `app/admin/actions.ts`. Server Actions; each one checks the session first. |
| Auth | `lib/auth.ts`, plus `proxy.ts`, which sends signed-out visitors to the login page. |
| Site text | `tsconfig.json` points `jsxImportSource` at `lib/jsx/`, so every element passes through `lib/jsx/transform.ts`, which swaps in the admin's wording. `lib/text-overrides.ts` keeps the rules in step with the database. The on-page editor is `components/text-edit/`, backed by `/admin/api/text`. Page titles and meta descriptions are not covered. |
| `POST /api/submissions` | Stores a form entry: `{ form, page, fields, website }`. `website` is a honeypot. Cross-site posts are refused and password-like fields are never stored. |
| `GET /api/reviews` | Published reviews as JSON. |
| `GET /admin/inbox/export` | CSV of submissions (signed-in admins only). |

### Testing on a phone

Run `npx next start -H 0.0.0.0 -p 4320` after a build, then open `http://<your-computer's-IP>:4320` on a phone on the same Wi-Fi. Windows may ask to allow Node.js through the firewall; allow it on private networks.

### Deploying

A local SQLite file works on any host with a persistent disk (a VPS, Docker, Railway, Render). Serverless hosts such
as Vercel have no persistent disk, so point the site at [Turso](https://turso.tech) instead:

```bash
DATABASE_URL=libsql://<database>-<org>.turso.io
DATABASE_AUTH_TOKEN=<token>
```

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD` and a random `SESSION_SECRET` (32+ characters) in the host's environment.

## Renaming the brand

The brand name comes from `site.name` in `lib/site.ts`, and every page, data file and component reads it from there.
Change it once and the whole site updates. The logo mark is in `components/ui/logo.tsx` (source artwork in
`public/brand/`), and the colour tokens are at the top of `app/globals.css`.

## How it's organised

| Path | What lives there |
| --- | --- |
| `app/(site)/` | Every public page, wrapped in the site header and footer by `app/(site)/layout.tsx` |
| `app/admin/` | The admin panel: `(auth)/login` and the signed-in `(panel)` pages |
| `app/api/` | Public API routes |
| `data/nav.ts` | The site architecture as typed config. The header mega menus, mobile menu, footer, search palette and sitemap all render from it. |
| `data/*.ts` | Typed content: features (18), solutions (18), pricing, stories, posts, help, events, jobs, templates, resources, integrations, releases, comparisons |
| `components/templates/` | **A** `feature-template`, **B** `solution-template`, **C** `listing` (search, filters, pagination, preview modal), **D** `article` (TOC scroll-spy, author, share, related) |
| `components/mockups/` | Product UI built in HTML/CSS. Pick one by name with `<Mockup kind="…" />`. |
| `components/sections/` | Shared sections, including `reviews.tsx` and `logo-cloud.tsx`, which read admin-managed content |
| `components/admin/` | Admin UI: navigation, forms and building blocks |
| `components/nav/` | Header, mobile drawer, Ctrl/⌘ K search palette, footer, cookie banner |
| `lib/` | `db.ts`, `content.ts`, `auth.ts`, `submissions.ts`, `seo.ts`, `routes.ts`, `theme.ts`, `breadcrumbs.ts` |
| `scripts/check-links.mjs` | Crawls the production build and fails on missing routes, broken links, missing anchors, duplicate titles or descriptions, or pages without exactly one `<h1>` |

## Design system

- **Identity:** the "Electric Messenger" palette: bright blue accents (`#1769F5`, highlight `#2588FF`), navy text
  (`#102039`) and pale blue backgrounds in light mode, deep navy surfaces (`#051121`) in dark mode. The brand gradient
  uses the three blues of the logo. All colours are CSS variables in `app/globals.css`, redefined for dark mode under
  `[data-theme="dark"]`, with status colours for success, warning, error and unread.
- **Type:** Google Sans everywhere, with Google Sans Code for code, on a fluid scale (`text-display-*`, `text-lead`).
- **Motion:** scroll reveals, staggered cards, hover lift, marquees, count-ups and page transitions. Everything respects
  `prefers-reduced-motion`.
- **Accessibility:** skip link, visible focus rings, focus-trapped dialogs, labelled form fields and AA contrast.

## Notes

- Sign-in on the public site is a UI-only flow; downloads and checkout are simulated.
- Dynamic routes prerender every known slug with `generateStaticParams`. Unknown slugs render the 404 page with `noindex`.
- Some URLs keep the original architecture's slugs (for example `/compare/slack-vs-teams` and `/features/slackbot`).
