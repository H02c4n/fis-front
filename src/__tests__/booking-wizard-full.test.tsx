import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookingWizard } from "@/components/booking/BookingWizard";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

global.fetch = vi.fn(async (url: string, opts?: RequestInit) => {
  if (url.includes("/pricing/calculate/")) {
    return new Response(JSON.stringify({ success: true, data: { area: 55, base_price: 3500, extras: [], extras_total: 0, gross_total: 3500, rut_discount: 0, total: 3500, rut_enabled: false } }), { status: 200 });
  }
  if (url.includes("/availability/")) {
    return new Response(JSON.stringify({ success: true, data: { dates: [{ date: "2026-10-10", slots: [{ id: 42, start_time: "08:00", end_time: "12:00" }] }] } }), { status: 200 });
  }
  if (url.includes("/bookings/") && opts?.method === "POST") {
    return new Response(JSON.stringify({ success: true, data: { reference: "FS-TESTTEST" } }), { status: 201 });
  }
  return new Response(JSON.stringify({ success: false, error: { code: "NOT_FOUND", message: "x" } }), { status: 404 });
}) as unknown as typeof fetch;

describe("BookingWizard full flow", () => {
  it("goes through all 7 steps and submits", async () => {
    render(<BookingWizard extras={[]} keyHandlingOptions={[{ value: "HOME", label: "Jag är hemma och öppnar" }]} />);

    // Step 1: Bostad
    fireEvent.change(screen.getByLabelText(/Bostadsyta/), { target: { value: "55" } });
    fireEvent.click(screen.getByRole("button", { name: "Ja" })); // explicitly toggle the boolean both ways
    fireEvent.click(screen.getByRole("button", { name: "Nej" }));
    fireEvent.click(screen.getByRole("button", { name: "Nästa" }));
    await waitFor(() => expect(screen.getByText("Tilläggstjänster")).toBeInTheDocument());

    // Step 2: Tillägg (none available in this test)
    fireEvent.click(screen.getByRole("button", { name: "Nästa" }));
    await waitFor(() => expect(screen.getByText("Övrig information")).toBeInTheDocument());

    // Step 3: Info
    fireEvent.click(screen.getByRole("button", { name: "Nästa" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Nyckelhantering" })).toBeInTheDocument());

    // Step 4: Nyckel
    fireEvent.click(screen.getByLabelText("Jag är hemma och öppnar"));
    fireEvent.click(screen.getByRole("button", { name: "Nästa" }));
    await waitFor(() => expect(screen.getByText("Välj datum och tid")).toBeInTheDocument());

    // Step 5: Tid
    await waitFor(() => expect(screen.getByText("08:00")).toBeInTheDocument());
    fireEvent.click(screen.getByText("08:00"));
    fireEvent.click(screen.getByRole("button", { name: "Nästa" }));
    await waitFor(() => expect(screen.getByText("Dina kontaktuppgifter")).toBeInTheDocument());

    // Step 6: Kontakt
    fireEvent.change(screen.getByLabelText(/Förnamn/), { target: { value: "Anna" } });
    fireEvent.change(screen.getByLabelText(/Efternamn/), { target: { value: "Andersson" } });
    fireEvent.change(screen.getByLabelText(/Telefon/), { target: { value: "0701234567" } });
    fireEvent.change(screen.getByLabelText(/E-post/), { target: { value: "anna@example.com" } });
    fireEvent.change(screen.getByLabelText(/Adress/), { target: { value: "Storgatan 1" } });
    fireEvent.change(screen.getByLabelText(/Postnummer/), { target: { value: "21122" } });
    fireEvent.change(screen.getByLabelText(/Ort/), { target: { value: "Malmö" } });
    fireEvent.click(screen.getByRole("button", { name: "Nästa" }));
    await waitFor(() => expect(screen.getByText("Sammanställning")).toBeInTheDocument());

    // Step 7: Bekräfta
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Bekräfta bokning" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/tack?ref=FS-TESTTEST"));
  });
});
