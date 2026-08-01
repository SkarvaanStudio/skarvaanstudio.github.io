/* ============================================================
   PRODUKT-KATALOG — für Sticker/Lesezeichen & Merch
   ============================================================

   WICHTIG — was sich geändert hat: Poster & Postkarten kommen
   jetzt NICHT mehr aus dieser Datei, sondern automatisch aus
   galerie-daten.js — jedes Bild, das dort in einer Kategorie
   steht, taucht automatisch im Shop unter "Poster & Postkarten"
   auf. Du musst dafür hier nichts mehr eintragen.

   Diese Datei ist jetzt nur noch zuständig für die Artikel, die
   du wirklich individuell und pro Motiv freigeben willst:
   Sticker/Lesezeichen und Merch. Beide Listen sind bewusst LEER —
   es erscheint nichts, bis du selbst Einträge ergänzst.

   SCHEMA — SO IST EIN EINTRAG AUFGEBAUT:

   Jedes Motiv kann in bis zu 2 Kategorien auftauchen:
   stickerLesezeichen, merch. Du legst nur die Kategorien an, in
   denen das Motiv wirklich angeboten werden soll.

   Jede Kategorie hat "varianten" — jede Variante hat einen Namen
   (z.B. "Sticker, einzeln") und eine eigene "mockups"-Liste
   (ein oder mehrere Bildpfade → wird automatisch zum Karussell,
   wenn mehr als ein Bild angegeben ist).

   Bei "merch" gibt es zusätzlich eine Ebene für Farben, weil du
   passend zur gewählten Farbe unterschiedliche Mockups zeigen willst:
   varianten -> [ { name: "Tasse", farben: [ {farbe, mockups}, ... ] } ]

   -------------------------------------------------------------
   BEISPIEL ZUM KOPIEREN (auskommentiert, wird nicht angezeigt):

   {
     id: "waldleben-eichhoernchen-sprung",
     motiv: "Eichhörnchen · im Sprung",
     kategorie: "Waldleben",

     stickerLesezeichen: {
       varianten: [
         { name: "Sticker, einzeln", mockups: ["bilder/mockups/eichhoernchen-sticker-1.jpg", "bilder/mockups/eichhoernchen-sticker-2.jpg"] }
         // Lesezeichen nur ergänzen, wenn du das Motiv dafür freigibst:
         // { name: "Lesezeichen", mockups: ["bilder/mockups/eichhoernchen-lesezeichen-1.jpg"] }
       ]
     },

     merch: {
       varianten: [
         {
           name: "Tasse",
           farben: [
             { farbe: "Weiß", mockups: ["bilder/mockups/eichhoernchen-tasse-weiss-1.jpg", "bilder/mockups/eichhoernchen-tasse-weiss-2.jpg"] },
             { farbe: "Schwarz", mockups: ["bilder/mockups/eichhoernchen-tasse-schwarz.jpg"] }
           ]
         },
         {
           name: "Shirt",
           farben: [
             { farbe: "Weiß", mockups: ["bilder/mockups/eichhoernchen-shirt-weiss.jpg"] },
             { farbe: "Schwarz", mockups: ["bilder/mockups/eichhoernchen-shirt-schwarz.jpg"] },
             { farbe: "Natur meliert", mockups: ["bilder/mockups/eichhoernchen-shirt-natur.jpg"] }
           ]
         }
       ]
     }
   }

   -------------------------------------------------------------
   NEUES MOTIV FREIGEBEN — SO GEHST DU VOR:
   1. Mockup-Fotos erstellen/exportieren (z.B. über Printful-
      Mockup-Generator oder eigene Fotos deiner Sticker) und in
      bilder/mockups/ ablegen.
   2. Oben stehendes Beispiel kopieren, in MOTIVE einfügen, anpassen.
   3. Nur die Kategorien/Varianten/Farben eintragen, die du wirklich
      freigeben willst — alles andere einfach weglassen.
   4. Datei speichern, hochladen — fertig.
============================================================= */

const MOTIVE = [

];

/* ============================================================
   EXTRAS — Artikel ohne Foto-Motiv-Bezug (z.B. ein fertiges
   Sticker-Design, Geschenkanhänger). Auch hier: leer, bis du
   selbst etwas einträgst.

   BEISPIEL ZUM KOPIEREN:
   {
     id: "extra-sticker-vogelset",
     motiv: "Vogel-Silhouetten-Set",
     typ: "sticker", // oder "geschenkanhaenger"
     varianten: [
       { name: "Sticker, einzeln", mockups: ["bilder/mockups/vogelset-1.jpg"] },
       { name: "Sticker-Set", mockups: ["bilder/mockups/vogelset-set-1.jpg", "bilder/mockups/vogelset-set-2.jpg"] }
     ]
   }
============================================================= */

const EXTRAS = [

];
