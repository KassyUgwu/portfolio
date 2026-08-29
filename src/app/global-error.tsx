"use client";

import { useEffect } from "react";

import { ButtonLink } from "@/components/button-link";
import { Button } from "@/components/ui/button";

import "./globals.css";

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-start justify-center px-5 py-24">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Error
          </p>
          <h1 className="mt-3 font-heading text-4xl tracking-tight">
            Something went wrong.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            The site failed to load. Try again, or go home.
          </p>
          <div className="mt-8 flex gap-3">
            <Button onClick={() => retry()}>Try again</Button>
            <ButtonLink href="/" variant="outline">
              Home
            </ButtonLink>
          </div>
        </main>
      </body>
    </html>
  );
}
