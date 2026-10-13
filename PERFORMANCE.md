# Performance baseline

Measured 13 October 2026 with Lighthouse CI against `next start` on localhost after the default `npm run build` (Next.js 16.4.0). Lighthouse used its default mobile simulation and three runs per route. The table reports the median of each metric. These are local lab measurements, not Core Web Vitals field results or scores for the public deployment.

These measurements preceded the later header icon and selected-work motion cleanup on the same date; rerun `npm run test:perf` for a baseline of that revision.

| Route | Lighthouse performance | LCP | CLS | Total blocking time |
| --- | ---: | ---: | ---: | ---: |
| Home `/` | 96/100 | 2.73 s | 0 | 24 ms |
| Work `/work` | 96/100 | 2.74 s | 0 | 22 ms |
| About `/about` | 97/100 | 2.61 s | 0 | 27 ms |

An earlier single run measured Home LCP at 3.05 s, and another after removing the hero entrance animation measured 1.03 s. Lighthouse identified the hero paragraph as the largest contentful element with a large render delay in the first run. The later three-run median is 2.73 s. These varying lab results do not establish a reliable improvement in real-user performance; repeat collection and field data are needed for that claim.

## Collection and checks

- Run `npm run build` then `npm run test:perf`. The command starts `next start` on port 3011 and writes reports to `.lighthouseci/`.
- CI records reports as a build artifact. `lighthouserc.cjs` uses the median of three runs, fails on CLS above 0.1 or Lighthouse accessibility score below 0.9, and warns on LCP above 4 s. These are initial guardrails, not product acceptance targets.
- Lighthouse does not provide a real-user INP baseline in this run. Add field measurement when there is enough traffic; do not infer INP from Total Blocking Time.
- The current report suggests some unused JavaScript and image sizing opportunities. `next/image` and modern image output are active; the image audit estimated zero time savings for its sizing suggestion. Re-measure before changing assets or bundles solely for speed.
