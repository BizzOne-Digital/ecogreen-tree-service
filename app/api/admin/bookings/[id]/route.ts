import { NextResponse } from "next/server";
import { getAdminSession, unauthorized } from "@/lib/auth";
import { BOOKING_STATUSES, Booking } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return unauthorized();
  const { status } = await request.json();
  if (!(BOOKING_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
  }
  await connectDB();
  const { id } = await params;
  const booking = await Booking.findByIdAndUpdate(id, { $set: { status } });
  if (!booking) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
