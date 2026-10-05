"use client";

import { useFormContext } from "react-hook-form";
import { StepShell } from "../StepShell";
import type { BookingFormValues } from "@/lib/booking-schema";
import type { Extra } from "@/lib/types";
import { formatKr } from "@/lib/format";

export function StepExtras({ extras }: { extras: Extra[] }) {
  const { register } = useFormContext<BookingFormValues>();

  if (extras.length === 0) {
    return (
      <StepShell title="Tilläggstjänster" description="Inga tilläggstjänster är tillgängliga just nu — gå vidare till nästa steg." />
    );
  }

  return (
    <StepShell title="Tilläggstjänster" description="Välj det som stämmer för din bostad.">
      <div className="grid gap-3 sm:grid-cols-2">
        {extras.map((extra) => (
          <label
            key={extra.slug}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white p-4 has-[:checked]:border-moss has-[:checked]:bg-sage/30"
          >
            <input
              type="checkbox"
              value={extra.slug}
              className="mt-1 accent-[#2F5233]"
              {...register("extras")}
            />
            <span>
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-medium text-navy">{extra.name}</span>
                <span className="whitespace-nowrap text-sm text-ink-soft">{formatKr(extra.price)}</span>
              </span>
              {extra.description && <span className="mt-1 block text-sm text-ink-soft">{extra.description}</span>}
            </span>
          </label>
        ))}
      </div>
    </StepShell>
  );
}
