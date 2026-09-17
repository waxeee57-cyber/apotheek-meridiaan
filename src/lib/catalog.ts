import categoriesJson from "@/data/categories.json";
import pharmacyJson from "@/data/pharmacy.json";
import productsJson from "@/data/products.json";
import type { Category, Pharmacy, Product } from "@/lib/types";

export const pharmacy = pharmacyJson as Pharmacy;
export const categories = categoriesJson as Category[];
export const products = productsJson as Product[];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((product) => product.category === slug);
}

export function featuredProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function relatedProducts(product: Product): Product[] {
  return product.related
    .map((slug) => getProduct(slug))
    .filter((item): item is Product => Boolean(item));
}

export type CatalogQuery = {
  q?: string;
  categorie?: string;
  tag?: string;
  voorraad?: string;
  prijs?: string;
  sorteren?: string;
};

export function filterProducts(query: CatalogQuery): Product[] {
  const needle = query.q?.trim().toLocaleLowerCase("nl-NL") ?? "";
  let result = products.filter((product) => {
    if (query.categorie && product.category !== query.categorie) {
      return false;
    }
    if (query.tag && !product.tags.includes(query.tag)) {
      return false;
    }
    if (query.voorraad === "op-voorraad" && product.stock <= 0) {
      return false;
    }
    if (query.prijs === "tot-10" && product.price >= 10) {
      return false;
    }
    if (query.prijs === "10-20" && (product.price < 10 || product.price > 20)) {
      return false;
    }
    if (query.prijs === "vanaf-20" && product.price < 20) {
      return false;
    }
    if (!needle) {
      return true;
    }
    const haystack = [
      product.name,
      product.shortName,
      product.activeIngredient,
      product.description,
      product.form,
      ...product.tags,
      getCategoryName(product.category),
    ]
      .join(" ")
      .toLocaleLowerCase("nl-NL");
    return haystack.includes(needle);
  });

  const sort = query.sorteren ?? "aanbevolen";
  result = [...result].sort((a, b) => {
    if (sort === "prijs-oplopend") {
      return a.price - b.price;
    }
    if (sort === "prijs-aflopend") {
      return b.price - a.price;
    }
    if (sort === "naam") {
      return a.name.localeCompare(b.name, "nl");
    }
    return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "nl");
  });

  return result;
}

export function allTags(): string[] {
  return [...new Set(products.flatMap((product) => product.tags))].sort((a, b) =>
    a.localeCompare(b, "nl"),
  );
}

export function shippingFor(subtotal: number, fulfillment: "bezorging" | "afhalen"): number {
  if (fulfillment === "afhalen") {
    return 0;
  }
  if (subtotal >= pharmacy.shipping.threshold) {
    return 0;
  }
  return pharmacy.shipping.fee;
}
