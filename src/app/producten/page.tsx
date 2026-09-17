import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog-view";
import { PageIntro } from "@/components/page-intro";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Producten",
  description: "Zelfzorgassortiment van Apotheek Meridiaan. Zoeken en filteren op categorie, prijs en voorraad.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <PageIntro
        eyebrow="Webshop"
        title="Zelfzorg, op apothekersvolgorde."
        description="Twaalf voorbeeldproducten uit het huisassortiment. Prijzen in euro, inclusief btw. Geen nep-kortingen."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Producten" },
        ]}
      />
      <Suspense>
        <CatalogView products={products} />
      </Suspense>
    </div>
  );
}
