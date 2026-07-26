/* ============================================================
   PRODUKT-KATALOG — einzige Datei, die du pflegen musst!
   ============================================================

   WIE FUNKTIONIERT DAS?
   Jeder Eintrag in MOTIVE ist EIN Foto aus deiner Galerie.
   Über die "verfuegbar"-Flags legst du fest, in welchen
   Shop-Kategorien dieses Motiv automatisch auftaucht.
   Die Shop-Seite (produkte-bestellen.html) baut sich daraus
   von selbst zusammen — du musst dort nichts von Hand anpassen.

   NEUES FOTO HINZUFÜGEN — SO GEHST DU VOR:
   1. Foto in den passenden Ordner legen, z.B. bilder/waldleben/eichhoernchen4.jpg
   2. Hier unten in MOTIVE einen neuen Eintrag kopieren (z.B. den letzten)
      und anpassen: id, motiv (Anzeigename), bild (Pfad), kategorie.
   3. ausrichtung: "hoch" (Hochformat) oder "quer" (Querformat) eintragen.
      WICHTIG für Lesezeichen: nur Motive mit ausrichtung:"hoch" UND
      einem klar zentrierten Hauptmotiv eignen sich als Lesezeichen.
      Prüfe das an jedem Foto einzeln, bevor du lesezeichen:true setzt.
   4. Die anderen Flags (postkarte, sticker, fineart, merch) auf true/false
      setzen, je nachdem wo das Motiv angeboten werden soll.
   5. Fertig — Foto erscheint jetzt automatisch in allen zutreffenden
      Shop-Kategorien, inkl. Vorschaubild.

   HINWEIS ZU DEINEN BESTEHENDEN FOTOS:
   Ich habe hier die Motive aus deinen Galerien "Teichleben" und
   "Gartenleben" (die mit echten Dateipfaden) als Startpunkt übernommen.
   Mir ist aufgefallen, dass einige alt-Texte in galerie-gartenleben.html
   nicht zum jeweiligen Foto passen (z.B. blaumeise1.jpg mit
   alt="Buntspecht am Stamm"). Das lohnt sich, einmal in Ruhe zu bereinigen,
   unabhängig vom Shop hier. Ich habe stattdessen die Namen aus den
   Dateinamen abgeleitet — bitte einmal gegen die echten Fotos prüfen.
   "waldleben" und "reduktion/silhouetten" stehen in deinem Repo noch als
   Platzhalter ("FOTO ERSETZEN") — die habe ich hier bewusst NICHT
   erfunden. Sobald du echte Fotos einpflegst, hier einfach ergänzen.
============================================================= */

const MOTIVE = [
  // ---------- TEICHLEBEN ----------
  {
    id: "teichleben-entchen1",
    motiv: "Entchen · Nahaufnahme frontal",
    bild: "bilder/teichleben/entchen1.jpg",
    kategorie: "Teichleben",
    ausrichtung: "quer", // TODO: gegen Original prüfen
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "teichleben-entchen2",
    motiv: "Gänseküken · schläft neben Gänseblümchen",
    bild: "bilder/teichleben/entchen2.jpg",
    kategorie: "Teichleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "teichleben-entchen3",
    motiv: "Entenküken · zwei am Ufer",
    bild: "bilder/teichleben/entchen3.jpg",
    kategorie: "Teichleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "teichleben-ente1",
    motiv: "Stockente · breitet Flügel auf dem Wasser aus",
    bild: "bilder/teichleben/ente1.jpg",
    kategorie: "Teichleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "teichleben-reiher1",
    motiv: "Reiher · im Winter im Wasser stehend",
    bild: "bilder/teichleben/reiher1.jpg",
    kategorie: "Teichleben",
    ausrichtung: "hoch", // TODO: prüfen — wenn ja, guter Lesezeichen-Kandidat
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "teichleben-reiher2",
    motiv: "Reiher · im Wasser mit Grünschimmer",
    bild: "bilder/teichleben/reiher2.jpg",
    kategorie: "Teichleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "teichleben-blaesshuhn1",
    motiv: "Blässhuhn · frontal schwimmend",
    bild: "bilder/teichleben/blaesshuhn1.jpg",
    kategorie: "Teichleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },

  // ---------- GARTENLEBEN ----------
  // Hinweis: Dateinamen als Grundlage genommen, da alt-Texte in der
  // Originaldatei teils nicht zum Foto passen — bitte einmal prüfen.
  {
    id: "gartenleben-rotkehlchen1",
    motiv: "Rotkehlchen · auf einem Ast",
    bild: "bilder/gartenleben/rotkehlchen1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-rotkehlchen2",
    motiv: "Rotkehlchen · Variante 2",
    bild: "bilder/gartenleben/rotkehlchen2.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-rotkehlchen3",
    motiv: "Rotkehlchen · Variante 3",
    bild: "bilder/gartenleben/rotkehlchen3.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-kohlmeise1",
    motiv: "Kohlmeise · im Grünen",
    bild: "bilder/gartenleben/kohlmeise1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-blaumeise1",
    motiv: "Blaumeise · Porträt",
    bild: "bilder/gartenleben/blaumeise1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-blaumeise2",
    motiv: "Blaumeise · im Raureif",
    bild: "bilder/gartenleben/blaumeise2.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-eichelhaeher1",
    motiv: "Eichelhäher · Porträt",
    bild: "bilder/gartenleben/eichelhaeher1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-schwanzmeise1",
    motiv: "Schwanzmeise · auf einem Zweig",
    bild: "bilder/gartenleben/schwanzmeise1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-schwanzmeise2",
    motiv: "Schwanzmeise · Variante 2",
    bild: "bilder/gartenleben/schwanzmeise2.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-schwanzmeise3",
    motiv: "Schwanzmeise · Variante 3",
    bild: "bilder/gartenleben/schwanzmeise3.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-schwanzmeise4",
    motiv: "Schwanzmeise · im Flug, frontal in die Kamera",
    bild: "bilder/gartenleben/schwanzmeise4.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-zaunkoenig1",
    motiv: "Zaunkönig · im Gebüsch",
    bild: "bilder/gartenleben/zaunkoenig1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-sumpfmeise1",
    motiv: "Sumpfmeise · Porträt",
    bild: "bilder/gartenleben/sumpfmeise1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-schmetterling1",
    motiv: "Schmetterling · Variante 1",
    bild: "bilder/gartenleben/schmetterling1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-schmetterling2",
    motiv: "Schmetterling · Variante 2",
    bild: "bilder/gartenleben/schmetterling2.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-katze1",
    motiv: "Katze · Porträt",
    bild: "bilder/gartenleben/katze1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-goldammer1",
    motiv: "Goldammer · Porträt",
    bild: "bilder/gartenleben/goldammer1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-dorngrasmuecke1",
    motiv: "Dorngrasmücke · Frühlingsgezwitscher",
    bild: "bilder/gartenleben/dorngrasmuecke1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  },
  {
    id: "gartenleben-gimpel2",
    motiv: "Gimpel · im Winter",
    bild: "bilder/gartenleben/gimpel2.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-gimpel3",
    motiv: "Gimpel · auf einem Zweig",
    bild: "bilder/gartenleben/gimpel3.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "hoch",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: true, fineart: true, merch: true }
  },
  {
    id: "gartenleben-singdrossel1",
    motiv: "Singdrossel · singend auf Tannengrün",
    bild: "bilder/gartenleben/singdrossel1.jpg",
    kategorie: "Gartenleben",
    ausrichtung: "quer",
    verfuegbar: { postkarte: true, sticker: true, lesezeichen: false, fineart: true, merch: true }
  }

  // ---------- WALDLEBEN / REDUKTION ----------
  // Noch keine echten Fotos hinterlegt (Galerie-Unterseiten sind bei dir
  // aktuell Platzhalter). Sobald du dort echte Fotos einpflegst, hier
  // nach demselben Muster ergänzen.
];

/* ============================================================
   EXTRAS — Artikel, die NICHT direkt an ein Galerie-Foto gebunden
   sind (z. B. Sticker-Sets, die du bereits fertig hast, oder
   Geschenkanhänger). Hier einfach weitere Zeilen ergänzen.
============================================================= */
const EXTRAS = [
  {
    id: "extra-sticker-vogelset",
    motiv: "Vogel-Silhouetten-Set (fertig vorrätig)",
    bild: "bilder/sticker.jpg",
    typ: "sticker",
    varianten: ["Sticker, einzeln", "Sticker-Set"]
  },
  {
    id: "extra-geschenkanhaenger-wald",
    motiv: "Geschenkanhänger · Waldtiere",
    bild: "bilder/sticker.jpg", // TODO: eigenes Vorschaubild ergänzen
    typ: "geschenkanhaenger",
    varianten: ["3er-Set", "6er-Set"]
  }
  // Weitere Extras (z. B. weitere Sticker-Designs) hier ergänzen.
];

/* ============================================================
   MERCH — Produkttypen mit jeweils eigenen Farboptionen.
   Hier einfach einen weiteren Produkttyp oder Farben ergänzen.
============================================================= */
const MERCH_FARBEN = {
  "Tasse": ["Weiß", "Schwarz"],
  "Shirt": ["Weiß", "Schwarz", "Natur meliert"],
  "Kissenbezug": ["Weiß", "Beige"],
  "Stoffbeutel": ["Natur", "Schwarz"]
};
