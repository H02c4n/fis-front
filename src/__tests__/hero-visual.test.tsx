import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroVisual } from "@/components/HeroVisual";

describe("HeroVisual", () => {
  it("falls back to the SVG illustration if the photo fails to load", () => {
    render(<HeroVisual src="/images/hero.jpg" alt="Test" />);
    expect(screen.getByAltText("Test")).toBeInTheDocument();

    fireEvent.error(screen.getByAltText("Test"));

    expect(screen.queryByAltText("Test")).not.toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
