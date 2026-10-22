import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "wicrypt",
    title: "Wicrypt",
    eyebrow: "Product · Wicrypt",
    summary:
      "Web product work for a decentralized Wi-Fi network: the public site, user dashboard, network explorer, NFT surface, and the MTN YelloYfi dashboard.",
    problem:
      "Wicrypt’s products have to work for people buying access, operators running hubs, and partners like MTN. That means marketing pages, logged-in dashboards, and explorer tools that all have to stay usable when the data is dense.",
    role: "Software developer",
    period: "2023 — Present",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "Playwright",
    ],
    featured: true,
    image: {
      src: "/images/projects/wicrypt.jpg",
      alt: "Wicrypt website homepage",
    },
    links: [
      { label: "Website", href: "https://wicrypt.com/" },
      { label: "Dashboard", href: "https://dashboard.wicrypt.com" },
      { label: "Scan", href: "https://scan.wicrypt.com" },
      { label: "NFT", href: "https://nft.wicrypt.com" },
      { label: "YelloYfi", href: "https://mtn.yelloyfi.com" },
    ],
    highlights: [
      "Built the user dashboard at dashboard.wicrypt.com",
      "Contributed to scan.wicrypt.com, the network explorer",
      "Maintain nft.wicrypt.com",
      "Built the MTN YelloYfi dashboard at mtn.yelloyfi.com",
    ],
    sections: [
      {
        heading: "What it is",
        body: "Wicrypt is a decentralized network for internet access. At work I sit on the frontend of that product family: the site people land on, the dashboard they use after they join, the explorer for looking at the network, the NFT surface, and a partner dashboard for MTN’s YelloYfi product.",
      },
      {
        heading: "What I worked on",
        body: "I built dashboard.wicrypt.com and mtn.yelloyfi.com — logged-in product UIs with tables, filters, charts, and role-aware views, wired to APIs in React and TypeScript. I contributed to scan.wicrypt.com. I maintain nft.wicrypt.com. On the public site I helped ship the Next.js marketing experience. A connection-token checkout is still in staging, so it isn’t linked here yet.",
      },
      {
        heading: "How I think about it",
        body: "These are production surfaces, not demos. I keep pages thin, share components across tables and detail views, and treat permissions and API shape as part of the UI — not something to paper over later.",
      },
    ],
  },
  {
    slug: "ohealth",
    title: "OHealth+",
    eyebrow: "Web · Healthcare",
    status: "Live",
    summary:
      "A digital healthcare platform for booking consultations and lab tests, finding verified professionals, and keeping health records in one place.",
    problem:
      "Patients, professionals, and partner hospitals needed one place to meet: sign up, find care, book a consult or lab test, and keep records without another hospital trip.",
    role: "Frontend · Contributor",
    period: "Recent",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright"],
    featured: true,
    image: {
      src: "/images/projects/ohealth.png",
      alt: "OHealth+ website homepage showing its healthcare app",
    },
    links: [
      { label: "Website", href: "https://ohealthltd.com/" },
      { label: "Dashboard", href: "https://dashboard.ohealthltd.com/" },
    ],
    highlights: [
      "Deployed the public website and dashboard",
      "Contributed to the public web experience for patients and professionals",
      "Product story covering consultations, lab partnerships, and health records",
    ],
    sections: [
      {
        heading: "What it is",
        body: "OHealth+ is a healthcare platform from MAKA Integrated Technology. It connects people with verified professionals, lets them book consultations and lab tests, and holds health records in one place. There are paths for patients, providers, and hospital / pharmacy / lab partners.",
      },
      {
        heading: "What I worked on",
        body: "I contributed to building the public product UI for OHealth+ — the experience that explains the platform and carries people into joining as a patient or a professional. The public website and dashboard are now deployed and linked here.",
      },
    ],
  },
  {
    slug: "maka-integrated-technology",
    title: "Maka Integrated Technology",
    eyebrow: "Web · Company site",
    summary: "A technology company site for a team building software, digital products, and health-tech solutions with purpose.",
    problem: "Maka needed a clear digital home for its work across software development, ICT, data, and digital transformation — with OHealth as a product story inside that larger vision.",
    role: "Frontend · Contributor",
    period: "Recent",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    image: { src: "/images/projects/maka-integrated.jpg", alt: "Maka Integrated Technology website homepage" },
    links: [
      { label: "Website", href: "https://mit-website.pages.dev/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/makatech" },
    ],
    highlights: ["Company website for a software and digital transformation team", "Clearer story for the OHealth product family", "LinkedIn presence included as a live channel"],
    sections: [
      { heading: "What it is", body: "Maka Integrated Technology builds software and technology solutions for businesses, organisations, and communities. Its work spans software development, ICT infrastructure, data analytics, and digital transformation." },
      { heading: "What I worked on", body: "I contributed to the company website experience, helping give the team a clear home online while its product work continues to grow. OHealth is one of the products represented in the wider company story." },
    ],
  },
  {
    slug: "sales-tracker",
    title: "Tally Link",
    eyebrow: "Mobile · In progress",
    status: "In progress",
    summary:
      "A shop-floor app I’m building for my brother: sales, inventory, device charging, customers, and reports — with a companion storefront in progress.",
    problem:
      "A small shop needs one place for checkout, charging drop-offs, stock, and staff reports. Spreadsheets and paper don’t keep up when more than one person is on the floor.",
    role: "Design and engineering",
    period: "2026 — Present",
    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "NativeWind",
      "Supabase",
      "TanStack Query",
      "Zustand",
    ],
    featured: true,
    image: {
      src: "/images/projects/tally-link-build.jpg",
      alt: "Tally Link Expo Android build page",
    },
    links: [
      {
        label: "Storefront",
        href: "https://shop-storefront-kappa.vercel.app/staff",
      },
      {
        label: "Download Android APK",
        href: "https://expo.dev/artifacts/eas/6LMd4Bk6-jhtBHB8SJPptGavFjCXXVsnxFJSP4pTF9g.apk",
      },
    ],
    highlights: [
      "POS checkout, inventory, customers, and role-based staff access",
      "Device charging queue with fees recorded on checkout",
      "Offline-aware flows and reports for the shop floor",
      "A companion storefront is in progress and will be linked here when it is hosted",
    ],
    sections: [
      {
        heading: "What it is",
        body: "Tally Link is a mobile app for running a shop: cart checkout, inventory, device charging, customer records, and reports. It’s built for staff on the floor, not for customers at home. Each person signs in with a role so they only see what they need.",
      },
      {
        heading: "What I’m building",
        body: "I’m building this for my brother’s shop. The stack is Expo, TypeScript, NativeWind, Zustand, TanStack Query, and Supabase with row-level security. There’s no custom backend — auth, data, and permissions live in Postgres. A companion storefront is next; this page is already set up so that link can drop in when it’s ready.",
      },
    ],
  },
  {
    slug: "life-os",
    title: "Life OS",
    eyebrow: "Web app · Live",
    status: "Live",
    summary: "A calm personal operating system for plans, finances, health, learning, and reflections in one place.",
    problem: "Personal progress is easy to lose across notes, reminders, and disconnected tools. Life OS brings that experience into one focused product surface.",
    role: "Design and engineering",
    period: "2026",
    stack: ["Web app", "Product UI", "Authentication"],
    featured: true,
    image: {
      src: "/images/projects/life-os-home-fd845171.jpg",
      alt: "Life OS homepage with a daily view preview",
    },
    links: [{ label: "Open Life OS", href: "https://life-os-gilt-xi.vercel.app/" }],
    highlights: [
      "Live personal operating system experience",
      "Public landing page introducing the product and its daily view",
      "Built around making everyday activity easier to see and manage",
    ],
    sections: [
      {
        heading: "What it is",
        body: "Life OS is a calm personal operating system for bringing plans, finances, health, learning, and reflections together. Its public homepage introduces the product and previews the daily view before people create an account or log in.",
      },
      {
        heading: "What I built",
        body: "I designed and built the product experience as a live web app. The portfolio links directly to the deployed product so the interaction and visual direction can be explored in its intended environment.",
      },
    ],
  },
  {
    slug: "ayika",
    title: "Ayika",
    eyebrow: "Mobile · React Native",
    summary:
      "Customer and provider apps for a location-based service marketplace — requests, profiles, ratings, and live session state.",
    problem:
      "Customers needed a way to request a nearby provider, follow that request, and rate the work. Providers needed a matching app with the same data layer, not a second product glued on later.",
    role: "React Native developer",
    period: "2024 — 2025",
    stack: [
      "React Native",
      "TypeScript",
      "Relay",
      "GraphQL",
      "NativeWind",
      "React Navigation",
      "Zod",
    ],
    featured: false,
    image: {
      src: "/images/projects/ayika.svg",
      alt: "Ayika mobile product cover",
    },
    links: [],
    highlights: [
      "Shared monorepo for customer and provider apps",
      "GraphQL with Relay for typed queries and session state",
      "Location, ratings, and OTP auth",
    ],
    sections: [
      {
        heading: "What it is",
        body: "Ayika is a pair of React Native apps — one for customers, one for providers — sitting on a GraphQL API. Customers search for and request a provider, track the session, and rate the work. Providers run the other side of that loop.",
      },
      {
        heading: "What I worked on",
        body: "I built and shipped mobile UI in TypeScript: navigation, request flows, provider profiles, ratings, and the glue around auth. Data went through Relay. Styling used NativeWind. The work included maps and location, image picking, and forms validated with Zod.",
      },
    ],
  },
  {
    slug: "i-validate",
    title: "i-Validate",
    eyebrow: "Web · Collaboration",
    summary:
      "A landing experience and product UI that helps founders run guided tests before they commit to an idea.",
    problem:
      "People start products on a hunch. i-Validate gives them a structured way to check an idea — and the site has to make that process feel approachable, not academic.",
    role: "Frontend · Ada Software Engineering Program",
    period: "2023",
    stack: ["React", "Bootstrap", "CSS", "Firebase", "EmailJS", "Zustand"],
    featured: false,
    image: {
      src: "/images/projects/i-validate.jpg",
      alt: "i-Validate landing page",
    },
    links: [
      { label: "Live site", href: "https://i-validate-landing-page.vercel.app/" },
      {
        label: "GitHub",
        href: "https://github.com/ADA-Software-Engineering-Program/i-validate-landing-page",
      },
    ],
    highlights: [
      "Cross-track Ada project with designers and other engineers",
      "Landing page plus product UI for guided validation tests",
      "Firebase and EmailJS for auth-adjacent and contact flows",
    ],
    sections: [
      {
        heading: "What it is",
        body: "i-Validate is an idea-validation product for entrepreneurs. The public piece is a landing page; behind it, users can work through tests that help them see whether an idea has legs.",
      },
      {
        heading: "What I worked on",
        body: "This was a collaborative Ada Software Engineering Program project. I worked on the React frontend — layout, Bootstrap and custom CSS, Zustand for client state, and integrations with Firebase and EmailJS.",
      },
    ],
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getArchiveProjects() {
  return projects.filter((project) => !project.featured);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
