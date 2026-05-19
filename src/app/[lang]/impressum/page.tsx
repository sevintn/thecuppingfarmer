import { notFound } from "next/navigation";
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
    title: dict.footer.legal_notice + " — The Cupping Farmer",
    robots: { index: false, follow: false },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as "es" | "en");

  const intro =
    lang === "es"
      ? "Esta página contiene la información legal obligatoria según el § 5 TMG (Ley alemana de Telemedios)."
      : "This page contains the legally required information under § 5 TMG (German Telemedia Act).";

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
        {dict.footer.legal_notice}
      </h1>
      <p className="text-brand-mid font-body mb-10 text-sm">{intro}</p>

      <section className="space-y-8 font-body text-brand-dark">
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3 text-brand-dark">
            Angaben gemäß § 5 TMG
          </h2>
          <address className="not-italic leading-relaxed text-brand-mid">
            Juan Angel Welchez Arita
            <br />
            am Schilfpark 3B
            <br />
            21029 Hamburg
            <br />
            Deutschland
          </address>
        </div>

        <div>
          <h2 className="font-heading font-semibold text-lg mb-3 text-brand-dark">
            Kontakt
          </h2>
          <p className="text-brand-mid">
            E-Mail:{" "}
            <a
              href="mailto:info@thecuppingfarmer.com"
              className="underline hover:text-brand-dark transition-colors"
            >
              info@thecuppingfarmer.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-heading font-semibold text-lg mb-3 text-brand-dark">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <address className="not-italic leading-relaxed text-brand-mid">
            Juan Angel Welchez Arita
            <br />
            am Schilfpark 3B
            <br />
            21029 Hamburg
            <br />
            Deutschland
          </address>
        </div>

        <div>
          <h2 className="font-heading font-semibold text-lg mb-3 text-brand-dark">
            Haftungsausschluss
          </h2>
          <p className="text-brand-mid leading-relaxed">
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
            wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir
            gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="font-heading font-semibold text-lg mb-3 text-brand-dark">
            Streitschlichtung
          </h2>
          <p className="text-brand-mid leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-dark transition-colors"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </section>
    </main>
  );
}
