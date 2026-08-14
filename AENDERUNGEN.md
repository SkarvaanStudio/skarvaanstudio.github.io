# Änderungen — SEO, Vorschaubilder & Shop

Stand: 14.08.2026

Alle Dateien kommen ins Hauptverzeichnis des Repos (dort, wo auch
`index.html` und `styles.css` liegen). Einfach überschreiben bzw.
neu hinzufügen. `styles.css` wurde **nicht** angefasst — die neuen
Styles stehen jeweils in der Seite selbst.

---

## 17 Dateien

### Neu (4)

| Datei | Wozu |
|---|---|
| `fuer-veranstalter.html` | Dein Ausstellerportfolio als Webseite |
| `robots.txt` | Sagt Google, was indexiert werden darf, und wo die Seitenkarte liegt |
| `sitemap.xml` | Liste aller Seiten für Google |
| `404.html` | Auffangseite bei Tippfehlern und schlecht gelesenen QR-Codes |

### Geändert (13)

`index.html`, `produkte-bestellen.html`, `galerie-teichleben.html`,
`galerie-gartenleben.html`, `galerie-waldleben.html`,
`galerie-reduktion.html`, `geschichten.html`, `geschichte.html`,
`karte.html`, `impressum.html`, `datenschutz.html`, `agb.html`,
`galerie-daten.js`

---

## 1. Shop — Anfrageformular

**Optionale Lieferadresse.** Eingeklappter Block „Lieferadresse schon
mitgeben“ mit Straße, PLZ, Ort und Land. Alle vier Felder sind
freiwillig und blockieren das Absenden nicht. In der Formspree-Mail
tauchen sie unter genau diesen Namen auf.

**Pflichtangaben.** Name, E-Mail, Nachricht und der Datenschutz-Haken
sind mit `*` markiert. Der Hinweis „* Pflichtangaben“ steht einmal
über den Feldern und einmal unter dem Absende-Button.

**Eigene Prüfung statt Browser-Blase.** Das Formular hat `novalidate`,
die Prüfung macht das Script. Vorteil: die Meldungen sind in jedem
Browser gleich und auf Deutsch, stehen direkt unter dem betroffenen
Feld und verschwinden, sobald jemand korrigiert. Zusätzlich eine
Sammelmeldung über dem Button; der Cursor springt automatisch ins
erste offene Feld.

**Neues Pflichtfeld später ergänzen:** Feld mit `required` versehen,
darunter ein `<p class="feld-fehler" id="DEINE-ID-fehler"></p>`
setzen, fertig. Für einen eigenen Meldungstext einen Eintrag in
`MELDUNGEN` im Script ergänzen.

**Datenschutz-Haken entfernen**, falls du ihn doch nicht willst: den
`<div class="feld-check" …>`-Block löschen. Die Prüfung überspringt
ihn dann automatisch. Derselbe Block steht auch im Kontaktformular
auf der Startseite.

---

## 2. Shop — Blättern pro Kategorie

Statt einer Wand aus 46 Motiven gibt es jetzt vier eigenständige
Blöcke. Jeder Block hat:

- Überschrift mit Motivzahl
- Anzeige „Motiv 1–20 von 24“
- eigenes Auswahlmenü **Motive pro Seite: 10 / 20 / 40 / alle**
- eigene Blätter-Navigation

Voreinstellung: **20 pro Seite**. Aktuell heißt das: Gartenleben (24
Motive) bekommt zwei Seiten, Teichleben (8), Waldleben (8) und
Reduktion (6) passen jeweils auf eine.

**Einstellungen ändern** — ganz oben im Script von
`produkte-bestellen.html`:

```js
var STANDARD_PRO_SEITE = 20;                 // wie viele anfangs sichtbar sind
var PRO_SEITE_OPTIONEN = [10, 20, 40, 'alle']; // was im Menü zur Wahl steht
```

Mitgedacht:

- Das gewählte Format (Postkarte / Poster / Download) und deine
  Anfrage-Auswahl bleiben beim Blättern erhalten.
- Links aus der Galerie wie `produkte-bestellen.html#motiv-gartenleben23`
  schlagen automatisch die richtige Seite auf und heben das Motiv
  hervor — auch wenn es auf Seite 2 liegt.
- Die Filter-Knöpfe oben blenden weiterhin auf eine Kategorie ein.
- Die Einstellung wird **nicht** im Browser gespeichert. Das wäre nach
  § 25 TDDDG zustimmungspflichtig und hätte ein Cookie-Banner nach
  sich gezogen — für eine Anzeigeeinstellung nicht den Aufwand wert.

---

## 3. Vorschaubild auf jeder Unterseite

Alle 14 Seiten haben jetzt den vollständigen Satz `og:`- und
`twitter:`-Angaben, jeweils mit einem zur Seite passenden Motiv.
Wirkt in WhatsApp, Signal, Facebook, LinkedIn, Mastodon, Discord und
Instagram-DMs.

Dazu kam auf jeder Seite: `canonical`, `robots`, `author`, `geo`-
Angaben, Favicon und Apple-Touch-Icon.

**Empfehlung für später:** eigene Vorschaubilder in **1200 × 630 px**
anlegen (z. B. `bilder/vorschau/start.jpg`) und die `og:image`-Zeilen
darauf zeigen lassen. Aktuell stehen dort echte Galeriefotos — die
funktionieren, werden von manchen Diensten aber beschnitten, weil das
Seitenverhältnis nicht passt. Mit Logo drauf wirkt es außerdem
deutlich mehr nach Marke.

---

## 4. SEO

**Titel und Beschreibungen** pro Seite neu geschrieben. Vorher stand
auf allen vier Galerieseiten praktisch dasselbe („Vollständige
Galerie: Gartenleben – Naturfotografie von BG Naturfotografie“) — das
konkurriert bei Google gegeneinander. Jetzt mit konkreten Arten und
Ortsbezug, z. B. „Gartenleben — Rotkehlchen, Meisen & Co.“

**Strukturierte Daten (JSON-LD)** ergänzt:

- Startseite: Betrieb mit Anschrift, Einzugsgebiet, Preisspanne und
  allen Profilen (Instagram, Displate, Spreadshirt, Artheroes) sowie
  du als Person mit NABU-Zugehörigkeit
- Shop: FAQ-Block aus deinen fünf Info-Klappen — Chance auf
  ausklappbare Antworten direkt im Google-Treffer
- Galerieseiten: `ImageGallery` plus Brotkrumen-Pfad

**`robots.txt` und `sitemap.xml`** neu. Beides bitte einmal in der
[Google Search Console](https://search.google.com/search-console)
einreichen, sonst dauert die Aufnahme unnötig lange. Wenn du dort
noch kein Konto hast: das ist der wichtigste einzelne Schritt aus
dieser ganzen Liste.

**`sitemap.xml` pflegen:** bei jeder neuen Seite einen `<url>`-Block
kopieren und `lastmod` aufs aktuelle Datum setzen.

---

## 5. Einstiege für deine vier Besuchergruppen

**Startseite**, neuer Bereich „Womit möchtest du anfangen?“ direkt
unter dem Hero — vier Karten:

1. Postkarte in der Hand → Geschichten
2. Einfach schauen → Galerie
3. Etwas mitnehmen → Shop
4. Markt organisieren → Veranstalter-Seite

**`geschichten.html`** hat oben einen hervorgehobenen Kasten
bekommen: „Gerade eine Postkarte gescannt?“ — damit klar ist, dass
man richtig gelandet ist, plus Weiterleitung zu Shop, Galerie und
Karte.

**`fuer-veranstalter.html`** ist neu: Sortiment, Motive, Standgröße
(3 × 3 m Pavillon), Ausstattung inklusive „kein Stromanschluss nötig“,
Zahlungswege und Herkunft als Kacheln; darunter fünf Punkte, warum
der Stand auf einen Kunsthandwerkermarkt passt, und ein
Anfrage-Button, der direkt den Chip „Marktanfrage“ vorwählt.

> **Bitte einmal gegenlesen:** Ich habe Standgröße 3 × 3 m,
> „kein Strom nötig“, „Tischstand ab 2 m Front möglich“ und die
> Zahlungswege (bar + PayPal) aus deinem bisherigen Aufbau
> abgeleitet. Wenn davon etwas nicht stimmt, steht es auf einer
> Seite, die Veranstalter lesen — also kurz prüfen.

Die Seite ist von Startseite, Termine-Kachel und Fußzeile verlinkt.

---

## 6. Gefundene Fehler, die ich mitkorrigiert habe

**Falsche alt-Texte in `galerie-daten.js`** — der alt-Text ist das,
was Google in der Bildersuche liest und was Screenreader vorlesen.
Vier davon beschrieben schlicht das falsche Tier:

| ID | stand da | ist aber |
|---|---|---|
| `gartenleben3` | „Buntspecht am Stamm“ | Blaumeise |
| `gartenleben4` | „Gimpel im Raureif“ | Blaumeise |
| `gartenleben10` | „Amsel im Frühling“ | Sumpfmeise |
| `gartenleben11` + `12` | „Schwanzmeise auf einem Zweig“ | Tagpfauenauge |

Dazu: `reduktion6` hieß „Blsshuhn“ (Tippfehler), und die beiden
Buntspecht-Motive `waldleben6` und `waldleben7` trugen exakt
denselben Namen *und* denselben alt-Text — im Shop waren sie
dadurch nicht auseinanderzuhalten. `waldleben7` heißt jetzt
„Buntspecht · Schneetreiben“. Insgesamt 19 alt-Texte überarbeitet.

**Fehlendes `</div>`** in `galerie-teichleben.html`,
`galerie-waldleben.html` und `galerie-reduktion.html`. Nur
`galerie-gartenleben.html` war korrekt — daran habe ich mich
orientiert.

**Doppeltes Foto auf der Startseite:** die dritte Waldleben-Karte
zeigte dasselbe Bild wie die erste (`waldleben-01.jpg`), obwohl die
Bildunterschrift „in sich ruhend“ lautete. Zeigt jetzt
`bilder/waldleben/sleepy_squirrel.jpg`.

**Zwei `<h1>` in `datenschutz.html`** — eines entfernt.

**Leere `src=""`** in den Lightbox-Platzhaltern: manche Browser
fordern damit die Seite selbst noch einmal an. Ersetzt durch einen
1×1-Platzhalter.

**Bildschutz-Script** stand auf mehreren Seiten zwischen `</head>`
und `<body>` — dort gehört kein Inhalt hin. In den `<head>` verschoben.

**`loading="lazy"`** für alle Bilder unterhalb des sichtbaren
Bereichs auf der Startseite.

---

## 7. Drei Dinge, die ich bewusst nicht entschieden habe

**`geschichte.html` steht weiter auf `noindex`.** Die Texte kommen
per JavaScript aus dem Google Sheet, und die Adressen laufen über
`?id=…`. Beides macht die Seiten für Google unzuverlässig, und
Duplikate wären wahrscheinlich. Deine QR-Besucher landen ohnehin
direkt dort — für die ändert das nichts. Wenn du es trotzdem
umstellen willst: die Zeile
`<meta name="robots" content="noindex, follow">` auf
`index, follow` ändern. Dann sollte `geschichte.js` zusätzlich einen
`canonical` je Motiv setzen, sonst sieht Google 46 Adressen mit
demselben Grundgerüst.

**Google Fonts lädt weiterhin direkt von Google.** Das ist der
datenschutzrechtlich wackligste Punkt der Seite (LG München,
Az. 3 O 17493/20) und kostet zusätzlich Ladezeit. Die saubere Lösung
ist Selbsthosten: Schriftdateien ins Repo, `@font-face` in
`styles.css`, die beiden `preconnect`-Zeilen und den
`fonts.googleapis.com`-Link raus. Das betrifft alle Seiten
gleichzeitig — sag Bescheid, wenn ich das machen soll.

**Keine `Product`-Auszeichnung im JSON-LD.** Google erwartet bei
`Product` mit `Offer` einen echten Kaufweg. Dein Shop ist ein
Anfrageformular — eine Produktauszeichnung wäre hier eher ein Risiko
für eine manuelle Abstrafung als ein Gewinn. Sobald ein echter
Checkout steht (Shopify), lohnt sich das.

---

## Nach dem Hochladen

1. **Search Console:** `sitemap.xml` einreichen und die Startseite
   einmal manuell indexieren lassen.
2. **Vorschaubild testen:** Startseiten-Link an dich selbst per
   WhatsApp schicken. Kommt das alte Bild, hilft der
   [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   zum Leeren des Zwischenspeichers.
3. **Shop durchklicken:** Gartenleben auf Seite 2 blättern, „alle“
   wählen, ein Motiv zur Anfrage hinzufügen, blättern, prüfen ob es
   noch drin ist.
4. **Formular einmal echt abschicken**, damit du siehst, wie die
   Adressfelder in der Formspree-Mail ankommen.
5. **`fuer-veranstalter.html` gegenlesen** (siehe Kasten oben).
