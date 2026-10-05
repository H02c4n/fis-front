import Link from "next/link";
import { INCLUDED } from "@/data/included";

export function IncludedPreview() {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-3">
      {INCLUDED.map((cat) => (
        <div key={cat.title}>
          <h3 className="text-base font-semibold text-navy">{cat.title}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {cat.items.slice(0, 5).map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-moss" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="sm:col-span-3">
        <Link href="/vad-ingar" className="link-underline text-sm font-medium text-moss">
          Se hela listan över vad som ingår
        </Link>
      </p>
    </div>
  );
}
