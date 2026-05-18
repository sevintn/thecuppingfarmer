import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/dictionaries";
import ContactPageClient from "@/components/contact/ContactPageClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "es" | "en");
  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <ContactPageClient lang={lang} dict={dict} />;
}
