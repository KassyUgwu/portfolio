import type { AnchorHTMLAttributes } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ButtonLink } from "./button-link";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ButtonLink", () => {
  it("sets rel for https links that open in a new tab", () => {
    render(
      <ButtonLink href="https://wicrypt.com" target="_blank">
        Website
      </ButtonLink>,
    );

    expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("does not force rel on internal routes", () => {
    render(<ButtonLink href="/work">Work</ButtonLink>);

    expect(screen.getByRole("link", { name: "Work" })).not.toHaveAttribute(
      "rel",
    );
  });
});
