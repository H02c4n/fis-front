"use client";

import { useFormContext } from "react-hook-form";
import { StepShell } from "../StepShell";
import type { BookingFormValues } from "@/lib/booking-schema";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-moss";

export function StepContact() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormValues>();

  return (
    <StepShell title="Dina kontaktuppgifter" description="Vi använder de här uppgifterna för att bekräfta bokningen.">
      <div className="grid max-w-xl gap-5 sm:grid-cols-2">
        <Field id="firstName" label="Förnamn *" error={errors.firstName?.message}>
          <input id="firstName" autoComplete="given-name" className={inputClass} {...register("firstName")} />
        </Field>
        <Field id="lastName" label="Efternamn *" error={errors.lastName?.message}>
          <input id="lastName" autoComplete="family-name" className={inputClass} {...register("lastName")} />
        </Field>
        <Field id="phone" label="Telefon *" error={errors.phone?.message}>
          <input id="phone" type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
        </Field>
        <Field id="email" label="E-post *" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" className={inputClass} {...register("email")} />
        </Field>
        <Field id="address" label="Adress *" error={errors.address?.message}>
          <input id="address" autoComplete="street-address" className={inputClass} {...register("address")} />
        </Field>
        <Field id="postalCode" label="Postnummer *" error={errors.postalCode?.message}>
          <input id="postalCode" autoComplete="postal-code" inputMode="numeric" className={inputClass} {...register("postalCode")} />
        </Field>
        <Field id="city" label="Ort *" error={errors.city?.message}>
          <input id="city" autoComplete="address-level2" className={inputClass} {...register("city")} />
        </Field>
      </div>

      {/* Honeypot: hidden from sighted users and screen readers, never filled in by a real visitor. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Lämna det här fältet tomt</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
    </StepShell>
  );
}
