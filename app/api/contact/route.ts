import { NextResponse } from "next/server";
import type { Model } from "mongoose";
import { ContactInquiry } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { ipHash, isEmail, overLimit, text } from "@/lib/publicForm";

export const runtime = "nodejs";

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail("Invalid form submission");
  if (body.website) return NextResponse.json({ success: true });

  const data = {
    name: text(body.name, 120),
    phone: text(body.phone, 40),
    email: text(body.email, 160),
    service: text(body.service, 120),
    message: text(body.message, 3000),
  };
  if (!data.name || !data.message) return fail("Please complete all required fields");
  if (!isEmail(data.email)) return fail("Please enter a valid email address");

  try {
    await connectDB();
    const hash = ipHash(request);
    if (await overLimit(ContactInquiry as unknown as Model<never>, hash)) {
      return fail("Too many messages. Please call us instead.", 429);
    }
    await ContactInquiry.create({ ...data, ipHash: hash });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form failed:", error);
    return fail("We could not send your message. Please call us.", 500);
  }
}
