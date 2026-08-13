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
   STAFFELPREISE — Mengenrabatt als STÜCKPREIS.

   Postkarten:  ab 1 Stück 2,50 EUR | ab 3 Stück 2,00 EUR | ab 5 Stück 1,80 EUR
   Poster (A4): ab 1 Stück 15,00 EUR | ab 2 Stück 10,00 EUR

   WICHTIG — so wird gezählt: Es zählt die GESAMTZAHL über alle
   Motive hinweg, nicht pro Motiv. Wer 2 Entchen-Postkarten und
   1 Reiher-Postkarte nimmt, hat 3 Karten und zahlt damit 2,00 EUR
   pro Karte = 6,00 EUR. Postkarten und Poster werden dabei
   getrennt gezählt.

   So änderst du es: Zahlen anpassen oder eine Stufe ergänzen,
   z. B. { abMenge: 10, proStueck: 1.60 }. Stufen bitte aufsteigend
   nach abMenge sortiert lassen — der Shop nimmt automatisch die
   höchste Stufe, die erreicht ist.
   ------------------------------------------------------------- */
const STAFFEL = {
  postkarte: [
    { abMenge: 1, proStueck: 2.50 },
    { abMenge: 3, proStueck: 2.00 },
    { abMenge: 5, proStueck: 1.80 }
  ],
  poster: [
    { abMenge: 1, proStueck: 15.00 },
    { abMenge: 2, proStueck: 10.00 }
  ]
};

/* Höchstmenge, die pro Position im Anfrageformular wählbar ist. */
const MAX_MENGE = 50;

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
