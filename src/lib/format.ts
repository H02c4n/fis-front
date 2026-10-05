export function formatKr(value: number): string {
  return new Intl.NumberFormat("sv-SE").format(Math.round(value)) + " kr";
}
