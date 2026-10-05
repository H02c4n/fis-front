export interface IncludedCategory {
  title: string;
  items: string[];
}

export const INCLUDED: IncludedCategory[] = [
  {
    title: "Alla rum",
    items: [
      "Dammsugning av golv, mattor och trappor",
      "Våttorkning av golv",
      "Fönsterputs, in- och utsida",
      "Dörrar och karmar",
      "Golvlister och foder",
      "Element",
      "Garderober, ur- och avtorkade",
      "Speglar och blanka ytor",
    ],
  },
  {
    title: "Kök",
    items: [
      "Köksskåp, ur- och avtorkade in- och utvändigt",
      "Lådor, ur- och avtorkade",
      "Spis, ovan- och undersida",
      "Ugn, in- och utvändigt",
      "Fläkt och fläktfilter",
      "Kyl och frys, avtorkade in- och utvändigt",
      "Diskbänk och blandare",
      "Bänkskivor",
      "Golv, inklusive bakom vitvaror där det går att komma åt",
    ],
  },
  {
    title: "Badrum",
    items: [
      "WC, in- och utvändigt",
      "Handfat och blandare",
      "Dusch eller badkar",
      "Speglar och skåp",
      "Kakel och våtrumsytor",
      "Golv och golvbrunn",
      "Skåp och hyllor",
    ],
  },
];

export const EXCLUDED = [
  "Nedpackning eller bortforsling av bohag",
  "Tvätt av gardiner, mattor som inte går att dammsuga, eller möbler",
  "Rengöring av vitvaror som inte är kvar i bostaden vid städtillfället",
  "Sanering, skadedjursbekämpning eller borttagning av byggavfall",
  "Städning utomhus utanför de tilläggstjänster som valts (t.ex. altan eller balkong)",
];
