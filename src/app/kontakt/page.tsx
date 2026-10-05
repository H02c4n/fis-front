import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta oss med frågor om flyttstädning i Skåne.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Kontakt" }]} />
      <Section title="Kontakta oss" lede="Har du frågor om flyttstädning i Skåne? Skicka ett meddelande så återkommer vi." narrow>
        <ContactForm />
        <p className="mt-8 text-ink-soft">
          E-post: <span className="text-ink-soft/70">kontakt@example.se (uppdateras)</span>
        </p>
      </Section>
    </>
  );
}