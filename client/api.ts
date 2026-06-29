import type { Slot, Booking } from "./types";

export async function fetchSlots(): Promise<Slot[]> {
  const r = await fetch("/api/slots");
  const data = await r.json();
  return data.slots;
}

export async function createBooking(input: {
  slotId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}): Promise<Booking> {
  const r = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error ?? "booking failed");
  }
  return r.json();
}

const OFFICE_TIMEZONE = "America/Argentina/Buenos_Aires";

export function formatSlot(startsAtIso: string): string {
  return new Date(startsAtIso).toLocaleString("en-US", {
    timeZone: OFFICE_TIMEZONE,
    dateStyle: "medium",
    timeStyle: "short",
  });
}
