import { NextResponse } from "next/server";
import { getAdminSession, unauthorized } from "@/lib/auth";
import { ContactInquiry } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  if (!(await getAdminSession())) return unauthorized();
  const { read } = await request.json();
  await connectDB();
  await ContactInquiry.findByIdAndUpdate((await params).id, { $set: { read: Boolean(read) } });
  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await getAdminSession())) return unauthorized();
  await connectDB();
  await ContactInquiry.findByIdAndDelete((await params).id);
  return NextResponse.json({ success: true });
}
