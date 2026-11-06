import ServiceCard from "@/components/services/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { LeafSpray } from "@/components/ui/icons";
import type { ServiceT } from "@/lib/types";

export default function ServicesPreview({ eyebrow, heading, services }: { eyebrow: string; heading: string; services: ServiceT[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-14">
      <LeafSpray className="absolute -left-2 top-0 hidden h-36 w-28 lg:block" />
      <LeafSpray className="absolute -right-2 top-0 hidden h-36 w-28 -scale-x-100 lg:block" />
      <div className="container-site relative">
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => <ServiceCard key={service._id} service={service} />)}
        </div>
      </div>
    </section>
  );
}
