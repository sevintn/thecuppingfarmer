import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { hasLocale, getDictionary } from "@/dictionaries";
import { getPostBySlug, mockPosts } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return mockPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: lang === "es" ? post.title : post.titleEn,
    description: lang === "es" ? post.excerpt : post.excerptEn,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const title = lang === "es" ? post.title : post.titleEn;
  const content = lang === "es" ? post.content : post.contentEn;

  const formattedDate = new Intl.DateTimeFormat(
    lang === "es" ? "es-CO" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(new Date(post.date));

  // Simple markdown bold parsing
  const renderContent = (text: string) => {
    return text.split("\n\n").map((paragraph, i) => {
      if (paragraph.startsWith("**") && paragraph.includes(":**")) {
        const parts = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return (
          <p
            key={i}
            className="font-body text-brand-dark text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parts }}
          />
        );
      }
      if (paragraph.startsWith("*") && !paragraph.startsWith("**")) {
        return (
          <p
            key={i}
            className="font-body text-brand-mid/90 text-base leading-relaxed italic pl-4 border-l-2 border-brand-beige"
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(/\*(.*?)\*/g, "<em>$1</em>"),
            }}
          />
        );
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside space-y-1 font-body text-brand-mid/90 text-base">
            {items.map((item, j) => (
              <li key={j}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        );
      }
      const withBold = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <p
          key={i}
          className="font-body text-brand-mid/90 text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: withBold }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-brand-beige overflow-hidden">
        <Image
          src={post.image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        {/* Back */}
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-brand-mid hover:text-brand-dark font-body text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {dict.blog.back_to_blog}
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Badge variant="beige">{post.category}</Badge>
          <div className="flex items-center gap-1.5 text-brand-mid/60 text-sm font-body">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1.5 text-brand-mid/60 text-sm font-body">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <h1 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8">
          {title}
        </h1>

        {/* Content */}
        <div className="space-y-5">{renderContent(content)}</div>

        {/* Footer divider */}
        <div className="mt-14 pt-8 border-t border-brand-beige">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-brand-mid hover:text-brand-dark font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {dict.blog.back_to_blog}
          </Link>
        </div>
      </div>
    </div>
  );
}
