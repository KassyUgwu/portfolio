import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { getProject, projects } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, workJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${slug}`,
    type: "article",
    keywords: [project.title, ...project.stack.slice(0, 6)],
    images: project.image
      ? [{ url: project.image.src, alt: project.image.alt }]
      : undefined,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="py-16 sm:py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />
      <JsonLd data={workJsonLd(project)} />
      <Container className="max-w-3xl">
        <Link
          href="/work"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>

        <p className="mt-10 text-xs font-medium tracking-[0.18em] text-primary uppercase [overflow-wrap:anywhere]">
          {project.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight [overflow-wrap:anywhere] sm:text-6xl">
          {project.title}
        </h1>
        {project.status && (
          <p className="mt-3 text-sm font-medium tracking-wide text-primary uppercase">
            {project.status}
          </p>
        )}
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
          {project.summary}
        </p>

        <dl className="mt-10 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Role
            </dt>
            <dd className="mt-1 text-sm">{project.role}</dd>
          </div>
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Period
            </dt>
            <dd className="mt-1 text-sm">{project.period}</dd>
          </div>
          {project.stack.length > 0 && (
            <div className="min-w-0 [overflow-wrap:anywhere]">
              <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                Stack
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Badge key={item} variant="outline" className="h-auto min-h-5 max-w-full whitespace-normal [overflow-wrap:anywhere]">
                    {item}
                  </Badge>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link, index) => (
              <ButtonLink
                key={link.href}
                href={link.href}
                target="_blank"
                variant={index === 0 ? "default" : "outline"}
                className="h-auto min-h-8 max-w-full whitespace-normal py-2 text-center [overflow-wrap:anywhere]"
              >
                {link.label}
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            ))}
          </div>
        )}
      </Container>

      {project.image && (
        <Container className="mt-12 max-w-5xl">
          <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-muted">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority
              unoptimized={project.image.src.endsWith(".svg")}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Container>
      )}

      <Container className="mt-16 max-w-3xl">
        {project.problem && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl tracking-tight">The problem</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
              {project.problem}
            </p>
          </section>
        )}

        {project.highlights.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl tracking-tight">
              What stands out
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-primary/40 pl-4 text-[0.95rem] leading-relaxed text-muted-foreground [overflow-wrap:anywhere]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.sections.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="font-heading text-2xl tracking-tight [overflow-wrap:anywhere]">
              {section.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
              {section.body}
            </p>
          </section>
        ))}
      </Container>
    </article>
  );
}
