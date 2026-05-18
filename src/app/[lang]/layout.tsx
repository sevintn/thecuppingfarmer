import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/dictionaries";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: {
      default: "The Cupping Farmer",
      template: "%s | The Cupping Farmer",
    },
    description:
      lang === "es"
        ? "Café de especialidad del campo a tu taza — The Cupping Farmer"
        : "Specialty coffee from farm to your cup — The Cupping Farmer",
    openGraph: {
      siteName: "The Cupping Farmer",
      locale: lang === "es" ? "es_CO" : "en_US",
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <CartProvider>
      <Header lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
      <CartDrawer lang={lang} dict={dict} />
    </CartProvider>
  );
}
