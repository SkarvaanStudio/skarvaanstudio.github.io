# Anleitung: Shop-System pflegen (produkte-bestellen.html)

Diese Anleitung ist NUR für dich (Bene) — Kunden sehen das nicht.

## Das Prinzip

Die Datei `produkte-daten.js` ist die EINZIGE Stelle, die du bearbeiten musst.
`produkte-bestellen.html` liest diese Daten aus und baut die komplette Shop-Seite
automatisch zusammen — Postkarten, Sticker/Lesezeichen, Fine-Art-Prints und Merch.

Du musst also NIE HTML von Hand anpassen, um ein neues Motiv oder Produkt
hinzuzufügen. Nur `produkte-daten.js` bearbeiten, speichern, hochladen — fertig.

## Neues Foto aus der Galerie als Produkt anbieten

1. Foto in den passenden Unterordner legen, z. B. `bilder/waldleben/eichhoernchen4.jpg`
   (gleiche Ordnerstruktur wie bei Teichleben/Gartenleben nutzen — siehe Hinweis unten).
2. In `produkte-daten.js` im Abschnitt `MOTIVE` einen neuen Block kopieren
   (z. B. den letzten Eintrag) und anpassen:
   - `id`: eindeutiger Name, z. B. `"waldleben-eichhoernchen4"`
   - `motiv`: Anzeigename für Kunden, z. B. `"Eichhörnchen · im Sprung"`
   - `bild`: Pfad zum Foto
   - `kategorie`: `"Teichleben"`, `"Gartenleben"`, `"Waldleben"` oder `"Reduktion"`
   - `ausrichtung`: `"hoch"` (Hochformat) oder `"quer"` (Querformat)
3. Bei `verfuegbar` einzeln auf `true`/`false` setzen, wo das Motiv angeboten
   werden soll: `postkarte`, `sticker`, `lesezeichen`, `fineart`, `merch`.

   **Wichtig bei `lesezeichen`:** Nur auf `true` setzen, wenn du dir das Foto
   tatsächlich angeschaut hast und der Bildausschnitt im schmalen
   Lesezeichen-Format (lang, schmal) noch gut funktioniert — meistens nur bei
   Hochformat-Fotos mit zentriertem Motiv der Fall.

4. Datei speichern, ins Repository hochladen (GitHub), fertig — das Motiv
   erscheint jetzt automatisch überall, wo du es freigegeben hast, inkl.
   Vorschaubild.

## Neuen Artikel hinzufügen, der NICHT an ein Foto gebunden ist

(z. B. ein fertiges Sticker-Design, das nicht aus der Foto-Galerie stammt,
oder Geschenkanhänger)

→ Im Abschnitt `EXTRAS` einen neuen Eintrag ergänzen: `motiv`, `bild`
(Vorschaubild), `typ` (`"sticker"` oder `"geschenkanhaenger"`), `varianten`
(Liste der wählbaren Ausführungen, z. B. `["3er-Set", "6er-Set"]`).

## Neue Merch-Produktart oder Farbe ergänzen

→ Im Abschnitt `MERCH_FARBEN` entweder eine neue Zeile (= neue Produktart,
z. B. `"Beanie": ["Schwarz", "Grau"]`) oder bei einer bestehenden Produktart
eine weitere Farbe in die Liste ergänzen. Erscheint automatisch bei jedem
Merch-Motiv als Auswahloption.

## Offene Punkte, die dir noch auffallen sollten

- **Bildpfade vereinheitlichen:** Deine Startseite nutzt aktuell flache Pfade
  wie `bilder/teichleben-01.jpg`, während die vollständigen Galerien
  Unterordner nutzen (`bilder/teichleben/entchen1.jpg`). Für den Shop-Katalog
  habe ich die Unterordner-Variante übernommen (mehr echte Motive vorhanden).
  Langfristig lohnt es sich, dich für EIN Schema zu entscheiden.
- **alt-Texte in galerie-gartenleben.html prüfen:** Mir ist aufgefallen, dass
  einige alt-Texte nicht zum jeweiligen Foto passen (z. B. `blaumeise1.jpg`
  mit `alt="Buntspecht am Stamm"`). Für den Katalog habe ich stattdessen die
  Namen aus den Dateinamen abgeleitet — bitte einmal in Ruhe mit den echten
  Fotos abgleichen, unabhängig vom Shop.
- **Waldleben / Reduktion:** Diese Galerie-Unterseiten sind bei dir aktuell
  noch Platzhalter ("FOTO ERSETZEN"). Sobald du dort echte Fotos einpflegst,
  einfach nach demselben Muster in `produkte-daten.js` ergänzen.

## Formspree nicht vergessen

In `produkte-bestellen.html` steht `YOUR_FORM_ID` als Platzhalter im
Formular — durch deine eigene, neue Formspree-Endpoint-ID ersetzen, bevor
die Seite live geht.
