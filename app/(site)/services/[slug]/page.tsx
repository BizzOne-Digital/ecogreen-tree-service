import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, CheckCircle2, Phone } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceHero from "@/components/services/ServiceHero";
import SafeImage from "@/components/ui/SafeImage";
import { getContent, getService, getServices } from "@/lib/data";
import { telHref } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getServices()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.shortDescription, alternates: { canonical: `/services/${slug}` } };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, services, site] = await Promise.all([getService(slug), getServices(), getContent("global")]);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <>
      <ServiceHero service={service} />
      <section className="py-16">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-forest-950 sm:text-4xl">{service.title} for Your Home</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">{service.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 font-semibold text-forest-900"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />{feature}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/booking?service=${encodeURIComponent(service.title)}`} className="btn btn-green"><CalendarDays className="h-5 w-5" aria-hidden="true" />{service.ctaText}</Link>
              <a href={telHref(site.phone)} className="btn border-2 border-forest-700 text-forest-800 hover:bg-mist"><Phone className="h-5 w-5" aria-hidden="true" />{site.phone}</a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <SafeImage src={service.cardImage} alt={service.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      {others.length > 0 && (
        <section className="bg-mist py-16">
          <div className="container-site">
            <h2 className="text-center text-3xl font-extrabold text-forest-950">Other Services</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((other) => <ServiceCard key={other._id} service={other} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
