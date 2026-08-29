# Backlog

Last reviewed: 29 August 2026.

This is remaining work for the Kasie Ugwu portfolio (`portfolio_2`). The site is a static Next.js App Router app. Content is typed TypeScript in `src/lib/content/`. There is no CMS, API, auth, or database — and there should not be, unless a real product need appears.

Do not invent experience, metrics, titles, or URLs. Do not publish the Wicrypt connection-token staging URL. Do not re-add archived tutorial projects.

---

## Already in place

Keep these; they are not backlog.

- Routes: `/`, `/work`, `/work/[slug]`, `/about`, 404, `sitemap.xml`, `robots.txt`
- Per-page canonical + Open Graph + Twitter cards; Person / WebSite / ProfilePage JSON-LD on home; breadcrumbs on Work, About, and case studies
- Robots: index/follow + googlebot max-image-preview; preview deploys `noindex`; sitemap priorities
- Manifest, viewport `themeColor`, `twitter:creator` `@UgwuKasie`
- Security headers (nosniff, referrer, frame, permissions). No CSP yet — on purpose
- Featured cards are a single link; nav uses `aria-current="page"`
- Reveal does not hide content without JS; reduced motion is respected
- `dynamicParams = false` on case studies
- External `target="_blank"` links default to `rel="noopener noreferrer"`
- Copy lives in `src/lib/content/`

---

## P0 — Ship blockers

Nothing here should wait if the site is going live.

### Deploy and origin

- [x] **Create a git remote and push.** Public repo: [github.com/KassyUgwu/portfolio](https://github.com/KassyUgwu/portfolio). GitHub identity for this site is **KassyUgwu**, not KasiePatricia.
- [ ] **Host it** (Vercel matches the stack). Preview + production.
- [ ] **Set `NEXT_PUBLIC_SITE_URL`** to the live origin in the host env (no trailing slash). Until this is set, canonicals, sitemap, robots, and OG URLs can resolve to localhost or a Vercel preview host.
- [ ] **Confirm the production domain** (custom domain vs `*.vercel.app`) and keep `site.url` in lockstep.
- [ ] **Smoke the production build locally:** `npm run build && npm run start`. Add an `npm run typecheck` script (`tsc --noEmit`) and run it in CI — it is not in `package.json` today.

### Content that is still placeholder or fragile

- [ ] **Replace SVG covers** for OHealth+, Sales Tracker, and Ayika with real product stills (or honest photography). Current files are decorative placeholders in `public/images/projects/`.
- [ ] **Export a resume PDF** (or a stable personal URL) and point `site.resumeUrl` at it. Canva share links rot and carry tracking params.
- [ ] **OHealth+** still points at `https://dev.ohealthltd.com`. When a production URL exists, update the link and the “Site” label. Until then, leave the honest label.
- [ ] **Sales Tracker** has no public URL. Add the site/app store link when it exists; do not invent one.
- [ ] **Wicrypt token checkout** — add the public URL only after it ships. Do not paste staging.

---

## P1 — Quality before calling it production

Highest leverage remaining engineering work.

### Tests (none exist)

There is no test runner, no `*.test.*` / `*.spec.*` files, and no Playwright/Vitest dependency. Do not add a full suite for a content site. Add the smallest set that would catch a real regression:

1. **Unit (Vitest)** — content and URL helpers
   - [ ] Unique project slugs; `getProject` / `getFeaturedProjects` / `getArchiveProjects` stay consistent with `featured`
   - [ ] Every `links[].href` and social href is `http(s)` or `mailto:`
   - [ ] `resolveSiteUrl` strips trailing slashes and prefers `NEXT_PUBLIC_SITE_URL`
   - [ ] `ButtonLink` sets `rel="noopener noreferrer"` for `https` + `target="_blank"`, and does not force it on internal `/work` links

2. **Smoke (Playwright)** — one browser, Chromium is enough
   - [ ] `/`, `/work`, `/about` return 200 and show the expected `h1`
   - [ ] `/work/wicrypt` (and one other slug) render title + at least one external project link
   - [ ] `/work/not-a-real-project` is 404
   - [ ] Home featured cards: **one** link per project (no duplicate “image + title + read” links)
   - [ ] Skip link is in the document; theme toggle changes `html` class or `color-scheme`
   - [ ] Mobile: open menu, `aria-current="page"` on Work when URL is `/work` or `/work/[slug]`

3. **Scripts**
   - [ ] `npm test` (unit)
   - [ ] `npm run test:e2e` (Playwright)
   - [ ] Do not block local `dev` on e2e

### CI

- [ ] GitHub Actions (or the host’s CI) on PR and `main`: `lint`, `typecheck`, `build`
- [ ] Run Playwright against the production build (`next start`) or `next build` output — not only `next dev`
- [ ] `npm audit` (or `npm audit --omit=dev`) as a scheduled or PR check; do not fail the world on low noise, but do not ignore high/critical in runtime deps

### Accessibility and UI debt

- [ ] **Base UI `nativeButton` warning** on the header sheet. `SheetTrigger` / `SheetClose` render shadcn `Button` (Base UI button) instead of a native `<button>`. Fix composition so the menu trigger and close control are real buttons without nested-button semantics. Verify in the browser console after the fix.
- [ ] **Keyboard pass:** Tab through header (skip link → logo → nav → theme → email), sheet open/close, featured card, case-study externals. Focus rings must stay visible on mobile nav links (desktop already has `focus-visible:ring`).
- [ ] **Contrast:** spot-check `muted-foreground` on `--background` in light and dark (body text ≥ 4.5:1). We darkened light muted text once; it has not been measured.
- [ ] **404 metadata:** unknown slugs currently inherit the default site title (`Kasie Ugwu — Frontend Engineer`). Set a 404 title (layout or `not-found` metadata if the Next version supports it).
- [ ] **Screen reader pass** on a featured card (one name, decorative image `alt=""` is intentional) and on About headings / experience list.

### SEO / share cards

- [ ] Dedicated OG image (1200×630) rather than the portrait used as `site.ogImage`. Portrait crops poorly in `summary_large_image`.
- [ ] `apple-touch-icon` (and a PNG fallback favicon). Only `public/favicon.svg` exists; the web manifest currently points at that SVG.
- [x] `twitter:creator` / `twitter:site` set to `@UgwuKasie`.
- [ ] After go-live: Google Search Console + a crawl of `/sitemap.xml` against the real origin.

### Images and performance

- [ ] Real stills for SVG projects (see P0). Prefer compressed JPG/WebP; keep SVG only if it is the actual art.
- [ ] Confirm LCP on home is the first featured image (`priority` is already set on index 0). Re-check after replacing SVGs.
- [ ] Lighthouse (mobile + desktop) on production: performance, a11y, SEO. Fix only what the report actually flags.

### App Router gaps

- [ ] `src/app/error.tsx` (and optionally `global-error.tsx`) so a render failure is not a blank screen.
- [ ] `loading.tsx` is **low value** here (pages are static). Skip unless a route becomes slow.

---

## P2 — Nice to have

Ship without these. Do them when they earn their keep.

### Product / content

- [ ] Case-study stills or short captions beyond the cover (only if they add information).
- [ ] When Sales Tracker’s website exists, add the link on the project page (the content model already supports `links: []`).
- [ ] Self-host or snapshot the resume so the About CTA cannot 404.
- [ ] A one-line “last updated” on About or Work if the content will change often. Optional.
- [ ] `package.json` `name` is still `portfolio_2` — rename if the public repo should match the person, not the folder.

### Engineering

- [ ] `npm run format` (Prettier) only if you want consistent diffs. ESLint already runs.
- [ ] Sitemap `lastModified` is `new Date()` at build time. Fine for a personal site; switch to real dates only if you start versioning case studies.
- [ ] Privacy-respecting analytics (e.g. Plausible/Umami, no cookie banner if you stay cookieless). Do not add Google Analytics unless you accept the consent cost.
- [ ] Error tracking (Sentry) — usually overkill until you have real traffic and a `error.tsx`.
- [ ] CSP once fonts, next/image, and Canva/resume hosts are listed and tested. Do not copy a strict CSP from a blog post.
- [x] Web app manifest (`src/app/manifest.ts`). PNG icons still missing (see P1).

### Design

- [ ] Desktop nav: visual current-page treatment beyond color (e.g. a hairline). `aria-current` is already there.
- [ ] Reduce duplication between desktop nav and the mobile sheet (shared `NavLinks` component). Refactor only if you touch the header again.
- [ ] Honor `prefers-reduced-motion` is already global in CSS; do not add an animation library.

---

## Out of scope (unless requirements change)

Do not pick these up as “production polish.” They are the wrong size for this product.

- CMS, MDX pipeline, or admin UI
- Auth, contact-form backend, or a database
- Docker, Kubernetes, or a custom CDN config beyond the host
- Extra animation libraries
- Cloning other portfolios
- Re-adding REST Countries, Therapyly, expenses chart, Star Wars, todo
- Publishing internal Wicrypt dashboards or staging URLs
- Invented metrics, job titles, or “lead/principal” language

---

## Suggested order

1. Typecheck script + `next build`
2. Git remote + Vercel + `NEXT_PUBLIC_SITE_URL`
3. Playwright smoke (four routes + 404 + single card link)
4. Vitest on content + `ButtonLink`
5. CI: lint / typecheck / build
6. Sheet button a11y warning
7. Real project stills + resume URL + OG crop
8. Lighthouse on the live URL
9. Everything in P2 only if something in P0/P1 is already done

---

## How to add work later

- **Content change** → edit `src/lib/content/`, not page files.
- **New case study** → add a `Project` in `projects.ts`, put media in `public/images/projects/`, set `featured` true/false.
- **New test** → prefer asserting content invariants or HTTP status over snapshotting CSS.
- **If you are unsure it is true** → leave it off the site.
