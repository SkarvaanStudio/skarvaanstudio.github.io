/* ============================================================
   PRODUKT-KATALOG & PREISE
   ============================================================

   Poster & Postkarten kommen weiterhin automatisch aus
   galerie-daten.js — jedes Bild, das dort steht, taucht im Shop
   unter der passenden Themen-Kategorie auf. Hier trägst du nur
   Sticker ein, plus die Preise für alles.

   ------------------------------------------------------------
   BESTELLWEG: Anfrage statt Sofortkauf.
   Der Shop zeigt bei jedem Produkt einen "Zur Anfrage
   hinzufügen"-Button. Ausgewählte Produkte landen gesammelt im
   Anfrageformular unten auf der Seite (Formspree) und werden dir
   als Mail zugeschickt — du meldest dich danach mit einem
   Angebot/einer Rechnung zurück. Kein Shopify, kein Sofort-
   Checkout nötig.

   ------------------------------------------------------------
   MERCH: aktuell bewusst NICHT im Sortiment.
   Der Shop hat keine Merch-Produktliste mehr — stattdessen steht
   dort nur noch ein Hinweis, dass Tassen, Caps & Co. auf Anfrage
   möglich sind (Kleidung ausgenommen, zu viel Retoure). Es gibt
   hier deshalb auch keine MERCH-Liste mehr zu pflegen. Falls du
   Merch später doch wieder fest ins Sortiment nimmst, sag
   Bescheid.
   ============================================================= */

/* ------------------------------------------------------------
   POSTER-FORMAT: es gibt nur noch EIN Standardformat (A4).
   A5/A6/A3 sind raus. Sonderformate laufen ausschließlich über
   das Anfrageformular (dann individueller Preis von dir).
   ------------------------------------------------------------- */
const POSTER_FORMAT = 'A4';

/* ------------------------------------------------------------
   PREISE — Einzelpreise, gelten für alle Motive gleich.
   ------------------------------------------------------------- */
const PREISE = {
  postkarte: 2.50,   // Einzelpreis, siehe Staffel unten
  poster: 15.00,     // Einzelpreis A4, siehe Staffel unten
  download: 4.00
};

/* ------------------------------------------------------------
   STAFFELPREISE — Mengenrabatte.

   Postkarten:  1 = 2,50 EUR  |  3 = 6,00 EUR  |  5 = 9,00 EUR
   Poster (A4): 1 = 15,00 EUR |  2 = 20,00 EUR

   So änderst du das: einfach Zahlen unten anpassen oder eine
   weitere Stufe ergänzen, z. B. { menge: 10, preis: 16.00 }.
   Der Shop baut die Mengen-Auswahl daraus automatisch.
   ------------------------------------------------------------- */
const STAFFEL = {
  postkarte: [
    { menge: 1, preis: 2.50 },
    { menge: 3, preis: 6.00 },
    { menge: 5, preis: 9.00 }
  ],
  poster: [
    { menge: 1, preis: 15.00 },
    { menge: 2, preis: 20.00 }
  ]
};

/* Dürfen für einen Staffelpreis auch verschiedene Motive
   gemischt werden? (z. B. 3 Postkarten = 3 unterschiedliche)
   true  -> Shop weist darauf hin, dass Motive mischbar sind.
   false -> Staffelpreis gilt nur pro identischem Motiv. */
const STAFFEL_MISCHBAR = true;

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
  //   motiv: 'Eichhörnchen - im Sprung',
  //   kategorie: 'Waldleben',
  //   preis: 3.00,
  //   mockups: ['bilder/mockups/eichhoernchen-sticker-1.jpg']
  // }

];
