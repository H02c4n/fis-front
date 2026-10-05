import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Section } from "@/components/Section";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Om oss",
  description: `${COMPANY_NAME} utför flyttstädning i Skåne.`,
  alternates: { canonical: "/om-oss" },
};

// Placeholder copy — replace with the company's real story once provided.
export default function OmOssPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Om oss" }]} />
      <Section title="Om oss" narrow>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          Vi är specialiserade på en sak: flyttstädning i Skåne. Den här texten är en platshållare
          och bör ersättas med företagets riktiga bakgrund, arbetssätt och eventuella certifieringar.
        </p>
      </Section>
    </>
  );
}
