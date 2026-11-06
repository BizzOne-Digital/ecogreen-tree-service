import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/ui/icons";
import { telHref } from "@/lib/format";

type Props = {
  site: Record<string, string>;
  services: { slug: string; title: string }[];
  showGallery: boolean;
};

export default function Footer({ site, services, showGallery }: Props) {
  const nav: [string, string][] = [
    ["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/team", "Team"],
    ["/testimonials", "Testimonials"], ["/faq", "FAQ"], ["/booking", "Booking"], ["/contact", "Contact"],
    ...(showGallery ? ([["/gallery", "Gallery"]] as [string, string][]) : []),
  ];
  const heading = "font-display text-lg font-extrabold text-lime";

  return (
    <footer className="bg-forest-950 text-white/85">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-block rounded-xl bg-white p-2">
            <Image src="/images/logo.png" alt="Eco Green Tree Service LLC logo" width={480} height={351} className="h-24 w-auto" />
          </Link>
          <p className="mt-4 leading-relaxed">{site.footerText}</p>
        </div>
        <div>
          <h2 className={heading}>Navigation</h2>
          <ul className="mt-4 space-y-2">
            {nav.map(([href, label]) => <li key={href}><Link href={href} className="hover:text-lime">{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className={heading}>Services</h2>
          <ul className="mt-4 space-y-2">
            {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-lime">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="mt-4 space-y-3">
            <li><a href={telHref(site.phone)} className="flex items-center gap-2 hover:text-lime"><Phone className="h-4 w-4" aria-hidden="true" />{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-2 break-all hover:text-lime"><Mail className="h-4 w-4 shrink-0" aria-hidden="true" />{site.email}</a></li>
            {site.facebookUrl && (
              <li><a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-lime"><FacebookIcon className="h-4 w-4" />Facebook</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-5 text-center text-sm">© {site.businessName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
