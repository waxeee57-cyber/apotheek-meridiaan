import type { Metadata } from "next";
import { pharmacy } from "@/lib/catalog";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
};

export default function TermsPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
      <PageIntro
        eyebrow="Juridisch"
        title="Algemene voorwaarden"
        description="Demovoorwaarden. Niet gebruiken als live contract."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Voorwaarden" },
        ]}
      />
      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <p>
          {pharmacy.legalName} biedt zelfzorgproducten aan consumenten in Nederland. Prijzen zijn
          in euro, inclusief btw. Deze demo sluit geen koopovereenkomst.
        </p>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Bestellen</h2>
          <p>
            Een bestelling in de live shop is een aanbod tot koop. Wij bevestigen per e-mail. We
            mogen weigeren bij vermoeden van misbruik of wanneer het product niet geschikt is als
            zelfzorg.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Levering</h2>
          <p>
            Bezorging in {pharmacy.shipping.area}. Afhalen aan de Prinsengracht. Houdbaarheid en
            koelketen volgen de KNMP-richtlijn.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Herroeping</h2>
          <p>
            Geneesmiddelen en verzegelde gezondheidsproducten vallen deels buiten het herroepingsrecht
            zodra de verzegeling is verbroken. Overige artikelen: 14 dagen, ongebruikt.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Aansprakelijkheid</h2>
          <p>
            Productinformatie is geen medisch advies. Lees de bijsluiter. Spoed: 112. Klachten over
            de apotheekzorg: eerst de apotheker, daarna de KNMP-klachtenregeling.
          </p>
        </section>
      </div>
    </article>
  );
}
