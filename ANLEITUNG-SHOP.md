# Anleitung: Shop-System pflegen (produkte-bestellen.html)

Diese Anleitung ist NUR für dich (Bene) — Kunden sehen das nicht.

## Das Prinzip — drei Datenquellen, eine Shop-Seite

`produkte-bestellen.html` baut die komplette Shop-Seite automatisch
zusammen. Du musst dafür nur Daten pflegen, nicht HTML anfassen:

1. **`galerie-daten.js`** — deine Fotos. Jedes Bild erscheint
   automatisch auf der Galerie-Unterseite UND im Shop unter
   "Postkarten & Poster", inklusive Auswahl (Postkarte / Poster A4 /
   Download), Mengen-Staffel und Lagerbestand — getrennt für
   Postkarte und Poster.
2. **`produkte-daten.js`** — Sticker (Liste `STICKER`), die Preise
   (`PREISE`) und die Staffelpreise (`STAFFEL`).
   Merch gibt es hier bewusst nicht mehr, siehe unten.
3. Der Bestellweg: kein Shop-Checkout, sondern eine Anfrage — siehe
   Abschnitt "Wie eine Bestellung abläuft" unten.

## Wie eine Bestellung abläuft (aktuell: Anfrage statt Sofortkauf)

Es gibt bewusst **keinen** Shopify- oder sonstigen Kauf-Button. Bei
jedem Produkt steht stattdessen ein Button "+ Zur Anfrage
hinzufügen". Klickt jemand darauf:

- Das Produkt landet in einer kleinen Auswahl-Liste (rechts unten
  taucht ein Badge mit der Anzahl auf, verlinkt zum Formular weiter
  unten).
- Im Anfrageformular ("Kurze Anfrage") erscheint die Auswahl
  nochmal übersichtlich, mit der Möglichkeit, einzelne Produkte
  wieder zu entfernen.
- Klickt die Person auf "Anfrage senden", wird die Auswahl
  automatisch vorne in die Nachricht eingefügt und als Mail über
  Formspree an dich geschickt (technisch über das versteckte Feld
  `Ausgewählte Produkte` sowie den Nachrichtentext).
- Du meldest dich dann manuell per Mail mit Preis, Versand- bzw.
  Abholoption und Zahlungsweg zurück — genau wie bisher beim
  Anfrageformular für Marktanfragen/Bildlizenzen.

**Das gilt für alles im Shop** (Postkarten, Poster, Sticker) —
nicht nur für die Sonderfälle wie früher. Die AGB und
Datenschutzerklärung wurden entsprechend angepasst (Vertragsschluss
über Anfrage → individuelles Angebot → Bestätigung/Zahlung).

**Falls ihr später doch auf einen echten Shop mit Sofortkauf
umsteigen wollt** (Shopify, o. ä.): Das ist ein bewusst separater
Umbauschritt. Kurzfassung, falls du später danach suchst: Die
Funktion `renderKaufSlot(...)` im `<script>`-Block von
`produkte-bestellen.html` ist die einzige Stelle, die du dafür
anfassen müsstest — dort müsste statt des "Zur Anfrage
hinzufügen"-Buttons der jeweilige Shop-Checkout-Code rein.

## Postkarten & Poster pflegen → `galerie-daten.js`

**Neues Foto zur Galerie hinzufügen:**
1. Bilddatei in den passenden Ordner legen, z. B.
   `bilder/teichleben/neuesbild.jpg`.
2. In `galerie-daten.js` eine neue Zeile ergänzen: `id`, `kategorie`,
   `bild`-Pfad, `alt`-Text, `beschriftung`, `bereitsPostkarte`,
   `bestand`, `bereitsPoster`, `bestandPoster`.
3. Speichern, hochladen — taucht automatisch in der Galerie-Unterseite
   UND im Shop auf (Postkarte/Poster A4/Download).

**Das Feld `bereitsPostkarte`:**
- `true` → Motiv ist schon als gedruckte Postkarte auf Lager, bekommt
  im Shop ein ★.
- `false` → wird bei Bestellung erst gedruckt, Shop zeigt "Wird für
  dich gedruckt · ca. 1–2 Wochen".

**Das Feld `bestand`** (nur relevant, wenn `bereitsPostkarte: true`):
- Zahl (z. B. `8`) → Shop zeigt "Noch 8 auf Lager". Da es keinen
  automatischen Checkout gibt, zählst du das manuell runter, wenn du
  eine Bestellung bestätigst.
- `null` → Shop zeigt einfach "Vorrätig" ohne genaue Zahl.
- `0` → Shop zeigt "Wird nachbestellt · ca. 1–2 Wochen".

**Die Felder `bereitsPoster` und `bestandPoster`** funktionieren
exakt genauso — nur eben für Poster statt Postkarten. Das ist die
Umstellung von August 2026: Poster sind keine Einzelanfertigung mehr,
sondern werden von dir wie Postkarten in Auflage vorbestellt und aus
dem Lager verkauft.

- `bereitsPoster: true` → liegt als gedrucktes A4-Poster bei dir,
  bekommt im Shop ein ★ (wenn "Poster A4" ausgewählt ist).
- `bereitsPoster: false` → Shop zeigt "Wird nachgedruckt · ca. 1–2
  Wochen". Du nimmst das Motiv dann in die nächste Sammelbestellung
  mit auf.
- `bestandPoster`: Stückzahl wie bei `bestand` (Zahl / `null` / `0`).

Das ★ und die Lagerzeile richten sich immer nach der gerade
ausgewählten Ausführung — klickt jemand von Postkarte auf Poster,
springt die Anzeige automatisch mit.

👉 **Noch offen:** Aktuell steht bei allen Motiven `bereitsPoster:
false` und `bestandPoster: 0`, weil ich nicht weiß, welche Poster du
schon gedruckt zu Hause hast. Einmal durchgehen und bei den passenden
Zeilen umstellen. (Bei den Postkarten hast du das ja schon gemacht.)

## Preise & Staffelpreise → `produkte-daten.js`

Es gibt nur noch **ein Poster-Format: A4** (`POSTER_FORMAT`). A5, A6
und A3 sind raus — Sonderformate laufen ausschließlich über das
Anfrageformular.

Die Mengenpreise stehen in `STAFFEL`:

- Postkarten: 1 = 2,50 € | 3 = 6,00 € | 5 = 9,00 €
- Poster A4: 1 = 15,00 € | 2 = 20,00 €

Der Shop baut die Mengen-Auswahl unter jedem Bild automatisch daraus.
Willst du eine Stufe ändern oder ergänzen (z. B. `{ menge: 10, preis:
16.00 }`), reicht die eine Zeile — Preisbox, Auswahlfeld und der Text
im Anfrage-Button ziehen automatisch nach. Bei mehr als einem Stück
zeigt der Shop zusätzlich den Stückpreis an ("20,00 € (je 10,00 €)").

Der Schalter `STAFFEL_MISCHBAR` steuert, ob für einen Staffelpreis
verschiedene Motive gemischt werden dürfen. Steht auf `true`, der Shop
weist unter der Preisbox darauf hin. Auf `false` stellen → Hinweis
ändert sich automatisch auf "gilt jeweils pro Motiv".

**Waldleben & Reduktion:** Beide Galerie-Unterseiten sind jetzt
technisch fertig (gleiche Struktur wie Teichleben/Gartenleben) und
bereit für echte Fotos — einfach nach demselben Muster in
`galerie-daten.js` ergänzen, sobald Fotos da sind.

## Sticker pflegen → `produkte-daten.js` → `STICKER`

Jeder Eintrag: `id`, `motiv`, `kategorie` (optional), `preis`,
`mockups` (Bildliste). Ein auskommentiertes Beispiel steht direkt in
der Datei zum Kopieren.

## Merch — bewusst raus aus dem Sortiment

Es gibt keine Merch-Produktliste mehr und nichts mehr zu pflegen. An
der Stelle steht im Shop nur noch ein Hinweisblock unter der
Überschrift "Tassen & Co.": Tassen, Caps, Beutel & Co. sind auf
Anfrage möglich, **Kleidung nicht** (zu viel Retoure). Der Wunsch
landet über das Anfrageformular bei dir, du holst dann ein Angebot
ein.

Auf der Startseite ist die vierte Produktkachel entsprechend weg und
durch eine Textzeile ersetzt. Der Anker `#merch` funktioniert weiter,
damit alte Links und QR-Codes nicht ins Leere laufen.

Falls du Merch später doch wieder fest ins Sortiment nimmst, sag
Bescheid — die alte Listen-Logik lässt sich zurückholen.

## Das Anfrageformular (jetzt: alles läuft hier zusammen)

Ein einziges Formular für zwei Fälle:
1. **Produktauswahl** — Person hat Produkte über "Zur Anfrage
   hinzufügen" gesammelt, sendet sie mit Name/E-Mail/Nachricht ab.
2. **Reine Anfrage ohne Produkt** — über die Chips Marktanfrage /
   Bildlizenz / Motivwunsch / Sonstiges, wie bisher.

Es fragt bewusst nur Name, E-Mail und Nachricht ab — keine Adresse,
keine Zahlungsdaten. Die kommen erst ins Spiel, wenn du der Person
nach deiner Rückmeldung ein Angebot machst.

Der Betreff der Formspree-Mail passt sich automatisch an, je
nachdem welcher Chip (Bestellanfrage/Marktanfrage/Bildlizenz/
Motivwunsch/Sonstiges) angeklickt wurde — bei vorhandener
Produktauswahl ohne manuelle Chip-Wahl wird automatisch
"Bestellanfrage" gesetzt. Über einen Link mit `?anliegen=markt`
(oder `lizenz`, `motivwunsch`, `sonstiges`) am Ende der URL kannst du
den passenden Chip auch automatisch vorauswählen lassen — genau das
nutzt z. B. der "Termin anfragen"-Button im Termine-Bereich der
Startseite.

**Formspree nicht vergessen:** In `produkte-bestellen.html` steht bei
`<form action="https://formspree.io/f/xvzejbje">` noch die alte
Formular-ID — durch deine eigene, neue Formspree-Endpoint-ID
ersetzen, bevor die Seite live geht. Dasselbe gilt für das
allgemeine Kontaktformular auf der Startseite.

## Persona-Startseiten (optional, Vorschau)

`persona-startseiten-vorschau.html` ist eine eigenständige Demo-Datei
— zeigt, wie drei unterschiedliche Hero-Texte für Instagram-Besucher,
Postkarten/QR-Besucher und Marktbesucher aussehen könnten. Sie ist
NICHT live verdrahtet, nur zur Ansicht/Diskussion. Wenn dir eine der
Varianten gefällt, sag Bescheid — dann bauen wir das echt in
`index.html` ein (per URL-Parameter, ähnlich wie beim
Anfrageformular).

## Offene Punkte, die dir noch auffallen sollten

- **AGB/Datenschutz:** inhaltlich an das Anfrage-Modell angepasst,
  aber nicht anwaltlich geprüft — vor dem Live-Gang einmal von
  jemandem mit Rechtskenntnis gegenlesen lassen.
- **Widerrufsrecht bei Postern (wichtig, geändert):** Solange Poster
  individuell im Wunschformat gedruckt wurden, war das Widerrufsrecht
  nach § 312g Abs. 2 Nr. 1 BGB ausgeschlossen. Seit der Umstellung auf
  A4-Auflagenware gilt das nicht mehr: Ein Motiv aus dem festen
  Katalog in einem festen Standardformat auszuwählen ist keine
  individuelle Anfertigung — auch dann nicht, wenn das Motiv gerade
  vergriffen ist und nachgedruckt wird. **Poster haben deshalb jetzt
  ganz normal 14 Tage Widerrufsrecht**, genau wie Postkarten.
  Ausgeschlossen bleibt es nur bei echten Sonderanfertigungen:
  Sonderformate, Motive außerhalb des Katalogs, Merch auf Anfrage.
  AGB Punkt 7.1/7.2 sind entsprechend umgeschrieben.
- **Formspree-ID:** steht immer noch auf der alten Test-ID
  `xvzejbje` — vor dem Herbstfest durch deine eigene ersetzen, sonst
  kommen die Anfragen nicht bei dir an.
- **Karteileichen:** `galerie-silhouetten.html` und
  `galerie-gartenleben(alt).html` sind von keiner Seite verlinkt.
  Entweder löschen oder bewusst liegenlassen.
- **Alt-Texte prüfen:** In ein paar Gartenleben-Motiven (z. B. Katze,
  Goldammer, Dorngrasmücke) steht als `alt`-Text noch versehentlich
  "Rotkehlchen auf einem Ast" (Copy-Paste-Rest).
- **Bildpfade vereinheitlichen:** Die Startseite nutzt weiterhin flache
  Pfade wie `bilder/teichleben-01.jpg`, die Galerien nutzen Unterordner
  (`bilder/teichleben/entchen1.jpg`).
