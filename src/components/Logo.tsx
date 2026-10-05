import Link from "next/link";
import { COMPANY_NAME } from "@/lib/constants";

/**
 * Wordmark, not a picture logo — keeps the header lightweight and crisp at any size.
 * The small mark is a corner-sweep: two strokes meeting at a right angle, echoing the
 * room-sweep motif used in the hero. Swap for a real logomark once the company has one.
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-white" : "text-navy";
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${color}`} aria-label={`${COMPANY_NAME} – startsida`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M2 24V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M2 8L24 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="text-lg font-semibold tracking-tight">{COMPANY_NAME}</span>
    </Link>
  );
}
