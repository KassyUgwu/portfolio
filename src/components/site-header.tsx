"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/button-link";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, pathIsActive, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const navClassName = (active: boolean, compact: boolean) =>
  cn(
    "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    compact ? "px-3 py-1.5 text-sm" : "py-2 text-base",
    active
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
  );

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="group flex items-center gap-2.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="flex size-8 items-center justify-center rounded-full border border-primary/30 font-heading text-sm text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            KU
          </span>
          <span className="font-heading text-lg tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathIsActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={navClassName(active, true)}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={navClassName(false, true)}
          >
            Resume
          </a>
          <div className="ml-2 flex items-center gap-1">
            <ThemeToggle />
            <ButtonLink href={`mailto:${site.email}`} size="sm">
              Email
            </ButtonLink>
          </div>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              nativeButton
              className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
              aria-label="Open menu"
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="px-2">
              <SheetHeader>
                <SheetTitle className="font-heading text-left text-xl">
                  {site.shortName}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  aria-current={pathIsActive(pathname, "/") ? "page" : undefined}
                  className={navClassName(pathIsActive(pathname, "/"), false)}
                >
                  Home
                </Link>
                {nav.map((item) => {
                  const active = pathIsActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={navClassName(active, false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navClassName(false, false)}
                >
                  Resume
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Email me
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
