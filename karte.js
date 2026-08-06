/* ============ KARTE AUS galerie-daten.js AUFBAUEN ============
   Liest alle Motive mit hinterlegtem "ort" aus GALERIE_BILDER und
   setzt dafür Marker auf eine Leaflet-Karte (OpenStreetMap-Kacheln,
   kostenlos, kein API-Key nötig). Beim Hover über einen Marker
   erscheint eine kleine Bildvorschau, ein Klick führt zur
   Geschichte des jeweiligen Motivs. */
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

  // ---- Basis-Zentrum: Halstenbek / Kreis Pinneberg, falls (noch) keine Orte da sind ----
  var startZentrum = [53.7297, 9.7975];
  var startZoom = 10;

  var karte = L.map(kartenElement, {
    scrollWheelZoom: false // verhindert versehentliches Zoomen beim Scrollen der Seite
  }).setView(startZentrum, startZoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende',
    maxZoom: 18
  }).addTo(karte);

  // Klick auf die Karte aktiviert Scroll-Zoom, Klick daneben deaktiviert ihn wieder
  karte.on('focus', function () { karte.scrollWheelZoom.enable(); });
  karte.on('blur', function () { karte.scrollWheelZoom.disable(); });

  if (motiveMitOrt.length === 0) {
    document.getElementById('karte-leer-hinweis').style.display = '';
    return;
  }

  // ---- Eigenes Marker-Icon im Seiten-Look ----
  var punktIcon = L.divIcon({
    className: 'karte-punkt-icon',
    html: '<span style="display:block; width:14px; height:14px; border-radius:50%; background:#C97C3D; border:2px solid #EDE7D6; box-shadow:0 0 0 3px rgba(201,124,61,0.35);"></span>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  var grenzen = [];

  motiveMitOrt.forEach(function (motiv) {
    var punkt = [motiv.ort.lat, motiv.ort.lng];
    grenzen.push(punkt);

    var titel = motiv.beschriftung ? motiv.beschriftung.replace(/<[^>]+>/g, '') : motiv.id;

    var marker = L.marker(punkt, { icon: punktIcon }).addTo(karte);

    // Hover-Vorschau: kleines Bild + Titel als Tooltip
    var vorschauHtml =
      '<img class="karte-marker-thumb" src="' + escapeAttr(motiv.bild) + '" alt="' + escapeAttr(motiv.alt || titel) + '">' +
      '<div class="karte-marker-label">' + escapeAttr(titel) + '</div>';

    marker.bindTooltip(vorschauHtml, {
      direction: 'top',
      offset: [0, -10],
      className: 'karte-tooltip',
      opacity: 1
    });

    // Klick führt zur Geschichte des Motivs
    var popupHtml = '<div style="font-family:\'Work Sans\',sans-serif; font-size:.85rem;">' +
      '<b style="font-family:\'Fraunces\',serif;">' + escapeAttr(titel) + '</b><br>' +
      '<span style="color:#93A085; font-size:.78rem;">' + escapeAttr(motiv.ort.label || '') + '</span><br>' +
      '<a href="geschichte.html?id=' + escapeAttr(motiv.id) + '" style="display:inline-block; margin-top:.5rem;">Geschichte lesen &rarr;</a>' +
      '</div>';
    marker.bindPopup(popupHtml);
  });

  // ---- Auf alle Marker zoomen, mit etwas Rand ----
  if (grenzen.length > 1) {
    karte.fitBounds(grenzen, { padding: [40, 40], maxZoom: 13 });
  } else if (grenzen.length === 1) {
    karte.setView(grenzen[0], 13);
  }

  // ---- Falls über die URL ein bestimmtes Motiv verlinkt wurde (?motiv=id), dessen Popup direkt öffnen ----
  var params = new URLSearchParams(window.location.search);
  var zielId = params.get('motiv');
  if (zielId) {
    var zielIndex = motiveMitOrt.map(function (m) { return m.id; }).indexOf(zielId);
    if (zielIndex !== -1) {
      var zielMotiv = motiveMitOrt[zielIndex];
      karte.setView([zielMotiv.ort.lat, zielMotiv.ort.lng], 14);
    }
  }
})();
