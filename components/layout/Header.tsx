"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarDays, ChevronDown, Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Our Team" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

type Props = { services: { slug: string; title: string }[] };

export default function Header({ services }: Props) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-40 bg-white transition-shadow ${compact ? "shadow-md" : ""}`}>
      <div className={`container-site flex items-center justify-between gap-4 transition-all ${compact ? "py-1.5" : "py-2.5"}`}>
        <Link href="/" aria-label="EcoGreen Tree Service LLC home" className="shrink-0">
          <Image src="/images/logo.png" alt="Eco Green Tree Service LLC logo" width={480} height={351} priority
            className={`w-auto transition-all ${compact ? "h-14" : "h-16 lg:h-20"}`} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 xl:flex xl:gap-7">
          {NAV.map((item) => (
            <div key={item.href} className="group relative">
              <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center gap-1 border-b-[3px] py-2 font-semibold text-forest-950 transition hover:text-leaf ${isActive(item.href) ? "border-leaf" : "border-transparent"}`}>
                {item.label}
                {item.href === "/services" && <ChevronDown className="h-4 w-4" aria-hidden="true" />}
              </Link>
              {item.href === "/services" && (
                <div className="invisible absolute left-0 top-full w-64 rounded-xl bg-white p-2 opacity-0 shadow-xl ring-1 ring-black/5 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {services.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="block rounded-lg px-3 py-2 text-sm font-medium text-forest-950 hover:bg-mist">
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/booking" className="btn btn-green hidden sm:inline-flex">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />Book a Service
          </Link>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"} className="grid h-12 w-12 place-items-center rounded-lg text-forest-900 hover:bg-mist xl:hidden">
            {open ? <X className="h-7 w-7" aria-hidden="true" /> : <Menu className="h-7 w-7" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t bg-white xl:hidden">
          <div className="container-site flex flex-col py-3">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={`rounded-lg px-3 py-3 font-semibold ${isActive(item.href) ? "bg-mist text-leaf" : "text-forest-950"}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/booking" className="btn btn-green mt-3">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />Book a Service
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
