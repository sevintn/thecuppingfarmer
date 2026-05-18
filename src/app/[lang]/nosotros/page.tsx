import { notFound } from "next/navigation";
import Image from "next/image";
import { Leaf, Coffee, Heart, Award, Users, MapPin } from "lucide-react";
import { hasLocale, getDictionary } from "@/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "es" | "en");
  return {
    title: dict.about.title,
    description: dict.about.subtitle,
  };
}

const values = [
  { icon: Leaf, key: "sustainability" },
  { icon: Award, key: "quality" },
  { icon: Users, key: "community" },
  { icon: MapPin, key: "origin" },
  { icon: Coffee, key: "craft" },
  { icon: Heart, key: "passion" },
];

const valuesData = {
  es: [
    { title: "Sostenibilidad", text: "Prácticas agrícolas regenerativas que cuidan el suelo y el entorno." },
    { title: "Calidad sin concesiones", text: "Cada lote pasa por cupping riguroso antes de llegar a ti." },
    { title: "Comunidad", text: "Colaboramos directamente con productores de Honduras, Colombia y otros orígenes." },
    { title: "Origen trazable", text: "Sabemos exactamente de dónde viene cada grano." },
    { title: "Artesanía", text: "Procesamos con cuidado artesanal, sin atajos." },
    { title: "Pasión", text: "El café no es solo nuestro negocio, es nuestra vida." },
  ],
  en: [
    { title: "Sustainability", text: "Regenerative farming practices that care for the soil and the environment." },
    { title: "Uncompromising quality", text: "Every lot undergoes rigorous cupping before reaching you." },
    { title: "Community", text: "We work directly with producers from Honduras, Colombia and other origins." },
    { title: "Traceable origin", text: "We know exactly where every bean comes from." },
    { title: "Craftsmanship", text: "We process with artisanal care, without shortcuts." },
    { title: "Passion", text: "Coffee is not just our business, it's our life." },
  ],
};

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const currentValues = valuesData[lang as "es" | "en"];
  const storyParagraphs = dict.about.story.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-brand-dark text-brand-cream py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1400&q=80')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-brand-beige/60 text-xs uppercase tracking-[0.25em] mb-3">
            {dict.about.subtitle}
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl max-w-2xl">
            {dict.about.title}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Text */}
            <div>
              <h2 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl mb-8">
                {dict.about.story_title}
              </h2>
              <div className="space-y-5">
                {storyParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-brand-mid/90 text-base leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] bg-brand-beige/50 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=800&q=80"
                alt="The Cupping Farmer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-brand-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl mb-12 text-center">
            {dict.about.values_title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentValues.map((val, i) => {
              const Icon = values[i].icon;
              return (
                <div
                  key={val.title}
                  className="bg-brand-cream p-6 border border-brand-beige hover:border-brand-mid/40 transition-colors"
                >
                  <div className="w-10 h-10 bg-brand-dark flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-cream" />
                  </div>
                  <h3 className="font-heading font-semibold text-brand-dark text-lg mb-2">
                    {val.title}
                  </h3>
                  <p className="font-body text-brand-mid/80 text-sm leading-relaxed">
                    {val.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image strip */}
      <section className="grid grid-cols-3 h-48 sm:h-64 lg:h-80">
        {[
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
        ].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>
    </div>
  );
}
