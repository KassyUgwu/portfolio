import type { Metadata } from "next";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { ArchiveRow, FeaturedProject } from "@/components/project-card";
import { getArchiveProjects, getFeaturedProjects } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const workDescription =
  "Selected product work by Kasie Ugwu — Wicrypt, OHealth+, Tally Link, and Ayika.";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: workDescription,
  path: "/work",
  keywords: [
    "Kasie Ugwu",
    "frontend portfolio",
    "Wicrypt",
    "OHealth+",
    "Tally Link",
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
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Work
          </p>
          <h1 className="mt-3 max-w-2xl font-heading text-4xl tracking-tight [overflow-wrap:anywhere] sm:text-5xl">
            From the public site to the screens behind it.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Recent product work first.
            {archive.length > 0 ? " More projects are listed below." : ""}
          </p>
        </div>

        {featured.length > 0 ? (
          <div className="mt-16 flex flex-col gap-20 lg:gap-28">
            {featured.map((project, index) => (
              <FeaturedProject key={project.slug} project={project} index={index} headingLevel={2} />
            ))}
          </div>
        ) : archive.length === 0 ? (
          <p className="mt-16 text-muted-foreground">The work list is being updated. Check back soon.</p>
        ) : null}

        {archive.length > 0 && (
          <section aria-labelledby="more-work-heading" className="mt-24">
            <h2 id="more-work-heading" className="font-heading text-3xl tracking-tight">More work</h2>
            <div className="mt-4 border-t border-border">
              {archive.map((project) => (
                <ArchiveRow key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
