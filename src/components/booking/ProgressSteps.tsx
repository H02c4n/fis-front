import { STEP_LABELS, STEP_ORDER } from "@/lib/booking-schema";
import clsx from "clsx";

export function ProgressSteps({ currentIndex }: { currentIndex: number }) {
  return (
    <ol className="flex min-w-0 items-center gap-1.5 overflow-x-auto pb-1" aria-label="Bokningssteg">
      {STEP_ORDER.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
        return (
          <li key={step} className="flex shrink-0 items-center gap-1.5">
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={clsx(
                "flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                state === "done" && "bg-moss text-white",
                state === "current" && "bg-sage text-navy",
                state === "upcoming" && "bg-white text-ink-soft border border-line"
              )}
            >
              {state === "done" ? (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span className={clsx("hidden text-xs font-medium sm:inline", state === "current" ? "text-navy" : "text-ink-soft")}>
              {STEP_LABELS[step]}
            </span>
            {i < STEP_ORDER.length - 1 && <span className="mx-1 h-px w-4 bg-line" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
