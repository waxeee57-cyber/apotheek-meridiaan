import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pharmacy } from "@/lib/catalog";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${pharmacy.name} · Amsterdam`,
    template: `%s · ${pharmacy.name}`,
  },
  description:
    "Zelfstandige Amsterdamse apotheek. Zelfzorg, vitaminen en EHBO met duidelijke bijsluiters. Bezorging in de stad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${outfit.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <a
            href="#inhoud"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
          >
            Ga naar inhoud
          </a>
          <SiteHeader />
          <main id="inhoud" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
