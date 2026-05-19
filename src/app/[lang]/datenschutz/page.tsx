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
    title: dict.footer.privacy_policy + " — The Cupping Farmer",
    robots: { index: false, follow: false },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as "es" | "en");

  const intro =
    lang === "es"
      ? "Esta página contiene la política de privacidad obligatoria conforme al Reglamento General de Protección de Datos (RGPD) y la legislación alemana aplicable."
      : "This page contains the privacy policy required under the General Data Protection Regulation (GDPR) and applicable German law.";

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
        {dict.footer.privacy_policy}
      </h1>
      <p className="text-brand-mid font-body mb-10 text-sm">{intro}</p>

      <section className="space-y-10 font-body text-brand-dark">

        {/* 1. Verantwortlicher */}
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3">
            1. Verantwortlicher
          </h2>
          <address className="not-italic leading-relaxed text-brand-mid">
            Juan Angel Welchez Arita
            <br />
            am Schilfpark 3B
            <br />
            21029 Hamburg, Deutschland
            <br />
            E-Mail:{" "}
            <a
              href="mailto:juan@thecuppingfarmer.com"
              className="underline hover:text-brand-dark transition-colors"
            >
              juan@thecuppingfarmer.com
            </a>
          </address>
        </div>

        {/* 2. Hosting */}
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3">
            2. Hosting
          </h2>
          <p className="text-brand-mid leading-relaxed">
            Diese Website wird über <strong>GitHub Pages</strong> (GitHub, Inc.,
            88 Colin P. Kelly Jr. St., San Francisco, CA 94107, USA) gehostet.
            Beim Aufruf der Website werden durch den Hoster automatisch
            sogenannte Server-Log-Files erfasst, die Informationen wie
            IP-Adresse, Browser-Typ, aufgerufene Seiten und Datum/Uhrzeit des
            Zugriffs enthalten. Diese Daten werden nicht mit anderen
            Datenquellen zusammengeführt.
          </p>
          <p className="text-brand-mid leading-relaxed mt-3">
            Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f
            DSGVO (berechtigtes Interesse an einem sicheren und stabilen
            Betrieb der Website). Weitere Informationen finden Sie in der{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-dark transition-colors"
            >
              Datenschutzerklärung von GitHub
            </a>
            .
          </p>
        </div>

        {/* 3. Kontaktformular */}
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3">
            3. Kontaktformular
          </h2>
          <p className="text-brand-mid leading-relaxed">
            Das Kontaktformular auf dieser Website verwendet einen{" "}
            <code className="bg-brand-cream px-1 rounded text-sm">
              mailto:
            </code>
            -Link. Wenn Sie das Formular absenden, öffnet sich Ihr lokales
            E-Mail-Programm mit den eingegebenen Daten. Es werden keine Daten
            auf unseren Servern gespeichert oder verarbeitet. Die Übermittlung
            erfolgt ausschließlich über Ihr eigenes E-Mail-Programm.
          </p>
        </div>

        {/* 4. Shopify */}
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3">
            4. Online-Shop (Shopify)
          </h2>
          <p className="text-brand-mid leading-relaxed">
            Für den Betrieb unseres Online-Shops nutzen wir den Dienst{" "}
            <strong>Shopify</strong> (Shopify International Limited, Victoria
            Buildings, 2nd Floor, 1-2 Haddington Road, Dublin 4, D04 XN32,
            Irland). Wenn Sie Produkte in den Warenkorb legen oder einen Kauf
            abschließen, werden Ihre Daten (z. B. Name, Adresse, E-Mail,
            Zahlungsdaten) von Shopify verarbeitet.
          </p>
          <p className="text-brand-mid leading-relaxed mt-3">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            Weitere Informationen finden Sie in der{" "}
            <a
              href="https://www.shopify.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-dark transition-colors"
            >
              Datenschutzerklärung von Shopify
            </a>
            .
          </p>
          <p className="text-brand-mid leading-relaxed mt-3">
            Der Warenkorb-Status wird lokal in Ihrem Browser (
            <em>localStorage</em>) gespeichert. Diese Daten verlassen Ihren
            Browser nicht, solange Sie keinen Kauf abschließen.
          </p>
        </div>

        {/* 5. Cookies */}
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3">
            5. Cookies
          </h2>
          <p className="text-brand-mid leading-relaxed">
            Diese Website setzt keine eigenen Tracking- oder
            Analyse-Cookies ein. Shopify kann technisch notwendige Cookies
            setzen, wenn Sie zur Checkout-Seite weitergeleitet werden. Diese
            sind für die Kaufabwicklung erforderlich und fallen unter die
            Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO.
          </p>
        </div>

        {/* 6. Ihre Rechte */}
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3">
            6. Ihre Rechte
          </h2>
          <p className="text-brand-mid leading-relaxed mb-3">
            Sie haben gegenüber dem Verantwortlichen folgende Rechte
            hinsichtlich der Sie betreffenden personenbezogenen Daten:
          </p>
          <ul className="list-disc list-inside space-y-1 text-brand-mid">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
          </ul>
          <p className="text-brand-mid leading-relaxed mt-3">
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
            <a
              href="mailto:juan@thecuppingfarmer.com"
              className="underline hover:text-brand-dark transition-colors"
            >
              juan@thecuppingfarmer.com
            </a>
          </p>
        </div>

        {/* 7. Beschwerderecht */}
        <div>
          <h2 className="font-heading font-semibold text-lg mb-3">
            7. Beschwerderecht bei der Aufsichtsbehörde
          </h2>
          <p className="text-brand-mid leading-relaxed">
            Sie haben das Recht, sich bei der zuständigen
            Datenschutzaufsichtsbehörde zu beschweren. Die zuständige Behörde
            für Hamburg ist:
          </p>
          <address className="not-italic mt-3 leading-relaxed text-brand-mid">
            Der Hamburgische Beauftragte für Datenschutz und
            Informationsfreiheit
            <br />
            Ludwig-Erhard-Str. 22, 7. OG
            <br />
            20459 Hamburg
            <br />
            <a
              href="https://datenschutz.hamburg.de"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-dark transition-colors"
            >
              datenschutz.hamburg.de
            </a>
          </address>
        </div>

        <p className="text-brand-beige/60 text-xs pt-4 border-t border-brand-beige/20">
          Stand: Mai 2026
        </p>
      </section>
    </main>
  );
}
