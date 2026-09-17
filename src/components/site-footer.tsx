import Link from "next/link";
import { PharmacyMark } from "@/components/pharmacy-mark";
import { Separator } from "@/components/ui/separator";
import { formatAddress } from "@/lib/format";
import { categories, pharmacy } from "@/lib/catalog";

const footerNav = [
  { href: "/over-ons", label: "Over ons" },
  { href: "/producten", label: "Webshop" },
  { href: "/categorieen", label: "Categorieën" },
  { href: "/account", label: "Account" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/voorwaarden", label: "Voorwaarden" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="flex items-center gap-2 text-primary">
            <PharmacyMark />
            <p className="font-heading text-xl text-foreground">{pharmacy.name}</p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Zelfstandige apotheek aan de Prinsengracht. Zelfzorg, vitaminen en EHBO met
            bijsluiter-precieze uitleg — geen drogisterij-toon.
          </p>
          <p className="text-sm">
            {formatAddress()}
            <br />
            {pharmacy.phone}
            <br />
            {pharmacy.email}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Navigatie</p>
          <ul className="flex flex-col gap-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Categorieën</p>
          <ul className="flex flex-col gap-2 text-sm">
            {categories.slice(0, 6).map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categorieen/${category.slug}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {pharmacy.legalName} · KvK {pharmacy.kvk} · btw {pharmacy.btw}
        </p>
        <p>Demonstratiewebshop. Geen echte verkoop van geneesmiddelen.</p>
      </div>
    </footer>
  );
}
