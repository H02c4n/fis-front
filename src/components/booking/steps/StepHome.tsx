"use client";

import { Controller, useFormContext } from "react-hook-form";
import { StepShell } from "../StepShell";
import type { BookingFormValues } from "@/lib/booking-schema";
import clsx from "clsx";

export function StepHome() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BookingFormValues>();

  return (
    <StepShell title="Städinformation" description="Berätta om bostaden som ska flyttstädas.">
      <div className="max-w-sm">
        <label htmlFor="area" className="block text-sm font-medium text-navy">
          Bostadsyta (m²) *
        </label>
        <input
          id="area"
          type="number"
          inputMode="numeric"
          min={1}
          max={1000}
          className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-moss"
          aria-invalid={!!errors.area}
          aria-describedby={errors.area ? "area-error" : undefined}
          {...register("area", { valueAsNumber: true })}
        />
        {errors.area && (
          <p id="area-error" className="mt-2 text-sm text-red-700" role="alert">
            {errors.area.message}
          </p>
        )}
      </div>

      {/*
        Fully controlled (not native defaultChecked radios): a field the user never touches must
        still read back as the real boolean from defaultValues. An uncontrolled radio pair with
        setValueAs only converts "yes"/"no" -> boolean on a user-triggered change event — if the
        person leaves the pre-selected "Nej" untouched, RHF reads the raw DOM value ("no") instead,
        which fails z.boolean() validation and silently blocks the "Nästa" button. Controller avoids
        that entirely: the field's value is always the real boolean, from first render onward.
      */}
      <fieldset className="mt-8">
        <legend className="text-sm font-medium text-navy">Har din bostad en självrengörande ugn?</legend>
        <Controller
          control={control}
          name="selfCleaningOven"
          render={({ field }) => (
            <div className="mt-3 flex gap-3">
              {([
                { value: true, label: "Ja" },
                { value: false, label: "Nej" },
              ] as const).map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  aria-pressed={field.value === option.value}
                  className={clsx(
                    "flex items-center gap-2 rounded-xl border px-4 py-3",
                    field.value === option.value ? "border-moss bg-sage/40" : "border-line bg-white"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "flex h-4 w-4 items-center justify-center rounded-full border",
                      field.value === option.value ? "border-moss" : "border-line"
                    )}
                  >
                    {field.value === option.value && <span className="h-2 w-2 rounded-full bg-moss" />}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          )}
        />
      </fieldset>
    </StepShell>
  );
}
