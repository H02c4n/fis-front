import Link from "next/link";
import { Logo } from "./Logo";
import { getCities } from "@/lib/api";
import { COMPANY_NAME } from "@/lib/constants";

export async function Footer() {
  const cities = (await getCities()).slice(0, 12);

  return (
    <footer className="bg-navy text-white">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            Professionell flyttstädning i Skåne, med kvalitetsgaranti och möjlighet till RUT-avdrag.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white/50">Navigering</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/flyttstadning" className="text-white/80 hover:text-white">Flyttstädning</Link></li>
            <li><Link href="/vad-ingar" className="text-white/80 hover:text-white">Vad ingår?</Link></li>
            <li><Link href="/priser" className="text-white/80 hover:text-white">Priser</Link></li>
            <li><Link href="/om-oss" className="text-white/80 hover:text-white">Om oss</Link></li>
            <li><Link href="/kontakt" className="text-white/80 hover:text-white">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white/50">Flyttstädning i Skåne</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/flyttstadning/${c.slug}`} className="text-white/80 hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white/50">Kontakt</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>E-post: <span className="text-white/50">kontakt@example.se (uppdateras)</span></li>
            <li>Telefon: <span className="text-white/50">uppdateras</span></li>
          </ul>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li><Link href="/integritetspolicy" className="text-white/60 hover:text-white">Integritetspolicy</Link></li>
            <li><Link href="/cookiepolicy" className="text-white/60 hover:text-white">Cookiepolicy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-content flex flex-col gap-2 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Org.nr uppdateras.</p>
          <p>Flyttstädning i Malmö, Lund, Helsingborg och övriga Skåne.</p>
        </div>
      </div>
    </footer>
  );
}
