import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ReviewCard from "@/components/ui/ReviewCard";
import { getContent, getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what homeowners say about EcoGreen Tree Service LLC.",
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const [c, reviews] = await Promise.all([getContent("testimonials"), getTestimonials()]);
  return (
    <>
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Tree care at a residential home" />
      <section className="bg-mist py-16">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
        </div>
      </section>
    </>
  );
}
