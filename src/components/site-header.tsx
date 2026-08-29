"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/button-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

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
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Open menu" />
              }
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
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={cn(
                    "rounded-md py-2 text-base hover:text-foreground",
                    pathname === "/"
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  Home
                </Link>
                {nav.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md py-2 text-base hover:text-foreground",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md py-2 text-base text-muted-foreground hover:text-foreground"
                >
                  Resume
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
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
