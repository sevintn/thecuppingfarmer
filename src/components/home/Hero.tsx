import Link from "next/link";
import Button from "@/components/ui/Button";

interface HeroProps {
  lang: string;
  dict: {
    hero: {
      tagline: string;
      headline: string;
      subheadline: string;
      cta_shop: string;
      cta_experiences: string;
    };
  };
}

export default function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-brand-dark">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{
          backgroundImage:
            `url('${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero.jpg')`,
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="font-body text-brand-beige/80 text-sm uppercase tracking-[0.25em] mb-4">
            {dict.hero.tagline}
          </p>
          <h1 className="font-heading font-bold text-brand-cream text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            {dict.hero.headline}
          </h1>
          <p className="font-body text-brand-beige/90 text-lg leading-relaxed mb-10 max-w-xl">
            {dict.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${lang}/tienda`}>
              <Button variant="secondary" size="lg">
                {dict.hero.cta_shop}
              </Button>
            </Link>
            <Link href={`/${lang}/experiencias`}>
              <Button
                variant="secondary"
                size="lg"
              >
                {dict.hero.cta_experiences}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-cream to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
