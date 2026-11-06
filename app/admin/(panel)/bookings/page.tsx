import Link from "next/link";
import { redirect } from "next/navigation";
import AdminTable, { type Column } from "@/components/admin/AdminTable";
import BookingStatusSelect from "@/components/admin/BookingStatusSelect";
import { getAdminSession } from "@/lib/auth";
import { Booking } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";

type Row = { _id: string; fullName: string; phone: string; email: string; service: string; preferredDate: string; status: string; createdAt: string };

export default async function BookingsPage() {
  if (!(await getAdminSession())) redirect("/admin/login");
  await connectDB();
  const rows: Row[] = JSON.parse(JSON.stringify(await Booking.find().sort({ createdAt: -1 }).limit(500).lean()));
  const columns: Column<Row>[] = [
    { header: "Customer", cell: (r) => <Link href={`/admin/bookings/${r._id}`} className="font-bold text-leaf hover:underline">{r.fullName}</Link> },
    { header: "Phone", cell: (r) => r.phone },
    { header: "Email", cell: (r) => r.email },
    { header: "Service", cell: (r) => r.service },
    { header: "Date", cell: (r) => r.preferredDate || "Any" },
    { header: "Status", cell: (r) => <BookingStatusSelect id={r._id} status={r.status} /> },
    { header: "Created At", cell: (r) => new Date(r.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) },
  ];
  return (
    <div>
      <h1 className="mb-5 text-2xl font-extrabold text-forest-950">Bookings</h1>
      <AdminTable columns={columns} rows={rows} empty="No booking requests yet." />
    </div>
  );
}
