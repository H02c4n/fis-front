import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY_NAME} | Flyttstädning i Skåne`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: "Professionell flyttstädning i Skåne. Enkel bokning, kvalitetsgaranti och möjlighet till RUT-avdrag.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: COMPANY_NAME,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={sora.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Hoppa till innehåll
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
