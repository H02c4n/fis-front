import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-sand/90 backdrop-blur">
      <div className="container-content flex h-[4.5rem] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Huvudmeny">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            href="/boka"
            className="inline-flex items-center justify-center rounded-full bg-sage px-5 py-2.5 text-[0.95rem] font-medium text-navy transition-colors hover:bg-sage-deep"
          >
            Boka nu
          </Link>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
