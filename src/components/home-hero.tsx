import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { hero, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <section aria-labelledby="home-title" className={cn(styles.section, "relative overflow-hidden pt-16 pb-20 sm:pt-28 sm:pb-32")}>
      <div className={cn(styles.orb, styles.orbOne)} aria-hidden="true" />
      <div className={cn(styles.orb, styles.orbTwo)} aria-hidden="true" />
      <Container>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium tracking-[0.2em] text-primary uppercase [overflow-wrap:anywhere]">
            <Sparkles className="size-4" />
            {hero.greeting} · {site.location}
          </div>
          <h1 id="home-title" className="mt-6 max-w-5xl font-heading text-[clamp(2.25rem,8vw,3.25rem)] leading-[1.02] tracking-tight [overflow-wrap:anywhere] sm:text-6xl lg:text-[6.8rem]">
            I build digital products
            <span className={cn(styles.titleAccent, "block")}>people actually use.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground [overflow-wrap:anywhere] sm:text-lg">
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
          <div className="mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-border/80 pt-6 min-[380px]:grid-cols-2 sm:grid-cols-3">
            <div className="min-w-0 [overflow-wrap:anywhere]"><p className="font-heading text-2xl sm:text-3xl">04+</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Years building</p></div>
            <div className="min-w-0 [overflow-wrap:anywhere]"><p className="font-heading text-2xl sm:text-3xl">Web + mobile</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Product surfaces</p></div>
            <div className="hidden min-w-0 [overflow-wrap:anywhere] sm:block"><p className="font-heading text-3xl">Nigeria</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Working globally</p></div>
          </div>
        </div>
      </Container>
      <a href="#selected-work" className={cn(styles.scroll, "absolute right-6 bottom-8 hidden items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex")}>
        Scroll to explore <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
