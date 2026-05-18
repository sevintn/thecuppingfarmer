import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface ExperiencesTeaserProps {
  lang: string;
  dict: {
    experiences_teaser: {
      title: string;
      subtitle: string;
      text: string;
      cta: string;
    };
  };
}

export default function ExperiencesTeaser({
  lang,
  dict,
}: ExperiencesTeaserProps) {
  return (
    <section className="py-20 lg:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=75')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-mid/50"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="font-body text-brand-beige/60 text-xs uppercase tracking-[0.25em] mb-3">
            {dict.experiences_teaser.subtitle}
          </p>
          <h2 className="font-heading font-bold text-brand-cream text-3xl sm:text-4xl lg:text-5xl mb-6">
            {dict.experiences_teaser.title}
          </h2>
          <p className="font-body text-brand-beige/80 text-lg leading-relaxed mb-8">
            {dict.experiences_teaser.text}
          </p>
          <Link href={`/${lang}/experiencias`}>
            <Button
              variant="outline"
              size="lg"
              className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-dark group"
            >
              {dict.experiences_teaser.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
