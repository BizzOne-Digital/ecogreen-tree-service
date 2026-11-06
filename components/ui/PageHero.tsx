import SafeImage from "./SafeImage";

/** Interior page hero: the same dark panel, photo and lime curve as the homepage. */
export default function PageHero({ title, subtitle, image, alt = "" }: { title: string; subtitle?: string; image?: string; alt?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <SafeImage src={image} alt={alt} fill priority sizes="50vw" className="object-cover" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-1/4" aria-hidden="true">
          <path d="M0 0H100C50 28 26 62 30 100H0Z" fill="var(--color-lime)" />
          <path d="M0 0H86C40 28 16 62 20 100H0Z" fill="var(--color-forest-900)" />
        </svg>
      </div>
      <div className="container-site relative py-14 md:py-24">
        <div className="md:max-w-[48%]">
          <h1 className="text-4xl font-black italic leading-[1.05] tracking-tight sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-white/85">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
