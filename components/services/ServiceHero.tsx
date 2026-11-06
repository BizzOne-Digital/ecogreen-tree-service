import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import type { ServiceT } from "@/lib/types";

export default function ServiceHero({ service }: { service: ServiceT }) {
  return (
    <>
      <PageHero title={service.title} subtitle={service.shortDescription} image={service.heroImage || service.cardImage} alt={service.title} />
      <nav aria-label="Breadcrumb" className="border-b bg-mist">
        <ol className="container-site flex items-center gap-1 py-3 text-sm text-forest-900">
          <li><Link href="/services" className="font-semibold hover:text-leaf">Services</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
          <li aria-current="page">{service.title}</li>
        </ol>
      </nav>
    </>
  );
}
