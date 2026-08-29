import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { HomeHero } from "@/components/home-hero";
import { JsonLd } from "@/components/json-ld";
import { FeaturedProject } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
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

      <section className="border-t border-border/70 py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                  Selected work
                </p>
                <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
                  Things I’ve shipped.
                </h2>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                All work
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
          <div className="flex flex-col gap-20 lg:gap-28">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <FeaturedProject project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/70 py-20 sm:py-24">
        <Container>
          <Reveal>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Right now
            </p>
            <h2 className="mt-2 font-heading text-3xl tracking-tight">
              What I’m on.
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.currently.map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-border/80 bg-card p-6"
                >
                  <p className="font-heading text-xl">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
