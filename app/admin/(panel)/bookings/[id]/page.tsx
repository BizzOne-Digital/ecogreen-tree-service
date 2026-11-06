import Link from "next/link";
import { isValidObjectId } from "mongoose";
import { notFound, redirect } from "next/navigation";
import BookingStatusSelect from "@/components/admin/BookingStatusSelect";
import { getAdminSession } from "@/lib/auth";
import { Booking } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) redirect("/admin/login");
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();
  await connectDB();
  const booking = (await Booking.findById(id).lean()) as Record<string, unknown> | null;
  if (!booking) notFound();

  const details: [string, string][] = [
    ["Phone", booking.phone as string], ["Email", booking.email as string], ["Service", booking.service as string],
    ["Address", booking.address as string], ["Preferred date", (booking.preferredDate as string) || "Any"],
    ["Preferred time", (booking.preferredTime as string) || "Any"],
    ["Submitted", new Date(booking.createdAt as unknown as string).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })],
  ];
  return (
    <div className="max-w-3xl">
      <Link href="/admin/bookings" className="text-sm font-semibold text-leaf hover:underline">Back to bookings</Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-forest-950">{booking.fullName as string}</h1>
        <BookingStatusSelect id={id} status={booking.status as string} />
      </div>
      <dl className="mt-5 grid gap-4 rounded-xl bg-white p-5 shadow-sm sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label}><dt className="text-sm font-semibold text-gray-500">{label}</dt><dd className="break-words font-medium">{value}</dd></div>
        ))}
        <div className="sm:col-span-2"><dt className="text-sm font-semibold text-gray-500">Message</dt><dd className="whitespace-pre-line">{(booking.message as string) || "None"}</dd></div>
      </dl>
      {booking.photoUrl ? (
        // Admin-only route: next/image's optimizer can't forward the session cookie.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={booking.photoUrl as string} alt="Customer upload" className="mt-5 max-h-[32rem] rounded-xl" />
      ) : null}
    </div>
  );
}
