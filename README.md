# Kasie Ugwu — Portfolio

Personal site for **Kasie Ugwu**, a frontend engineer in Nigeria.

The site is a product, not a template: who I am, what I build, how I think, and the work worth opening.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Content

Copy and project data live in `src/lib/content/`. Update those files when experience, links, or case studies change. Do not invent metrics or roles that are not in that folder.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
```

```bash
npm run typecheck
npm test
npm run test:e2e
```

`test:e2e` starts a production server on port 3010, so it needs a prior `npm run build`.

## Notes

- Resume is the PDF at `/kasie-ugwu-cv.pdf` (`site.resumeUrl` in `src/lib/content/site.ts`).
- Set `NEXT_PUBLIC_SITE_URL` in production for canonical URLs and the sitemap.
