import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import { serviceIcon } from "@/components/ui/icons";
import type { ServiceT } from "@/lib/types";

/** Photo card from the reference: image, overlapping dark panel and circular icon badge. */
export default function ServiceCard({ service }: { service: ServiceT }) {
  const Icon = serviceIcon(service.icon);
  return (
    <Link href={`/services/${service.slug}`} className="group relative block overflow-hidden rounded-2xl shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[4/3]">
        <SafeImage src={service.cardImage} alt={service.title} fill sizes="(min-width:1280px) 20vw, (min-width:640px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="relative -mt-6 flex min-h-28 items-center justify-center rounded-t-3xl bg-forest-900 px-3 pb-5 pt-9 text-center transition-colors group-hover:bg-forest-800">
        <span className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-forest-700 text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-extrabold leading-tight text-white">{service.title}</h3>
      </div>
    </Link>
  );
}
