import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/forms/BookingForm";
import PageHero from "@/components/ui/PageHero";
import { getContent, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book a Service",
  description: "Request tree removal, trimming, chipping, brush removal or emergency tree service from EcoGreen Tree Service LLC.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage() {
  const [c, site, services] = await Promise.all([getContent("booking"), getContent("global"), getServices()]);
  return (
    <>
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Arborist working in a tree" />
      <section className="bg-mist py-14">
        <div className="container-site max-w-3xl">
          <Suspense>
            <BookingForm services={services.map((s) => s.title)} content={c} phone={site.phone} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
