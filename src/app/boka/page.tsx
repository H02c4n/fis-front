import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { getExtras, getSiteConfig } from "@/lib/api";

export const metadata: Metadata = {
  title: "Boka flyttstädning",
  description: "Ange bostadsyta, välj tilläggstjänster och en ledig tid för din flyttstädning.",
  robots: { index: false, follow: true }, // an intermediate booking flow shouldn't be indexed
};

export default async function BokaPage() {
  const [extras, config] = await Promise.all([getExtras(), getSiteConfig()]);

  return <BookingWizard extras={extras} keyHandlingOptions={config.key_handling_options} />;
}
