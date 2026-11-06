import Link from "next/link";
import ReviewCard from "@/components/ui/ReviewCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TestimonialT } from "@/lib/types";

export default function TestimonialsPreview({ eyebrow, heading, reviews }: { eyebrow: string; heading: string; reviews: TestimonialT[] }) {
  if (reviews.length === 0) return null;
  return (
    <section className="bg-mist py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => <ReviewCard key={review._id} review={review} />)}
        </div>
        <div className="mt-8 text-center"><Link href="/testimonials" className="btn btn-green">Read More Reviews</Link></div>
      </div>
    </section>
  );
}
