# Portfolio backlog

Reviewed 13 October 2026. This file lists unfinished work and the evidence needed to close it. [FRONTEND_CHECKLIST.md](./FRONTEND_CHECKLIST.md) is the status record; [README.md](./README.md) explains how to run and release the site.

**Current decision:** Keep the tested changes local for owner review. Do not publish this checkout yet. Keep the current Tally Link Expo APK until a permanent destination is supplied.

## The five Partly done checklist areas

| Area | Next work | Mark Done when |
| --- | --- | --- |
| Accessibility implementation | Manually tab through every route and the mobile dialog; check focus order and return, external links, both themes, text and control contrast, and VoiceOver/NVDA reading order. Fix findings. | The checks and any fixes are recorded in `ACCESSIBILITY_AUDIT.md` with browser/device details. Automated axe-core results alone are insufficient. |
| WCAG 2.1 AA audit | Review every applicable success criterion with a person and assistive technology, including the readable résumé route. Record pass/fail evidence and resolve failures. | A dated audit report names scope, methods, findings, fixes, and any exceptions. Only then assess a conformance claim. |
| CI and build | After an approved commit/push, inspect the new GitHub Actions run and its Lighthouse artifact. Resolve any runner-only failures. | The workflow for this exact revision passes lint, typecheck, unit tests, production audit, build, three-browser tests, and performance assertions. The last visible hosted pass was 2 September 2026 and predates this work. |
| Responsive and cross-browser release verification | Check the public pages on physical iOS Safari and Android/desktop Firefox or equivalent target devices. Exercise navigation, 200% text, long content, both themes, and image loading. | A dated device/browser matrix records the routes checked, results, and fixes. Local Playwright runs already pass in Chromium, Firefox, and WebKit. |
| Deployment and agreed flows | Once the owner approves publication, include all new images, deploy, and walk through the public routes and links. | Home, Work, About, Résumé, OHealth, Life OS, and Tally Link work on the public domain; new covers and APK link are correct; sitemap and canonical use the intended origin; owner accepts the screens. Public `/work/tally-link` returned 404 on 13 October 2026. |

## One area that cannot yet be verified

- [ ] **Design accuracy:** There is no formal design file. If visual fidelity should be graded, supply reference screenshots or a short list of intended screens, breakpoints, and deliberate variations. Then compare the built pages and record the result. Without a reference, keep this status as **Cannot verify** rather than calling it Done.

## Release sequence after owner approval

1. [ ] Review all current changes. Include the new OHealth, Life OS, Maka, and Tally Link image files, plus the résumé route and review documents. Do not commit generated `.next`, `.lighthouseci`, or test output.
2. [ ] Run `npm run lint`, `npm run typecheck`, `npm test`, `npm audit --omit=dev --audit-level=high`, `npm run build`, `npm run test:e2e`, and `npm run test:perf` on the final checkout.
3. [ ] Commit and push only after the owner approves publication. Inspect the fresh GitHub Actions run and hosting deployment.
4. [ ] Open each public route listed above. Verify OHealth and Life OS use the new images, Tally Link points to the current APK, mobile navigation works, and `/sitemap.xml` and the home canonical URL use the production origin.
5. [ ] Complete the manual accessibility and device checks, record any issues, and update the five statuses using the evidence in the first table.

## Content and site improvements after release

- [ ] **Tally Link distribution:** The owner chose to retain the current Expo APK. It was previously reported to expire on 23 October 2026. Replace it with a durable distribution page or a new build when one is available; verify the URL before changing `src/lib/content/projects.ts`.
- [ ] **Résumé discovery:** `/resume` exists but is not currently listed in `src/app/sitemap.ts`. Add it when updating the sitemap, then verify the public XML after deployment.
- [ ] **Field performance:** Collect real-user LCP, INP, and CLS data if the site has enough traffic. `PERFORMANCE.md` contains local Lighthouse medians, not public-user measurements.
- [ ] **Project media:** Replace remaining decorative SVG covers when genuine stills are available. Keep descriptive case-study alt text and use a new filename when replacing a cached image.
- [ ] **Sharing assets:** Add a dedicated 1200×630 social image and PNG/apple-touch icons if social previews or home-screen installation matter for the next release.
- [ ] **Search and analytics:** Consider Search Console or privacy-respecting analytics only if there is a clear owner need. Do not add tracking by default.
- [ ] **Content freshness:** Recheck role dates, project status, and public links when projects change. Do not invent experience, metrics, titles, or URLs.

## Already implemented and locally verified

- Static routes and typed local content, semantic landmarks and headings, error/404 fallbacks, no-JavaScript access, responsive layouts, shared navigation, reduced motion, and an HTML résumé.
- 12 unit tests, 42 Playwright tests in three engines, a default production build, local Lighthouse assertions, and a production dependency audit with zero reported vulnerabilities.
- CI configuration for lint, typecheck, tests, dependency audit, build, browser checks, and Lighthouse reports. The updated configuration still needs its first hosted run.
