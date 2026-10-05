"use client";

import { useFormContext } from "react-hook-form";
import { StepShell } from "../StepShell";
import type { BookingFormValues } from "@/lib/booking-schema";

export function StepNotes() {
  const { register } = useFormContext<BookingFormValues>();

  return (
    <StepShell title="Övrig information" description="Är det något mer vi behöver veta inför städningen?">
      <textarea
        rows={6}
        maxLength={2000}
        placeholder="T.ex. portkod, parkering eller andra detaljer som kan vara bra att veta."
        className="w-full max-w-xl rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-moss"
        {...register("notes")}
      />
    </StepShell>
  );
}
