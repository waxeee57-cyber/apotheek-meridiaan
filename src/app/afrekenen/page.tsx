"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAccount } from "@/components/account-provider";
import { cartShipping, useCart } from "@/components/cart-provider";
import { DemoNotice } from "@/components/demo-notice";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { getProduct } from "@/lib/catalog";
import { createOrderId, formatEuro } from "@/lib/format";
import type { StoredOrder } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear, ready } = useCart();
  const { account, addOrder, login } = useAccount();
  const [fulfillment, setFulfillment] = useState<"bezorging" | "afhalen">("bezorging");
  const [payment, setPayment] = useState("ideal");
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = cartShipping(subtotal, fulfillment);
  const total = subtotal + shipping;

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProduct(item.slug);
          if (!product) {
            return null;
          }
          return { ...item, product };
        })
        .filter((line): line is NonNullable<typeof line> => Boolean(line)),
    [items],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const street = String(form.get("street") ?? "").trim();
    const postal = String(form.get("postal") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) {
      nextErrors.name = "Vul uw naam in.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Vul een geldig e-mailadres in.";
    }
    if (phone.length < 8) {
      nextErrors.phone = "Vul een telefoonnummer in.";
    }
    if (fulfillment === "bezorging") {
      if (street.length < 3) {
        nextErrors.street = "Vul straat en huisnummer in.";
      }
      if (!/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(postal)) {
        nextErrors.postal = "Gebruik een Nederlandse postcode, bijvoorbeeld 1016 JC.";
      }
      if (city.length < 2) {
        nextErrors.city = "Vul de plaats in.";
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const order: StoredOrder = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      email,
      name,
      fulfillment,
      payment,
      items: lines.map((line) => ({
        slug: line.slug,
        name: line.product.name,
        quantity: line.quantity,
        price: line.product.price,
      })),
      subtotal,
      shipping,
      total,
    };
    addOrder(order);
    if (!account) {
      login({ name, email });
    }
    clear();
    toast.success("Bestelling geplaatst (demo).");
    router.push(`/bedankt?order=${order.id}`);
  }

  if (ready && items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12">
        <PageIntro title="Afrekenen" />
        <p className="text-muted-foreground">Uw winkelwagen is leeg.</p>
        <Button asChild className="w-fit">
          <Link href="/producten">Terug naar de shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <PageIntro
        eyebrow="Afrekenen"
        title="Gegevens en levering"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/winkelwagen", label: "Winkelwagen" },
          { label: "Afrekenen" },
        ]}
      />
      <DemoNotice>
        Geen echte betaling. iDEAL is nagebootst; uw gegevens blijven in deze browser.
      </DemoNotice>

      <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <Card>
          <CardHeader>
            <CardTitle>Uw gegevens</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field data-invalid={errors.name ? true : undefined}>
                <FieldLabel htmlFor="name">Naam</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  className="h-11 min-h-11"
                  defaultValue={account?.name ?? ""}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
                <FieldError>{errors.name}</FieldError>
              </Field>
              <Field data-invalid={errors.email ? true : undefined}>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="h-11 min-h-11"
                  defaultValue={account?.email ?? ""}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                <FieldError>{errors.email}</FieldError>
              </Field>
              <Field data-invalid={errors.phone ? true : undefined}>
                <FieldLabel htmlFor="phone">Telefoon</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="h-11 min-h-11"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
                <FieldError>{errors.phone}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Aflevering</FieldLabel>
                <RadioGroup
                  value={fulfillment}
                  onValueChange={(value) => setFulfillment(value as "bezorging" | "afhalen")}
                >
                  <Field orientation="horizontal">
                    <RadioGroupItem value="bezorging" id="bezorging" />
                    <FieldLabel htmlFor="bezorging">Bezorging in Amsterdam / Diemen</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="afhalen" id="afhalen" />
                    <FieldLabel htmlFor="afhalen">Afhalen Prinsengracht 412</FieldLabel>
                  </Field>
                </RadioGroup>
              </Field>
              {fulfillment === "bezorging" ? (
                <>
                  <Field data-invalid={errors.street ? true : undefined}>
                    <FieldLabel htmlFor="street">Straat en huisnummer</FieldLabel>
                    <Input
                      id="street"
                      name="street"
                      className="h-11 min-h-11"
                      autoComplete="street-address"
                      aria-invalid={Boolean(errors.street)}
                    />
                    <FieldError>{errors.street}</FieldError>
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field data-invalid={errors.postal ? true : undefined}>
                      <FieldLabel htmlFor="postal">Postcode</FieldLabel>
                      <Input
                        id="postal"
                        name="postal"
                        className="h-11 min-h-11"
                        autoComplete="postal-code"
                        aria-invalid={Boolean(errors.postal)}
                      />
                      <FieldError>{errors.postal}</FieldError>
                    </Field>
                    <Field data-invalid={errors.city ? true : undefined}>
                      <FieldLabel htmlFor="city">Plaats</FieldLabel>
                      <Input
                        id="city"
                        name="city"
                        className="h-11 min-h-11"
                        defaultValue="Amsterdam"
                        autoComplete="address-level2"
                        aria-invalid={Boolean(errors.city)}
                      />
                      <FieldError>{errors.city}</FieldError>
                    </Field>
                  </div>
                </>
              ) : (
                <FieldDescription>
                  U ontvangt een e-mail wanneer de bestelling klaarstaat aan de balie.
                </FieldDescription>
              )}
              <Field>
                <FieldLabel>Betaalwijze (demo)</FieldLabel>
                <Select value={payment} onValueChange={setPayment}>
                  <SelectTrigger className="h-11 min-h-11 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ideal">iDEAL</SelectItem>
                      <SelectItem value="pin">Pinnen bij afhalen</SelectItem>
                      <SelectItem value="factuur">Op rekening (zorginstelling)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Bestelling</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            {lines.map((line) => (
              <div key={line.slug} className="flex justify-between gap-3">
                <span>
                  {line.product.shortName} × {line.quantity}
                </span>
                <span className="tabular-nums">
                  {formatEuro(line.product.price * line.quantity)}
                </span>
              </div>
            ))}
            <div className="flex justify-between">
              <span>Verzending</span>
              <span className="tabular-nums">
                {shipping === 0 ? "Gratis" : formatEuro(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-medium">
              <span>Totaal</span>
              <span className="tabular-nums">{formatEuro(total)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={pending || !ready}>
              {pending ? <Spinner data-icon="inline-start" /> : null}
              {pending ? "Bezig…" : "Bestelling plaatsen"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
