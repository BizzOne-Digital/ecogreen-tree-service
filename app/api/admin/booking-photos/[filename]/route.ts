import { getAdminSession, unauthorized } from "@/lib/auth";
import { StoredUpload } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { isSafeFilename, toBytes } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  if (!(await getAdminSession())) return unauthorized();
  const { filename } = await params;
  if (!isSafeFilename(filename)) return new Response("Invalid path", { status: 400 });
  await connectDB();
  const upload = await StoredUpload.findOne({ folder: "bookings", filename }).lean();
  if (!upload) return new Response("Not found", { status: 404 });
  return new Response(toBytes(upload.data), {
    headers: { "Content-Type": upload.mimeType, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" },
  });
}
