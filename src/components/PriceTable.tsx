import { formatKr } from "@/lib/format";
import type { PriceTier } from "@/lib/types";

export function PriceTable({ tiers, rutEnabled }: { tiers: PriceTier[]; rutEnabled: boolean }) {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Prisnivåer för flyttstädning per bostadsyta</caption>
        <thead>
          <tr className="border-b border-line text-ink-soft">
            <th scope="col" className="px-6 py-4 font-medium">Bostadsyta</th>
            <th scope="col" className="px-6 py-4 font-medium">Pris från</th>
            {rutEnabled && <th scope="col" className="px-6 py-4 font-medium">Från, efter RUT</th>}
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.label} className="border-b border-line last:border-0">
              <td className="px-6 py-4 font-medium text-navy">{tier.label}</td>
              <td className="px-6 py-4">{formatKr(tier.from_price)}</td>
              {rutEnabled && (
                <td className="px-6 py-4">
                  {tier.from_price_after_rut != null ? formatKr(tier.from_price_after_rut) : "–"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line px-6 py-4 text-xs leading-relaxed text-ink-soft">
        Slutgiltigt pris beräknas utifrån exakt bostadsyta och valda tilläggstjänster när du bokar.
        {rutEnabled ? " RUT-avdraget dras automatiskt på slutpriset." : ""}
      </p>
    </div>
  );
}
