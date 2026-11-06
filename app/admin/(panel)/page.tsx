import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { Booking, ContactInquiry, Service, StoredUpload, TeamMember, Testimonial } from "@/lib/models";
import { ALLOWED_FOLDERS } from "@/lib/uploads";
import { ensureSeeded } from "@/lib/seed";

export default async function DashboardPage() {
  if (!(await getAdminSession())) redirect("/admin/login");
  await ensureSeeded();
  const [bookings, fresh, inquiries, services, reviews, team, images] = await Promise.all([
    Booking.countDocuments(), Booking.countDocuments({ status: "New" }), ContactInquiry.countDocuments(),
    Service.countDocuments(), Testimonial.countDocuments(), TeamMember.countDocuments(),
    StoredUpload.countDocuments({ folder: { $in: [...ALLOWED_FOLDERS] } }),
  ]);
  const stats: [string, number, string][] = [
    ["Total bookings", bookings, "/admin/bookings"], ["New booking requests", fresh, "/admin/bookings"],
    ["Contact inquiries", inquiries, "/admin/inquiries"], ["Total services", services, "/admin/services"],
    ["Testimonials", reviews, "/admin/testimonials"], ["Team members", team, "/admin/team"], ["Uploaded images", images, "/admin/gallery"],
  ];
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-forest-950">Dashboard</h1>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value, href]) => (
          <Link key={label} href={href} className="rounded-xl border-l-4 border-lime bg-white p-5 shadow-sm transition hover:shadow-md">
            <p className="font-display text-3xl font-black text-forest-900">{value}</p>
            <p className="mt-1 text-sm font-medium text-gray-600">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
