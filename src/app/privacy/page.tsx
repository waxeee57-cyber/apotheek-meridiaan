import type { Metadata } from "next";
import { pharmacy } from "@/lib/catalog";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "AVG-privacyverklaring van Apotheek Meridiaan (demonstratie).",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
      <PageIntro
        eyebrow="AVG"
        title="Privacyverklaring"
        description="Deze tekst hoort bij de demonstratiewebshop. Voor een live apotheek moet een privacyjurist de verwerkingen toetsen aan het apotheek-AIS en de KNMP-richtlijn."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Privacy" },
        ]}
      />
      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Verwerkingsverantwoordelijke</h2>
          <p>
            {pharmacy.legalName}, {pharmacy.address.street}, {pharmacy.address.postalCode}{" "}
            {pharmacy.address.city}, KvK {pharmacy.kvk}. Contact: {pharmacy.email}.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Welke gegevens</h2>
          <p>
            In deze demo blijven naam, e-mail, winkelwagen en demobestellingen in uw browser
            (localStorage). Er gaat niets naar een server. In productie verwerken we
            contactgegevens, bezorgadres, bestelhistorie en — alleen in het beveiligde AIS —
            gezondheidsgegevens van de apotheekrelatie.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Grondslag</h2>
          <p>
            Uitvoering van de overeenkomst (bestelling), wettelijke plicht (administratie, Wgbo)
            en gerechtvaardigd belang (fraudepreventie). Gezondheidsgegevens: behandeling in de
            zin van de apotheekzorg, met extra beveiliging.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Bewaartermijnen</h2>
          <p>
            Webshoporders: zeven jaar (fiscale plicht). Medisch dossier: volgens de Wgbo. Cookies:
            zie de cookieverklaring. Demo-data: totdat u ze wist of de browser leegmaakt.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Rechten</h2>
          <p>
            U kunt inzage, rectificatie, beperking en (waar van toepassing) wissing vragen via{" "}
            {pharmacy.email}. Klacht: Autoriteit Persoonsgegevens. Medische dossiers lopen via de
            apotheker, niet via marketing.
          </p>
        </section>
      </div>
    </article>
  );
}
