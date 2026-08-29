import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { about, experience, site, skills, socials } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const aboutDescription =
  "Kasie Ugwu is a frontend engineer in Enugu, Nigeria. She builds web and mobile product interfaces with React, Next.js, and React Native.";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: aboutDescription,
  path: "/about",
  keywords: [...site.keywords],
});

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              About
            </p>
            <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
              {site.name}.{" "}
              <span className="text-muted-foreground">I live in Enugu.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {about.intro}
            </p>
            <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${site.email}`}>{site.email}</ButtonLink>
              <ButtonLink
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                Resume
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:pt-10">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl bg-muted lg:mx-0">
              <Image
                src="/images/people/kassy.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 1024px) 360px, 80vw"
                className="object-cover object-[center_20%]"
                priority
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {site.location}
            </p>
          </Reveal>
        </div>

        <section className="mt-24">
          <Reveal>
            <h2 className="font-heading text-3xl tracking-tight">
              How I tend to work
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {about.strengths.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-border/80 bg-card p-6"
                >
                  <h3 className="font-heading text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-24">
          <Reveal>
            <h2 className="font-heading text-3xl tracking-tight">Experience</h2>
            <ol className="mt-10">
              {experience.map((role) => (
                <li
                  key={`${role.company}-${role.period}`}
                  className="grid gap-4 border-t border-border py-10 md:grid-cols-[11rem_1fr]"
                >
                  <p className="text-sm text-muted-foreground">{role.period}</p>
                  <div>
                    <h3 className="text-lg font-medium">
                      {role.title}{" "}
                      <span className="text-primary">
                        {role.href ? (
                          <a
                            href={role.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-4 hover:underline"
                          >
                            @ {role.company}
                          </a>
                        ) : (
                          <>@ {role.company}</>
                        )}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {role.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {role.points.map((point) => (
                        <li
                          key={point}
                          className="border-l-2 border-primary/30 pl-4 text-sm leading-relaxed text-muted-foreground"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {role.stack.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="mt-8 grid gap-12 border-t border-border py-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-3xl tracking-tight">Education</h2>
            <p className="mt-4 font-medium">{about.education.credential}</p>
            <p className="text-sm text-muted-foreground">
              {about.education.school}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {about.education.period}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-heading text-3xl tracking-tight">Elsewhere</h2>
            <ul className="mt-4 space-y-2">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="border-t border-border pt-16">
          <Reveal>
            <h2 className="font-heading text-3xl tracking-tight">
              Tools I actually use
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              From work and projects — not a wish list. Easy to extend when
              something new earns a place.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <SkillColumn title="Building" items={skills.building} />
              <SkillColumn title="Interface" items={skills.interface} />
              <SkillColumn title="Product" items={skills.product} />
            </div>
            <p className="mt-12 text-sm text-muted-foreground">
              Looking for someone to build or tighten a product UI?{" "}
              <Link href="/work" className="text-foreground underline-offset-4 hover:underline">
                Look at the work
              </Link>{" "}
              or email me.
            </p>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium tracking-[0.16em] text-primary uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
