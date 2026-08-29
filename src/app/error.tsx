"use client";

import { useEffect } from "react";

import { ButtonLink } from "@/components/button-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        Error
      </p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page failed to load. You can try again, or go back to the work list.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <ButtonLink href="/work" variant="outline">
          Work
        </ButtonLink>
      </div>
    </Container>
  );
}
