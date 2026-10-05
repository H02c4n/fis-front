import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-sage text-navy hover:bg-sage-deep",
  secondary: "bg-navy text-white hover:bg-navy-2",
  ghost: "bg-transparent text-navy border border-navy/25 hover:border-navy",
};

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
}

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-medium",
        "transition-colors duration-150",
        styles[variant],
        className
      )}
    />
  );
}
