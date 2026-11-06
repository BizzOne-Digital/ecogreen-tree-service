import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, unauthorized } from "@/lib/auth";
import { CONTENT, defaultContent, isPageKey, type ContentField } from "@/lib/content-schema";
import { cleanupRemovedUploads } from "@/lib/deleteStoredUpload";
import { SiteContent } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await getAdminSession())) return unauthorized();
  const page = new URL(request.url).searchParams.get("page") ?? "";
  if (!isPageKey(page)) return NextResponse.json({ success: false, error: "Unknown page" }, { status: 400 });
  await connectDB();
  const stored = await SiteContent.findOne({ key: page }).lean();
  return NextResponse.json({ success: true, data: { ...defaultContent(page), ...stored?.data } });
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) return unauthorized();
  const { page, data } = await request.json();
  if (typeof page !== "string" || !isPageKey(page) || typeof data !== "object" || !data) {
    return NextResponse.json({ success: false, error: "Invalid content" }, { status: 400 });
  }
  const clean = Object.fromEntries(
    (CONTENT[page].fields as ContentField[]).map((field) => [field.key, String(data[field.key] ?? "")]),
  );
  await connectDB();
  const before = await SiteContent.findOne({ key: page }).lean();
  await SiteContent.updateOne({ key: page }, { $set: { data: clean } }, { upsert: true });
  await cleanupRemovedUploads(before?.data, clean); // only after the save has succeeded
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
