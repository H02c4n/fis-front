import { API_URL, FALLBACK_CITIES, FALLBACK_PRICE_TIERS } from "./constants";
import type {
  ApiEnvelope,
  ApiErrorShape,
  AvailabilityResponse,
  BookingSummary,
  City,
  CityDetail,
  Extra,
  PriceCalculation,
  PriceTier,
  SiteConfig,
  ContactInput,
} from "./types";

/** Thrown for any non-2xx API response so callers can branch on `.code` / `.fields`. */
export class ApiRequestError extends Error {
  code: string;
  fields?: Record<string, unknown>;
  status: number;

  constructor(error: ApiErrorShape, status: number) {
    super(error.message);
    this.code = error.code;
    this.fields = error.fields;
    this.status = status;
  }
}

/** For POST calls where a failure must surface to the caller instead of failing soft. */
async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiRequestError(
      { code: "NETWORK_ERROR", message: "Det gick inte att nå servern. Kontrollera din internetanslutning och försök igen." },
      0
    );
  }
  let json: ApiEnvelope<T> & { error?: ApiErrorShape };
  try {
    json = await res.json();
  } catch {
    throw new ApiRequestError({ code: "INTERNAL_ERROR", message: "Något gick fel. Försök igen." }, res.status);
  }
  if (!res.ok || !json.success) {
    throw new ApiRequestError(
      json.error ?? { code: "INTERNAL_ERROR", message: "Något gick fel. Försök igen." },
      res.status
    );
  }
  return json.data;
}

/**
 * Thin fetch wrapper around the Django API.
 * Every function fails soft (returns a sensible fallback) so the site keeps working
 * for content editors and in local development even if the backend is unreachable.
 * `revalidate` follows Next.js's data cache: short for anything price/availability related,
 * longer for editorial content such as city pages.
 */
async function apiGet<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    const json: ApiEnvelope<T> = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function getCities(): Promise<City[]> {
  const data = await apiGet<City[]>("/cities/", 300);
  return data ?? FALLBACK_CITIES.map((c) => ({ ...c, short_description: "" }));
}

export async function getCity(slug: string): Promise<CityDetail | null> {
  return apiGet<CityDetail>(`/cities/${slug}/`, 300);
}

export async function getPriceTiers(): Promise<{ rules: PriceTier[]; rutEnabled: boolean }> {
  const data = await apiGet<{ rules: PriceTier[]; rut_enabled: boolean }>("/prices/", 120);
  if (!data) return { rules: FALLBACK_PRICE_TIERS, rutEnabled: false };
  return { rules: data.rules, rutEnabled: data.rut_enabled };
}

export async function getExtras(): Promise<Extra[]> {
  return (await apiGet<Extra[]>("/extras/", 120)) ?? [];
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const data = await apiGet<SiteConfig>("/config/", 120);
  return (
    data ?? {
      company_name: "COMPANY_NAME",
      rut_enabled: false,
      min_booking_lead_days: 2,
      key_handling_options: [
        { value: "HOME", label: "Jag är hemma och öppnar" },
        { value: "ALREADY_LEFT", label: "Jag har redan lämnat mina nycklar" },
      ],
    }
  );
}

export async function calculatePrice(input: {
  area: number;
  extras: string[];
  self_cleaning_oven: boolean;
}): Promise<PriceCalculation> {
  return apiPost<PriceCalculation>("/pricing/calculate/", input);
}

export async function getAvailability(from: string, to: string): Promise<AvailabilityResponse> {
  try {
    const res = await fetch(`${API_URL}/availability/?from=${from}&to=${to}`, { cache: "no-store" });
    const json: ApiEnvelope<AvailabilityResponse> = await res.json();
    if (!res.ok || !json.success) {
      throw new ApiRequestError(
        { code: "AVAILABILITY_ERROR", message: "Det gick inte att hämta lediga tider just nu. Försök igen." },
        res.status
      );
    }
    return json.data;
  } catch (err) {
    if (err instanceof ApiRequestError) throw err;
    throw new ApiRequestError(
      { code: "AVAILABILITY_ERROR", message: "Det gick inte att hämta lediga tider just nu. Försök igen." },
      0
    );
  }
}

export interface CreateBookingInput {
  area: number;
  self_cleaning_oven: boolean;
  extras: string[];
  notes: string;
  key_handling: string;
  slot_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  postal_code: string;
  city: string;
  accepted_terms: boolean;
  website: string;
}

export async function createBooking(input: CreateBookingInput): Promise<BookingSummary> {
  return apiPost<BookingSummary>("/bookings/", input);
}

export async function getBookingByReference(reference: string): Promise<BookingSummary | null> {
  try {
    const res = await fetch(`${API_URL}/bookings/${reference}/`, { cache: "no-store" });
    if (!res.ok) return null;
    const json: ApiEnvelope<BookingSummary> = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}



export async function sendContactMessage(input: ContactInput): Promise<{ received: boolean }> {
  return apiPost<{ received: boolean }>("/contact/", input);
}
