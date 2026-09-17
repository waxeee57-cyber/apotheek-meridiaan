"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { allTags, categories, filterProducts, type CatalogQuery } from "@/lib/catalog";
import type { Product } from "@/lib/types";

function queryFromParams(params: URLSearchParams, lockedCategory?: string): CatalogQuery {
  return {
    q: params.get("q") ?? undefined,
    categorie: lockedCategory ?? params.get("categorie") ?? undefined,
    tag: params.get("tag") ?? undefined,
    voorraad: params.get("voorraad") ?? undefined,
    prijs: params.get("prijs") ?? undefined,
    sorteren: params.get("sorteren") ?? undefined,
  };
}

export function CatalogView({
  products,
  lockedCategory,
}: {
  products: Product[];
  lockedCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = queryFromParams(searchParams, lockedCategory);
  const visible = useMemo(() => filterProducts(query), [query]);
  const tags = allTags();
  const baseCount = lockedCategory
    ? products.filter((product) => product.category === lockedCategory).length
    : products.length;

  function update(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (!value) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const filters = (
    <div className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="catalog-q">Zoeken</FieldLabel>
        <Input
          id="catalog-q"
          defaultValue={query.q ?? ""}
          className="h-11 min-h-11"
          placeholder="Naam of werkzame stof"
          onChange={(event) => update({ q: event.target.value || undefined })}
        />
      </Field>

      {lockedCategory ? null : (
        <Field>
          <FieldLabel>Categorie</FieldLabel>
          <Select
            value={query.categorie ?? "alle"}
            onValueChange={(value) => update({ categorie: value === "alle" ? undefined : value })}
          >
            <SelectTrigger className="h-11 min-h-11 w-full">
              <SelectValue placeholder="Alle categorieën" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="alle">Alle categorieën</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      )}

      <Field>
        <FieldLabel>Prijs</FieldLabel>
        <Select
          value={query.prijs ?? "alle"}
          onValueChange={(value) => update({ prijs: value === "alle" ? undefined : value })}
        >
          <SelectTrigger className="h-11 min-h-11 w-full">
            <SelectValue placeholder="Alle prijzen" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="alle">Alle prijzen</SelectItem>
              <SelectItem value="tot-10">Tot € 10</SelectItem>
              <SelectItem value="10-20">€ 10 – € 20</SelectItem>
              <SelectItem value="vanaf-20">Vanaf € 20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field orientation="horizontal">
        <Checkbox
          id="op-voorraad"
          checked={query.voorraad === "op-voorraad"}
          onCheckedChange={(checked) =>
            update({ voorraad: checked === true ? "op-voorraad" : undefined })
          }
        />
        <FieldLabel htmlFor="op-voorraad">Alleen op voorraad</FieldLabel>
      </Field>

      <Field>
        <FieldLabel>Kenmerk</FieldLabel>
        <div className="flex flex-col gap-2">
          {tags.map((tag) => (
            <label key={tag} className="flex min-h-11 items-center gap-2 text-sm">
              <Checkbox
                checked={query.tag === tag}
                onCheckedChange={(checked) => update({ tag: checked === true ? tag : undefined })}
              />
              {tag}
            </label>
          ))}
        </div>
      </Field>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
      <aside className="hidden lg:block">
        <p className="mb-4 font-heading text-lg">Filters</p>
        {filters}
      </aside>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {visible.length} van {baseCount} producten
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontalIcon data-icon="inline-start" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-8">{filters}</div>
              </SheetContent>
            </Sheet>
            <Select
              value={query.sorteren ?? "aanbevolen"}
              onValueChange={(value) =>
                update({ sorteren: value === "aanbevolen" ? undefined : value })
              }
            >
              <SelectTrigger className="h-11 min-h-11 w-full sm:w-52">
                <SelectValue placeholder="Sorteren" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="aanbevolen">Aanbevolen</SelectItem>
                  <SelectItem value="naam">Naam A–Z</SelectItem>
                  <SelectItem value="prijs-oplopend">Prijs laag–hoog</SelectItem>
                  <SelectItem value="prijs-aflopend">Prijs hoog–laag</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {visible.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchIcon />
              </EmptyMedia>
              <EmptyTitle>Geen producten gevonden</EmptyTitle>
              <EmptyDescription>
                Pas de filters aan of wis de zoekterm. Onze balie helpt ook telefonisch.
              </EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" onClick={() => router.push(pathname)}>
              Filters wissen
            </Button>
          </Empty>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
