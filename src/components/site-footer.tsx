import { Container } from "@/components/container";
import { site, socials } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-xl tracking-tight">{site.name}</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {site.location}. Frontend for web and mobile.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {socials.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </Container>
      <Container className="mt-8">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
