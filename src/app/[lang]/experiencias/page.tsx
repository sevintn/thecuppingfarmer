import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/dictionaries";
import { mockExperiences } from "@/lib/mock-data";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "es" | "en");
  return {
    title: dict.experiences.title,
    description: dict.experiences.subtitle,
  };
}

export default async function ExperienciasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-dark text-brand-cream py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-brand-beige/60 text-xs uppercase tracking-[0.25em] mb-3">
            {dict.experiences.subtitle}
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl">
            {dict.experiences.title}
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mockExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                lang={lang}
                dict={dict.experiences}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
