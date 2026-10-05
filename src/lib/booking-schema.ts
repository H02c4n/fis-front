import { z } from "zod";

// Mirrors the backend's validation in apps/bookings/serializers.py so the client can show
// errors immediately — but the server is always the final authority on validity and price.
const PHONE_RE = /^\+?[0-9][0-9 \-()]{5,19}$/;
const POSTAL_RE = /^\d{3}\s?\d{2}$/;

export const bookingSchema = z.object({
  // Step 1 – Städinformation
  area: z
    .number({ error: "Ange bostadens yta i kvadratmeter." })
    .int("Ange ett heltal.")
    .min(1, "Ange en yta större än noll.")
    .max(1000, "Kontakta oss för bostäder över 1000 m²."),
  selfCleaningOven: z.boolean(),

  // Step 2 – Tilläggstjänster
  extras: z.array(z.string()),

  // Step 3 – Övrig information
  notes: z.string().max(2000, "Max 2000 tecken."),

  // Step 4 – Nyckelhantering
  keyHandling: z.enum(["HOME", "OFFICE", "ALREADY_LEFT"], {
    error: "Välj hur vi får tillgång till bostaden.",
  }),

  // Step 5 – Datum och tid
  slotId: z.number({ error: "Välj en ledig tid." }).min(1, "Välj en ledig tid."),
  slotDate: z.string(),
  slotTime: z.string(),

  // Step 6 – Kontaktuppgifter
  firstName: z.string().trim().min(1, "Ange förnamn.").max(80),
  lastName: z.string().trim().min(1, "Ange efternamn.").max(80),
  phone: z.string().trim().regex(PHONE_RE, "Ange ett giltigt telefonnummer."),
  email: z.email("Ange en giltig e-postadress."),
  address: z.string().trim().min(1, "Ange adress.").max(200),
  postalCode: z.string().trim().regex(POSTAL_RE, "Ange ett giltigt postnummer (5 siffror)."),
  city: z.string().trim().min(1, "Ange ort.").max(100),

  // Step 7 – Sammanställning
  acceptedTerms: z.literal(true, { error: "Du behöver godkänna villkoren för att boka." }),

  // Honeypot – must stay empty. Real visitors never see or fill this field.
  website: z.string().max(200),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const STEP_FIELDS = {
  home: ["area", "selfCleaningOven"],
  extras: ["extras"],
  notes: ["notes"],
  keyHandling: ["keyHandling"],
  schedule: ["slotId", "slotDate", "slotTime"],
  contact: ["firstName", "lastName", "phone", "email", "address", "postalCode", "city"],
  summary: ["acceptedTerms"],
} as const satisfies Record<string, (keyof BookingFormValues)[]>;

export const STEP_ORDER = Object.keys(STEP_FIELDS) as (keyof typeof STEP_FIELDS)[];

export const STEP_LABELS: Record<(typeof STEP_ORDER)[number], string> = {
  home: "Bostad",
  extras: "Tillägg",
  notes: "Info",
  keyHandling: "Nyckel",
  schedule: "Tid",
  contact: "Kontakt",
  summary: "Bekräfta",
};

export const defaultBookingValues: Partial<BookingFormValues> = {
  selfCleaningOven: false,
  extras: [],
  notes: "",
  website: "",
};
