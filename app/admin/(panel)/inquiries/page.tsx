import { redirect } from "next/navigation";
import AdminTable, { type Column } from "@/components/admin/AdminTable";
import InquiryActions from "@/components/admin/InquiryActions";
import { getAdminSession } from "@/lib/auth";
import { ContactInquiry } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";

type Row = { _id: string; name: string; phone: string; email: string; service: string; message: string; read: boolean; createdAt: string };

export default async function InquiriesPage() {
  if (!(await getAdminSession())) redirect("/admin/login");
  await connectDB();
  const rows: Row[] = JSON.parse(JSON.stringify(await ContactInquiry.find().sort({ createdAt: -1 }).limit(500).lean()));
  const columns: Column<Row>[] = [
    { header: "Name", cell: (r) => <span className={r.read ? "" : "font-bold"}>{r.name}</span> },
    { header: "Contact", cell: (r) => <>{r.email}<br />{r.phone}</> },
    { header: "Service", cell: (r) => r.service || "None" },
    { header: "Message", cell: (r) => <p className="max-w-sm whitespace-pre-line">{r.message}</p> },
    { header: "Received", cell: (r) => new Date(r.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" }) },
    { header: "Actions", cell: (r) => <InquiryActions id={r._id} read={r.read} /> },
  ];
  return (
    <div>
      <h1 className="mb-5 text-2xl font-extrabold text-forest-950">Contact Inquiries</h1>
      <AdminTable columns={columns} rows={rows} empty="No inquiries yet." />
    </div>
  );
}
