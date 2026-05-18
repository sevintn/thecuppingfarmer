import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { MockPost } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";

interface PostCardProps {
  post: MockPost;
  lang: string;
  dict: {
    read_more: string;
    published: string;
  };
}

export default function PostCard({ post, lang, dict }: PostCardProps) {
  const title = lang === "es" ? post.title : post.titleEn;
  const excerpt = lang === "es" ? post.excerpt : post.excerptEn;

  const formattedDate = new Intl.DateTimeFormat(
    lang === "es" ? "es-CO" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(new Date(post.date));

  return (
    <article className="group bg-brand-cream border border-brand-beige hover:border-brand-mid/40 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-brand-beige/50">
        <Image
          src={post.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="beige">{post.category}</Badge>
          <div className="flex items-center gap-1 text-brand-mid/60 text-xs font-body">
            <Clock className="w-3 h-3" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <h3 className="font-heading font-semibold text-brand-dark text-xl leading-tight mb-3 flex-1">
          {title}
        </h3>

        <p className="font-body text-brand-mid/80 text-sm leading-relaxed mb-5 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-brand-mid/60 text-xs font-body">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="flex items-center gap-1.5 text-brand-mid hover:text-brand-dark text-sm font-body font-medium transition-colors group/link"
          >
            {dict.read_more}
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
