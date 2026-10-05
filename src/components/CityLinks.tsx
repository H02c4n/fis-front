import Link from "next/link";
import type { City } from "@/lib/types";

export function CityLinks({ cities }: { cities: City[] }) {
  return (
    <ul className="mt-12 flex flex-wrap gap-2.5">
      {cities.map((city) => (
        <li key={city.slug}>
          <Link
            href={`/flyttstadning/${city.slug}`}
            className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-moss hover:text-moss"
          >
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
