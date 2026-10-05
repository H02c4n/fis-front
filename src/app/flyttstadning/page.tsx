import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IncludedPreview } from "@/components/IncludedPreview";
import { PriceTable } from "@/components/PriceTable";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CityLinks } from "@/components/CityLinks";
import { ContactCta } from "@/components/ContactCta";
import { ButtonLink } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { getCities, getPriceTiers } from "@/lib/api";
import { GENERAL_FAQ } from "@/data/faq";
import { EXCLUDED } from "@/data/included";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/constants";

const description =
  "Flyttstädning i Skåne med tydlig checklista: alla rum, kök, badrum och fönster ingår alltid. Ange bostadsyta och få pris direkt.";

export const metadata: Metadata = {
  title: "Flyttstädning i Skåne | Professionell flyttstädning",
  description,
  alternates: { canonical: "/flyttstadning" },
};

export default async function FlyttstadningPage() {
  const [cities, { rules, rutEnabled }] = await Promise.all([getCities(), getPriceTiers()]);
  const url = `${SITE_URL}/flyttstadning`;

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: "Flyttstädning i Skåne", description, url })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hem", url: SITE_URL },
          { name: "Flyttstädning", url },
        ])}
      />
      <JsonLd data={faqJsonLd(GENERAL_FAQ)} />

      <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Flyttstädning" }]} />

      <Hero
        eyebrow="Vår enda tjänst"
        title="Flyttstädning i Skåne"
        description="Flyttstädning innebär en grundlig genomgång av hela bostaden inför besiktning eller inflyttning – från kök och badrum till fönster och garderober. Vi utför bara den här typen av städning, med samma checklista varje gång."
      />

      <Section tone="white" eyebrow="Checklista" title="Vad ingår?">
        <IncludedPreview />
      </Section>

      <Section eyebrow="Undantag" title="Vad ingår inte?" narrow>
        <ul className="mt-8 max-w-xl space-y-3 text-sm text-ink-soft">
          {EXCLUDED.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-soft" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" eyebrow="Priser & RUT" title="Vad kostar flyttstädning?" lede="Priset beror i första hand på bostadens yta i kvadratmeter samt eventuella tillägg.">
        <PriceTable tiers={rules} rutEnabled={rutEnabled} />
      </Section>

      <Section eyebrow="Bokning" title="Så fungerar det">
        <HowItWorks />
        <div className="mt-10">
          <ButtonLink href="/boka">Boka flyttstädning</ButtonLink>
        </div>
      </Section>

      <Section tone="white" eyebrow="Vanliga frågor" title="Vanliga frågor om flyttstädning">
        <FAQAccordion items={GENERAL_FAQ} />
      </Section>

      <Section eyebrow="Var vi finns" title="Flyttstädning i hela Skåne">
        <CityLinks cities={cities} />
      </Section>

      <div className="pb-24">
        <ContactCta />
      </div>
    </>
  );
}
