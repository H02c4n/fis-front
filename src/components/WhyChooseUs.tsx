const POINTS = [
  {
    title: "Kvalitetsgaranti",
    body: "Är något inte godkänt vid besiktning åtgärdar vi det utan extra kostnad inom två dygn.",
  },
  {
    title: "RUT-avdrag",
    body: "Du ser priset både före och efter avdrag innan du bekräftar din bokning.",
  },
  {
    title: "Enkel bokning",
    body: "Ange bostadsyta, välj tillägg och tid – du får ett pris direkt, utan hembesök.",
  },
  {
    title: "Noggrann städning",
    body: "Fönsterputs, kök och badrum ingår alltid enligt en tydlig checklista.",
  },
];

export function WhyChooseUs() {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {POINTS.map((point) => (
        <div key={point.title} className="bg-white p-7">
          <h3 className="text-base font-semibold text-navy">{point.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{point.body}</p>
        </div>
      ))}
    </div>
  );
}
