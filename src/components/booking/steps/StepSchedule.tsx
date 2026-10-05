"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StepShell } from "../StepShell";
import type { BookingFormValues } from "@/lib/booking-schema";
import type { AvailabilityDay } from "@/lib/types";
import { getAvailability } from "@/lib/api";
import clsx from "clsx";

const WEEKDAYS_SHORT = ["sön", "mån", "tis", "ons", "tors", "fre", "lör"];

function formatDateLabel(iso: string): { weekday: string; day: string; month: string } {
  const date = new Date(`${iso}T00:00:00`);
  return {
    weekday: WEEKDAYS_SHORT[date.getDay()] ?? "",
    day: String(date.getDate()),
    month: date.toLocaleDateString("sv-SE", { month: "short" }),
  };
}

export function StepSchedule() {
  const { setValue, watch, formState: { errors } } = useFormContext<BookingFormValues>();
  const slotId = watch("slotId");

  const [days, setDays] = useState<AvailabilityDay[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const today = new Date();
    const from = today.toISOString().slice(0, 10);
    const toDate = new Date(today);
    toDate.setDate(toDate.getDate() + 60);
    const to = toDate.toISOString().slice(0, 10);

    setLoading(true);
    setError(null);
    getAvailability(from, to)
      .then((data) => {
        if (cancelled) return;
        setDays(data.dates);
        setSelectedDate(data.dates[0]?.date ?? null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeDay = days?.find((d) => d.date === selectedDate);

  return (
    <StepShell title="Välj datum och tid" description="Vi visar bara tider som faktiskt är lediga.">
      {loading && <p className="text-ink-soft">Hämtar lediga tider…</p>}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {!loading && !error && days && days.length === 0 && (
        <p className="text-ink-soft">Vi hittade inga lediga tider just nu. Kontakta oss så hjälper vi dig.</p>
      )}

      {!loading && !error && days && days.length > 0 && (
        <>
          <div className="flex min-w-0 gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Välj datum">
            {days.map((day) => {
              const { weekday, day: dayNum, month } = formatDateLabel(day.date);
              const active = day.date === selectedDate;
              return (
                <button
                  key={day.date}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedDate(day.date)}
                  className={clsx(
                    "flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 text-sm",
                    active ? "border-moss bg-sage/40 text-navy" : "border-line bg-white text-ink-soft hover:border-navy/30"
                  )}
                >
                  <span className="capitalize">{weekday}</span>
                  <span className="text-base font-semibold text-navy">{dayNum}</span>
                  <span className="capitalize">{month}</span>
                </button>
              );
            })}
          </div>

          {activeDay && (
            <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {activeDay.slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => {
                    setValue("slotId", slot.id, { shouldValidate: true });
                    setValue("slotDate", activeDay.date);
                    setValue("slotTime", slot.start_time);
                  }}
                  className={clsx(
                    "rounded-xl border px-3 py-2.5 text-sm font-medium",
                    slotId === slot.id ? "border-moss bg-moss text-white" : "border-line bg-white text-navy hover:border-moss"
                  )}
                >
                  {slot.start_time}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {errors.slotId && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {errors.slotId.message}
        </p>
      )}
    </StepShell>
  );
}
