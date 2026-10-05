"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  STEP_FIELDS,
  STEP_ORDER,
  bookingSchema,
  defaultBookingValues,
  type BookingFormValues,
} from "@/lib/booking-schema";
import { ApiRequestError, calculatePrice, createBooking } from "@/lib/api";
import type { Extra, PriceCalculation } from "@/lib/types";
import { ProgressSteps } from "./ProgressSteps";
import { StepNav } from "./StepNav";
import { PriceSummaryPanel } from "./PriceSummaryPanel";
import { StepHome } from "./steps/StepHome";
import { StepExtras } from "./steps/StepExtras";
import { StepNotes } from "./steps/StepNotes";
import { StepKeyHandling } from "./steps/StepKeyHandling";
import { StepSchedule } from "./steps/StepSchedule";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";

export function BookingWizard({
  extras,
  keyHandlingOptions,
}: {
  extras: Extra[];
  keyHandlingOptions: { value: string; label: string }[];
}) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceCalculation | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaultBookingValues,
    mode: "onBlur",
  });
  const { handleSubmit, trigger, watch, setError } = methods;

  const area = watch("area");
  const selectedExtras = watch("extras");
  const selfCleaningOven = watch("selfCleaningOven");

  // Live price preview — debounced, and safely ignores out-of-order responses.
  const requestId = useRef(0);
  useEffect(() => {
    if (!area || area < 1) {
      setPrice(null);
      return;
    }
    const id = ++requestId.current;
    const timer = setTimeout(() => {
      setPriceLoading(true);
      setPriceError(null);
      calculatePrice({ area, extras: selectedExtras ?? [], self_cleaning_oven: !!selfCleaningOven })
        .then((result) => {
          if (requestId.current === id) setPrice(result);
        })
        .catch((err: Error) => {
          if (requestId.current === id) {
            setPrice(null);
            setPriceError(err.message);
          }
        })
        .finally(() => {
          if (requestId.current === id) setPriceLoading(false);
        });
    }, 400);
    return () => clearTimeout(timer);
  }, [area, selectedExtras, selfCleaningOven]);

  // stepIndex is always kept in range by goNext/goBack (0..STEP_ORDER.length-1).
  const currentStep = STEP_ORDER[stepIndex] as (typeof STEP_ORDER)[number];
  const isLastStep = stepIndex === STEP_ORDER.length - 1;

  const goNext = useCallback(async () => {
    const fields = STEP_FIELDS[currentStep];
    const valid = await trigger(fields, { shouldFocus: true });
    if (valid) setStepIndex((i) => Math.min(i + 1, STEP_ORDER.length - 1));
  }, [currentStep, trigger]);

  const goBack = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  const submitBooking = handleSubmit(async (values) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = await createBooking({
        area: values.area,
        self_cleaning_oven: values.selfCleaningOven,
        extras: values.extras,
        notes: values.notes ?? "",
        key_handling: values.keyHandling,
        slot_id: values.slotId,
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        email: values.email,
        address: values.address,
        postal_code: values.postalCode,
        city: values.city,
        accepted_terms: values.acceptedTerms,
        website: values.website ?? "",
      });
      router.push(`/tack?ref=${booking.reference}`);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.code === "SLOT_UNAVAILABLE") {
          setSubmitError(err.message);
          setStepIndex(STEP_ORDER.indexOf("schedule"));
        } else if (err.code === "VALIDATION_ERROR" && err.fields) {
          setSubmitError("Kontrollera de markerade uppgifterna och försök igen.");
          for (const [field, messages] of Object.entries(err.fields)) {
            const mapped = FIELD_MAP[field] ?? field;
            const message = Array.isArray(messages) ? String(messages[0]) : String(messages);
            setError(mapped as keyof BookingFormValues, { message });
          }
        } else {
          setSubmitError(err.message || "Vi kunde inte slutföra bokningen. Försök igen.");
        }
      } else {
        setSubmitError("Vi kunde inte slutföra bokningen. Försök igen.");
      }
    } finally {
      setSubmitting(false);
    }
  });

  const handleNext = isLastStep ? submitBooking : goNext;

  return (
    <FormProvider {...methods}>
      {/* The <form> exists so Enter-to-advance works from text fields; step advancement itself
          is always driven by the buttons below, never by native form submission (see StepNav). */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleNext();
        }}
        noValidate
      >
        <div className="container-content py-10">
          <ProgressSteps currentIndex={stepIndex} />

          <div className="mt-8 grid min-w-0 gap-10 lg:grid-cols-[1fr_20rem]">
            {/* min-w-0: grid items default to min-width:auto, so a wide child (the horizontally
                scrollable date-chip strip in StepSchedule) would otherwise force this whole
                column — and the page — wider than the viewport instead of scrolling internally. */}
            <div className="min-h-[22rem] min-w-0">
              {currentStep === "home" && <StepHome />}
              {currentStep === "extras" && <StepExtras extras={extras} />}
              {currentStep === "notes" && <StepNotes />}
              {currentStep === "keyHandling" && <StepKeyHandling options={keyHandlingOptions} />}
              {currentStep === "schedule" && <StepSchedule />}
              {currentStep === "contact" && <StepContact />}
              {currentStep === "summary" && <StepSummary extras={extras} price={price} submitError={submitError} />}

              <StepNav
                isFirst={stepIndex === 0}
                onBack={goBack}
                onNext={() => void handleNext()}
                submitting={submitting}
                nextLabel={isLastStep ? "Bekräfta bokning" : "Nästa"}
              />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <PriceSummaryPanel price={price} loading={priceLoading} error={priceError} />
              </div>
            </aside>
          </div>
        </div>

        {!isLastStep && (
          <div className="sticky bottom-0 z-20 border-t border-line bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
            <div className="container-content !px-0">
              <PriceSummaryPanel price={price} loading={priceLoading} error={priceError} compact />
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

// Maps backend serializer field names (snake_case) to the form's field names (camelCase).
const FIELD_MAP: Record<string, string> = {
  area: "area",
  self_cleaning_oven: "selfCleaningOven",
  extras: "extras",
  notes: "notes",
  key_handling: "keyHandling",
  slot_id: "slotId",
  first_name: "firstName",
  last_name: "lastName",
  phone: "phone",
  email: "email",
  address: "address",
  postal_code: "postalCode",
  city: "city",
  accepted_terms: "acceptedTerms",
};
