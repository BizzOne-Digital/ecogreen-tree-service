import type { Metadata } from "next";
import ReviewForm from "@/components/forms/ReviewForm";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHero from "@/components/ui/PageHero";
import ReviewCard from "@/components/ui/ReviewCard";
import { getContent, getServices, getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what homeowners say about EcoGreen Tree Service LLC.",
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const [c, reviews, services] = await Promise.all([getContent("testimonials"), getTestimonials(), getServices()]);
  return (
    <>
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Tree care at a residential home" />
      <section className="bg-mist py-16">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
        </div>
      </section>
      <section id="leave-a-review" className="py-16">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="SHARE YOUR EXPERIENCE" title="Leave a Review" />
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-700">Had work done by EcoGreen? We would love to hear how it went.</p>
          <div className="mt-8"><ReviewForm services={services.map((s) => s.title)} /></div>
        </div>
      </section>
    </>
  );
}
