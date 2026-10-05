"use client";

import { useFormContext } from "react-hook-form";
import { StepShell } from "../StepShell";
import type { BookingFormValues } from "@/lib/booking-schema";
import type { Extra, PriceCalculation } from "@/lib/types";
import { formatKr } from "@/lib/format";

const KEY_HANDLING_LABELS: Record<string, string> = {
  HOME: "Jag är hemma och öppnar",
  OFFICE: "Nyckel lämnas på kontor",
  ALREADY_LEFT: "Nycklar redan lämnade",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium text-navy">{value}</dd>
    </div>
  );
}

export function StepSummary({ extras, price, submitError }: { extras: Extra[]; price: PriceCalculation | null; submitError: string | null }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BookingFormValues>();
  const values = watch();
  const extrasByName = values.extras.map((slug) => extras.find((e) => e.slug === slug)?.name ?? slug);

  return (
    <StepShell title="Sammanställning" description="Kontrollera att allt stämmer innan du bekräftar bokningen.">
      <dl className="max-w-xl divide-y divide-line rounded-2xl border border-line bg-white px-5">
        <Row label="Tjänst" value="Flyttstädning" />
        <Row label="Bostadsyta" value={`${values.area} m²`} />
        <Row label="Tillägg" value={extrasByName.length ? extrasByName.join(", ") : "Inga"} />
        <Row label="Nyckelhantering" value={KEY_HANDLING_LABELS[values.keyHandling] ?? values.keyHandling} />
        <Row label="Datum" value={values.slotDate ? new Date(`${values.slotDate}T00:00:00`).toLocaleDateString("sv-SE") : "–"} />
        <Row label="Tid" value={values.slotTime || "–"} />
        <Row label="Namn" value={`${values.firstName} ${values.lastName}`} />
        <Row label="E-post" value={values.email} />
        <Row label="Adress" value={`${values.address}, ${values.postalCode} ${values.city}`} />
      </dl>

      {price && (
        <dl className="mt-6 max-w-xl divide-y divide-line rounded-2xl border border-line bg-sage/20 px-5">
          <Row label="Pris före RUT" value={formatKr(price.gross_total)} />
          {price.rut_enabled && <Row label="RUT-avdrag" value={`−${formatKr(price.rut_discount)}`} />}
          <div className="flex justify-between gap-4 py-3 text-base font-semibold text-navy">
            <dt>Att betala</dt>
            <dd>{formatKr(price.total)}</dd>
          </div>
        </dl>
      )}

      <label className="mt-6 flex max-w-xl cursor-pointer items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" className="mt-0.5 accent-[#2F5233]" {...register("acceptedTerms")} />
        Jag godkänner villkoren för bokningen och att mina uppgifter behandlas för att kunna genomföra flyttstädningen.
      </label>
      {errors.acceptedTerms && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {errors.acceptedTerms.message}
        </p>
      )}

      {submitError && (
        <div className="mt-6 max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          {submitError}
        </div>
      )}
    </StepShell>
  );
}
