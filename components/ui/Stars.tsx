import { Star } from "lucide-react";

export default function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-5 w-5 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} aria-hidden="true" />
      ))}
    </div>
  );
}
