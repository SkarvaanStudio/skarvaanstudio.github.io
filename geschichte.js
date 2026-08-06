/* ============ GESCHICHTE-SEITE BEFÜLLEN ============
   Bild, Titel, Ort etc. kommen weiter aus galerie-daten.js (?id=...).
   Der Geschichte-TEXT kommt jetzt primär aus einer Google-Tabelle
   (Spalten: id, geschichte) — damit du Texte bequem in einer Tabelle
   schreibst statt in einer einzigen HTML/JS-Zeile auf GitHub.
   Falls die Tabelle mal nicht erreichbar ist oder für ein Motiv noch
   keine Zeile hat, greift ersatzweise motiv.geschichte aus
   galerie-daten.js (falls dort was steht), sonst der Platzhaltertext. */

(function () {
  // ---- HIER die veröffentlichte CSV-URL deiner Google-Tabelle eintragen ----
  // Anleitung dazu unten in diesem Chat / in der Kurzanleitung.
  var GESCHICHTEN_TABELLE_URL = 'HIER_DEINE_VEROEFFENTLICHTE_CSV_URL_EINSETZEN';

  // ---- Zuordnung Kategorie -> Galerie-Unterseite (für den "Zurück"-Link) ----
  var KATEGORIE_ZU_SEITE = {
    'Teichleben': 'galerie-teichleben.html',
    'Gartenleben': 'galerie-gartenleben.html',
    'Waldleben': 'galerie-waldleben.html',
    'Reduktion': 'galerie-reduktion.html'
  };

  function stripHtml(str) {
    var div = document.createElement('div');
    div.innerHTML = str || '';
    return div.textContent || div.innerText || '';
  }

  function zeigeFehler(text) {
    var hinweis = document.getElementById('geschichte-lade-hinweis');
    hinweis.innerHTML = '<div class="wrap">' +
      '<p style="color:var(--text-muted);">' + text + '</p>' +
      '<a href="index.html#galerie" class="btn btn-outline" style="margin-top:1rem; display:inline-block;">&larr; Zur Galerie</a>' +
      '</div>';
  }

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

  function holeGeschichteAusTabelle(id) {
    if (!GESCHICHTEN_TABELLE_URL || GESCHICHTEN_TABELLE_URL.indexOf('HIER_DEINE') === 0) {
      return Promise.resolve(null); // Tabelle noch nicht eingerichtet
    }
    return fetch(GESCHICHTEN_TABELLE_URL)
      .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
      .then(function (csvText) {
        var zeilen = parseCsv(csvText);
        if (!zeilen.length) return null;
        var kopf = zeilen[0].map(function (h) { return h.trim().toLowerCase(); });
        var idxId = kopf.indexOf('id');
        var idxGeschichte = kopf.indexOf('geschichte');
        if (idxId === -1 || idxGeschichte === -1) return null;
        for (var i = 1; i < zeilen.length; i++) {
          if ((zeilen[i][idxId] || '').trim() === id) {
            var wert = (zeilen[i][idxGeschichte] || '').trim();
            return wert || null;
          }
        }
        return null;
      })
      .catch(function () { return null; }); // still, kein Absturz — Fallback greift
  }

  if (typeof GALERIE_BILDER === 'undefined') {
    zeigeFehler('Die Bilddaten konnten nicht geladen werden.');
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');

  if (!id) {
    zeigeFehler('Zu diesem Aufruf fehlt die Motiv-Angabe (?id=...).');
    return;
  }

  var motiv = GALERIE_BILDER.filter(function (b) { return b.id === id; })[0];

  if (!motiv) {
    zeigeFehler('Zu diesem Motiv wurde leider keine Geschichte gefunden.');
    return;
  }

  // ---- Ladehinweis ausblenden, Inhalt einblenden ----
  document.getElementById('geschichte-lade-hinweis').style.display = 'none';
  document.getElementById('geschichte-inhalt').style.display = '';

  // ---- Titel & Seitentitel ----
  var titelText = stripHtml(motiv.beschriftung) || motiv.id;
  document.title = titelText + ' — Die Geschichte — BG Naturfotografie';
  document.getElementById('geschichte-titel').innerHTML = motiv.beschriftung || titelText;
  document.getElementById('geschichte-kategorie').textContent = motiv.kategorie;

  // ---- Bild ----
  var img = document.getElementById('geschichte-img');
  img.src = motiv.bild;
  img.alt = motiv.alt || titelText;

  // ---- Zurück-Link ----
  var zurueckSeite = KATEGORIE_ZU_SEITE[motiv.kategorie] || 'index.html#galerie';
  document.getElementById('zurueck-link').href = zurueckSeite;

  // ---- Geschichte-Text: erst Tabelle versuchen, sonst galerie-daten.js, sonst Platzhalter ----
  var textEl = document.getElementById('geschichte-text-inhalt');
  textEl.innerHTML = '<em>Lädt …</em>';

  function zeigeGeschichte(text) {
    if (text) {
      textEl.textContent = text; // textContent erhält Zeilenumbrüche via CSS white-space
    } else {
      textEl.innerHTML = '<em>Zu diesem Foto schreibe ich die Geschichte noch auf — schau bald wieder vorbei.</em>';
    }
  }

  holeGeschichteAusTabelle(motiv.id).then(function (ausTabelle) {
    zeigeGeschichte(ausTabelle || motiv.geschichte);
  });

  // ---- Ort (nur anzeigen, wenn hinterlegt) ----
  if (motiv.ort && motiv.ort.lat && motiv.ort.lng) {
    document.getElementById('geschichte-ort-box').style.display = '';
    document.getElementById('geschichte-ort-text').textContent = motiv.ort.label || 'Ort hinterlegt';
    document.getElementById('geschichte-karte-link').href = 'karte.html?motiv=' + encodeURIComponent(motiv.id);
  }

  // ---- Teilen-Button: nutzt das native Teilen-Menü (Handy), sonst Link kopieren ----
  var teilenBtn = document.getElementById('teilen-btn');
  var teilenBtnText = document.getElementById('teilen-btn-text');
  var seitenUrl = window.location.origin + window.location.pathname + '?id=' + encodeURIComponent(motiv.id);

  teilenBtn.addEventListener('click', function () {
    if (navigator.share) {
      navigator.share({
        title: titelText + ' — BG Naturfotografie',
        text: 'Die Geschichte hinter diesem Foto:',
        url: seitenUrl
      }).catch(function () { /* Abbruch durch Nutzer:in — kein Fehler */ });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(seitenUrl).then(function () {
        var original = teilenBtnText.textContent;
        teilenBtnText.textContent = 'Link kopiert!';
        setTimeout(function () { teilenBtnText.textContent = original; }, 2000);
      });
    }
  });
})();
