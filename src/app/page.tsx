import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { HomeHero } from "@/components/home-hero";
import { JsonLd } from "@/components/json-ld";
import { FeaturedProject } from "@/components/project-card";
import { about, getFeaturedProjects, site } from "@/lib/content";
import { homeJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  type: "profile",
  keywords: [...site.keywords],
  absoluteTitle: true,
});

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <HomeHero />

      <section id="selected-work" aria-labelledby="selected-work-heading" className="border-t border-border/70 py-20 sm:py-28">
        <Container>
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                Selected work
              </p>
              <h2 id="selected-work-heading" className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
                Things I’ve shipped.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View more work
              <ArrowRight className="size-4" />
            </Link>
          </div>
          {featured.length > 0 ? (
            <>
              <div className="flex flex-col gap-20 lg:gap-28">
                {featured.map((project, index) => (
                  <FeaturedProject key={project.slug} project={project} index={index} headingLevel={3} />
                ))}
              </div>
              <div className="mt-16 flex justify-center">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  View more work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Selected work is being updated. Check back soon.</p>
          )}
        </Container>
      </section>

      <section aria-labelledby="right-now-heading" className="border-t border-border/70 py-20 sm:py-24">
        <Container>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Right now
          </p>
          <h2 id="right-now-heading" className="mt-2 font-heading text-3xl tracking-tight">
            What I’m on.
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.currently.map((item) => (
              <li
                key={item.label}
                className="min-w-0 rounded-2xl border border-border/80 bg-card p-6"
              >
                <h3 className="font-heading text-xl [overflow-wrap:anywhere]">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
