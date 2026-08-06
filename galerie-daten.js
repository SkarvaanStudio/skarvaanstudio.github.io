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
               Lieferzeit). Für Poster bei WirmachenDruck ist das
               ohnehin bei jedem Motiv gleich (wird für dich in
               deinem gewählten Format gedruckt — Poster sind nie
               "auf Lager").
   - bestand: die genaue Stückzahl, die du gerade als fertige
     Postkarte zu Hause liegen hast. Nur relevant, wenn
     bereitsPostkarte true ist.
     - Zahl (z. B. 8) → Shop zeigt "Noch 8 auf Lager". Da es keinen
       automatischen Checkout gibt, zählst du diese Zahl selbst
       manuell runter, wenn du eine Bestellung bestätigst.
     - null → du kennst die genaue Zahl noch nicht, Shop zeigt
       einfach "Vorrätig" ohne Zahl.
     - 0 → ist zwar als Postkarte im Sortiment, aber gerade
       ausverkauft. Shop zeigt "Wird nachbestellt · ca. 1–2 Wochen".
   - imShop: steuert, ob dieses Motiv im Shop als Postkarte/Poster/
     Download auftaucht. Standard ist true (also automatisch drin,
     wie bisher). Auf false stellen, wenn ein Foto zwar in der
     Galerie gezeigt werden soll, aber (noch) nicht als Produkt
     verkauft werden soll — z. B. ein sehr neues oder ein bewusst
     nur redaktionell genutztes Bild. Die Galerie zeigt es trotzdem
     ganz normal, nur eben ohne den kleinen "Im Shop erhältlich"-
     Hinweis (siehe unten) und ohne Eintrag im Shop selbst.
   - geschichte: die Geschichte hinter dem Foto (ein paar Sätze,
     reiner Text — kein HTML nötig). Wird auf einer eigenen Seite
     (geschichte.html?id=...) angezeigt, die du z. B. per QR-Code
     auf einer gedruckten Postkarte verlinken kannst.
     - null → auf der Galerie erscheint trotzdem der kleine
       "Geschichte"-Button, die Seite zeigt dann nur einen
       freundlichen Hinweis, dass die Geschichte noch fehlt.
     - "Text..." → wird 1:1 auf geschichte.html angezeigt.
   - ort: der Ort, an dem das Foto entstanden ist, für die Karte
     (karte.html). null, wenn (noch) kein Ort hinterlegt ist —
     das Motiv taucht dann einfach nicht auf der Karte auf.

     ZWEI MODI:
     1. Punkt (genauer Ort):
        ort: { lat: 53.7297, lng: 9.7975, label: 'Teich in Halstenbek' }
        So findest du Koordinaten: Google Maps öffnen, gewünschte
        Stelle mit Rechtsklick anklicken → die erste Zeile im
        Kontextmenü zeigt "lat, lng" zum Kopieren an.

     2. Gebiet (ungefähre Gegend, z. B. "Hamburger Westen" oder
        "Schottische Küste" — wenn du keinen exakten Punkt setzen
        willst): einfach "bereich: true" ergänzen, dazu optional
        "radius" in Metern (Standard 4000, wenn weggelassen):
        ort: { lat: 53.65, lng: 9.75, label: 'Hamburger Westen', bereich: true, radius: 6000 }
        lat/lng sind hier nur der ungefähre Mittelpunkt der Gegend —
        die Karte zeigt dafür einen weichen, unscharfen Kreis statt
        eines Pins.

   WICHTIG FÜR DICH GERADE JETZT: Du hast 26 Motive bereits als
   Postkarte auf Lager. Unten steht erstmal bei ALLEN Motiven
   "bereitsPostkarte: false" und "bestand: 0", weil ich nicht weiß,
   welche 26 der 28 Motive das genau sind. Bitte bei den passenden
   Zeilen "bereitsPostkarte" auf true umstellen und bei "bestand"
   deine echte Stückzahl eintragen (oder null, wenn du sie gerade
   nicht weißt) — dann erscheint dort automatisch das ★ im Shop.
   ============================================================= */

const GALERIE_BILDER = [

  // ---- Teichleben ----
  { id: 'teichleben-entchen1', kategorie: 'Teichleben', bild: 'bilder/teichleben/entchen1.jpg', alt: 'Entchen Nahaufnahme frontal', beschriftung: '<b>Entenküken</b> · Nahaufnahme', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: 'Ich hatte mich seit einer Dreiviertelstunde auf dem Bauch am Ufer eingerichtet, als die kleine Gruppe endlich aus dem Schilf kam. Dieses eine Küken blieb kurz stehen, direkt auf Augenhöhe mit dem Objektiv – neugieriger als seine Geschwister, die schon weitergewatschelt waren. Ein einziger Frame, bevor es der Mutter hinterherlief.', ort: { lat: 53.7297, lng: 9.7975, label: 'Teich in Halstenbek' } },
  { id: 'teichleben-entchen2', kategorie: 'Teichleben', bild: 'bilder/teichleben/entchen2.jpg', alt: 'schlafendes Gänseküken neben Gänseblümchen', beschriftung: '<b>Gänseküken</b> · schlafend bei Gänseblümchen', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'teichleben-entchen3', kategorie: 'Teichleben', bild: 'bilder/teichleben/entchen3.jpg', alt: 'zwei Entenküken am Ufer eines Teichs', beschriftung: '<b>Entenküken</b> · Sonnenbaden', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'teichleben-ente1', kategorie: 'Teichleben', bild: 'bilder/teichleben/ente1.jpg', alt: 'Stockente breitet die Flügel auf dem Wasser aus', beschriftung: '<b>Stockente</b> · Flügelzauber', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'teichleben-reiher1', kategorie: 'Teichleben', bild: 'bilder/teichleben/reiher1.jpg', alt: 'Reiher im Winter im Wasser stehend', beschriftung: '<b>Reiher</b> · Winterkälte', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'teichleben-reiher2', kategorie: 'Teichleben', bild: 'bilder/teichleben/reiher.jpg', alt: 'Reiher im Wasser stehend mit Grünschimmer', beschriftung: '<b>Reiher</b> · Frühlingsgrün', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'teichleben-blaesshuhn1', kategorie: 'Teichleben', bild: 'bilder/teichleben/blaesshuhn1.jpg', alt: 'Blässhuhn frontal schwimmend', beschriftung: '<b>Blässhuhn</b> · schwimmend', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'teichleben-puffin', kategorie: 'Teichleben', bild: 'bilder/teichleben/puffin.jpg', alt: 'Papageientaucher auf Felsvorsprung', beschriftung: '<b>Papageientaucher</b> · Brutkolonie Schottland', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: { lat: 56.34, lng: -2.7, label: 'Schottische Küste', bereich: true, radius: 25000 } },
  
   // ---- Gartenleben ----
  { id: 'gartenleben-rotkehlchen1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/rotkehlchen1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Rotkehlchen</b> · Ast', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: 'Dieses Rotkehlchen hat im letzten Winter fast täglich am selben Ast gesessen, kaum zwei Meter von meiner Terrassentür entfernt. Irgendwann kannte es mich wohl schon und ließ sich vom Objektiv nicht mehr stören – so ist dieses ruhige, fast schon vertraute Porträt entstanden.', ort: { lat: 53.7297, lng: 9.7975, label: 'Garten in Halstenbek' } },
  { id: 'gartenleben-kohlmeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/kohlmeise1.jpg', alt: 'Kohlmeise im Grünen', beschriftung: '<b>Kohlmeise</b> · im Grünen', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-blaumeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/blaumeise1.jpg', alt: 'Buntspecht am Stamm', beschriftung: '<b>Blaumeise</b> · Ausguck', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-blaumeise2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/blaumeise2.jpg', alt: 'Gimpel im Raureif', beschriftung: '<b>Blaumeise</b> · Frühlingsknospen', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-eichelhaeher1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/eichelhaeher1.jpg', alt: 'Porträt eines Eichelhähers', beschriftung: '<b>Eichelhäher</b> · Fressen knacken', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-schwanzmeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise1.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Schwanzmeise</b> ·auf Nahrungsjagd', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-schwanzmeise2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise2.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Schwanzmeise</b> · in Zweigen', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-schwanzmeise3', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise3.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Schwanzmeise</b> · neugierig', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-zaunkoenig1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/zaunkoenig1.jpg', alt: 'Zaunkönig im Gebüsch', beschriftung: '<b>Zaunkönig</b> · Höhen-Spagat', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-sumpfmeise1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/sumpfmeise1.jpg', alt: 'Amsel im Frühling', beschriftung: '<b>Sumpfmeise</b> · Wurzelwerk', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-schmetterling1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schmetterling1.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Tagpfauenauge</b> · ruhiger Snack', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-schmetterling2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schmetterling2.jpg', alt: 'Schwanzmeise auf einem Zweig', beschriftung: '<b>Tagpfauenauge</b> · Farbenspiel', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-rotkehlchen2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/rotkehlchen2.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Rotkehlchen</b> · Blattgesang', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-rotkehlchen3', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/rotkehlchen3.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Rotkehlchen</b> · unschuldig', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-katze1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/katze1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>schwarze Katze</b> · dunkles Versteck', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-goldammer1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/goldammer1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Goldammer</b> · Solo Gesang', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-dorngrasmuecke1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/dorngrasmuecke1.jpg', alt: 'Rotkehlchen auf einem Ast', beschriftung: '<b>Dorngrasmücke</b> · singend', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-schwanzmeise4', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/schwanzmeise4.jpg', alt: 'Schwanzmeise im Flug frontal in Kamera schauend', beschriftung: '<b>Schwanzmeise</b> · Moment im Flug', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-gimpel3', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/gimpel3.jpg', alt: 'Gimpel auf einem Zweig im Winter', beschriftung: '<b>Gimpel</b> · Winterstimmung', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-gimpel2', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/gimpel2.jpg', alt: 'Gimpel auf einem Zweig im Winter, aussehnd wie Elvis', beschriftung: '<b>Gimpel</b> · Elvis Look', bestand: 0, bereitsPostkarte: false, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-singdrossel1', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/singdrossel1.jpg', alt: 'singende Singdrossel auf Tannengrün', beschriftung: '<b>Singdrossel</b> · grüner Gesang', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-buchfink', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/buchfink.jpg', alt: 'Buchfink in Wiesengras', beschriftung: '<b>schottischer Buchfink</b> · natürlicher Look', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  { id: 'gartenleben-kornblume', kategorie: 'Gartenleben', bild: 'bilder/gartenleben/kornblume.jpg', alt: 'Kornblume im Getreidefeld', beschriftung: '<b>Kornblume</b> · farblicher Akzent', bestand: null, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
   
  // ---- Waldleben ---- (noch keine Fotos — Unterseite galerie-waldleben.html ist technisch bereit)
{ id: 'waldleben-mission_impossible', kategorie: 'Waldleben', bild: 'bilder/waldleben/mission_impossible.jpg', alt: 'Eichhörnchen hängend vom Baum', beschriftung: '<b>Eichhörnchen</b> · Mission Impossible', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: 'Kopfüber, an einem dünnen Ast hängend, hat sich dieses Eichhörnchen mit einer Akrobatik an die Nuss gewagt, die ich so noch nicht gesehen hatte. Der Name kam mir noch am Waldweg – bevor ich zu Hause überhaupt die Speicherkarte gesichtet hatte.', ort: { lat: 53.7402, lng: 9.7731, label: 'Waldstück bei Halstenbek' } },
{ id: 'waldleben-planning_squirrel', kategorie: 'Waldleben', bild: 'bilder/waldleben/planning_squirrel.jpg', alt: 'Eichhörnchen mysteriös auf Baum schauend', beschriftung: '<b>Eichhörnchen</b> · plant es etwas?', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },    
{ id: 'waldleben-sleepy_squirrel', kategorie: 'Waldleben', bild: 'bilder/waldleben/sleepy_squirrel.jpg', alt: 'Eichhörnchen müde auf Baum sitzend', beschriftung: '<b>Eichhörnchen</b> · entspannt und müde', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
{ id: 'waldleben-specht', kategorie: 'Waldleben', bild: 'bilder/waldleben/specht.jpg', alt: 'Specht aus Baumhöhle schauend', beschriftung: '<b>Specht</b> · Hausbesichtigung', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
{ id: 'waldleben-baum', kategorie: 'Waldleben', bild: 'bilder/waldleben/baum.jpg', alt: 'Birkenbaum im Moor', beschriftung: '<b>Birke</b> · kräftig im Moor', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  
// ---- Reduktion ---- (noch keine Fotos — Unterseite galerie-reduktion.html ist technisch bereit)
{ id: 'reduktion-silhouette_robin', kategorie: 'Reduktion', bild: 'bilder/Reduktion/silhouette_robin.jpg', alt: 'schwarz-weiß Silhouette eines Rotkehlchens', beschriftung: '<b>Rotkehlchen</b> · Michael Jackson', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
{ id: 'reduktion-silhouette_singdrossel', kategorie: 'Reduktion', bild: 'bilder/Reduktion/silhouette_singdrossel.jpg', alt: 'schwarz-weiß Silhouette einer Singdrossel', beschriftung: '<b>Singdrossel</b> · Blick nach rechts', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
{ id: 'reduktion-silhouette_stare', kategorie: 'Reduktion', bild: 'bilder/Reduktion/silhouette_stare.jpg', alt: 'schwarz-weiß Silhouette zweier Stare auf einem Ast', beschriftung: '<b>Stare</b> · minimalistischer Ast-Kampf', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
{ id: 'reduktion-silhouette_zaunkönig', kategorie: 'Reduktion', bild: 'bilder/Reduktion/silhouette_zaunkönig.jpg', alt: 'schwarz-weiß Silhouette eines flügelschlagenden Zaunkönigs', beschriftung: '<b>Zaunkönig</b> · kraftvolle Silhouette', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
{ id: 'reduktion-singdrossel_art', kategorie: 'Reduktion', bild: 'bilder/Reduktion/singdrossel_art.jpg', alt: 'Singdrossel im Apfelbaum mit verdortem Apfel', beschriftung: '<b>Singdrossel</b> · Apfel Dilemma', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
{ id: 'reduktion-Blaesshuhn', kategorie: 'Reduktion', bild: 'bilder/Reduktion/Blaesshuhn.jpg', alt: 'Blsshuhn auf dunklem See', beschriftung: '<b>Blässhuhn</b> · dunkle Aura', bestand: 25, bereitsPostkarte: true, imShop: true, geschichte: null, ort: null },
  // Sobald du diese beiden Galerien mit echten Fotos aufbaust, hier nach
  // demselben Muster ergänzen: { id: ..., kategorie: 'Waldleben', bild: ...,
  // alt: ..., beschriftung: ..., bestand: 0, bereitsPostkarte: false, imShop: true }

];
