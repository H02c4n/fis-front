/**
 * Original line-art hero graphic: an empty room mid-sweep, seen from above at an angle —
 * a floor-plan corner, a window cross, and a single curved broom stroke clearing the floor.
 * Deliberately not photography: it is a distinct, ownable mark for a company that only does
 * one thing (move-out cleaning) and avoids any resemblance to stock "cleaning" imagery.
 */
export function RoomMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 480" fill="none" className={className} aria-hidden="true">
      <rect x="24" y="24" width="432" height="432" rx="4" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5" />
      {/* room corner */}
      <path d="M64 416V96h280" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* window */}
      <rect x="288" y="96" width="104" height="88" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M340 96v88M288 140h104" stroke="currentColor" strokeWidth="1.5" />
      {/* broom sweep arc, clearing the floor */}
      <path
        d="M96 400C160 340 220 340 300 380"
        stroke="var(--color-sage-deep, #cfe6ac)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M96 400c24-40 60-64 96-74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* three light strokes = clean floor */}
      <path d="M120 430h60M200 438h84M300 428h48" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
