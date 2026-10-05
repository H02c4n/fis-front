import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { IncludedPreview } from "@/components/IncludedPreview";
import { PriceTable } from "@/components/PriceTable";
import { HowItWorks } from "@/components/HowItWorks";
import { CityLinks } from "@/components/CityLinks";
import { ContactCta } from "@/components/ContactCta";
import { getCities, getPriceTiers } from "@/lib/api";

export const metadata: Metadata = {
  title: "Flyttstädning i Skåne",
  description: "Professionell flyttstädning i Skåne. Ange bostadsyta, få pris direkt och boka online. Kvalitetsgaranti och möjlighet till RUT-avdrag.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [cities, { rules, rutEnabled }] = await Promise.all([getCities(), getPriceTiers()]);

  return (
    <>
      <Hero
        eyebrow="Flyttstädning i Skåne"
        title="Professionell flyttstädning i Skåne"
        description="Vi utför noggrann flyttstädning inför din flytt – med fönsterputs, kvalitetsgaranti och ett pris du ser direkt när du bokar."
      />

      <Section tone="white" eyebrow="Flyttstädning utan stress" title="En sak, ordentligt gjord" narrow>
        <p className="mt-4 max-w-[38rem] text-lg leading-relaxed text-ink-soft">
          Vi städar bara en sak: bostäder inför inflyttning eller besiktning. Det gör att varje uppdrag
          följer samma tydliga checklista, oavsett om det är en etta eller en villa.
        </p>
      </Section>

      <Section eyebrow="Varför välja oss" title="Det här kan du förvänta dig">
        <WhyChooseUs />
      </Section>

      <Section tone="white" eyebrow="Checklista" title="Vad ingår i städningen?">
        <IncludedPreview />
      </Section>

      <Section eyebrow="Priser" title="Prisnivåer" lede="Priset baseras på bostadens yta. Ange exakt yta i bokningen för ett fullständigt pris.">
        <PriceTable tiers={rules} rutEnabled={rutEnabled} />
      </Section>

      <Section tone="white" eyebrow="Så fungerar det" title="Från bostadsyta till bokad tid">
        <HowItWorks />
      </Section>

      <Section eyebrow="Var vi finns" title="Flyttstädning i Skåne" lede="Vi erbjuder flyttstädning i Malmö och övriga delar av Skåne.">
        <CityLinks cities={cities} />
      </Section>

      <Section tone="white" eyebrow="Om oss" title="Ett lokalt fokus på en sak" narrow>
        <p className="mt-4 max-w-[38rem] text-lg leading-relaxed text-ink-soft">
          Vi är specialiserade på flyttstädning i Skåne och tar inte på oss andra typer av städuppdrag.
          Det gör att varje bokning hanteras enligt samma checklista, med samma fokus på detaljer.
        </p>
      </Section>

      <div className="pb-24">
        <ContactCta />
      </div>
    </>
  );
}
