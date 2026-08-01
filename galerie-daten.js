/* ============================================================
   GALERIE-BILDER — einzige Datei, die du für neue Fotos pflegst!
   ============================================================

   Diese Liste ist die GEMEINSAME Quelle für zwei Dinge:
   1. Die Galerie-Unterseiten (galerie-teichleben.html,
      galerie-gartenleben.html, ...) — sie lesen daraus und bauen
      ihre Bilder-Wand automatisch auf (siehe gallery.js).
   2. Den Shop (produkte-bestellen.html) — der Bereich "Poster &
      Postkarten" zeigt automatisch JEDES Bild aus dieser Liste an.
      Kein zusätzlicher Eintrag im Shop nötig!

   NEUES FOTO ZUR GALERIE HINZUFÜGEN — SO GEHST DU VOR:
   1. Bilddatei in den passenden Ordner legen, z. B.
      bilder/teichleben/neuesbild.jpg
   2. Hier unten eine neue Zeile in der passenden Kategorie
      ergänzen (id, kategorie, bild-Pfad, alt-Text, beschriftung).
   3. Datei speichern, hochladen — fertig. Taucht automatisch in
      der Galerie-Unterseite UND im Shop unter Poster/Postkarten auf.

   FELDER:
   - alt: Alternativtext fürs Bild (Barrierefreiheit/SEO) — kurzer,
     sachlicher Satz.
   - beschriftung: Die kurze Bildunterschrift, die in der Galerie
     als Figcaption erscheint UND im Shop als Produktname für
     Poster/Postkarte dient. Darf HTML enthalten, z.B.
     "<b>Rotkehlchen</b> · Ast".
   - bereitsPostkarte:
     - true  → Motiv ist schon als gedruckte Postkarte auf Lager,
               bekommt im Shop ein ★ ("sofort versandfertig").
     - false → Motiv gibt's noch nicht als Postkarte gedruckt; wird
               bei Bestellung erst in Auftrag gegeben (etwas längere
               Lieferzeit). Für Poster/Fine-Art-Print bei WirmachenDruck
               ist das ohnehin bei jedem Motiv gleich (wird für dich
               in deinem gewählten Format gedruckt).

   WICHTIG FÜR DICH GERADE JETZT: Du hast 26 Motive bereits als
   Postkarte auf Lager. Unten steht erstmal bei ALLEN Motiven
   "bereitsPostkarte: false", weil ich nicht weiß, welche 26 der
   28 Motive das genau sind. Bitte bei den passenden Zeilen auf
   "true" umstellen — dann erscheint dort automatisch das ★ im Shop.
   ============================================================= */

const GALERIE_BILDER = [

  // ---- Teichleben ----
  { id: 'teichleben-entchen1', kategorie: 'Teichleben', bild: 'bilder/teichleben/entchen1.jpg', alt: 'Entchen Nahaufnahme frontal', beschriftung: '<b>Entenküken</b> · Nahaufnahme', bereitsPostkarte: true },
  { id: 'teichleben-entchen2', kategorie: 'Teichleben', bild: 'bilder/teichleben/entchen2.jpg', alt: 'schlafendes Gänseküken neben Gänseblümchen', beschriftung: '<b>Gänseküken</b> · schlafend bei Gänseblümchen', bereitsPostkarte: true },
  { id: 'teichleben-entchen3', kategorie: 'Teichleben', bild: 'bilder/teichleben/entchen3.jpg', alt: 'zwei Entenküken am Ufer eines Teichs', beschriftung: '<b>Entenküken</b> · Sonnenbaden', bereitsPostkarte: true },
  { id: 'teichleben-ente1', kategorie: 'Teichleben', bild: 'bilder/teichleben/ente1.jpg', alt: 'Stockente breitet die Flügel auf dem Wasser aus', beschriftung: '<b>Stockente</b> · Flügelzauber', bereitsPostkarte: true },
  { id: 'teichleben-reiher1', kategorie: 'Teichleben', bild: 'bilder/teichleben/reiher1.jpg', alt: 'Reiher im Winter im Wasser stehend', beschriftung: '<b>Reiher</b> · Winterkälte', bereitsPostkarte: false },
  { id: 'teichleben-reiher2', kategorie: 'Teichleben', bild: 'bilder/teichleben/reiher.jpg', alt: 'Reiher im Wasser stehend mit Grünschimmer', beschriftung: '<b>Reiher</b> · Frühlingsgrün', bereitsPostkarte: true },
  { id: 'teichleben-blaesshuhn1', kategorie: 'Teichleben', bild: 'bilder/teichleben/blaesshuhn1.jpg', alt: 'Blässhuhn frontal schwimmend', beschriftung: '<b>Blässhuhn</b> · schwimmend', bereitsPostkarte: false },
  { id: 'teichleben-puffin', kategorie: 'Teichleben', bild: 'bilder/teichleben/puffin.jpg', alt: 'Papageientaucher auf Felsvorsprung', beschriftung: '<b>Papageientaucher</b> · Brutkolonie Schottland', bereitsPostkarte: true },
  // ---- Gartenleben ----
  { id: 'gartenleben-rotkehlchen1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/rotkehlchen1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Rotkehlchen</b> · Ast', bereitsPostkarte: false },
  { id: 'gartenleben-kohlmeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/kohlmeise1.jpg', alt: 'Kohlmeise im Grünen', beschriftung: '<b>Kohlmeise</b> · im Grünen', bereitsPostkarte: true },
  { id: 'gartenleben-blaumeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/blaumeise1.jpg', alt: 'Buntspecht am Stamm', beschriftung: '<b>Blaumeise</b> · Ausguck', bereitsPostkarte: false },
  { id: 'gartenleben-blaumeise2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/blaumeise2.jpg', alt: 'Gimpel im Raureif', beschriftung: '<b>Blaumeise</b> · Frühlingsknospen', bereitsPostkarte: false },
  { id: 'gartenleben-eichelhaeher1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/eichelhaeher1.jpg', alt: 'Porträt eines Eichelhähers', beschriftung: '<b>Eichelhäher</b> · Fressen knacken', bereitsPostkarte: false },
  { id: 'gartenleben-schwanzmeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise1.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Schwanzmeise</b> ·auf Nahrungsjagd', bereitsPostkarte: false },
  { id: 'gartenleben-schwanzmeise2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise2.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Schwanzmeise</b> · in Zweigen', bereitsPostkarte: false },
  { id: 'gartenleben-schwanzmeise3', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise3.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Schwanzmeise</b> · neugierig', bereitsPostkarte: false },
  { id: 'gartenleben-zaunkoenig1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/zaunkoenig1.jpg', alt: 'Zaunkönig im Gebüsch', beschriftung: '<b>Zaunkönig</b> · Höhen-Spagat', bereitsPostkarte: true },
  { id: 'gartenleben-sumpfmeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/sumpfmeise1.jpg', alt: 'Amsel im Frühling', beschriftung: '<b>Sumpfmeise</b> · Wurzelwerk', bereitsPostkarte: false },
  { id: 'gartenleben-schmetterling1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schmetterling1.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Tagpfauenauge</b> · ruhiger Snack', bereitsPostkarte: true },
  { id: 'gartenleben-schmetterling2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schmetterling2.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Tagpfauenauge</b> · Farbenspiel', bereitsPostkarte: true },
  { id: 'gartenleben-rotkehlchen2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/rotkehlchen2.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Rotkehlchen</b> · Blattgesang', bereitsPostkarte: false },
  { id: 'gartenleben-rotkehlchen3', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/rotkehlchen3.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Rotkehlchen</b> · unschuldig', bereitsPostkarte: false },
  { id: 'gartenleben-katze1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/katze1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>schwarze Katze</b> · dunkles Versteck', bereitsPostkarte: true },
  { id: 'gartenleben-goldammer1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/goldammer1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Goldammer</b> · Solo Gesang', bereitsPostkarte: true },
  { id: 'gartenleben-dorngrasmuecke1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/dorngrasmuecke1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Dorngrasmücke</b> · singend', bereitsPostkarte: false },
  { id: 'gartenleben-schwanzmeise4', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise4.jpg', alt: 'Schwanzmeise im Flug frontal in Kamera schauend', beschriftung: '<b>Schwanzmeise</b> · Moment im Flug', bereitsPostkarte: true },
  { id: 'gartenleben-gimpel3', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/gimpel3.jpg', alt: 'Gimpel auf einem Zweig im Winter', beschriftung: '<b>Gimpel</b> · Winterstimmung', bereitsPostkarte: false },
  { id: 'gartenleben-gimpel2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/gimpel2.jpg', alt: 'Gimpel auf einem Zweig im Winter, aussehnd wie Elvis', beschriftung: '<b>Gimpel</b> · Elvis Look', bereitsPostkarte: false },
  { id: 'gartenleben-singdrossel1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/singdrossel1.jpg', alt: 'singende Singdrossel auf Tannengrün', beschriftung: '<b>Singdrossel</b> · grüner Gesang', bereitsPostkarte: true },
  { id: 'gartenleben-buchfink', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/buchfink.jpg', alt: 'Buchfink in Wiesengras', beschriftung: '<b>schottischer Buchfink</b> · natürlicher Look', bereitsPostkarte: true },
  { id: 'gartenleben-kornblume', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/kornblume.jpg', alt: 'Kornblume im Getreidefeld', beschriftung: '<b>Kornblume</b> · farblicher Akzent', bereitsPostkarte: true },
   
  // ---- Waldleben ---- (noch keine Fotos — Unterseite ist aktuell noch Platzhalter/unfertig)
  // ---- Reduktion ---- (noch keine Fotos — Unterseite ist aktuell noch Platzhalter/unfertig)
  // Sobald du diese beiden Galerien mit echten Fotos aufbaust, hier nach
  // demselben Muster ergänzen: { id: ..., kategorie: 'Waldleben', bild: ...,
  // alt: ..., beschriftung: ..., bereitsPostkarte: false }

];
