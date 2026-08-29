import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        404
      </p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
        This page isn’t here.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be old, or I haven’t published this yet. The work and about
        pages are a safer bet.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="outline">
          Work
        </ButtonLink>
      </div>
    </Container>
  );
}
