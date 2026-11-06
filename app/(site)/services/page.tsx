import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import FinalCTA from "@/components/ui/FinalCTA";
import PageHero from "@/components/ui/PageHero";
import SafeImage from "@/components/ui/SafeImage";
import { serviceIcon } from "@/components/ui/icons";
import { getContent, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tree Services",
  description: "Tree removal, tree trimming, tree chipping, brush removal and emergency tree service for residential properties.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [c, home, site, services] = await Promise.all([getContent("services"), getContent("home"), getContent("global"), getServices()]);
  return (
    <>
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Arborist trimming a tree above a house roof" />
      <section className="bg-mist py-16">
        <div className="container-site grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcon(service.icon);
            return (
              <article key={service._id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10]">
                  <SafeImage src={service.cardImage} alt={service.title} fill sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute bottom-3 left-3 grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-forest-800 text-white"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-2xl font-extrabold text-forest-950">{service.title}</h2>
                  <p className="mt-2 text-gray-700">{service.shortDescription}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm font-medium text-forest-900"><Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" strokeWidth={3} aria-hidden="true" />{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link href={`/booking?service=${encodeURIComponent(service.title)}`} className="btn btn-green">{service.ctaText}</Link>
                    <Link href={`/services/${service.slug}`} aria-label={`Learn more about ${service.title}`} className="inline-flex items-center gap-1 font-semibold text-leaf hover:underline">
                      Learn more<ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <FinalCTA heading={home.finalHeading} text={home.finalText} cta={home.finalCta} phone={site.phone} />
    </>
  );
}
