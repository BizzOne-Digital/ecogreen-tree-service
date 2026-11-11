import { NextResponse } from "next/server";
import type { Model } from "mongoose";
import { Testimonial } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { ipHash, overLimit, text } from "@/lib/publicForm";

export const runtime = "nodejs";

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status });

/** Public review form. Reviews are saved unpublished and only appear once an admin approves them. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail("Invalid form submission");
  if (body.website) return NextResponse.json({ success: true });

  const rating = Math.round(Number(body.rating));
  const data = { customerName: text(body.name, 80), service: text(body.service, 120), review: text(body.review, 1500) };
  if (!data.customerName || data.review.length < 10) return fail("Please add your name and a short review");
  if (!(rating >= 1 && rating <= 5)) return fail("Please choose a star rating");

  try {
    await connectDB();
    const hash = ipHash(request);
    if (await overLimit(Testimonial as unknown as Model<never>, hash)) return fail("Too many reviews sent. Please try again later.", 429);
    await Testimonial.create({ ...data, rating, published: false, order: 999, ipHash: hash });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Review form failed:", error);
    return fail("We could not save your review. Please try again later.", 500);
  }
}
