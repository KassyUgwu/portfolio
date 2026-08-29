import type { SocialLink } from "./types";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  return "http://localhost:3000";
}

export const site = {
  name: "Kasie Ugwu",
  firstName: "Kasie",
  lastName: "Ugwu",
  shortName: "Kassy",
  title: "Kasie Ugwu — Frontend Engineer",
  description:
    "Frontend engineer in Enugu, Nigeria. I build web and mobile product interfaces with React, Next.js, and React Native.",
  location: "Enugu, Nigeria",
  email: "ugwukasiep@gmail.com",
  twitterHandle: "@UgwuKasie",
  resumeUrl:
    "https://www.canva.com/design/DAFfI894efQ/i53zZCtlSYpgnqI5QHHQHA/view?utm_content=DAFfI894efQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
  url: resolveSiteUrl(),
  ogImage: "/images/people/kassy.jpg",
  ogImageWidth: 810,
  ogImageHeight: 1080,
  keywords: [
    "Kasie Ugwu",
    "Frontend Engineer",
    "React",
    "Next.js",
    "React Native",
    "Enugu",
    "Nigeria",
  ],
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/KassyUgwu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ugwu-kasie/" },
  { label: "X", href: "https://twitter.com/UgwuKasie" },
  { label: "CodePen", href: "https://codepen.io/Kasiepatricia" },
];

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

export const hero = {
  greeting: "Frontend engineer",
  headline: "I build the parts of a product people actually touch.",
  body: "I’m Kasie Ugwu. I design and ship interfaces for web and mobile — from marketing sites to dashboards and payment flows — with a bias for clear UX and code that holds up in production.",
};

export const about = {
  intro:
    "I came into software after a BSc in Microbiology from the University of Nigeria, Nsukka. The switch was deliberate: I like making things that other people can use, and frontend is where product, design, and engineering meet.",
  body: [
    "Since 2022 I’ve worked across internships, a React Native product, and a few years at Wicrypt — dashboards, the public site, scan, NFT, and partner surfaces like YelloYfi. I also contributed to OHealth+, and I’m building a shop app for my brother.",
    "I care about how an interface feels as much as how it’s built. That means TypeScript when the surface is complex, tests when the flow can’t fail quietly, and enough structure that the next person (often future me) can change it without guessing.",
    "I’m based in Enugu. When I’m not in a codebase I keep learning — most recently through the Women in Blockchain Africa mentorship program.",
  ],
  currently: [
    {
      label: "Wicrypt",
      detail: "Software developer on web and product UI",
    },
    {
      label: "Sales Tracker",
      detail: "A shop app for my brother, with a website planned next",
    },
    {
      label: "WIBA",
      detail: "Blockchain development mentorship, Cohort 2.0",
    },
  ],
  education: {
    school: "University of Nigeria, Nsukka",
    credential: "BSc Microbiology",
    period: "2010 — 2014",
  },
  strengths: [
    {
      title: "Product UI",
      body: "Turning messy product requirements into screens that are easy to scan and hard to break.",
    },
    {
      title: "Web and mobile",
      body: "React and Next.js on the web, React Native when the same product needs to live on a phone.",
    },
    {
      title: "Working with a team",
      body: "I sit with design and backend, ship in small slices, and write the kind of UI that APIs can grow into.",
    },
  ],
};

export const skills = {
  building: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "Vue",
    "Nuxt.js",
    "HTML",
    "CSS",
  ],
  interface: [
    "Tailwind CSS",
    "Sass",
    "Bootstrap",
    "NativeWind",
    "Accessible UI",
    "Responsive layout",
  ],
  product: [
    "REST APIs",
    "GraphQL / Relay",
    "Redux Toolkit",
    "RTK Query",
    "TanStack Query",
    "Zustand",
    "Firebase",
    "Supabase",
    "Playwright",
  ],
};
