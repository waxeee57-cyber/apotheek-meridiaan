"use client";

import { useState, type FormEvent } from "react";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pharmacy } from "@/lib/catalog";
import { formatAddress } from "@/lib/format";
import { Spinner } from "@/components/ui/spinner";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      setError("Vul een geldig e-mailadres in en een bericht van minstens 10 tekens.");
      return;
    }
    setError(null);
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPending(false);
    setSent(true);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <PageIntro
        eyebrow="Contact"
        title="De balie is ook digitaal bereikbaar."
        description="Voor dosering, wisselwerkingen of een herhaalrecept belt u sneller. Voor webshopvragen volstaat het formulier."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{pharmacy.name}</CardTitle>
            <CardDescription>{formatAddress()}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <p>
              Telefoon:{" "}
              <a className="underline underline-offset-4" href={`tel:${pharmacy.phone.replace(/\s/g, "")}`}>
                {pharmacy.phone}
              </a>
            </p>
            <p>
              E-mail:{" "}
              <a className="underline underline-offset-4" href={`mailto:${pharmacy.email}`}>
                {pharmacy.email}
              </a>
            </p>
            {pharmacy.hours.map((row) => (
              <div key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span className="tabular-nums text-muted-foreground">{row.time}</span>
              </div>
            ))}
            <p className="text-muted-foreground">{pharmacy.emergency}</p>
            <div
              className="flex min-h-52 items-end rounded-xl bg-[linear-gradient(160deg,#d7e4ea_0%,#e7f0eb_55%,#d5dfd9_100%)] p-4"
              role="img"
              aria-label="Schetskaart van de Prinsengracht in Amsterdam"
            >
              <p className="rounded-lg bg-card/90 px-3 py-2">Prinsengracht 412 · Westermarkt</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bericht aan de apotheek</CardTitle>
            <CardDescription>Geen medische spoed via dit formulier. Bel 112 bij ernstige klachten.</CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <p className="leading-relaxed">
                Bedankt. In de live omgeving gaat dit naar de balie-inbox. In deze demo is niets verzonden.
              </p>
            ) : (
              <form onSubmit={onSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Naam</FieldLabel>
                    <Input id="name" name="name" className="h-11 min-h-11" autoComplete="name" />
                  </Field>
                  <Field data-invalid={error ? true : undefined}>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="h-11 min-h-11"
                      autoComplete="email"
                      aria-invalid={Boolean(error)}
                    />
                  </Field>
                  <Field data-invalid={error ? true : undefined}>
                    <FieldLabel htmlFor="message">Bericht</FieldLabel>
                    <Textarea id="message" name="message" rows={6} aria-invalid={Boolean(error)} />
                    <FieldError>{error}</FieldError>
                  </Field>
                  <Button type="submit" disabled={pending}>
                    {pending ? <Spinner data-icon="inline-start" /> : null}
                    Versturen
                  </Button>
                </FieldGroup>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
