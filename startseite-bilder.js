/* ============================================================
   BÜHNENBILDER DER STARTSEITE — hier wählst du aus
   ============================================================

   Diese Datei bestimmt, welche Fotos oben auf der Startseite
   durchlaufen. Sonst musst du nichts anfassen: Serie, Aufnahmeort
   und der Link zur Geschichte kommen weiterhin automatisch aus
   galerie-daten.js.

   ------------------------------------------------------------
   SO TRÄGST DU EIN MOTIV EIN
   ------------------------------------------------------------
   Du brauchst nur die id aus galerie-daten.js, also z.B.
   'waldleben1' oder 'teichleben3'. Eine Zeile pro Motiv:

       { id: 'waldleben1' },

   ------------------------------------------------------------
   WENN DAS BILD UNGÜNSTIG BESCHNITTEN IST
   ------------------------------------------------------------
   Die Bühne ist breit und flach, das Foto füllt sie komplett aus.
   Bei hohen Bildern wird deshalb oben und unten etwas abgeschnitten.
   Mit "ausschnitt" bestimmst du, welcher Teil stehen bleibt:

       { id: 'waldleben1', ausschnitt: 'center 30%' },

   Der erste Wert ist links/rechts, der zweite oben/unten.
   Kleinere Prozentzahl = mehr vom oberen Bildrand ist zu sehen.

       'center top'      ganz oben ausrichten
       'center 30%'      etwas unterhalb der Oberkante
       'center'          Mitte (Standard, kann man weglassen)
       'center 70%'      eher unten
       'center bottom'   ganz unten ausrichten
       'left center'     linke Bildhälfte
       'right center'    rechte Bildhälfte

   Faustregel: Steht das Tier im oberen Bilddrittel, nimm
   'center 30%'. Sitzt es unten, nimm 'center 70%'.

   ------------------------------------------------------------
   REIHENFOLGE UND ANZAHL
   ------------------------------------------------------------
   Die Motive laufen genau in der Reihenfolge durch, in der sie
   hier stehen. Drei bis sechs sind ein guter Wert — bei mehr
   sieht kaum jemand die hinteren.

   Querformat wirkt hier deutlich besser als Hochformat.

   ------------------------------------------------------------
   LEERE LISTE
   ------------------------------------------------------------
   Lässt du die Liste leer, sucht sich die Startseite wie bisher
   automatisch fünf Motive aus, die du als Postkarte auf Lager
   hast. Du kannst also jederzeit zurück auf Automatik.
   ============================================================= */

const STARTSEITE_BILDER = [

  { id: 'waldleben1' },
  { id: 'teichleben1' },
  { id: 'gartenleben21' },
  { id: 'reduktion3' },
  { id: 'waldleben5' }

];

/* ------------------------------------------------------------
   Standzeit pro Bild in Sekunden. Kleiner = schnellerer Wechsel.
   Unter 4 wird es unruhig, über 10 merkt man den Wechsel kaum.
   ------------------------------------------------------------- */
const STARTSEITE_WECHSEL_SEKUNDEN = 7;
