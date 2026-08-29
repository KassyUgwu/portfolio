import type { Metadata } from "next";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { ArchiveRow, FeaturedProject } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getArchiveProjects, getFeaturedProjects } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const workDescription =
  "Selected product work by Kasie Ugwu — Wicrypt, OHealth+, Sales Tracker, and Ayika.";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: workDescription,
  path: "/work",
  keywords: [
    "Kasie Ugwu",
    "frontend portfolio",
    "Wicrypt",
    "OHealth+",
    "Sales Tracker",
    "Ayika",
  ],
});

export default function WorkPage() {
  const featured = getFeaturedProjects();
  const archive = getArchiveProjects();

  return (
    <div className="py-16 sm:py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <Container>
        <Reveal>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Work
          </p>
          <h1 className="mt-3 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
            From the public site to the screens behind it.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Recent product work first.
            {archive.length > 0 ? " Older pieces sit in the archive below." : ""}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <FeaturedProject project={project} index={index} />
            </Reveal>
          ))}
        </div>

        {archive.length > 0 && (
          <Reveal className="mt-24">
            <h2 className="font-heading text-3xl tracking-tight">Archive</h2>
            <div className="mt-4 border-t border-border">
              {archive.map((project) => (
                <ArchiveRow key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </div>
  );
}
