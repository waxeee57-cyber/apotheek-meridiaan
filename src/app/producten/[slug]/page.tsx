import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { PageIntro } from "@/components/page-intro";
import { ProductCard } from "@/components/product-card";
import { ProductPackaging } from "@/components/product-packaging";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getCategoryName,
  getProduct,
  products,
  relatedProducts,
} from "@/lib/catalog";
import { formatEuro, formatStock } from "@/lib/format";
import { TriangleAlertIcon } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    notFound();
  }
  const related = relatedProducts(product);
  const out = product.stock <= 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12">
      <PageIntro
        title={product.name}
        description={product.unit}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/producten", label: "Producten" },
          { href: `/categorieen/${product.category}`, label: getCategoryName(product.category) },
          { label: product.shortName },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductPackaging
          packaging={product.packaging}
          accent={product.accent}
          label={product.shortName}
          className="rounded-2xl"
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{getCategoryName(product.category)}</Badge>
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-3xl font-medium tabular-nums">{formatEuro(product.price)}</p>
          <p className="text-sm text-muted-foreground">
            incl. {product.vatRate}% btw · {formatStock(product.stock)}
          </p>
          <p className="leading-relaxed">{product.description}</p>
          <p className="text-sm">
            <span className="font-medium">Werkzame stof: </span>
            {product.activeIngredient}
          </p>
          <AddToCartButton slug={product.slug} disabled={out} />
          <p className="text-sm text-muted-foreground">
            Categorie:{" "}
            <Link href={`/categorieen/${product.category}`} className="underline underline-offset-4">
              {getCategoryName(product.category)}
            </Link>
          </p>
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-2xl">Gebruik</h2>
          <p className="leading-relaxed text-muted-foreground">{product.usage}</p>
          <Separator />
          <h2 className="font-heading text-2xl">Samenstelling</h2>
          <p className="leading-relaxed text-muted-foreground">{product.ingredients}</p>
        </div>
        <Alert>
          <TriangleAlertIcon />
          <AlertTitle>Waarschuwingen</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 flex list-disc flex-col gap-2 pl-4">
              {product.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
            <p className="mt-3">
              Zelfzorg is geen diagnose. Lees de bijsluiter. Bij twijfel: overleg met de apotheker.
            </p>
          </AlertDescription>
        </Alert>
      </section>

      {related.length > 0 ? (
        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-2xl">Vaak samen gekozen</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
