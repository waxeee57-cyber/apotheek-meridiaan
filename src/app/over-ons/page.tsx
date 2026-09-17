import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pharmacy } from "@/lib/catalog";
import { formatAddress } from "@/lib/format";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Zelfstandige apotheek aan de Prinsengracht. BIG-geregistreerd, KNMP-lid, Amsterdam.",
};

const team = [
  {
    name: "drs. Elise van der Meer",
    role: "Apotheker-eigenaar",
    bio: "Leidt de officina sinds 2016. Aandacht voor zelfzorg zonder overbehandeling.",
  },
  {
    name: "Amir El Idrissi",
    role: "Apotheker",
    bio: "Medicatiebeoordeling en vragen over combinaties. Spreekt NL, EN en AR.",
  },
  {
    name: "Noor Bakker",
    role: "Apothekersassistent",
    bio: "Eerste aanspreekpunt aan de balie en voor herhaalrecepten.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12">
      <PageIntro
        eyebrow="Over ons"
        title="Een officina, geen marktplaats."
        description="Apotheek Meridiaan is een zelfstandige apotheek in de grachtengordel. We verkopen zelfzorg omdat mensen die nodig hebben — niet omdat een algoritme een bundel voorstelt."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Over ons" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Werkwijze</CardTitle>
            <CardDescription>
              Elke SKU in deze webshop staat ook in de kast aan de Prinsengracht. Geen parallelimport
              zonder dossier, geen merk dat we zelf niet zouden slikken.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm leading-relaxed">
            <p>
              U krijgt bij elk product de dosering, de belangrijkste waarschuwingen en de btw-klasse.
              Twijfelt u tussen paracetamol en ibuprofen, of tussen crème en zalf: bel de balie. Dat
              gesprek is het product.
            </p>
            <p>
              Receptgeneesmiddelen blijven in de live apotheek; deze demonstratie toont alleen het
              zelfzorgschap en de digitale balie.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Registraties</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <p>BIG-register apotheker: {pharmacy.big}</p>
            <p>KvK: {pharmacy.kvk}</p>
            <p>btw: {pharmacy.btw}</p>
            <p>{formatAddress()}</p>
          </CardContent>
        </Card>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-3xl">Team</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {team.map((person) => (
            <li key={person.name}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-14 items-center justify-center rounded-full bg-secondary font-heading text-xl">
                    {person.name
                      .split(" ")
                      .filter((part) => part[0] === part[0]?.toUpperCase())
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <CardTitle>{person.name}</CardTitle>
                  <CardDescription>{person.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{person.bio}</CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
