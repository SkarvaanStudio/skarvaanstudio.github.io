/* ============ KARTE AUS galerie-daten.js AUFBAUEN ============
   Liest alle Motive mit hinterlegtem "ort" aus GALERIE_BILDER und
   setzt dafür Punkte bzw. Gebiete auf eine Leaflet-Karte (kostenlos,
   kein API-Key nötig).

   MEHRERE MOTIVE AN EINEM ORT:
   Motive, die sich denselben Ort teilen (gleicher Punkt, gleicher
   Kreis oder dieselbe Fläche), werden zu EINER Markierung zusammen-
   gefasst. Ein Klick darauf öffnet ein Fenster mit allen Bildern
   dieses Ortes — es bleibt offen, bis man daneben klickt. Erst ein
   Klick auf ein einzelnes Bild führt zu dessen Geschichte.

   DREI ARTEN VON ORTEN (siehe galerie-daten.js):
   - Punkt:           kein "bereich"        → schlichter kleiner Punkt
   - Gebiet (Kreis):  bereich:true + radius → weicher, unscharfer Kreis
   - Gebiet (Form):   bereich:true + polygon → frei gezeichnete Fläche
                       (z. B. ein Stadtteil-Umriss, erzeugt mit
                       gebiet-zeichnen.html) */
(function () {
  var kartenElement = document.getElementById('foto-karte');
  if (!kartenElement || typeof L === 'undefined' || typeof GALERIE_BILDER === 'undefined') return;

  function escapeAttr(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function titelVon(motiv) {
    return motiv.beschriftung ? motiv.beschriftung.replace(/<[^>]+>/g, '') : motiv.id;
  }

  function hatOrt(b) {
    if (!b.ort) return false;
    if (b.ort.polygon && b.ort.polygon.length >= 3) return true;
    return typeof b.ort.lat === 'number' && typeof b.ort.lng === 'number';
  }

  var motiveMitOrt = GALERIE_BILDER.filter(hatOrt);

  var startZentrum = [53.7297, 9.7975]; // Halstenbek / Kreis Pinneberg
  var startZoom = 10;

  var karte = L.map(kartenElement, {
    scrollWheelZoom: false,
    zoomControl: false // eigene, ruhigere Zoom-Buttons unten
  }).setView(startZentrum, startZoom);

  L.control.zoom({ position: 'bottomright' }).addTo(karte);

  // ---- Warme, gedämpfte Kacheln passend zum Farbschema ----
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 18,
    className: 'karte-kacheln'
  }).addTo(karte);

  karte.on('focus', function () { karte.scrollWheelZoom.enable(); });
  karte.on('blur', function () { karte.scrollWheelZoom.disable(); });

  if (motiveMitOrt.length === 0) {
    document.getElementById('karte-leer-hinweis').style.display = '';
    return;
  }

  /* ---- Motive nach Ort gruppieren ------------------------------
     Entscheidend ist der ORTSNAME (label): Alle Motive mit demselben
     label landen unter EINER Markierung — so bestimmst du die
     Gruppierung einfach über den Text, ohne auf exakt gleiche
     Koordinaten achten zu müssen. (Drei Fotos "Teich in Halstenbek"
     mit minimal verschiedenen Koordinaten ergeben also einen Punkt.)
     Nur wenn kein label gesetzt ist, wird auf die Koordinaten
     zurückgegriffen. */
  function ortSchluessel(ort) {
    if (ort.label && ort.label.trim()) {
      return 'name:' + ort.label.trim().toLowerCase();
    }
    if (ort.polygon && ort.polygon.length >= 3) {
      return 'flaeche:' + ort.polygon.map(function (p) {
        return p[0].toFixed(5) + ',' + p[1].toFixed(5);
      }).join('|');
    }
    var basis = ort.lat.toFixed(5) + ',' + ort.lng.toFixed(5);
    if (ort.bereich) return 'kreis:' + basis + ':' + (ort.radius || 4000);
    return 'punkt:' + basis;
  }

  var gruppen = {};
  motiveMitOrt.forEach(function (motiv) {
    var schluessel = ortSchluessel(motiv.ort);
    if (!gruppen[schluessel]) {
      gruppen[schluessel] = { ort: motiv.ort, motive: [] };
    }
    gruppen[schluessel].motive.push(motiv);
  });

  /* ---- Inhalt des Hover-Vorschaufensters ----
     Ein Motiv → kleines Bild mit Titel.
     Mehrere    → Ortsname und Anzahl, damit klar ist, dass ein
                  Klick mehrere Bilder zeigt. */
  function tooltipHtml(gruppe) {
    if (gruppe.motive.length === 1) {
      var m = gruppe.motive[0];
      return '<img class="karte-marker-thumb" src="' + escapeAttr(m.bild) + '" alt="' + escapeAttr(m.alt || titelVon(m)) + '">' +
        '<div class="karte-marker-label">' + escapeAttr(titelVon(m)) + '</div>';
    }
    return '<div class="karte-marker-label karte-marker-sammel">' +
      escapeAttr(gruppe.ort.label || 'Mehrere Motive') +
      '<br><span>' + gruppe.motive.length + ' Motive &middot; klicken</span></div>';
  }

  /* ---- Inhalt des Klick-Fensters: alle Bilder dieses Ortes ----
     Jedes Bild ist ein Link zu seiner Geschichte. Das Fenster bleibt
     offen, bis man daneben auf die Karte klickt (Leaflet-Standard). */
  function popupHtml(gruppe) {
    var kopf = '<div class="karte-popup-kopf">' +
      escapeAttr(gruppe.ort.label || 'Aufnahmeort') +
      (gruppe.motive.length > 1 ? ' <span>&middot; ' + gruppe.motive.length + ' Motive</span>' : '') +
      '</div>';

    var eintraege = gruppe.motive.map(function (m) {
      return '<a class="karte-popup-eintrag" href="geschichte.html?id=' + escapeAttr(m.id) + '">' +
        '<img src="' + escapeAttr(m.bild) + '" alt="' + escapeAttr(m.alt || titelVon(m)) + '">' +
        '<span>' + escapeAttr(titelVon(m)) + '</span>' +
        '</a>';
    }).join('');

    return kopf + '<div class="karte-popup-raster">' + eintraege + '</div>';
  }

  var grenzen = [];

  Object.keys(gruppen).forEach(function (schluessel) {
    var gruppe = gruppen[schluessel];
    var ort = gruppe.ort;
    var element;
    var versatz;

    if (ort.polygon && ort.polygon.length >= 3) {
      // ---- Gebiet als frei gezeichnete Fläche ----
      element = L.polygon(ort.polygon, {
        className: 'karte-gebiet',
        stroke: false,
        fillOpacity: 1
      }).addTo(karte);
      ort.polygon.forEach(function (p) { grenzen.push(p); });
      versatz = [0, 0];
    } else if (ort.bereich) {
      // ---- Gebiet als weicher Kreis ----
      var mittelpunkt = [ort.lat, ort.lng];
      element = L.circle(mittelpunkt, {
        radius: ort.radius || 4000,
        className: 'karte-gebiet',
        stroke: false,
        fillOpacity: 1
      }).addTo(karte);
      grenzen.push(mittelpunkt);
      versatz = [0, -10];
    } else {
      // ---- Punkt: schlichter kleiner Kreis ----
      var punkt = [ort.lat, ort.lng];
      element = L.circleMarker(punkt, {
        radius: gruppe.motive.length > 1 ? 7 : 5, // Sammelpunkte etwas größer
        className: 'karte-punkt'
      }).addTo(karte);
      grenzen.push(punkt);
      versatz = [0, -8];
    }

    element.bindTooltip(tooltipHtml(gruppe), {
      direction: 'top',
      offset: versatz,
      className: 'karte-tooltip',
      opacity: 1,
      sticky: true
    });

    element.bindPopup(popupHtml(gruppe), {
      className: 'karte-popup',
      maxWidth: 320,
      minWidth: 220,
      autoPan: true,
      closeButton: true
    });

    // Beim Öffnen des Fensters die Hover-Vorschau ausblenden,
    // damit sich beides nicht überlagert.
    element.on('popupopen', function () { element.closeTooltip(); });
  });

  if (grenzen.length > 1) {
    karte.fitBounds(grenzen, { padding: [50, 50], maxZoom: 12 });
  } else if (grenzen.length === 1) {
    karte.setView(grenzen[0], 12);
  }

  // ---- Falls über die URL ein bestimmtes Motiv verlinkt wurde (?motiv=id), dorthin zentrieren ----
  var params = new URLSearchParams(window.location.search);
  var zielId = params.get('motiv');
  if (zielId) {
    var zielMotiv = motiveMitOrt.filter(function (m) { return m.id === zielId; })[0];
    if (zielMotiv) {
      if (zielMotiv.ort.polygon) {
        karte.fitBounds(zielMotiv.ort.polygon, { padding: [60, 60], maxZoom: 14 });
      } else {
        karte.setView([zielMotiv.ort.lat, zielMotiv.ort.lng], 13);
      }
    }
  }
})();
