/* ============ GEMEINSAME GESCHICHTEN-TABELLE ============
   Eine einzige Stelle für die Google-Tabellen-URL und das Laden/
   Parsen der Geschichten-Texte. Wird von geschichte.js (Einzelseite
   pro Motiv) UND geschichten.js (Übersichtsseite) genutzt — so
   pflegst du die URL nur hier, nicht doppelt.

   Spalten in der Tabelle: id, geschichte
   Die Tabelle ist jetzt die EINZIGE Quelle für Geschichten-Texte.
   Das geschichte-Feld in galerie-daten.js wird nicht mehr gebraucht
   (bleibt aber als Rückfallebene erhalten, falls die Tabelle mal
   nicht erreichbar ist). */
(function (global) {
  // ---- HIER die veröffentlichte CSV-URL deiner Google-Tabelle eintragen ----
  var GESCHICHTEN_TABELLE_URL = 'HIER_DEINE_VEROEFFENTLICHTE_CSV_URL_EINSETZEN';

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
  // Map { id: geschichte-text }. Weitere Aufrufe bekommen das bereits
  // geladene Ergebnis zurück (kein zweiter Netzwerk-Request nötig).
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
        var idxGeschichte = kopf.indexOf('geschichte');
        if (idxId === -1 || idxGeschichte === -1) return map;
        for (var i = 1; i < zeilen.length; i++) {
          var id = (zeilen[i][idxId] || '').trim();
          var wert = (zeilen[i][idxGeschichte] || '').trim();
          if (id && wert) map[id] = wert;
        }
        return map;
      })
      .catch(function () { return {}; }); // still, kein Absturz — Fallback greift

    return cachePromise;
  }

  // Bequemer Einzel-Abruf für die Geschichte-Seite (?id=...).
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
