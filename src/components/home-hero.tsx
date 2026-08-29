import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { hero, site } from "@/lib/content";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container>
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            {hero.greeting} · {site.location}
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-[2.35rem] leading-[1.08] tracking-tight sm:text-5xl lg:text-[4.15rem]">
            I build the parts of a product
            <span className="block">people actually touch.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/work" size="lg">
              See selected work
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="outline" size="lg">
              Email me
              <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
