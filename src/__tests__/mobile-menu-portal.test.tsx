import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header";

describe("MobileMenu", () => {
  it("portals its panel to document.body, not inside the blurred <header>", () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText("Öppna meny"));

    const panel = screen.getByRole("dialog", { name: "Meny" });
    expect(panel).toBeInTheDocument();

    // The bug: without the portal, this panel ends up nested inside <header>, whose
    // backdrop-blur creates a containing block that breaks `position: fixed`.
    const headerEl = document.querySelector("header");
    expect(headerEl?.contains(panel)).toBe(false);
    expect(panel.parentElement).toBe(document.body);
  });
});
