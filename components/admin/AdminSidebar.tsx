"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarCheck, FileText, HelpCircle, Images, Inbox, LayoutDashboard, Menu, MessageSquareQuote, TreeDeciduous, Users, X } from "lucide-react";

const LINKS = [
  ["/admin", "Dashboard", LayoutDashboard], ["/admin/bookings", "Bookings", CalendarCheck], ["/admin/inquiries", "Inquiries", Inbox],
  ["/admin/content", "Page Content", FileText], ["/admin/services", "Services", TreeDeciduous], ["/admin/team", "Team", Users],
  ["/admin/testimonials", "Testimonials", MessageSquareQuote], ["/admin/faq", "FAQ", HelpCircle], ["/admin/gallery", "Gallery", Images],
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(!open)} aria-label="Toggle admin menu" className="fixed left-3 top-3 z-40 grid h-10 w-10 place-items-center rounded-lg bg-forest-900 text-white lg:hidden">
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>
      <aside className={`fixed inset-y-0 left-0 z-30 w-60 overflow-y-auto bg-forest-950 p-4 text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mt-12 rounded-lg bg-white p-2 lg:mt-0">
          <Image src="/images/logo.png" alt="EcoGreen admin" width={480} height={351} className="mx-auto h-20 w-auto" />
        </div>
        <nav aria-label="Admin" className="mt-5 space-y-1">
          {LINKS.map(([href, label, Icon]) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition ${active ? "bg-lime text-forest-950" : "hover:bg-white/10"}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />{label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
