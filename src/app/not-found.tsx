import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-xl flex-col gap-4 px-4 py-24">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">404</p>
      <h1 className="font-heading text-4xl">Deze pagina staat niet in het schap.</h1>
      <p className="text-muted-foreground">
        De link is verouderd of het product is uit het assortiment. Ga terug naar de webshop of de
        homepage.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/producten">Producten</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
