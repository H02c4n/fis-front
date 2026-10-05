import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { getBookingByReference } from "@/lib/api";
import { formatKr } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tack för din bokning",
  robots: { index: false, follow: false },
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium text-navy">{value}</dd>
    </div>
  );
}

export default async function TackPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const booking = ref ? await getBookingByReference(ref) : null;

  if (!booking) {
    return (
      <Section title="Vi kunde inte hitta bokningen" narrow>
        <p className="mt-4 text-ink-soft">
          Kontrollera länken, eller kontakta oss om du nyss genomförde en bokning och ser det här meddelandet.
        </p>
        <div className="mt-8">
          <ButtonLink href="/boka">Boka flyttstädning</ButtonLink>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Tack för din bokning!" lede="Vi har skickat en bekräftelse till din e-postadress." narrow>
      <p className="mt-2 text-sm text-ink-soft">Bokningsnummer: <span className="font-medium text-navy">{booking.reference}</span></p>

      <dl className="mt-8 max-w-xl divide-y divide-line rounded-2xl border border-line bg-white px-5">
        <Row label="Tjänst" value="Flyttstädning" />
        <Row label="Ort" value={booking.city} />
        <Row label="Bostadsyta" value={`${booking.area} m²`} />
        <Row label="Datum" value={new Date(`${booking.date}T00:00:00`).toLocaleDateString("sv-SE")} />
        <Row label="Tid" value={booking.time} />
        {booking.extras.map((e) => (
          <Row key={e.name} label={e.name} value={formatKr(e.price)} />
        ))}
        <Row label="Pris före RUT" value={formatKr(booking.price_before_rut)} />
        {booking.rut_discount > 0 && <Row label="RUT-avdrag" value={`−${formatKr(booking.rut_discount)}`} />}
      </dl>
      <div className="mt-2 max-w-xl rounded-2xl bg-sage/30 px-5 py-4">
        <div className="flex justify-between text-base font-semibold text-navy">
          <span>Att betala</span>
          <span>{formatKr(booking.total_price)}</span>
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-soft">
        Har du frågor om din bokning? <Link href="/kontakt" className="link-underline font-medium text-moss">Kontakta oss</Link>.
      </p>
    </Section>
  );
}
