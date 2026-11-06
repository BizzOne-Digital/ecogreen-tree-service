import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/admin/Toast";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return (
    <ToastProvider>
      <div className="min-h-screen bg-mist lg:pl-60">
        <AdminSidebar />
        <AdminHeader email={session.email} />
        <main className="mx-auto max-w-6xl p-5">{children}</main>
      </div>
    </ToastProvider>
  );
}
