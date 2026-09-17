# Apotheek Meridiaan

Demonstratiewebshop voor een zelfstandige Amsterdamse apotheek. Next.js App Router, TypeScript, Tailwind, shadcn/ui. Volledig Nederlandse UI, zelfzorgassortiment, winkelwagen en AVG-cookiebanner.

**Dit is geen live apotheek.** Er wordt niet echt geleverd of afgerekend.

---

## Nederlands

### Wat zit erin

- Pagina’s: Home, Over ons, Producten (zoeken + filters), Categorieën, Productdetail, Winkelwagen, Afrekenen, Bedankt, Account, Contact, Privacy, Cookies, Voorwaarden
- 12 voorbeeldproducten in 8 categorieën, prijzen in euro
- Winkelwagen, account en demobestellingen in `localStorage`
- GDPR/AVG-banner: alles / alleen noodzakelijk / instellingen
- Minimale zorg-esthetiek (apothekersgroen, serif koppen)

### Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Productiebuild:

```bash
npm run build
npm start
```

Geen `.env` nodig.

### Oplevering naar WooCommerce

1. **Catalogus** — SKU’s, prijzen (EUR), btw 9/21%, voorraad en bijsluiters uit dit repo (`src/data/products.json`) mappen op WooCommerce producten + categorieën.
2. **Thema** — dit Next-front als headless storefront (Store API) of de visuele tokens overzetten naar een custom Woo-theme. Kleuren: primary `#1A5C4E`, papier `#F5F7F4`, inkt `#14241F`.
3. **Account & checkout** — vervang de demo-login door Woo / WordPress users; iDEAL via Mollie of MultiSafePay; geen localStorage meer voor orders.
4. **Zorgplicht** — receptuur blijft in het AIS. Alleen zelfzorg online, met leeftijds- en interactiechecks door een apotheker.
5. **AVG** — cookiebanner koppelen aan een CMP; privacyverklaring laten toetsen; geen gezondheidsdata in de webshop-database.
6. **Bezorging** — koppel PostNL/DHL of eigen fietskoerier; cutoff 14:00 zoals in de header.

---

## English

Dutch pharmaceutical demo storefront: info pages plus shop, cart/checkout mock, account UI, GDPR banner, 12 sample OTC products. Healthcare-minimal visual language.

```bash
npm install
npm run dev
```

No environment variables. Cart, session and demo orders live in the browser.

### Handoff to WooCommerce

Map `src/data/products.json` to Woo products (EUR, VAT 9/21). Keep this UI as a headless Next.js storefront on the Store API, or port tokens into a custom theme. Replace localStorage auth/checkout with Woo + iDEAL. Leave prescriptions in the pharmacy AIS; sell OTC only. Wire a real CMP for cookies.
