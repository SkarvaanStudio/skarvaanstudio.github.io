# Anleitung: Shop-System pflegen (produkte-bestellen.html)

Diese Anleitung ist NUR für dich (Bene) — Kunden sehen das nicht.

## Das Prinzip — jetzt zwei Datenquellen statt einer

Der Shop besteht jetzt aus zwei Bausteinen mit klar getrennter Aufgabe:

1. **`galerie-daten.js`** — deine Fotos. Jedes Bild, das hier steht,
   erscheint automatisch sowohl auf der passenden Galerie-Unterseite
   als auch im Shop unter **"Poster & Postkarten"**. Du musst ein
   Motiv nur EINMAL eintragen — nicht mehr getrennt für Galerie und
   Shop.
2. **`produkte-daten.js`** — alles, was NICHT automatisch aus der
   Galerie kommt: **Sticker/Lesezeichen** und **Merch**. Hier
   entscheidest du weiterhin pro Motiv einzeln, ob und mit welchen
   Mockup-Fotos es angezeigt wird.

`produkte-bestellen.html` baut die komplette Shop-Seite automatisch
aus beiden Dateien zusammen — die Seite selbst musst du dafür nicht
anfassen.

## Poster & Postkarten pflegen → `galerie-daten.js`

**Neues Foto zur Galerie hinzufügen:**
1. Bilddatei in den passenden Ordner legen, z. B.
   `bilder/teichleben/neuesbild.jpg`.
2. In `galerie-daten.js` eine neue Zeile in der passenden Kategorie
   ergänzen: `id`, `kategorie`, `bild`-Pfad, `alt`-Text, `beschriftung`.
3. Speichern, hochladen — fertig. Taucht automatisch in der
   Galerie-Unterseite UND im Shop als Postkarte + Poster auf, ganz
   ohne eigenes Mockup-Foto.

**Das Feld `beschriftung`** ist die kurze Bildunterschrift (darf `<b>`
enthalten, z. B. `"<b>Rotkehlchen</b> · Ast"`) — sie erscheint sowohl
als Figcaption in der Galerie als auch als Produktname im Shop.

**Das Feld `bereitsPostkarte`:**
- `true` → Motiv ist schon als gedruckte Postkarte auf Lager, bekommt
  im Shop automatisch ein ★ mit "sofort versandfertig".
- `false` → wird bei Bestellung erst gedruckt (normale Lieferzeit).

👉 **Noch offen:** Aktuell steht bei allen 28 Motiven `false`, weil ich
nicht weiß, welche 26 deiner vorhandenen Postkarten das genau sind.
Einmal durchgehen und bei den passenden Zeilen auf `true` umstellen.

Im Shop wählt die Kundschaft pro Bild selbst zwischen "Postkarte" und
"Poster" (mit A6/A5/A4-Auswahl) — dafür musst du nichts extra pflegen.

**Waldleben & Reduktion:** Diese beiden Galerien sind bei dir noch
unfertige Platzhalter (altes Branding, keine echten Fotos, nicht
verlinkt) und deshalb bewusst noch nicht an `galerie-daten.js`
angeschlossen. Sobald du sie mit echten Fotos aufbaust, sag Bescheid
oder ergänze sie nach demselben Muster wie Teichleben/Gartenleben.

## Sticker/Lesezeichen & Merch pflegen → `produkte-daten.js`

Hier hat sich nichts am Prinzip geändert — nur `postkarte` und
`fineart` sind als Kategorien entfallen (die laufen jetzt über die
Galerie). Übrig bleiben `stickerLesezeichen` und `merch`.

**Mockups & Karussell:**
- **Ein Bild** → wird einfach angezeigt.
- **Mehrere Bilder** → automatisch Karussell mit Pfeilen und
  Punkte-Anzeige.
- **Leere Liste `[]`** → zeigt "Noch kein Mockup hinterlegt" statt
  eines kaputten Bildes.

Bei **Merch** wechseln die Mockups automatisch mit der gewählten
Farbe — pro Farbe eine eigene `mockups`-Liste.

**Neues Motiv anlegen:**
1. Mockup-Fotos erstellen (Printful-Mockup-Generator oder eigene
   Fotos deiner Sticker) und in `bilder/mockups/` ablegen.
2. In `produkte-daten.js` das auskommentierte Beispiel oben in der
   Datei kopieren, in die `MOTIVE`-Liste einfügen und anpassen.
3. Datei speichern, hochladen — fertig.

**Extras** (Artikel ohne Foto-Bezug, z. B. fertige Sticker-Designs):
in `EXTRAS` nach demselben Muster ergänzen.

## Formspree nicht vergessen

In `produkte-bestellen.html` steht `YOUR_FORM_ID` als Platzhalter im
Formular — durch deine eigene, neue Formspree-Endpoint-ID ersetzen,
bevor die Seite live geht.

## Offene Punkte, die dir noch auffallen sollten

- **Alt-Texte prüfen:** In ein paar Gartenleben-Motiven (z. B. Katze,
  Goldammer, Dorngrasmücke) steht als `alt`-Text noch versehentlich
  "Rotkehlchen auf einem Ast" (Copy-Paste-Rest). Die `beschriftung`
  ist überall korrekt, aber der `alt`-Text lohnt sich für
  Barrierefreiheit/SEO zu bereinigen.
- **Bildpfade vereinheitlichen:** Die Startseite nutzt weiterhin flache
  Pfade wie `bilder/teichleben-01.jpg`, die Galerien nutzen Unterordner
  (`bilder/teichleben/entchen1.jpg`).
