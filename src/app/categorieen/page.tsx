import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, productsByCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Categorieën",
  description: "Zelfzorgcategorieën van Apotheek Meridiaan: pijn, verkoudheid, vitaminen, huid, EHBO.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <PageIntro
        eyebrow="Assortiment"
        title="Acht schappen, één officina."
        description="De indeling volgt de balie, niet een marketingkalender."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Categorieën" },
        ]}
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => {
          const count = productsByCategory(category.slug).length;
          return (
            <li key={category.slug}>
              <Link href={`/categorieen/${category.slug}`} className="block h-full">
                <Card className="h-full transition-colors hover:bg-secondary/60">
                  <CardHeader>
                    <p className="text-xs text-muted-foreground">
                      {count} {count === 1 ? "product" : "producten"}
                    </p>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                    <CardDescription>{category.summary}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
