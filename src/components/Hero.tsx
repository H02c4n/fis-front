import { ButtonLink } from "./Button";
import { HeroVisual } from "./HeroVisual";
import { TRUST_POINTS } from "@/lib/constants";

// Drop a real, licensed photo at public/images/hero.jpg (recommended: a bright, empty Swedish
// room — living room or kitchen — mid-clean or just after, roughly square, min. ~1200×1200px)
// and it's used automatically; next/image only checks the file exists at request time, not at
// build time, so the site keeps working with the illustration fallback below until you add it.
// Good, genuinely free-to-use sources: unsplash.com, pexels.com — search "empty apartment
// window light" or "bright living room cleaning" for something that doesn't look like generic
// stock photography.
const HERO_IMAGE_SRC = "/images/hero.jpg";

export function Hero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-line">
      <div className="container-content grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-moss">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">{description}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/boka" variant="primary">Få pris &amp; boka</ButtonLink>
            <ButtonLink href="/vad-ingar" variant="ghost">Se vad som ingår</ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-ink">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" stroke="#2F5233" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual src={HERO_IMAGE_SRC} alt="Ljust, nystädat rum inför inflyttning" />
      </div>
    </section>
  );
}
