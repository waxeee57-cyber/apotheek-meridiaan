# Apotheek Meridiaan — PRODUCT.md

Amsterdamse zelfzorg-apotheek. Demo voor een market-leading Dutch pharmaceutical webshop: informatief én webshop, zonder de flash van consumenten-e-commerce.

## Product

Apotheek Meridiaan is de digitale balie van een zelfstandige Amsterdamse apotheek. Bezoekers komen voor betrouwbare zelfzorg, duidelijke bijsluiters en bezorging in de stad — niet voor kortingsbanners.

Doelgroep: Amsterdammers en Randstedelingen die zelfzorgproducten, vitaminen en EHBO willen bestellen bij een apotheker, niet bij een drogist.

## Brand

- **Naam:** Apotheek Meridiaan
- **Plaats:** Prinsengracht 412, 1016 JC Amsterdam
- **Toon:** rustig, deskundig, concreet. Geen superlatieven, geen “welkom in onze webshop”.
- **Taal:** Nederlands (formeel-u / professioneel, tutoyeren vermijden in klinische context; “u” in account/checkout).
- **Niet:** DomRol-goud, saturatie, WooCommerce-defaults, stock-foto’s van glimlachende artsen.

## Visual

Gemeten palet (apothekerskruis / KNMP-groen, hue ≈ 162° — niet 34° goud):

| Token | Hex | Rol |
|---|---|---|
| Ink | `#14241F` | koppen, body |
| Primary | `#1A5C4E` | knoppen, links, kruis |
| Primary hover | `#154A3F` | interactie |
| Sage | `#E7F0EB` | vlakken, chips |
| Ice | `#E8EEF0` | klinische secundaire vlakken |
| Paper | `#F5F7F4` | pagina-achtergrond |
| Surface | `#FFFFFF` | kaarten |
| Muted | `#5A6B65` | bijschriften |
| Line | `#D5DFD9` | randen |
| Success | `#2A7A5C` | voorraad, bevestiging |
| Caution | `#A15C28` | waarschuwing zelfzorg |
| Error | `#B42318` | fouten, AVG-weigering |

Typografie:

- Koppen: **Newsreader** (serif, tijdschrift/bijsluiter).
- UI/body: **Outfit** (kalm geometrisch, geen Inter).
- Tabulaire prijzen: `tabular-nums`.

Vorm: 8–12px radius, dunne randen, veel witruimte, geen drop-shadows zwaarder dan 4%. Apothekerskruis als geometrisch merkteken (vierkant + inkeping), geen clipart.

Productbeelden: CSS/SVG-verpakkingen per categorie (doos, tube, fles, blister) — geen AI-gegenereerde tekst, geen foto’s.

## Surfaces

1. **Home** — vertrouwen, openingstijden, categorieën, uitgelichte zelfzorg, apotheker-consult.
2. **Over ons** — team, BIG, vestiging, werkwijze.
3. **Producten** — grid, zoeken, filters (categorie, voorraad, prijs, tags).
4. **Categorieën** — overzicht + gefilterde shop.
5. **Productdetail** — prijs EUR, dosering, waarschuwingen, gerelateerd.
6. **Winkelwagen / Afrekenen** — demo checkout, succespagina.
7. **Account** — inloggen/registreren (lokaal demo), bestellingen, gegevens.
8. **Contact** — formulier, kaart-placeholder, telefoon.
9. **Privacy / cookies** — AVG-banner (alles / alleen noodzakelijk / instellingen).

## States

- Leeg: winkelwagen, zoekresultaten, account zonder bestellingen.
- Laden: knoppen met spinner, geen skeleton-theater.
- Fout: formulier `aria-invalid`, nette melding, geen alert().
- Demo: duidelijke “demonstratie”-markering bij checkout en account, nooit fake medische claims.

## Constraints

- Next.js App Router, TypeScript strict, Tailwind, shadcn/ui.
- Prijzen intern in EUR; weergave `€ 12,50`.
- Geen backend, geen secrets. Cart/account in `localStorage`.
- Touch targets ≥ 44px. Focus-ringen zichtbaar.
- `npm run build` moet slagen.
