import crypto from "crypto";
import { NextResponse } from "next/server";
import type { Model } from "mongoose";
import { Booking, StoredUpload } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { ipHash, isEmail, isPhone, overLimit, text } from "@/lib/publicForm";
import { MAX_PUBLIC_UPLOAD_BYTES, MIME_EXTENSIONS, matchesSignature } from "@/lib/uploads";

export const runtime = "nodejs";

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Invalid form submission");
  }
  // Honeypot: real visitors never see this field, so report success and drop the bot.
  if (form.get("website")) return NextResponse.json({ success: true });

  const data = {
    fullName: text(form.get("fullName"), 120),
    email: text(form.get("email"), 160),
    phone: text(form.get("phone"), 40),
    service: text(form.get("service"), 120),
    address: text(form.get("address"), 300),
    preferredDate: text(form.get("preferredDate"), 20),
    preferredTime: text(form.get("preferredTime"), 40),
    message: text(form.get("message"), 3000),
  };
  if (!data.fullName || !data.service || !data.address) return fail("Please complete all required fields");
  if (!isEmail(data.email)) return fail("Please enter a valid email address");
  if (!isPhone(data.phone)) return fail("Please enter a valid phone number");
  if (form.get("consent") !== "on") return fail("Please agree to be contacted");

  try {
    await connectDB();
    const hash = ipHash(request);
    if (await overLimit(Booking as unknown as Model<never>, hash)) {
      return fail("Too many requests. Please call us instead.", 429);
    }

    let photoUrl = "";
    const photo = form.get("photo");
    if (photo instanceof File && photo.size > 0) {
      const extension = MIME_EXTENSIONS[photo.type];
      if (!extension) return fail("Photo must be a JPEG, PNG, WebP or GIF image");
      if (photo.size > MAX_PUBLIC_UPLOAD_BYTES) return fail("Photo must be 4MB or smaller", 413);
      const buffer = Buffer.from(await photo.arrayBuffer());
      if (!matchesSignature(buffer, photo.type)) return fail("Photo is not a valid image");
      const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${extension}`;
      // "bookings" is outside the public folder whitelist, so customer photos stay admin-only.
      await StoredUpload.create({ folder: "bookings", filename, mimeType: photo.type, size: buffer.length, data: buffer });
      photoUrl = `/api/admin/booking-photos/${filename}`;
    }

    await Booking.create({ ...data, photoUrl, consent: true, ipHash: hash });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Booking failed:", error);
    return fail("We could not save your request. Please call us.", 500);
  }
}
