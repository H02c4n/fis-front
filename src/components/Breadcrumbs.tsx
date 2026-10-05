import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Brödsmulor" className="container-content pt-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-navy">{item.label}</Link>
            ) : (
              <span className="text-navy" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
