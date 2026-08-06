/* ============ KARTE AUS galerie-daten.js AUFBAUEN ============
   Liest alle Motive mit hinterlegtem "ort" aus GALERIE_BILDER und
   setzt dafür Punkte bzw. Gebiete auf eine Leaflet-Karte (kostenlos,
   kein API-Key nötig). Beim Hover erscheint eine kleine Bildvorschau,
   ein Klick führt direkt zur Geschichte des jeweiligen Motivs.

   ZWEI ARTEN VON ORTEN (siehe galerie-daten.js):
   - Punkt:  ort.bereich fehlt/false → schlichter kleiner Punkt
   - Gebiet: ort.bereich = true      → weicher, unscharfer Kreis
             (für ungefähre Gegenden wie "Hamburger Westen") */
(function () {
  var kartenElement = document.getElementById('foto-karte');
  if (!kartenElement || typeof L === 'undefined' || typeof GALERIE_BILDER === 'undefined') return;

  function escapeAttr(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  var motiveMitOrt = GALERIE_BILDER.filter(function (b) {
    return b.ort && typeof b.ort.lat === 'number' && typeof b.ort.lng === 'number';
  });

  var startZentrum = [53.7297, 9.7975]; // Halstenbek / Kreis Pinneberg
  var startZoom = 10;

  var karte = L.map(kartenElement, {
    scrollWheelZoom: false,
    zoomControl: false // eigene, ruhigere Zoom-Buttons unten
  }).setView(startZentrum, startZoom);

  L.control.zoom({ position: 'bottomright' }).addTo(karte);

  // ---- Ruhige, dunkle Kacheln statt bunter Standardkarte ----
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(karte);

  karte.on('focus', function () { karte.scrollWheelZoom.enable(); });
  karte.on('blur', function () { karte.scrollWheelZoom.disable(); });

  if (motiveMitOrt.length === 0) {
    document.getElementById('karte-leer-hinweis').style.display = '';
    return;
  }

  function tooltipHtml(motiv, titel) {
    return '<img class="karte-marker-thumb" src="' + escapeAttr(motiv.bild) + '" alt="' + escapeAttr(motiv.alt || titel) + '">' +
      '<div class="karte-marker-label">' + escapeAttr(titel) + '</div>';
  }

  var grenzen = [];

  motiveMitOrt.forEach(function (motiv) {
    var punkt = [motiv.ort.lat, motiv.ort.lng];
    grenzen.push(punkt);

    var titel = motiv.beschriftung ? motiv.beschriftung.replace(/<[^>]+>/g, '') : motiv.id;
    var ziel = 'geschichte.html?id=' + encodeURIComponent(motiv.id);
    var element;

    if (motiv.ort.bereich) {
      // ---- Gebiet: weicher, unscharfer Kreis ohne exakten Punkt ----
      element = L.circle(punkt, {
        radius: motiv.ort.radius || 4000,
        className: 'karte-gebiet',
        stroke: false,
        fillOpacity: 1
      }).addTo(karte);
    } else {
      // ---- Punkt: schlichter kleiner Kreis ----
      element = L.circleMarker(punkt, {
        radius: 5,
        className: 'karte-punkt'
      }).addTo(karte);
    }

    element.bindTooltip(tooltipHtml(motiv, titel), {
      direction: 'top',
      offset: [0, motiv.ort.bereich ? -10 : -8],
      className: 'karte-tooltip',
      opacity: 1,
      sticky: true
    });

    element.on('click', function () {
      window.location.href = ziel;
    });
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
      karte.setView([zielMotiv.ort.lat, zielMotiv.ort.lng], 13);
    }
  }
})();
