import type { ReactNode } from "react";
import clsx from "clsx";

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  tone = "sand",
  narrow = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children?: ReactNode;
  tone?: "sand" | "white" | "navy";
  narrow?: boolean;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-16 sm:py-24",
        tone === "white" && "bg-white",
        tone === "navy" && "bg-navy text-white"
      )}
    >
      <div className="container-content">
        {(eyebrow || title || lede) && (
          <div className={clsx(narrow ? "max-w-[42rem]" : "max-w-2xl")}>
            {eyebrow && (
              <p className={clsx("text-sm font-medium", tone === "navy" ? "text-sage-deep" : "text-moss")}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={clsx("mt-3 text-3xl font-semibold tracking-tight sm:text-4xl", tone === "navy" && "text-white")}>
                {title}
              </h2>
            )}
            {lede && (
              <p className={clsx("mt-4 text-lg leading-relaxed", tone === "navy" ? "text-white/70" : "text-ink-soft")}>
                {lede}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
