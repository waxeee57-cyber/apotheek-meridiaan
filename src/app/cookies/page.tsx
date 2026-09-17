import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Cookieverklaring",
};

export default function CookiesPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
      <PageIntro
        eyebrow="AVG"
        title="Cookieverklaring"
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Cookies" },
        ]}
      />
      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <p>
          We plaatsen cookies en vergelijkbare technieken. Noodzakelijke cookies zijn nodig voor
          de winkelwagen, het account en de beveiliging van het formulier. Statistische en
          marketingcookies staan uit tot u ze aanzet in de cookiebanner.
        </p>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Noodzakelijk</h2>
          <p>
            <strong>meridiaan-cart</strong>, <strong>meridiaan-account</strong>,{" "}
            <strong>meridiaan-orders</strong>, <strong>meridiaan-cookies</strong> — localStorage,
            eerste partij, sessie-overschrijdend tot u ze wist.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl">Statistiek en marketing</h2>
          <p>
            In deze demonstratie worden geen meetpixels of advertentienetwerken geladen, ook niet
            als u ze accepteert. De keuze wordt alleen lokaal onthouden.
          </p>
        </section>
      </div>
    </article>
  );
}
