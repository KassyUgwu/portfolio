import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Résumé",
  description: `Read ${site.name}'s résumé in a structured web format.`,
  path: "/resume",
});

const competencies = [
  ["React.js & Next.js Development", "Building scalable, high-performance web applications with TypeScript for type safety and maintainability."],
  ["State Management", "Proficient in Redux, Zustand, React Query, and context-based state management for optimised data handling."],
  ["Real-Time Data Streaming", "Implementing WebSockets for live data updates in complex UI components like tables and dashboards."],
  ["Performance Optimisation", "Improving app speed and scalability through lazy loading, virtualisation, code-splitting, and API optimisation."],
  ["UI/UX & Component Libraries", "Crafting pixel-perfect, responsive, and accessible interfaces using Tailwind CSS, SCSS, and other UI frameworks."],
  ["Testing & Quality Assurance", "Writing end-to-end and integration tests using Playwright to ensure application reliability and regression coverage."],
  ["Security Best Practices", "Implementing authentication, authorisation, and 2FA for enhanced data protection."],
  ["Collaboration & Problem-Solving", "Working cross-functionally with backend developers, designers, and stakeholders to deliver seamless digital experiences."],
] as const;

const experience = [
  {
    company: "Wicrypt",
    location: "Nigeria (Remote)",
    period: "Nov 2023 – Present",
    title: "React Frontend Developer",
    points: [
      "Managed the existing admin dashboard, fixing critical bugs and implementing new features to improve functionality.",
      "Led the complete rebuild of the admin dashboard in sync with a new backend and mobile app, ensuring scalability and performance.",
      "Integrated WebSockets for real-time data streaming, allowing instant updates for fast-changing financial metrics.",
      "Contributed to a 50% increase in user base within two months post-launch, as the mobile app reached #1 on the App Store's finance chart in the region.",
    ],
  },
  {
    company: "Ayika",
    location: "Nigeria (Remote)",
    period: "Mar 2024 – Dec 2024",
    title: "React Native Mobile Developer",
    points: [
      "Developed mobile applications for connecting service providers to clients using React Native and TypeScript.",
      "Enhanced efficiency and responsiveness using Nativewind for styling, ensuring a consistent user experience and reducing styling issues by 40%.",
      "Seamlessly integrated backend services with mobile apps through REST and GraphQL APIs, providing real-time data updates.",
      "Implemented strong security protocols to safeguard user data, resulting in a 50% reduction in security incidents.",
    ],
  },
] as const;

const projects = [
  {
    title: "MTN YelloFi Dashboard",
    stack: "React · TailwindCSS · Playwright",
    url: "https://mtn.yelloyfi.com/",
    points: [
      "Contributed as part of the frontend team to build MTN's YelloFi dashboard, a live platform for managing and monitoring MTN's fibre and broadband services.",
      "Built responsive, accessible UI components using React and TailwindCSS, ensuring a polished experience across devices.",
      "Implemented end-to-end tests with Playwright to maintain reliability and catch regressions ahead of the production launch.",
    ],
  },
  {
    title: "Wicrypt Landing Page",
    stack: "Next.js · TypeScript · TailwindCSS · REST API",
    url: "https://wicrypt.com",
    points: [
      "Solely designed and developed the full Wicrypt landing page using Next.js and TypeScript.",
      "Built and integrated a RESTful API layer to dynamically serve content such as network stats, device listings, and platform data to the frontend.",
      "Consumed REST API endpoints to display real-time Wicrypt network data, ensuring content stays current without manual updates.",
      "Implemented responsive layouts with TailwindCSS, ensuring a consistent and polished experience across all screen sizes and devices.",
    ],
  },
] as const;

export default function ResumePage() {
  return (
    <Container className="max-w-4xl py-16 [overflow-wrap:anywhere] sm:py-24">
      <header className="border-b border-border pb-10">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">Résumé</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight [overflow-wrap:anywhere] sm:text-5xl">Ugwu Kasie</h1>
        <p className="mt-2 text-lg text-muted-foreground">Software Developer</p>
        <address className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm not-italic [overflow-wrap:anywhere]">
          <a href="tel:+2347034367299" className="underline underline-offset-4">+234 7034367299</a>
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
          <Link href="/" className="underline underline-offset-4">Portfolio</Link>
          <span>Nigeria</span>
        </address>
        <p className="mt-5 text-sm text-muted-foreground">This web page contains the résumé content. A PDF copy is also available.</p>
        <ButtonLink href={site.resumePdfUrl} download className="mt-4">Download PDF</ButtonLink>
      </header>

      <section aria-labelledby="resume-profile" className="mt-12">
        <h2 id="resume-profile" className="font-heading text-2xl">Profile</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Experienced Frontend Developer with a strong focus on performance, scalability, and user experience. Skilled in React.js, Next.js, TypeScript, and modern UI libraries like TailwindCSS. Led a full-scale admin dashboard rebuild that boosted performance, grew the customer base by 50%, and contributed to a mobile app reaching #1 in the App Store&apos;s finance category for the region. Proficient in real-time data streaming using WebSockets and optimizing applications with Redux, Zustand, React Query, and API integrations. Passionate about building seamless, high-performing web applications.
        </p>
      </section>

      <section aria-labelledby="resume-competencies" className="mt-12">
        <h2 id="resume-competencies" className="font-heading text-2xl">Core competencies</h2>
        <ul className="mt-5 space-y-3 leading-relaxed text-muted-foreground">
          {competencies.map(([title, detail]) => (
            <li key={title}><strong className="text-foreground">{title}</strong> — {detail}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="resume-experience" className="mt-12">
        <h2 id="resume-experience" className="font-heading text-2xl">Experience</h2>
        <ol className="mt-5 space-y-10">
          {experience.map((role) => (
            <li key={role.company} className="border-t border-border pt-5">
              <h3 className="font-heading text-xl">{role.company} · {role.location}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{role.period}</p>
              <p className="mt-1 font-medium">{role.title}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                {role.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="resume-projects" className="mt-12">
        <h2 id="resume-projects" className="font-heading text-2xl">Projects</h2>
        <ol className="mt-5 space-y-10">
          {projects.map((project) => (
            <li key={project.title} className="border-t border-border pt-5">
              <h3 className="font-heading text-xl">{project.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.stack}</p>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-4 [overflow-wrap:anywhere]">{project.url}</a>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                {project.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="resume-education" className="mt-12 border-t border-border pt-5">
        <h2 id="resume-education" className="font-heading text-2xl">Education</h2>
        <p className="mt-4">University of Nigeria, Nsukka</p>
        <p className="text-muted-foreground">Bachelor&apos;s Degree in Microbiology</p>
      </section>

      <section aria-labelledby="resume-certifications" className="mt-12 border-t border-border pt-5">
        <h2 id="resume-certifications" className="font-heading text-2xl">Certifications</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Backend Web Development – Kodecamp 3.0, 2023</li>
          <li>Frontend Web Development – Kodecamp 2.0, 2022</li>
        </ul>
      </section>
    </Container>
  );
}
