"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { PharmacyMark } from "@/components/pharmacy-mark";
import { useCart } from "@/components/cart-provider";
import { useAccount } from "@/components/account-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { pharmacy } from "@/lib/catalog";

const nav = [
  { href: "/", label: "Home" },
  { href: "/producten", label: "Producten" },
  { href: "/categorieen", label: "Categorieën" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const { account } = useAccount();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <div className="border-b bg-primary text-primary-foreground">
        <p className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2 text-center text-xs sm:text-sm">
          Bezorging in {pharmacy.shipping.area} vandaag bij bestelling vóór{" "}
          {pharmacy.shipping.sameDayCutoff} · BIG {pharmacy.big}
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu openen">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100%,20rem)]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <form action="/producten" className="px-4" role="search">
              <label htmlFor="mobile-search" className="sr-only">
                Zoek zelfzorgproducten
              </label>
              <Input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="Zoeken…"
                className="h-11 min-h-11"
              />
            </form>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex min-h-11 items-center gap-2 text-primary">
          <PharmacyMark />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-lg tracking-tight text-foreground">
              {pharmacy.name}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">Amsterdam</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Hoofdmenu">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-3 text-sm",
                  active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form action="/producten" className="ml-auto hidden min-w-0 flex-1 max-w-sm md:flex" role="search">
          <label htmlFor="header-search" className="sr-only">
            Zoek zelfzorgproducten
          </label>
          <div className="relative w-full">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="header-search"
              name="q"
              type="search"
              placeholder="Zoek paracetamol, vitamine D…"
              className="h-11 min-h-11 pl-10"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button variant="ghost" size="icon" asChild aria-label="Account">
            <Link href="/account">
              <UserIcon />
              <span className="sr-only">{account ? "Mijn account" : "Inloggen"}</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="relative" aria-label="Winkelwagen">
            <Link href="/winkelwagen">
              <ShoppingBagIcon />
              {count > 0 ? (
                <span className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground tabular-nums">
                  {count}
                </span>
              ) : null}
            </Link>
          </Button>
        </div>
      </div>
      <form action="/producten" className="px-4 pb-3 md:hidden" role="search">
        <label htmlFor="header-search-mobile" className="sr-only">
          Zoek zelfzorgproducten
        </label>
        <div className="relative mx-auto max-w-6xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="header-search-mobile"
            name="q"
            type="search"
            placeholder="Zoek paracetamol, vitamine D…"
            className="h-11 min-h-11 pl-10"
          />
        </div>
      </form>
    </header>
  );
}
