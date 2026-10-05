// Central place for copy that appears in more than one component.
// COMPANY_NAME and contact details are placeholders — replace with the real business details before launch.
export const COMPANY_NAME = "Flyttstäd i Skåne";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const NAV_LINKS = [
  { href: "/", label: "Hem" },
  { href: "/flyttstadning", label: "Flyttstädning" },
  { href: "/vad-ingar", label: "Vad ingår?" },
  { href: "/priser", label: "Priser" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const TRUST_POINTS = ["Kvalitetsgaranti", "RUT-avdrag", "Fönsterputs ingår"] as const;

// Used only if the API is unreachable, so the site still renders something useful in dev/offline.
export const FALLBACK_CITIES = [
  { name: "Malmö", slug: "malmo" },
  { name: "Lund", slug: "lund" },
  { name: "Helsingborg", slug: "helsingborg" },
  { name: "Kristianstad", slug: "kristianstad" },
  { name: "Ystad", slug: "ystad" },
  { name: "Trelleborg", slug: "trelleborg" },
  { name: "Landskrona", slug: "landskrona" },
  { name: "Ängelholm", slug: "angelholm" },
  { name: "Hässleholm", slug: "hassleholm" },
  { name: "Eslöv", slug: "eslov" },
  { name: "Vellinge", slug: "vellinge" },
  { name: "Höganäs", slug: "hoganas" },
  { name: "Staffanstorp", slug: "staffanstorp" },
  { name: "Lomma", slug: "lomma" },
  { name: "Kävlinge", slug: "kavlinge" },
  { name: "Svedala", slug: "svedala" },
  { name: "Simrishamn", slug: "simrishamn" },
  { name: "Båstad", slug: "bastad" },
];

export const FALLBACK_PRICE_TIERS = [
  { label: "0–49 m²", from_price: 2500, from_price_after_rut: null as number | null },
  { label: "50–74 m²", from_price: 3500, from_price_after_rut: null },
  { label: "75–99 m²", from_price: 4075, from_price_after_rut: null },
  { label: "100–199 m²", from_price: 4900, from_price_after_rut: null },
  { label: "200+ m²", from_price: 8900, from_price_after_rut: null },
];
