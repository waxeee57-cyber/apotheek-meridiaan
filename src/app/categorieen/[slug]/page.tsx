import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog-view";
import { PageIntro } from "@/components/page-intro";
import { categories, getCategory, products } from "@/lib/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return { title: "Categorie" };
  }
  return { title: category.name, description: category.summary };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <PageIntro
        eyebrow="Categorie"
        title={category.name}
        description={category.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/categorieen", label: "Categorieën" },
          { label: category.name },
        ]}
      />
      <Suspense>
        <CatalogView products={products} lockedCategory={category.slug} />
      </Suspense>
    </div>
  );
}
