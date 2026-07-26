/* ============================================================
   PRODUKT-KATALOG — einzige Datei, die du pflegen musst!
   ============================================================

   WICHTIG: Diese Listen sind bewusst LEER. Es erscheint auf der
   Shop-Seite NICHTS, bis du hier selbst Einträge ergänzt. Du
   entscheidest pro Motiv und pro Variante (z.B. pro Farbe), ob und
   mit welchen Mockup-Fotos es angezeigt wird.

   SCHEMA — SO IST EIN EINTRAG AUFGEBAUT:

   Jedes Motiv kann in bis zu 4 Kategorien auftauchen: postkarte,
   stickerLesezeichen, fineart, merch. Du legst nur die Kategorien
   an, in denen das Motiv wirklich angeboten werden soll — fehlt
   z.B. "merch" komplett, taucht das Motiv dort auch nicht auf.

   Jede Kategorie hat "varianten" — jede Variante hat einen Namen
   (z.B. "Postkarte, einzeln") und eine eigene "mockups"-Liste
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

     postkarte: {
       varianten: [
         { name: "Postkarte, einzeln", mockups: ["bilder/mockups/eichhoernchen-postkarte-1.jpg"] },
         { name: "Postkarten-Set (3 Stück)", mockups: ["bilder/mockups/eichhoernchen-postkarte-set.jpg"] }
       ]
     },

     stickerLesezeichen: {
       varianten: [
         { name: "Sticker, einzeln", mockups: ["bilder/mockups/eichhoernchen-sticker-1.jpg", "bilder/mockups/eichhoernchen-sticker-2.jpg"] }
         // Lesezeichen nur ergänzen, wenn du das Motiv dafür freigibst:
         // { name: "Lesezeichen", mockups: ["bilder/mockups/eichhoernchen-lesezeichen-1.jpg"] }
       ]
     },

     fineart: {
       varianten: [
         { name: "Format A4", mockups: ["bilder/mockups/eichhoernchen-a4.jpg"] },
         { name: "Format A3", mockups: ["bilder/mockups/eichhoernchen-a3.jpg"] }
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
   1. Mockup-Fotos erstellen/exportieren (z.B. über Printful/Gelato-
      Mockup-Generator oder eigene Fotos deiner Postkarten/Sticker)
      und in bilder/mockups/ ablegen.
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
