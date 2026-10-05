import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IncludedPreview } from "@/components/IncludedPreview";
import { PriceTable } from "@/components/PriceTable";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactCta } from "@/components/ContactCta";
import { ButtonLink } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { getCities, getCity, getPriceTiers } from "@/lib/api";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/constants";

// New/updated cities in Django Admin start showing up on the next revalidation window —
// no redeploy needed. Pages not in generateStaticParams at build time are rendered on first
// request and then cached (see dynamicParams below).
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = await getCity(slug);
  if (!city) return {};

  const url = `${SITE_URL}/flyttstadning/${city.slug}`;
  return {
    title: city.seo_title || `Flyttstädning i ${city.name}`,
    description: city.meta_description || city.short_description,
    alternates: { canonical: `/flyttstadning/${city.slug}` },
    robots: city.is_indexed ? undefined : { index: false, follow: true },
    openGraph: { title: city.seo_title || `Flyttstädning i ${city.name}`, url, type: "website" },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const [city, allCities, { rules, rutEnabled }] = await Promise.all([
    getCity(slug),
    getCities(),
    getPriceTiers(),
  ]);

  if (!city) notFound();

  const url = `${SITE_URL}/flyttstadning/${city.slug}`;
  const relatedCities = allCities.filter((c) => c.slug !== city.slug).slice(0, 6);
  const description = city.meta_description || city.short_description || `Flyttstädning i ${city.name}.`;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: city.seo_title || `Flyttstädning i ${city.name}`, url, description }} />
      <JsonLd data={serviceJsonLd({ name: `Flyttstädning i ${city.name}`, description, url })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hem", url: SITE_URL },
          { name: "Flyttstädning", url: `${SITE_URL}/flyttstadning` },
          { name: city.name, url },
        ])}
      />
      {city.faqs.length > 0 && <JsonLd data={faqJsonLd(city.faqs)} />}

      <Breadcrumbs
        items={[
          { label: "Hem", href: "/" },
          { label: "Flyttstädning", href: "/flyttstadning" },
          { label: city.name },
        ]}
      />

      <Hero
        eyebrow={`Flyttstädning i ${city.name}`}
        title={city.hero_title || `Professionell flyttstädning i ${city.name}`}
        description={city.hero_description || description}
      />

      {city.introduction && (
        <Section tone="white" eyebrow={`Flyttstädning i ${city.name}`} title="Lokal flyttstädning, samma checklista" narrow>
          <div className="mt-4 max-w-[38rem] space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>{city.introduction}</p>
            {city.local_content && <p>{city.local_content}</p>}
          </div>
        </Section>
      )}

      <Section eyebrow="Checklista" title="Vad ingår i vår flyttstädning?">
        <IncludedPreview />
      </Section>

      <Section
        tone="white"
        eyebrow="Pris"
        title={`Flyttstädning pris i ${city.name}`}
        lede="Priset beror i första hand på bostadens yta i kvadratmeter samt eventuella tilläggstjänster. Ange exakt yta i bokningen för ett fullständigt pris."
      >
        <PriceTable tiers={rules} rutEnabled={rutEnabled} />
      </Section>

      <Section eyebrow="Varför välja oss" title={`Flyttstädning i ${city.name} med kvalitetsgaranti`}>
        <WhyChooseUs />
      </Section>

      <Section tone="white" eyebrow="Så fungerar det" title="Så bokar du flyttstädning">
        <HowItWorks />
      </Section>

      {city.faqs.length > 0 && (
        <Section eyebrow="Vanliga frågor" title={`Vanliga frågor om flyttstädning i ${city.name}`}>
          <FAQAccordion items={city.faqs} />
        </Section>
      )}

      {relatedCities.length > 0 && (
        <Section tone="white" eyebrow="Fler orter" title="Flyttstädning på fler platser i Skåne">
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {relatedCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/flyttstadning/${c.slug}`}
                  className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-moss hover:text-moss"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-navy">{city.cta_text || `Boka flyttstädning i ${city.name}`}</h2>
            <p className="mt-1 text-ink-soft">Ange bostadsyta och se ditt pris direkt.</p>
          </div>
          <ButtonLink href="/boka">Få pris &amp; boka</ButtonLink>
        </div>
      </Section>

      <div className="pb-24">
        <ContactCta />
      </div>
    </>
  );
}
