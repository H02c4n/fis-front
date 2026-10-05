"use client";

import { useState } from "react";

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-10 divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium text-navy">{item.question}</span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                  className={`shrink-0 transition-transform ${open ? "rotate-45" : ""}`}
                >
                  <path d="M7 1v12M1 7h12" stroke="#2F5233" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            {open && <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-soft">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
