/* ============ GEMEINSAME GESCHICHTEN-TABELLE ============
   Eine einzige Stelle für die Google-Tabellen-URL und das Laden/
   Parsen der Geschichten-Texte. Wird von geschichte.js (Einzelseite
   pro Motiv) UND geschichten.js (Übersichtsseite) genutzt — so
   pflegst du die URL nur hier, nicht doppelt.

   Spalten in der Tabelle:
   - id          (Pflicht, muss zur id in galerie-daten.js passen)
   - geschichte  (Pflicht, der persönliche Text)
   - datum       (optional, z.B. "14.05.2025")
   - ort         (optional, z.B. "Schenefeld/Halstenbek")
   - tier_de     (optional, deutscher Artname, z.B. "Stockente")
   - tier_lat    (optional, lateinischer Artname, z.B. "Anas platyrhynchos")
   - gefaehrdung (optional, z.B. "Die Stockente ist nicht gefährdet.")
   Die letzten fünf Spalten erscheinen automatisch als sachlicher
   Fußblock unter der Geschichte auf geschichte.html — getrennt von
   der persönlichen Erzählung. Leere Spalten werden einfach ausgelassen.

   Die Tabelle ist jetzt die EINZIGE Quelle für Geschichten-Texte.
   Das geschichte-Feld in galerie-daten.js wird nicht mehr gebraucht
   (bleibt aber als Rückfallebene erhalten, falls die Tabelle mal
   nicht erreichbar ist). */
(function (global) {
  // ---- HIER die veröffentlichte CSV-URL deiner Google-Tabelle eintragen ----
  var GESCHICHTEN_TABELLE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTX6NJb2qa-jyx29imIn47l7sjM1130W_PxaNiNhdv206vnv3DbPOgvTIZx8ORVW1hXaxAEuC0W3R39/pub?output=csv';

  // ---- Sehr einfacher CSV-Parser: kommt mit Kommas/Zeilenumbrüchen
  // innerhalb von "..."-Feldern klar, wie Google Sheets sie exportiert.
  function parseCsv(text) {
    var zeilen = [];
    var feld = '', zeile = [], inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i], next = text[i + 1];
      if (inQuotes) {
        if (c === '"' && next === '"') { feld += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { feld += c; }
      } else {
        if (c === '"') { inQuotes = true; }
        else if (c === ',') { zeile.push(feld); feld = ''; }
        else if (c === '\r') { /* ignorieren */ }
        else if (c === '\n') { zeile.push(feld); zeilen.push(zeile); zeile = []; feld = ''; }
        else { feld += c; }
      }
    }
    if (feld.length || zeile.length) { zeile.push(feld); zeilen.push(zeile); }
    return zeilen.filter(function (z) { return z.length && z.some(function (f) { return f.trim() !== ''; }); });
  }

  var cachePromise = null;

  // Lädt die komplette Tabelle EINMAL pro Seitenaufruf und liefert eine
  // Map { id: { geschichte, datum, ort, tier_de, tier_lat, gefaehrdung, ... } } —
  // also ALLE Spalten deiner Tabelle, nicht nur den Geschichte-Text.
  // Weitere Aufrufe bekommen das bereits geladene Ergebnis zurück (kein
  // zweiter Netzwerk-Request nötig).
  function holeAlleGeschichten() {
    if (cachePromise) return cachePromise;

    if (!GESCHICHTEN_TABELLE_URL || GESCHICHTEN_TABELLE_URL.indexOf('HIER_DEINE') === 0) {
      cachePromise = Promise.resolve({});
      return cachePromise;
    }

    cachePromise = fetch(GESCHICHTEN_TABELLE_URL)
      .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
      .then(function (csvText) {
        var zeilen = parseCsv(csvText);
        var map = {};
        if (!zeilen.length) return map;
        var kopf = zeilen[0].map(function (h) { return h.trim().toLowerCase(); });
        var idxId = kopf.indexOf('id');
        if (idxId === -1) return map;
        for (var i = 1; i < zeilen.length; i++) {
          var id = (zeilen[i][idxId] || '').trim();
          if (!id) continue;
          var eintrag = {};
          kopf.forEach(function (spalte, idx) {
            eintrag[spalte] = (zeilen[i][idx] || '').trim();
          });
          if (eintrag.geschichte) map[id] = eintrag;
        }
        return map;
      })
      .catch(function () { return {}; }); // still, kein Absturz — Fallback greift

    return cachePromise;
  }

  // Bequemer Einzel-Abruf für die Geschichte-Seite (?id=...).
  // Liefert das GANZE Tabellen-Objekt für diese Zeile (nicht nur den Text).
  function holeGeschichteAusTabelle(id) {
    return holeAlleGeschichten().then(function (map) {
      return map[id] || null;
    });
  }

  global.GeschichtenTabelle = {
    holeAlleGeschichten: holeAlleGeschichten,
    holeGeschichteAusTabelle: holeGeschichteAusTabelle
  };
})(window);
