"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAccount } from "@/components/account-provider";
import { DemoNotice } from "@/components/demo-notice";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatEuro } from "@/lib/format";

export default function AccountPage() {
  const { account, orders, login, logout, ready } = useAccount();
  const [mode, setMode] = useState("inloggen");
  const [error, setError] = useState<string | null>(null);

  function onAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim() || email.split("@")[0];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Vul een geldig e-mailadres in.");
      return;
    }
    if (password.length < 6) {
      setError("Kies een wachtwoord van minstens 6 tekens (alleen lokaal opgeslagen).");
      return;
    }
    setError(null);
    login({ name, email });
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
      <PageIntro
        eyebrow="Account"
        title={account ? `Welkom, ${account.name}` : "Inloggen of registreren"}
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Account" },
        ]}
      />
      <DemoNotice>
        Geen echte authenticatie. Sessie en bestellingen blijven in localStorage van deze browser.
      </DemoNotice>

      {!ready ? (
        <p className="text-sm text-muted-foreground">Account laden…</p>
      ) : account ? (
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gegevens</CardTitle>
              <CardDescription>
                {account.email}
                <br />
                Herhaalrecepten en het medicatiedossier koppelen we in productie aan het apotheek-AIS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button type="button" variant="outline" onClick={logout}>
                Uitloggen
              </Button>
            </CardContent>
          </Card>

          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-2xl">Bestellingen</h2>
            {orders.length === 0 ? (
              <Empty className="border bg-card">
                <EmptyHeader>
                  <EmptyTitle>Nog geen bestellingen</EmptyTitle>
                  <EmptyDescription>
                    Plaats een demobestelling via de winkelwagen om hier een orderregel te zien.
                  </EmptyDescription>
                </EmptyHeader>
                <Button asChild variant="outline">
                  <Link href="/producten">Naar de shop</Link>
                </Button>
              </Empty>
            ) : (
              <ul className="flex flex-col gap-3">
                {orders.map((order) => (
                  <li key={order.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="tabular-nums">{order.id}</CardTitle>
                        <CardDescription>
                          {new Date(order.createdAt).toLocaleString("nl-NL")} ·{" "}
                          {order.fulfillment === "afhalen" ? "Afhalen" : "Bezorging"} ·{" "}
                          {formatEuro(order.total)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {order.items.map((item) => (
                          <p key={item.slug}>
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Toegang tot uw dossier (demo)</CardTitle>
            <CardDescription>
              Gebruik een willekeurig e-mailadres. Er wordt geen mail verstuurd.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={setMode}>
              <TabsList className="h-11 min-h-11 w-full">
                <TabsTrigger value="inloggen" className="min-h-10">
                  Inloggen
                </TabsTrigger>
                <TabsTrigger value="registreren" className="min-h-10">
                  Registreren
                </TabsTrigger>
              </TabsList>
              <TabsContent value="inloggen">
                <form onSubmit={onAuth} className="pt-4">
                  <AuthFields register={false} error={error} />
                </form>
              </TabsContent>
              <TabsContent value="registreren">
                <form onSubmit={onAuth} className="pt-4">
                  <AuthFields register error={error} />
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AuthFields({ register, error }: { register: boolean; error: string | null }) {
  return (
    <FieldGroup>
      {register ? (
        <Field>
          <FieldLabel htmlFor="name">Naam</FieldLabel>
          <Input id="name" name="name" className="h-11 min-h-11" autoComplete="name" />
        </Field>
      ) : null}
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
        <FieldLabel htmlFor="password">Wachtwoord</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          className="h-11 min-h-11"
          autoComplete={register ? "new-password" : "current-password"}
          aria-invalid={Boolean(error)}
        />
        <FieldDescription>Minimaal 6 tekens. Alleen lokaal, niet versleuteld naar een server.</FieldDescription>
        <FieldError>{error}</FieldError>
      </Field>
      <Button type="submit">{register ? "Account aanmaken" : "Inloggen"}</Button>
    </FieldGroup>
  );
}
