import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-forest-900/15 bg-white open:border-leaf open:shadow-md">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-lg font-bold text-forest-950 [&::-webkit-details-marker]:hidden">
        {question}
        <ChevronDown className="h-5 w-5 shrink-0 text-leaf transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <p className="px-5 pb-5 leading-relaxed text-gray-700">{answer}</p>
    </details>
  );
}
