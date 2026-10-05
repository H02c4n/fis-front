const STEPS = [
  { title: "Välj bostadens storlek", body: "Ange bostadsyta och eventuella tillägg, så räknar vi ut ett pris direkt." },
  { title: "Välj datum och tid", body: "Du ser lediga tider i kalendern och väljer det som passar din flytt." },
  { title: "Vi tar hand om städningen", body: "Vi utför flyttstädningen enligt checklistan, och du får en bekräftelse." },
];

export function HowItWorks() {
  return (
    <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
      {STEPS.map((step, i) => (
        <li key={step.title} className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-semibold text-navy">
              {i + 1}
            </span>
            {i < STEPS.length - 1 && <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
