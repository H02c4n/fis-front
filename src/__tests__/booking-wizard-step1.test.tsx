import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookingWizard } from "@/components/booking/BookingWizard";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

global.fetch = vi.fn(async (url: string) => {
  if (url.includes("/pricing/calculate/")) {
    return new Response(JSON.stringify({ success: true, data: { area: 55, base_price: 3500, extras: [], extras_total: 0, gross_total: 3500, rut_discount: 0, total: 3500, rut_enabled: false } }), { status: 200 });
  }
  return new Response(JSON.stringify({ success: false, error: { code: "NOT_FOUND", message: "x" } }), { status: 404 });
}) as unknown as typeof fetch;

describe("BookingWizard step 1 -> step 2", () => {
  it("advances to Tilläggstjänster when area is valid and Nästa is clicked", async () => {
    render(<BookingWizard extras={[]} keyHandlingOptions={[{ value: "HOME", label: "Jag är hemma och öppnar" }]} />);

    expect(screen.getByText("Städinformation")).toBeInTheDocument();

    const areaInput = screen.getByLabelText(/Bostadsyta/);
    fireEvent.change(areaInput, { target: { value: "55" } });
    fireEvent.blur(areaInput);

    const nextButton = screen.getByRole("button", { name: "Nästa" });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Tilläggstjänster")).toBeInTheDocument();
    });
  });
});
