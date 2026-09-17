"use client";

import Link from "next/link";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { DemoNotice } from "@/components/demo-notice";
import { PageIntro } from "@/components/page-intro";
import { ProductPackaging } from "@/components/product-packaging";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getProduct, pharmacy } from "@/lib/catalog";
import { formatEuro } from "@/lib/format";
import { ShoppingBagIcon } from "lucide-react";

export default function CartPage() {
  const { items, setQuantity, remove, subtotal, ready } = useCart();
  const shipping = subtotal >= pharmacy.shipping.threshold || subtotal === 0 ? 0 : pharmacy.shipping.fee;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <PageIntro
        eyebrow="Winkelwagen"
        title="Uw selectie"
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Winkelwagen" },
        ]}
      />
      <DemoNotice>
        Dit is een front-enddemonstratie. Er wordt niets afgerekend of verzonden.
      </DemoNotice>

      {!ready ? (
        <p className="text-sm text-muted-foreground">Winkelwagen laden…</p>
      ) : items.length === 0 ? (
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingBagIcon />
            </EmptyMedia>
            <EmptyTitle>Uw winkelwagen is leeg</EmptyTitle>
            <EmptyDescription>
              Begin bij pijnstilling of vitaminen — of vraag de balie om een advies.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/producten">Naar producten</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <ul className="flex flex-col gap-4">
            {items.map((item) => {
              const product = getProduct(item.slug);
              if (!product) {
                return null;
              }
              return (
                <li key={item.slug}>
                  <Card>
                    <CardContent className="flex flex-col gap-4 pt-(--card-spacing) sm:flex-row">
                      <ProductPackaging
                        packaging={product.packaging}
                        accent={product.accent}
                        label={product.shortName}
                        className="size-28 shrink-0 rounded-lg"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <Link href={`/producten/${product.slug}`} className="font-medium hover:underline">
                          {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{product.unit}</p>
                        <p className="tabular-nums">{formatEuro(product.price)}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Aantal verlagen"
                            onClick={() => setQuantity(item.slug, item.quantity - 1)}
                          >
                            <MinusIcon />
                          </Button>
                          <span className="min-w-8 text-center tabular-nums">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Aantal verhogen"
                            onClick={() => setQuantity(item.slug, item.quantity + 1)}
                          >
                            <PlusIcon />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => remove(item.slug)}
                          >
                            <Trash2Icon data-icon="inline-start" />
                            Verwijderen
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Overzicht</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotaal</span>
                <span className="tabular-nums">{formatEuro(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Verzending</span>
                <span className="tabular-nums">
                  {shipping === 0 ? "Gratis" : formatEuro(shipping)}
                </span>
              </div>
              <p className="text-muted-foreground">
                Gratis bezorging vanaf {formatEuro(pharmacy.shipping.threshold)} in{" "}
                {pharmacy.shipping.area}.
              </p>
              <div className="flex justify-between text-base font-medium">
                <span>Totaal</span>
                <span className="tabular-nums">{formatEuro(total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/afrekenen">Naar afrekenen</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
