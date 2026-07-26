# Anleitung: Shop-System pflegen (produkte-bestellen.html)

Diese Anleitung ist NUR für dich (Bene) — Kunden sehen das nicht.

## Das Prinzip

`produkte-daten.js` ist die EINZIGE Datei, die du bearbeiten musst.
`produkte-bestellen.html` baut die komplette Shop-Seite automatisch daraus auf.

**Wichtig:** Beide Listen (`MOTIVE` und `EXTRAS`) sind bewusst leer. Es
erscheint auf der Seite nichts, bis du selbst Einträge ergänzt — es gibt
keine Beispiel- oder Platzhalter-Motive. Was du einträgst, ist das, was
Kunden sehen.

## Mockups & Karussell

Jede Variante (z. B. "Postkarte, einzeln" oder eine Farbe bei Merch) hat
eine eigene `mockups`-Liste mit Bildpfaden:
- **Ein Bild** → wird einfach angezeigt.
- **Mehrere Bilder** → werden automatisch zum Karussell mit Pfeilen und
  Punkte-Anzeige.
- **Leere Liste `[]`** → zeigt "Noch kein Mockup hinterlegt" statt eines
  kaputten Bildes. Du kannst ein Motiv also schon anlegen und die Mockups
  später nachreichen.

Bei **Merch** wechseln die Mockups automatisch mit der gewählten Farbe —
du hinterlegst pro Farbe eine eigene `mockups`-Liste.

Bei **Sticker/Lesezeichen** entscheidest du komplett selbst: Ein Motiv
bekommt nur dann eine "Lesezeichen"-Variante, wenn du sie explizit
einträgst (siehe Beispiel unten) — es gibt keine automatische Annahme
mehr über Hoch-/Querformat.

## Neues Motiv anlegen — so gehst du vor

1. Mockup-Fotos erstellen (z. B. über den Printful- oder Gelato-
   Mockup-Generator, oder eigene Fotos deiner Postkarten/Sticker) und in
   `bilder/mockups/` ablegen.
2. In `produkte-daten.js` das auskommentierte Beispiel oben in der Datei
   kopieren, in die `MOTIVE`-Liste einfügen und anpassen:
   - `id`, `motiv` (Anzeigename), `kategorie`
   - Nur die Kategorien eintragen, die du wirklich anbieten willst
     (`postkarte`, `stickerLesezeichen`, `fineart`, `merch`) — fehlt eine
     Kategorie komplett, taucht das Motiv dort auch nicht auf.
   - Pro Kategorie: `varianten`-Liste mit `name` + `mockups`.
   - Bei `merch`: zusätzlich pro Produkttyp eine `farben`-Liste mit
     `farbe` + eigener `mockups`-Liste.
3. Datei speichern, hochladen — fertig.

## Neuen Artikel ohne Foto-Bezug anlegen (Extras)

Für fertige Sticker-Designs oder Geschenkanhänger, die nicht an ein
Galerie-Foto gebunden sind: in `EXTRAS` nach demselben Muster (siehe
Beispiel in der Datei) einen neuen Eintrag ergänzen.

## Offene Punkte, die dir noch auffallen sollten

- **Bildpfade vereinheitlichen:** Deine Startseite nutzt aktuell flache
  Pfade wie `bilder/teichleben-01.jpg`, deine vollständigen Galerien
  nutzen Unterordner (`bilder/teichleben/entchen1.jpg`). Für die
  Mockup-Bilder empfehle ich einen eigenen, dritten Ordner
  `bilder/mockups/`, damit nichts durcheinanderkommt.
- **Waldleben / Reduktion:** Diese Galerie-Unterseiten sind bei dir noch
  Platzhalter. Sobald du dort echte Fotos einpflegst, kannst du sie hier
  nach demselben Muster ergänzen.

## Formspree nicht vergessen

In `produkte-bestellen.html` steht `YOUR_FORM_ID` als Platzhalter im
Formular — durch deine eigene, neue Formspree-Endpoint-ID ersetzen, bevor
die Seite live geht.
