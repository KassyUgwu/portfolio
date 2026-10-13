# Kasie Ugwu — portfolio

Kasie Ugwu's portfolio for web and mobile product work. It uses **Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4**. Portfolio content is stored in typed local files. This repository has no CMS, portfolio API, authentication, or database; descriptions of those features in case studies refer to the projects being described.

**Review state (13 October 2026):** The current changes are local for owner review. They have not been committed or deployed. See [FRONTEND_CHECKLIST.md](./FRONTEND_CHECKLIST.md) for evidence and status across all 18 review areas.

## Start locally

Use Node.js 22, the version configured in [CI](./.github/workflows/ci.yml).

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production build:

```bash
npm run build
npm run start
```

Copy `.env.example` to `.env.local` only when a local canonical origin is needed. `NEXT_PUBLIC_SITE_URL` sets the absolute origin used by metadata, structured data, `robots.txt`, and `sitemap.xml`. The code falls back to the Vercel production URL, then the Vercel deployment URL, then `http://localhost:3000`. Set the variable to the intended public origin when building for production.

## Routes and source of truth

| Route | Purpose | Main source |
| --- | --- | --- |
| `/` | Introduction, featured work, and “Right now” | `src/app/page.tsx`, `src/components/home-hero.tsx`, `src/lib/content/site.ts` |
| `/work` | Featured and archive lists | `src/app/work/page.tsx`, `src/lib/content/projects.ts` |
| `/work/[slug]` | Static case studies | `src/app/work/[slug]/page.tsx`, `src/lib/content/projects.ts` |
| `/about` | Background, experience, and skills | `src/app/about/page.tsx`, `src/lib/content/site.ts`, `src/lib/content/experience.ts` |
| `/resume` | Readable HTML résumé with PDF download | `src/app/resume/page.tsx`, `public/kasie-ugwu-cv.pdf` |
| `/sitemap.xml`, `/robots.txt` | Search-engine discovery | `src/app/sitemap.ts`, `src/app/robots.ts` |

Shared header, footer, theme control, and skip link are composed in `src/app/layout.tsx` and `src/components/`. `src/lib/seo.ts` builds page metadata and structured data. Global color tokens and base styles are in `src/app/globals.css`; component-specific effects use CSS modules. The reusable UI primitives are in `src/components/ui/`.

The case-study route uses `generateStaticParams` and `dynamicParams = false`: a new project slug becomes a route after a new build. Unknown slugs return the 404 page. Home and Work use the same project list, so project edits should start in `src/lib/content/projects.ts` rather than in page JSX.

## Edit content and images

1. Edit `src/lib/content/site.ts` for biography, current work, navigation, and global site details; `experience.ts` for roles; or `projects.ts` for case studies. Keep roles, claims, metrics, and links factual.
2. Each project must match the `Project` type in `src/lib/content/types.ts`. `slug` determines its URL; changing an existing slug breaks old links. `featured: true` places it in the Home and main Work lists, while `featured: false` puts it in the archive. Optional `image`, `problem`, and `status` fields can be omitted; use `links: []` when there is no public destination.
3. Put a project cover under `public/images/projects/` and set `image.src` to `/images/projects/<filename>`. Use an alt description that identifies what the image shows. The decorative image inside a card intentionally has empty alt text because the card link already names the project; the case-study image uses the description.
4. When replacing a cover that browsers may have cached, use a **new filename** and update `image.src`. This is especially useful for OHealth and Life OS, whose covers were recently replaced. Include every new media file when the change is released.
5. Update any project link in its `links` array. The current Tally Link APK is the owner-approved temporary link; [BACKLOG.md](./BACKLOG.md) tracks its replacement when a durable distribution page exists.
6. Run the checks below and inspect the edited page at mobile and desktop widths.

`Reveal` never hides the server-rendered content before JavaScript runs. After hydration it may play a short entrance animation on About, which respects reduced-motion settings. Home and Work content appears without scroll reveals; project images stay still on hover. The header mark has a short entrance orbit and moves again while hovered or keyboard-focused; reduced-motion settings stop it. The browser tab icon is `src/app/icon.svg`. `SiteHeader` uses one list of navigation items for desktop, the mobile dialog, and the no-JavaScript fallback.

## Quality checks

Run these after a production build. Playwright starts `next start` on port 3010; Lighthouse CI starts it on port 3011. Do not run those two commands against the same `.next` build while rebuilding it.

```bash
npm run lint
npm run typecheck
npm test
npm audit --omit=dev --audit-level=high
npm run build
npx playwright install chromium firefox webkit
npm run test:e2e
npm run test:perf
```

The last local review passed **12 unit tests**, **42 Playwright tests** across Chromium, Firefox, and WebKit, the default production build, Lighthouse assertions, and the production dependency audit with zero reported vulnerabilities. Browser tests cover routes, themes, keyboard/menu behavior, no-JavaScript content, failed images, reflow at several widths, enlarged text, and automated accessibility checks. `test:perf` collects three mobile-simulated Lighthouse runs for Home, Work, and About and writes local reports to `.lighthouseci/`.

The [GitHub Actions workflow](./.github/workflows/ci.yml) runs the same quality checks on pushes to `main` and pull requests, then uploads Lighthouse reports. Its updated version has **not** run on GitHub because these changes remain local. [PERFORMANCE.md](./PERFORMANCE.md) explains the measured baseline and why it is not real-user performance data. [ACCESSIBILITY_AUDIT.md](./ACCESSIBILITY_AUDIT.md) records automated coverage and human checks still required before any WCAG claim.

## Release walkthrough

The owner asked to keep this checkout local for review. When publication is approved:

1. Review the source diff and make sure new files in `public/images/projects/`, the résumé route, and the three review documents are included in the commit.
2. Run the quality checks above on the final checkout. Confirm `NEXT_PUBLIC_SITE_URL` uses the intended production origin in the build environment.
3. Push the reviewed change and wait for the new GitHub Actions and hosting deployment results. An older successful workflow run does not verify this update.
4. On the **public** site, inspect Home, Work, About, Résumé, OHealth, Life OS, and Tally Link. Confirm the OHealth and Life OS covers, the Tally Link APK link, mobile navigation, `sitemap.xml`, and the home canonical URL. Public `/work/tally-link` returned 404 on 13 October 2026, so this check matters.
5. Record any visual acceptance notes and the manual browser/accessibility results in the linked review documents. Update the checklist only after the evidence exists.

## Remaining review areas

Five areas are **Partly done**: accessibility implementation, the WCAG 2.1 AA audit, CI and build verification, responsive and cross-browser release verification, and deployment and agreed flows. Design accuracy is **Cannot verify** because there is no formal design reference. [BACKLOG.md](./BACKLOG.md) gives the next action and completion evidence for each. The current Expo APK stays in place until a permanent Tally Link link is available.
