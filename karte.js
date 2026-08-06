/* ============ KARTE AUS galerie-daten.js AUFBAUEN ============
   Liest alle Motive mit hinterlegtem "ort" aus GALERIE_BILDER und
   setzt dafür Punkte bzw. Gebiete auf eine Leaflet-Karte (kostenlos,
   kein API-Key nötig). Beim Hover erscheint eine kleine Bildvorschau,
   ein Klick führt direkt zur Geschichte des jeweiligen Motivs.

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

  // ---- Helle, freundliche, reduzierte Kacheln (CartoDB Positron) ----
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
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
    var titel = motiv.beschriftung ? motiv.beschriftung.replace(/<[^>]+>/g, '') : motiv.id;
    var ziel = 'geschichte.html?id=' + encodeURIComponent(motiv.id);
    var element;

    if (motiv.ort.polygon && motiv.ort.polygon.length >= 3) {
      // ---- Gebiet als frei gezeichnete Fläche (z. B. Stadtteil-Umriss) ----
      element = L.polygon(motiv.ort.polygon, {
        className: 'karte-gebiet',
        stroke: false,
        fillOpacity: 1
      }).addTo(karte);
      motiv.ort.polygon.forEach(function (p) { grenzen.push(p); });
    } else if (motiv.ort.bereich) {
      // ---- Gebiet als weicher Kreis ----
      var mittelpunkt = [motiv.ort.lat, motiv.ort.lng];
      element = L.circle(mittelpunkt, {
        radius: motiv.ort.radius || 4000,
        className: 'karte-gebiet',
        stroke: false,
        fillOpacity: 1
      }).addTo(karte);
      grenzen.push(mittelpunkt);
    } else {
      // ---- Punkt: schlichter kleiner Kreis ----
      var punkt = [motiv.ort.lat, motiv.ort.lng];
      element = L.circleMarker(punkt, {
        radius: 5,
        className: 'karte-punkt'
      }).addTo(karte);
      grenzen.push(punkt);
    }

    element.bindTooltip(tooltipHtml(motiv, titel), {
      direction: 'top',
      offset: [0, motiv.ort.polygon ? 0 : (motiv.ort.bereich ? -10 : -8)],
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
      if (zielMotiv.ort.polygon) {
        karte.fitBounds(zielMotiv.ort.polygon, { padding: [60, 60], maxZoom: 14 });
      } else {
        karte.setView([zielMotiv.ort.lat, zielMotiv.ort.lng], 13);
      }
    }
  }
})();
