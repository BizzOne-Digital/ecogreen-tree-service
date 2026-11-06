import { Quote } from "lucide-react";
import type { TestimonialT } from "@/lib/types";
import SafeImage from "./SafeImage";
import Stars from "./Stars";

export default function ReviewCard({ review }: { review: TestimonialT }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <Quote className="h-7 w-7 text-lime" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 flex-1 leading-relaxed text-gray-700">{review.review}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {review.image && (
          <SafeImage src={review.image} alt={review.customerName} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
        )}
        <div>
          <p className="font-display font-extrabold text-forest-950">{review.customerName}</p>
          {review.service && <p className="text-sm text-leaf">{review.service}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
