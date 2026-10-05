import type { ReactNode } from "react";

export function StepShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-navy">{title}</h1>
      {description && <p className="mt-2 text-ink-soft">{description}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}
