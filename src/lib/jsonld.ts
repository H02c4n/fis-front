import { COMPANY_NAME, SITE_URL } from "./constants";

/**
 * JSON-LD builders. Deliberately do NOT include ratings, review counts, awards,
 * a street address, or a phone number — none of that is real data yet.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_NAME,
    url: SITE_URL,
    areaServed: { "@type": "AdministrativeArea", name: "Skåne, Sverige" },
    priceRange: "$$",
  };
}

export function serviceJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Flyttstädning",
    name,
    description,
    url,
    areaServed: { "@type": "AdministrativeArea", name: "Skåne, Sverige" },
    provider: { "@type": "LocalBusiness", name: COMPANY_NAME },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
