import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Bestelling ontvangen",
};

type Props = {
  searchParams: Promise<{ order?: string }>;
};

export default async function ThanksPage({ searchParams }: Props) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16">
      <PageIntro
        eyebrow="Bevestiging"
        title="We hebben uw bestelling (demo) genoteerd."
        description="Er is niets afgeschreven. In een live WooCommerce-koppeling zou hier de iDEAL-bevestiging en de track-and-trace staan."
      />
      <Card>
        <CardHeader>
          <CardTitle>Ordernummer</CardTitle>
          <CardDescription className="font-medium text-foreground tabular-nums">
            {order ?? "AM-demo"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/account">Naar mijn account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/producten">Verder winkelen</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
