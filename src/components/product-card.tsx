import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductPackaging } from "@/components/product-packaging";
import { getCategoryName } from "@/lib/catalog";
import { formatEuro, formatStock } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  const out = product.stock <= 0;

  return (
    <Card className="h-full bg-card ring-border/80">
      <Link href={`/producten/${product.slug}`} className="block">
        <ProductPackaging
          packaging={product.packaging}
          accent={product.accent}
          label={product.shortName}
          className="mx-(--card-spacing) rounded-lg"
        />
      </Link>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{getCategoryName(product.category)}</Badge>
          {product.stock <= 5 ? (
            <Badge variant={out ? "destructive" : "outline"}>{formatStock(product.stock)}</Badge>
          ) : null}
        </div>
        <CardTitle>
          <Link href={`/producten/${product.slug}`} className="hover:underline">
            {product.shortName}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{product.unit}</p>
      </CardHeader>
      <CardContent>
        <p className="font-medium tabular-nums text-lg">{formatEuro(product.price)}</p>
        <p className="text-xs text-muted-foreground">incl. {product.vatRate}% btw</p>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <AddToCartButton slug={product.slug} disabled={out} />
      </CardFooter>
    </Card>
  );
}
