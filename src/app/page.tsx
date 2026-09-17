import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, ClockIcon, MapPinIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PharmacyMark } from "@/components/pharmacy-mark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, featuredProducts, pharmacy } from "@/lib/catalog";
import { formatAddress } from "@/lib/format";

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <div className="flex flex-col">
      <section className="border-b bg-[linear-gradient(180deg,#e7f0eb_0%,#f5f7f4_58%)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Prinsengracht · Amsterdam
            </p>
            <h1 className="font-heading text-4xl leading-[1.12] text-balance sm:text-6xl">
              De apotheek die uitlegt voordat u slikt.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Zelfzorg, vitaminen en EHBO — samengesteld en nagekeken door BIG-geregistreerde
              apothekers. Bezorging in de grachtengordel vandaag, als u vóór{" "}
              {pharmacy.shipping.sameDayCutoff} bestelt.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/producten">
                  Naar de webshop
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/over-ons">Onze werkwijze</Link>
              </Button>
            </div>
          </div>
          <Card className="bg-card/90">
            <CardHeader>
              <div className="text-primary">
                <PharmacyMark className="size-10" />
              </div>
              <CardTitle className="text-2xl">Balie zonder wachtrij</CardTitle>
              <CardDescription>
                Stel een vraag over dosering of combinaties. In de live apotheek beantwoordt een
                apotheker; in deze demo ziet u hoe dat gesprek eruitziet.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              {pharmacy.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="tabular-nums text-muted-foreground">{row.time}</span>
                </div>
              ))}
              <p className="pt-2 text-muted-foreground">{pharmacy.emergency}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <Trust
            icon={<ShieldCheckIcon />}
            title="BIG-register"
            text={`Apotheker geregistreerd onder nummer ${pharmacy.big}.`}
          />
          <Trust
            icon={<TruckIcon />}
            title="Bezorging in de stad"
            text={`Gratis vanaf ${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(pharmacy.shipping.threshold)} in ${pharmacy.shipping.area}.`}
          />
          <Trust
            icon={<ClockIcon />}
            title="Zelfde dag"
            text={`Besteld vóór ${pharmacy.shipping.sameDayCutoff}, dezelfde avond in huis.`}
          />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl">Categorieën</h2>
            <p className="text-muted-foreground">Acht schappen, dezelfde indeling als in de officina.</p>
          </div>
          <Button asChild variant="link">
            <Link href="/categorieen">Alle categorieën</Link>
          </Button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/categorieen/${category.slug}`} className="block h-full">
                <Card className="h-full transition-colors hover:bg-secondary/60">
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.summary}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl">Uit de huisapotheek</h2>
            <p className="max-w-2xl text-muted-foreground">
              Geen aanbiedingsstrook. Wel de middelen die we zelf in de kast zouden zetten.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-3xl">Drie stappen, geen account verplicht.</h2>
          <ol className="flex flex-col gap-4">
            {[
              ["Kies zelfzorg", "Zoek op klacht of stofnaam. Filters houden het schap overzichtelijk."],
              ["Lees de bijsluiterkorting", "Dosering, waarschuwingen en wisselwerkingen staan op elke productpagina."],
              ["Bezorging of afhalen", "Prinsengracht 412, of dezelfde dag in Amsterdam."],
            ].map(([title, text], index) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-lg">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon />
              {formatAddress()}
            </CardTitle>
            <CardDescription>
              Tram 13 of 17, halte Westermarkt. Fietsenstalling voor de deur. Toegankelijk zonder drempel.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div
              className="flex min-h-48 items-end rounded-xl bg-[linear-gradient(160deg,#d7e4ea_0%,#e7f0eb_50%,#d5dfd9_100%)] p-4 text-sm"
              aria-hidden="true"
            >
              <p className="rounded-lg bg-card/90 px-3 py-2">Prinsengracht · grachtengordel west</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/contact">Route & contact</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Trust({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="text-primary">{icon}</div>
      <div className="flex flex-col gap-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
