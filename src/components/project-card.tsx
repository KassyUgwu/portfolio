import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reverse = index % 2 === 1;

  return (
    <article>
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.title} — read the case study`}
        className="group grid items-center gap-8 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:grid-cols-12 lg:gap-12"
      >
        <div
          className={cn(
            "relative aspect-16/11 overflow-hidden rounded-2xl bg-muted lg:col-span-7",
            reverse && "lg:order-2",
          )}
        >
          {project.image ? (
            <Image
              src={project.image.src}
              alt=""
              fill
              priority={index === 0}
              unoptimized={project.image.src.endsWith(".svg")}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-end p-8">
              <span className="font-heading text-4xl text-muted-foreground/70">
                {project.title}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className={cn("lg:col-span-5", reverse && "lg:order-1")}>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            {project.eyebrow}
          </p>
          <h3 className="mt-3 font-heading text-3xl tracking-tight transition-colors group-hover:text-primary sm:text-4xl">
            {project.title}
          </h3>
          {project.status && (
            <p className="mt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {project.status}
            </p>
          )}
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </ul>
          <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            Read the work
            <ArrowRight className="size-4" aria-hidden="true" />
          </p>
        </div>
      </Link>
    </article>
  );
}

export function ArchiveRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid gap-3 border-b border-border/80 py-6 transition-colors sm:grid-cols-[1fr_auto] sm:items-baseline"
    >
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-heading text-2xl tracking-tight group-hover:text-primary">
            {project.title}
          </h3>
          <span className="text-xs tracking-wide text-muted-foreground uppercase">
            {project.eyebrow}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">{project.period}</p>
    </Link>
  );
}
