import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SafeImage from "@/components/ui/SafeImage";
import { getContent, getTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the team behind EcoGreen Tree Service LLC.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const [c, team] = await Promise.all([getContent("team"), getTeam()]);
  return (
    <>
      <PageHero title={c.heroHeading} subtitle={c.heroSubheading} image={c.heroImage} alt="Arborist working in a tree next to a home" />
      <section className="bg-mist py-16">
        <div className="container-site grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member._id} className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square">
                <SafeImage src={member.image} fallback="/images/team-placeholder.jpg" alt={member.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="border-t-4 border-lime p-6">
                <h2 className="text-xl font-extrabold text-forest-950">{member.name}</h2>
                <p className="font-semibold text-leaf">{member.role}</p>
                <p className="mt-2 text-gray-700">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
