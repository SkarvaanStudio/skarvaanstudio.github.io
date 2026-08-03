/* ============================================================
   PRODUKT-KATALOG & PREISE — für Sticker & Merch
   ============================================================

   Poster & Postkarten kommen weiterhin automatisch aus
   galerie-daten.js — jedes Bild, das dort steht, taucht im Shop
   unter der passenden Themen-Kategorie auf. Hier trägst du nur
   Sticker und Merch ein, plus die Basis-Preise für alles.

   ------------------------------------------------------------
   SHOPIFY-ANBINDUNG (Platzhalter):
   Sobald dein Shopify-Store steht, ersetzt du unten in
   SHOPIFY_CONFIG die Platzhalter-Werte durch deine echten Daten
   (siehe ANLEITUNG-SHOP.md). Bis dahin zeigt der Shop an jeder
   Kaufen-Stelle einen deutlich sichtbaren Platzhalter-Kasten,
   nichts ist "heimlich" halb-fertig.
   ============================================================= */

const SHOPIFY_CONFIG = {
  // ERSETZEN: deine Shopify-Domain, z. B. "bg-naturfotografie.myshopify.com"
  domain: 'ERSETZEN-mein-shop.myshopify.com',
  // ERSETZEN: dein Storefront-Access-Token aus Shopify (Buy Button Kanal)
  storefrontAccessToken: 'ERSETZEN-storefront-token',
  // Ist die Anbindung schon aktiv? Auf true stellen, sobald echte
  // Produkt-IDs unten eingetragen sind — dann verschwinden die
  // Platzhalter-Kästen automatisch.
  aktiv: false
};

/* ------------------------------------------------------------
   BASIS-PREISE — gelten für alle Motive gleich. Einzelnes Motiv
   kann über "preisUeberschreibung" im jeweiligen Eintrag
   abweichen (z. B. ein aufwendigeres Sonderformat) — normalerweise
   brauchst du das aber nicht.
   ------------------------------------------------------------- */
const PREISE = {
  postkarte: 2.50,
  posterA5: 16.99,
  posterA4: 24.99,
  posterA3: 34.99,
  download: 4.00
};

/* ------------------------------------------------------------
   STICKER & LESEZEICHEN
   Schema pro Eintrag:
   {
     id: "eindeutige-id",
     motiv: "Anzeigename",
     kategorie: "Teichleben" | "Gartenleben" | "Waldleben" | "Reduktion" | null,
     preis: 3.00,
     mockups: ["bilder/mockups/....jpg"],
     shopifyVariantId: "ERSETZEN-sobald-shopify-steht"
   }
   ------------------------------------------------------------- */
const STICKER = [

  // BEISPIEL ZUM KOPIEREN (auskommentiert):
  // {
  //   id: 'sticker-eichhoernchen',
  //   motiv: 'Eichhörnchen · im Sprung',
  //   kategorie: 'Waldleben',
  //   preis: 3.00,
  //   mockups: ['bilder/mockups/eichhoernchen-sticker-1.jpg'],
  //   shopifyVariantId: 'ERSETZEN'
  // }

];

/* ------------------------------------------------------------
   MERCH — in drei feste Unterkategorien einsortiert:
   "shirts", "tassen", "weiteres" (für alles Neue, was noch keine
   eigene Kategorie verdient — Kissen, Beutel, etc.)

   Schema pro Eintrag:
   {
     id: "eindeutige-id",
     motiv: "Anzeigename",
     typ: "shirts" | "tassen" | "weiteres",
     preis: 24.00,
     farben: [ { farbe: "Weiß", mockups: [...] }, ... ],
     shopifyProductId: "ERSETZEN-sobald-shopify-steht"
   }
   ------------------------------------------------------------- */
const MERCH = [

  // BEISPIEL ZUM KOPIEREN (auskommentiert):
  // {
  //   id: 'merch-eichhoernchen-shirt',
  //   motiv: 'Eichhörnchen · im Sprung',
  //   typ: 'shirts',
  //   preis: 24.00,
  //   farben: [
  //     { farbe: 'Weiß', mockups: ['bilder/mockups/eichhoernchen-shirt-weiss.jpg'] },
  //     { farbe: 'Schwarz', mockups: ['bilder/mockups/eichhoernchen-shirt-schwarz.jpg'] }
  //   ],
  //   shopifyProductId: 'ERSETZEN'
  // }

];
