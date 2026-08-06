/* ============ GEBIET ZEICHNEN (intern) ============
   Stellt eine Karte mit Zeichenwerkzeug bereit (Leaflet.draw).
   Nach jeder gezeichneten Form (Polygon oder Kreis) wird sofort
   der fertige "ort"-Code erzeugt, den man 1:1 in galerie-daten.js
   bei der passenden Bildzeile einfügen kann. NICHT für Besucher. */
(function () {
  if (typeof L === 'undefined') return;

  var karte = L.map('zeichen-karte').setView([53.65, 9.85], 11); // Hamburg/Umland als Startausschnitt

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap-Mitwirkende &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(karte);

  var gezeichnet = new L.FeatureGroup();
  karte.addLayer(gezeichnet);

  var zeichenSteuerung = new L.Control.Draw({
    draw: {
      polygon: {
        allowIntersection: false,
        showArea: true,
        shapeOptions: { color: '#C97C3D', weight: 2, fillOpacity: 0.15 }
      },
      circle: {
        shapeOptions: { color: '#C97C3D', weight: 2, fillOpacity: 0.15 }
      },
      marker: false,
      circlemarker: false,
      rectangle: false,
      polyline: false
    },
    edit: {
      featureGroup: gezeichnet,
      remove: true
    }
  });
  karte.addControl(zeichenSteuerung);

  var liste = document.getElementById('gebiet-liste');
  var leerHinweis = document.getElementById('gebiet-leer-hinweis');

  function rundeAuf5(zahl) {
    return Math.round(zahl * 100000) / 100000;
  }

  function baueEintrag(code, beschreibung) {
    leerHinweis.style.display = 'none';

    var box = document.createElement('div');
    box.className = 'gebiet-eintrag';
    box.innerHTML =
      '<p class="gebiet-eintrag-titel">' + beschreibung + '</p>' +
      '<textarea readonly class="gebiet-eintrag-code" rows="4"></textarea>' +
      '<button class="btn btn-fill gebiet-kopieren-btn" style="font-size:.78rem; padding:.5em 1em; cursor:pointer;">Code kopieren</button>';

    box.querySelector('.gebiet-eintrag-code').value = code;

    box.querySelector('.gebiet-kopieren-btn').addEventListener('click', function (e) {
      var textarea = box.querySelector('.gebiet-eintrag-code');
      textarea.select();
      navigator.clipboard.writeText(textarea.value).then(function () {
        var btn = e.target;
        var original = btn.textContent;
        btn.textContent = 'Kopiert!';
        setTimeout(function () { btn.textContent = original; }, 1500);
      });
    });

    liste.prepend(box);
  }

  karte.on(L.Draw.Event.CREATED, function (event) {
    var typ = event.layerType;
    var layer = event.layer;
    gezeichnet.addLayer(layer);

    var label = window.prompt('Wie soll dieses Gebiet heißen? (z. B. "Hamburger Westen")', '') || '';

    var code;
    if (typ === 'polygon') {
      var punkte = layer.getLatLngs()[0].map(function (p) {
        return '[' + rundeAuf5(p.lat) + ', ' + rundeAuf5(p.lng) + ']';
      });
      code = "ort: { label: '" + label + "', bereich: true, polygon: [" + punkte.join(', ') + "] }";
      baueEintrag(code, 'Fläche · ' + (label || 'ohne Namen') + ' · ' + punkte.length + ' Punkte');
    } else if (typ === 'circle') {
      var mitte = layer.getLatLng();
      var radius = Math.round(layer.getRadius());
      code = "ort: { lat: " + rundeAuf5(mitte.lat) + ", lng: " + rundeAuf5(mitte.lng) + ", label: '" + label + "', bereich: true, radius: " + radius + " }";
      baueEintrag(code, 'Kreis · ' + (label || 'ohne Namen') + ' · Radius ' + radius + ' m');
    }
  });

  // Gelöschte Formen aus der Ergebnisliste kann man einfach ignorieren —
  // der jeweilige Code-Block bleibt zum Kopieren stehen, bis die Seite neu geladen wird.
})();
