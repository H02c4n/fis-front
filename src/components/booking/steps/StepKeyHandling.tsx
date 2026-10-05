"use client";

import { useFormContext } from "react-hook-form";
import { StepShell } from "../StepShell";
import type { BookingFormValues } from "@/lib/booking-schema";

export function StepKeyHandling({ options }: { options: { value: string; label: string }[] }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormValues>();

  return (
    <StepShell title="Nyckelhantering" description="Hur vill du att vi får tillgång till bostaden?">
      <fieldset className="max-w-md space-y-3">
        <legend className="sr-only">Nyckelhantering</legend>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white p-4 has-[:checked]:border-moss has-[:checked]:bg-sage/30"
          >
            <input type="radio" value={option.value} className="accent-[#2F5233]" {...register("keyHandling")} />
            {option.label}
          </label>
        ))}
      </fieldset>
      {errors.keyHandling && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {errors.keyHandling.message}
        </p>
      )}
    </StepShell>
  );
}
