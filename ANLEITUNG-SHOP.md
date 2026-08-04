# Anleitung: Shop-System pflegen (produkte-bestellen.html)

Diese Anleitung ist NUR für dich (Bene) — Kunden sehen das nicht.

## Das Prinzip — drei Datenquellen, eine Shop-Seite

`produkte-bestellen.html` baut die komplette Shop-Seite automatisch
zusammen. Du musst dafür nur Daten pflegen, nicht HTML anfassen:

1. **`galerie-daten.js`** — deine Fotos. Jedes Bild erscheint
   automatisch auf der Galerie-Unterseite UND im Shop unter
   "Postkarten & Poster", inklusive Format-Auswahl (Postkarte / Poster
   in A5-A4-A3 / Download) und Lagerbestand.
2. **`produkte-daten.js`** — Sticker (Liste `STICKER`) und Merch
   (Liste `MERCH`), plus die zentrale Preistabelle `PREISE`.
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

**Das gilt jetzt für alles im Shop** (Postkarten, Poster, Sticker,
Merch) — nicht nur für die drei Sonderfälle wie vorher. Die AGB und
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
   `bestand`.
3. Speichern, hochladen — taucht automatisch in der Galerie-Unterseite
   UND im Shop auf, mit allen drei Formaten (Postkarte/Poster/Download).

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

👉 **Noch offen:** Aktuell steht bei allen Motiven `bereitsPostkarte:
false` und `bestand: 0`, weil ich nicht weiß, welche deiner
vorhandenen Postkarten das genau sind. Einmal durchgehen und bei den
passenden Zeilen umstellen.

**Poster-Preise pro Format** stehen zentral in `produkte-daten.js` bei
`PREISE` (`posterA5`, `posterA4`, `posterA3`) — nicht pro Motiv, gilt
für alle gleich. Willst du für ein einzelnes Motiv einen Sonderpreis,
sag Bescheid, dann bauen wir dafür eine Überschreibung.

**Waldleben & Reduktion:** Beide Galerie-Unterseiten sind jetzt
technisch fertig (gleiche Struktur wie Teichleben/Gartenleben) und
bereit für echte Fotos — einfach nach demselben Muster in
`galerie-daten.js` ergänzen, sobald Fotos da sind.

## Sticker pflegen → `produkte-daten.js` → `STICKER`

Jeder Eintrag: `id`, `motiv`, `kategorie` (optional), `preis`,
`mockups` (Bildliste). Ein auskommentiertes Beispiel steht direkt in
der Datei zum Kopieren.

## Merch pflegen → `produkte-daten.js` → `MERCH`

Mit festem Feld `typ`: `"shirts"`, `"tassen"` oder `"weiteres"` —
darüber filtert die Merch-Seite automatisch. Pro Eintrag: `id`,
`motiv`, `typ`, `preis`, `farben` (Liste mit `farbe` + `mockups`).
Beispiel zum Kopieren steht in der Datei.

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

- **AGB/Datenschutz:** Der Abschnitt zum Vertragsschluss bzw. zur
  Datenverarbeitung bei Bestellanfragen wurde inhaltlich an das
  Anfrage-Modell angepasst, aber nicht anwaltlich geprüft — vor dem
  Live-Gang einmal von jemandem mit Rechtskenntnis gegenlesen lassen.
- **Alt-Texte prüfen:** In ein paar Gartenleben-Motiven (z. B. Katze,
  Goldammer, Dorngrasmücke) steht als `alt`-Text noch versehentlich
  "Rotkehlchen auf einem Ast" (Copy-Paste-Rest).
- **Bildpfade vereinheitlichen:** Die Startseite nutzt weiterhin flache
  Pfade wie `bilder/teichleben-01.jpg`, die Galerien nutzen Unterordner
  (`bilder/teichleben/entchen1.jpg`).
