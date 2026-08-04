/* ============================================================
   PRODUKT-KATALOG & PREISE — für Sticker & Merch
   ============================================================

   Poster & Postkarten kommen weiterhin automatisch aus
   galerie-daten.js — jedes Bild, das dort steht, taucht im Shop
   unter der passenden Themen-Kategorie auf. Hier trägst du nur
   Sticker und Merch ein, plus die Basis-Preise für alles.

   ------------------------------------------------------------
   BESTELLWEG: Anfrage statt Sofortkauf.
   Der Shop zeigt bei jedem Produkt einen "Zur Anfrage
   hinzufügen"-Button. Ausgewählte Produkte landen gesammelt im
   Anfrageformular unten auf der Seite (Formspree) und werden dir
   als Mail zugeschickt — du meldest dich danach mit einem
   Angebot/einer Rechnung zurück. Kein Shopify, kein Sofort-
   Checkout nötig. Wenn ihr später doch auf einen echten Shop
   umstellt, ist das ein separater Umbauschritt.
   ============================================================= */

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
     mockups: ["bilder/mockups/....jpg"]
   }
   ------------------------------------------------------------- */
const STICKER = [

  // BEISPIEL ZUM KOPIEREN (auskommentiert):
  // {
  //   id: 'sticker-eichhoernchen',
  //   motiv: 'Eichhörnchen · im Sprung',
  //   kategorie: 'Waldleben',
  //   preis: 3.00,
  //   mockups: ['bilder/mockups/eichhoernchen-sticker-1.jpg']
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
     farben: [ { farbe: "Weiß", mockups: [...] }, ... ]
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
  //   ]
  // }

];
