export function StepNav({
  onBack,
  onNext,
  backLabel = "Tillbaka",
  nextLabel = "Nästa",
  submitting = false,
  isFirst = false,
}: {
  onBack?: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  submitting?: boolean;
  isFirst?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
      {!isFirst ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-navy/20 px-5 py-3 text-sm font-medium text-navy transition-colors hover:border-navy"
        >
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      {/* type="button": advancing steps must never trigger RHF's full-schema submit validation,
          which would fail on fields from later steps the person hasn't reached yet. */}
      <button
        type="button"
        onClick={onNext}
        disabled={submitting}
        className="rounded-full bg-sage px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Skickar…" : nextLabel}
      </button>
    </div>
  );
}
