import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = Omit<React.ComponentProps<"a">, "href"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

export function ButtonLink({
  className,
  variant,
  size,
  href,
  rel,
  target,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size, className }));
  const isHttp = href.startsWith("http://") || href.startsWith("https://");
  const external =
    isHttp || href.startsWith("mailto:") || target === "_blank";
  const resolvedRel =
    rel ?? (target === "_blank" && isHttp ? "noopener noreferrer" : undefined);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={resolvedRel}
        {...props}
      />
    );
  }

  return <Link href={href} className={classes} {...props} />;
}
