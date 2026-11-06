export default function SectionHeading({ eyebrow, title, light }: { eyebrow?: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      {eyebrow && <p className={`eyebrow ${light ? "text-lime" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-white" : "text-forest-950"}`}>{title}</h2>
    </div>
  );
}
