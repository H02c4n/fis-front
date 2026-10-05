import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { INCLUDED, EXCLUDED } from "@/data/included";

export const metadata: Metadata = {
  title: "Vad ingår i flyttstädningen?",
  description: "Se hela checklistan för vår flyttstädning: alla rum, kök, badrum och fönster – samt vad som inte ingår.",
  alternates: { canonical: "/vad-ingar" },
};

export default function VadIngarPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Vad ingår?" }]} />

      <Section title="Vad ingår i vår flyttstädning?" lede="En fullständig checklista, rum för rum. Samma standard vid varje bokning.">
        <div className="mt-4 grid gap-12 sm:grid-cols-3">
          {INCLUDED.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-lg font-semibold text-navy">{cat.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                {cat.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" stroke="#2F5233" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" title="Vad ingår inte?" narrow>
        <p className="mt-4 max-w-xl text-ink-soft">
          För att kunna hålla ett förutsägbart pris ingår följande inte i flyttstädningen. Behöver du hjälp
          med något av detta, hör av dig så berättar vi vad som är möjligt.
        </p>
        <ul className="mt-8 max-w-xl space-y-3 text-sm text-ink-soft">
          {EXCLUDED.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-soft" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-navy">Redo att boka?</h2>
            <p className="mt-1 text-ink-soft">Ange bostadsyta och se ditt pris direkt.</p>
          </div>
          <ButtonLink href="/boka">Få pris &amp; boka</ButtonLink>
        </div>
      </Section>
    </>
  );
}
