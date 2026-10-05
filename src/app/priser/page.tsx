import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Section } from "@/components/Section";
import { PriceTable } from "@/components/PriceTable";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ButtonLink } from "@/components/Button";
import { getExtras, getPriceTiers } from "@/lib/api";
import { formatKr } from "@/lib/format";
import { GENERAL_FAQ } from "@/data/faq";

export const metadata: Metadata = {
  title: "Priser för flyttstädning i Skåne",
  description: "Se prisnivåer för flyttstädning baserat på bostadsyta, tilläggstjänster och RUT-avdrag.",
  alternates: { canonical: "/priser" },
};

export default async function PriserPage() {
  const [{ rules, rutEnabled }, extras] = await Promise.all([getPriceTiers(), getExtras()]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Priser" }]} />

      <Section
        title="Vad kostar flyttstädning?"
        lede="Priset baseras i första hand på bostadens yta i kvadratmeter. Nedan ser du ungefärliga prisnivåer – ditt exakta pris beräknas när du anger yta och eventuella tillägg i bokningen."
      >
        <PriceTable tiers={rules} rutEnabled={rutEnabled} />
      </Section>

      {extras.length > 0 && (
        <Section tone="white" eyebrow="Tilläggstjänster" title="Vill du lägga till något?">
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {extras.map((extra) => (
              <div key={extra.slug} className="bg-white p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-medium text-navy">{extra.name}</h3>
                  <span className="whitespace-nowrap text-sm text-ink-soft">{formatKr(extra.price)}</span>
                </div>
                {extra.description && <p className="mt-2 text-sm text-ink-soft">{extra.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="RUT-avdrag" title="Så fungerar RUT-avdraget" narrow>
        <p className="mt-4 max-w-xl text-ink-soft">
          {rutEnabled
            ? "När RUT-avdrag är aktiverat för din bokning dras avdraget automatiskt på slutpriset. Du ser alltid priset före avdrag, avdragets storlek och vad du faktiskt betalar innan du bekräftar bokningen."
            : "RUT-avdrag för flyttstädning kommer att aktiveras här. Kontakta oss om du har frågor om vad som gäller för din bokning."}
        </p>
      </Section>

      <Section tone="white" title="Vanliga frågor om pris">
        <FAQAccordion items={GENERAL_FAQ.slice(0, 3)} />
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-navy">Se ditt exakta pris</h2>
            <p className="mt-1 text-ink-soft">Ange bostadsyta och valfria tillägg för ett fullständigt pris.</p>
          </div>
          <ButtonLink href="/boka">Få pris &amp; boka</ButtonLink>
        </div>
      </Section>
    </>
  );
}
