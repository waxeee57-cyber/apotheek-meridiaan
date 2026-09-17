"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { createOptionalBrowserStore } from "@/lib/browser-store";
import { STORAGE_KEYS } from "@/lib/storage";
import type { CookieConsent } from "@/lib/types";

const cookieStore = createOptionalBrowserStore(STORAGE_KEYS.cookies);

export function CookieBanner() {
  const stored = useSyncExternalStore(
    cookieStore.subscribe,
    cookieStore.snapshot,
    cookieStore.getServerSnapshot,
  );
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const open = stored === "";

  function accept(next: Pick<CookieConsent, "analytics" | "marketing">) {
    cookieStore.set({
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      updatedAt: new Date().toISOString(),
    });
  }

  if (!open) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4" data-cookie-banner>
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border bg-card p-5 shadow-lg ring-1 ring-foreground/5">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-lg">Cookies op deze site</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We gebruiken noodzakelijke cookies om uw winkelwagen en account lokaal te bewaren.
            Statistische en marketingcookies staan standaard uit. Lees de{" "}
            <Link href="/cookies" className="underline underline-offset-4">
              cookieverklaring
            </Link>{" "}
            en het{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              privacybeleid
            </Link>
            .
          </p>
        </div>

        {settings ? (
          <div className="flex flex-col gap-4 rounded-xl bg-muted/60 p-4">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel>Noodzakelijk</FieldLabel>
                <FieldDescription>Winkelwagen, account, beveiliging. Altijd aan.</FieldDescription>
              </FieldContent>
              <Switch checked disabled aria-label="Noodzakelijke cookies altijd aan" />
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="cookie-analytics">Statistiek</FieldLabel>
                <FieldDescription>Anonieme bezoekcijfers. In deze demo wordt niets verstuurd.</FieldDescription>
              </FieldContent>
              <Switch
                id="cookie-analytics"
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="cookie-marketing">Marketing</FieldLabel>
                <FieldDescription>Geen advertentienetwerken in deze demonstratie.</FieldDescription>
              </FieldContent>
              <Switch
                id="cookie-marketing"
                checked={marketing}
                onCheckedChange={setMarketing}
              />
            </Field>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button className="min-h-11" onClick={() => accept({ analytics: true, marketing: true })}>
            Alles accepteren
          </Button>
          <Button
            variant="outline"
            className="min-h-11"
            onClick={() => accept({ analytics: false, marketing: false })}
          >
            Alleen noodzakelijk
          </Button>
          {settings ? (
            <Button
              variant="secondary"
              className="min-h-11"
              onClick={() => accept({ analytics, marketing })}
            >
              Selectie opslaan
            </Button>
          ) : (
            <Button variant="ghost" className="min-h-11" onClick={() => setSettings(true)}>
              Instellingen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
