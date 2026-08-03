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
   (Liste `MERCH`), plus die zentrale Preistabelle `PREISE` und die
   Shopify-Zugangsdaten in `SHOPIFY_CONFIG`.
3. Die Shopify-Kaufen-Buttons selbst — siehe Abschnitt "Shopify
   anschließen" unten.

## WICHTIGSTER OFFENER PUNKT: Shopify ist noch nicht angeschlossen

Solange `SHOPIFY_CONFIG.aktiv` in `produkte-daten.js` auf `false`
steht, zeigt jedes Produkt im Shop einen deutlich sichtbaren
Platzhalter-Kasten ("Kaufen-Button folgt hier") statt eines echten
Kaufen-Buttons. Das ist Absicht — nichts wirkt halb-fertig oder
kaputt, aber es kann natürlich noch niemand etwas kaufen.

**So schließt du Shopify an, sobald dein Store steht:**
1. In Shopify: Vertriebskanal "Buy Button" aktivieren, für jedes
   Produkt (Postkarte, Poster, Sticker, jeden Merch-Artikel) einen
   Buy Button erzeugen und den generierten Code kopieren.
2. In `produkte-daten.js`: `SHOPIFY_CONFIG.domain` und
   `.storefrontAccessToken` mit deinen echten Werten füllen.
3. In `produkte-bestellen.html`: die Funktion `renderKaufSlot(...)`
   im `<script>`-Block ist der einzige Ort, den du anfassen musst —
   dort ersetzt du den Platzhalter-`return` durch den echten Shopify
   Buy-Button-Einbettungscode für das jeweilige Produkt.
4. `SHOPIFY_CONFIG.aktiv` auf `true` stellen.

Das ist bewusst an einer einzigen Stelle im Code gebündelt, damit du
nicht 50+ Stellen einzeln anfassen musst.

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
- Zahl (z. B. `8`) → Shop zeigt "Noch 8 auf Lager".
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
`mockups` (Bildliste), `shopifyVariantId`. Ein auskommentiertes
Beispiel steht direkt in der Datei zum Kopieren.

## Merch pflegen → `produkte-daten.js` → `MERCH`

Jetzt mit festem Feld `typ`: `"shirts"`, `"tassen"` oder `"weiteres"`
— darüber filtert die Merch-Seite automatisch. Pro Eintrag: `id`,
`motiv`, `typ`, `preis`, `farben` (Liste mit `farbe` + `mockups`),
`shopifyProductId`. Beispiel zum Kopieren steht in der Datei.

## Das Anfrageformular (Markt / Lizenz / Motivwunsch / Sonstiges)

Das ist NICHT der Kaufweg — Postkarten, Poster, Sticker und Merch
laufen über die Shopify-Buttons. Dieses Formular ist nur für die drei
Sonderfälle, die keinen Shop-Eintrag haben: Marktanfragen,
Bildlizenzen, Motivwünsche. Es fragt bewusst nur Name, E-Mail und
Nachricht ab — keine Adresse.

Der Betreff der Formspree-Mail passt sich automatisch an, je
nachdem welcher Chip (Marktanfrage/Bildlizenz/Motivwunsch/Sonstiges)
angeklickt wurde. Über einen Link mit `?anliegen=markt` (oder
`lizenz`, `motivwunsch`, `sonstiges`) am Ende der URL kannst du den
passenden Chip auch automatisch vorauswählen lassen — genau das nutzt
z. B. der "Termin anfragen"-Button im Termine-Bereich der Startseite.

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

- **AGB/Widerrufsbelehrung:** Der Abschnitt zum Vertragsschluss
  ("Anfrage → Angebot per Mail → Überweisung") passt jetzt nur noch
  auf die drei Sonderfälle im Anfrageformular, nicht mehr auf den
  Shopify-Sofortkauf. Diesen Teil sollte einmal jemand mit
  Rechtskenntnis für den neuen Ablauf nachziehen, bevor der Shop live
  geht — das habe ich bewusst nicht selbst umformuliert.
- **Alt-Texte prüfen:** In ein paar Gartenleben-Motiven (z. B. Katze,
  Goldammer, Dorngrasmücke) steht als `alt`-Text noch versehentlich
  "Rotkehlchen auf einem Ast" (Copy-Paste-Rest).
- **Bildpfade vereinheitlichen:** Die Startseite nutzt weiterhin flache
  Pfade wie `bilder/teichleben-01.jpg`, die Galerien nutzen Unterordner
  (`bilder/teichleben/entchen1.jpg`).
