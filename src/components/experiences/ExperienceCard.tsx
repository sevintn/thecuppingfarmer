import Image from "next/image";
import { Clock, Users } from "lucide-react";
import type { MockExperience } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface ExperienceCardProps {
  experience: MockExperience;
  lang: string;
  dict: {
    duration: string;
    capacity: string;
    price_from: string;
    book_now: string;
  };
}

export default function ExperienceCard({
  experience,
  lang,
  dict,
}: ExperienceCardProps) {
  const title = lang === "es" ? experience.title : experience.titleEn;
  const description =
    lang === "es" ? experience.description : experience.descriptionEn;

  return (
    <article className="group bg-brand-cream border border-brand-beige hover:border-brand-mid/40 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-brand-beige/50">
        <Image
          src={experience.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {experience.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="dark">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading font-semibold text-brand-dark text-xl mb-3">
          {title}
        </h3>
        <p className="font-body text-brand-mid/80 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-5 text-brand-mid text-sm font-body">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>{experience.capacity}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-body text-brand-mid text-xs mb-0.5">
              {dict.price_from}
            </p>
            <p className="font-heading font-bold text-brand-dark text-2xl">
              ${experience.price}
            </p>
          </div>
          <Link href={`/${lang}/contacto`}>
            <Button variant="primary" size="md">
              {dict.book_now}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
