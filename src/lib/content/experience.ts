import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    company: "Wicrypt",
    title: "Software Developer",
    period: "May 2023 — Present",
    href: "https://wicrypt.com/",
    summary:
      "User-facing web work across Wicrypt’s public site, dashboards, explorer, NFT surface, and partner products.",
    points: [
      "Built dashboard.wicrypt.com and the MTN YelloYfi dashboard at mtn.yelloyfi.com.",
      "Contributed to scan.wicrypt.com and maintain nft.wicrypt.com.",
      "Ship features on the public site and other product UI, working with product, design, and engineering.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Playwright"],
  },
  {
    company: "Ayika",
    title: "React Native Developer",
    period: "April 2024 — January 2025",
    summary:
      "Cross-platform customer and provider apps for a location-based service marketplace.",
    points: [
      "Built mobile features in a React Native + TypeScript workspace shared by customer and provider apps.",
      "Implemented UI that had to stay usable across device sizes, with GraphQL/Relay for data.",
      "Worked with designers to take flows from mock to something that ran on a phone.",
    ],
    stack: ["React Native", "TypeScript", "Relay", "GraphQL", "NativeWind"],
  },
  {
    company: "BetaKopa",
    title: "Junior Developer · Intern",
    period: "January 2023 — April 2023",
    href: "https://betakopa.com/",
    location: "Lagos, Nigeria",
    summary:
      "Frontend internship on responsive web interfaces in a small product team.",
    points: [
      "Designed and implemented responsive web interfaces.",
      "Worked with backend engineers and designers on product features.",
      "Turned business requirements into pages people could actually use.",
    ],
    stack: ["HTML", "CSS", "Nuxt.js", "Git"],
  },
  {
    company: "Top Universe",
    title: "Junior Frontend Developer · Intern",
    period: "August 2022 — December 2022",
    href: "https://topuniverse.org",
    location: "Lagos, Nigeria",
    summary: "Ed-tech internship focused on frontend web work.",
    points: [
      "Built and styled web applications with the engineering team.",
      "Collaborated with backend engineers and designers on functional UI.",
    ],
    stack: ["HTML", "CSS", "React", "Nuxt.js", "Git"],
  },
];
