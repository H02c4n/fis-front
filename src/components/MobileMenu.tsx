"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  // Portals require a browser document; this flips true after the first client render so
  // server-rendered HTML (which has no document) and the client's first paint stay identical.
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const panel = open && (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Meny"
      className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 bg-sand px-6 py-8"
    >
      <nav className="flex flex-col gap-1" aria-label="Mobilmeny">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="border-b border-line py-4 text-lg font-medium text-navy"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/boka"
        onClick={() => setOpen(false)}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-sage px-6 py-3.5 font-medium text-navy"
      >
        Boka nu
      </Link>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-navy/15"
        aria-label={open ? "Stäng meny" : "Öppna meny"}
      >
        <span className={`h-[1.5px] w-5 bg-navy transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
        <span className={`h-[1.5px] w-5 bg-navy transition-opacity ${open ? "opacity-0" : ""}`} />
        <span className={`h-[1.5px] w-5 bg-navy transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
      </button>

      {/*
        Portaled straight to document.body, deliberately NOT nested under <header>. The header
        uses backdrop-blur (CSS backdrop-filter), and per spec, filter/backdrop-filter on an
        ancestor creates a new containing block for position:fixed descendants — so without the
        portal, this "fixed full-screen" panel was actually positioned relative to the ~72px-tall
        header box instead of the viewport, which is what caused the menu to render squashed and
        overlapping the page content behind it instead of covering the screen.
      */}
      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
