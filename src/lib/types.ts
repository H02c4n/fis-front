export interface City {
  name: string;
  slug: string;
  short_description: string;
  is_indexed?: boolean;
  updated_at?: string;
}

export interface CityFAQ {
  question: string;
  answer: string;
}

export interface CityDetail extends City {
  hero_title: string;
  hero_description: string;
  seo_title: string;
  meta_description: string;
  introduction: string;
  local_content: string;
  cta_text: string;
  faqs: CityFAQ[];
}

export interface PriceTier {
  id?: number;
  label: string;
  min_area?: number;
  max_area?: number | null;
  description?: string;
  from_price: number;
  from_price_after_rut: number | null;
}

export interface Extra {
  slug: string;
  name: string;
  description: string;
  price: number;
  rut_eligible: boolean;
}

export interface SiteConfig {
  company_name: string;
  rut_enabled: boolean;
  min_booking_lead_days: number;
  key_handling_options: { value: string; label: string }[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export interface PriceCalculation {
  area: number;
  base_price: number;
  extras: { slug: string; name: string; price: number; rut_eligible: boolean }[];
  extras_total: number;
  gross_total: number;
  rut_discount: number;
  total: number;
  rut_enabled: boolean;
}

export interface AvailabilityDay {
  date: string;
  slots: { id: number; start_time: string; end_time: string | null }[];
}

export interface AvailabilityResponse {
  dates: AvailabilityDay[];
}

export interface BookingExtraLine {
  name: string;
  price: number;
}

export interface BookingSummary {
  reference: string;
  status: string;
  date: string;
  time: string;
  area: number;
  city: string;
  extras: BookingExtraLine[];
  price_before_rut: number;
  rut_discount: number;
  total_price: number;
}

export interface ApiErrorShape {
  code: string;
  message: string;
  fields?: Record<string, unknown>;
}


export interface ContactInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  website: string; // honeypot, must stay empty
}