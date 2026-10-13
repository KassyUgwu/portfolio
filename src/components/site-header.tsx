"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/button-link";
import { BrandMark } from "@/components/brand-mark";
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

const navigationItems = [
  { label: "Home", href: "/" },
  ...nav,
  { label: "Resume", href: site.resumeUrl },
];

function NavigationLinks({
  pathname,
  compact,
  includeHome,
  onNavigate,
}: {
  pathname: string;
  compact: boolean;
  includeHome: boolean;
  onNavigate?: () => void;
}) {
  return navigationItems
    .filter((item) => includeHome || item.href !== "/")
    .map((item) => {
      const active = pathIsActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={navClassName(active, compact)}
        >
          {item.label}
        </Link>
      );
    });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    // Base UI gives WebKit focus guards role="button" for VoiceOver navigation.
    // Name those otherwise invisible controls when the mobile dialog is open.
    const labelGuards = () => {
      document.querySelectorAll('[data-base-ui-focus-guard][role="button"]')
        .forEach((guard) => guard.setAttribute("aria-label", "Navigation dialog boundary"));
    };
    labelGuards();
    const observer = new MutationObserver(labelGuards);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["role"],
    });
    return () => observer.disconnect();
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="group flex items-center gap-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <BrandMark />
          <span className="hidden font-heading text-lg tracking-tight min-[360px]:inline min-[420px]:hidden">
            {site.firstName}
          </span>
          <span className="hidden font-heading text-lg tracking-tight min-[420px]:inline">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavigationLinks pathname={pathname} compact includeHome={false} />
          <div className="ml-2 flex items-center gap-1">
            <ThemeToggle />
            <ButtonLink href={`mailto:${site.email}`} size="sm">
              Email
            </ButtonLink>
          </div>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              nativeButton
              className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "client-menu-trigger")}
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
                <NavigationLinks
                  pathname={pathname}
                  compact={false}
                  includeHome
                  onNavigate={() => setOpen(false)}
                />
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
      <noscript>
        <style>{".client-menu-trigger { display: none; }"}</style>
        <nav aria-label="Primary navigation without JavaScript" className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border px-5 py-3 text-sm lg:hidden">
          {navigationItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
      </noscript>
    </header>
  );
}
