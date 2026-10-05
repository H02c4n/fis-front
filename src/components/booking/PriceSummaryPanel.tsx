"use client";

import { formatKr } from "@/lib/format";
import type { PriceCalculation } from "@/lib/types";

export function PriceSummaryPanel({
  price,
  loading,
  error,
  compact = false,
}: {
  price: PriceCalculation | null;
  loading: boolean;
  error: string | null;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-soft">Uppskattat pris</p>
          <p className="text-lg font-semibold text-navy">
            {loading ? "Beräknar…" : price ? formatKr(price.total) : error ? "–" : "–"}
          </p>
        </div>
        {price?.rut_enabled && price.rut_discount > 0 && (
          <p className="text-right text-xs text-ink-soft">
            Efter RUT-avdrag på {formatKr(price.rut_discount)}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="text-sm font-medium text-ink-soft">Sammanställning</h2>
      <p className="mt-1 text-3xl font-semibold text-navy">
        {loading ? "…" : price ? formatKr(price.total) : "–"}
      </p>

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      {price && !error && (
        <dl className="mt-6 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Grundpris ({price.area} m²)</dt>
            <dd className="text-ink">{formatKr(price.base_price)}</dd>
          </div>
          {price.extras.map((e) => (
            <div key={e.slug} className="flex justify-between">
              <dt className="text-ink-soft">{e.name}</dt>
              <dd className="text-ink">{formatKr(e.price)}</dd>
            </div>
          ))}
          <div className="flex justify-between border-t border-line pt-2.5 font-medium text-navy">
            <dt>Pris före RUT</dt>
            <dd>{formatKr(price.gross_total)}</dd>
          </div>
          {price.rut_enabled && (
            <div className="flex justify-between text-moss">
              <dt>RUT-avdrag</dt>
              <dd>−{formatKr(price.rut_discount)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-2.5 text-base font-semibold text-navy">
            <dt>Att betala</dt>
            <dd>{formatKr(price.total)}</dd>
          </div>
        </dl>
      )}

      <p className="mt-6 text-xs leading-relaxed text-ink-soft">
        Priset uppdateras när du ändrar bostadsyta eller tillägg. Det slutgiltiga priset bekräftas i sista steget.
      </p>
    </div>
  );
}
