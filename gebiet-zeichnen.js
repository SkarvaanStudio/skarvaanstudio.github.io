/* ============ GEBIET ZEICHNEN (intern) ============
   Zeichenwerkzeug mit reinem Leaflet — ohne Zusatz-Bibliothek,
   damit keine fehlenden Symbol-Grafiken mehr auftreten können.

   BEDIENUNG:
   - "Fläche zeichnen": auf die Karte klicken setzt Punkt für Punkt
     den Umriss. "Fertig" schließt die Fläche und erzeugt den Code.
   - "Kreis zeichnen": erster Klick setzt die Mitte, zweiter Klick
     legt den Radius fest — Code entsteht sofort.

   Der erzeugte Code lässt sich 1:1 in galerie-daten.js beim Feld
   "ort:" der passenden Bildzeile einsetzen. NICHT für Besucher. */
(function () {
  if (typeof L === 'undefined') return;

  var FARBE = '#C97C3D';

  var karte = L.map('zeichen-karte').setView([53.65, 9.85], 11); // Hamburg/Umland als Startausschnitt

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap-Mitwirkende &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 18,
    className: 'karte-kacheln'
  }).addTo(karte);

  var liste = document.getElementById('gebiet-liste');
  var leerHinweis = document.getElementById('gebiet-leer-hinweis');
  var statusZeile = document.getElementById('zeichen-status');

  var btnFlaeche = document.getElementById('modus-flaeche');
  var btnKreis = document.getElementById('modus-kreis');
  var btnZurueck = document.getElementById('punkt-zurueck');
  var btnFertig = document.getElementById('form-fertig');
  var btnLoeschen = document.getElementById('alles-loeschen');

  // ---- Zustand ----
  var modus = null;            // null | 'flaeche' | 'kreis'
  var punkte = [];             // gesetzte Eckpunkte (Fläche)
  var punktMarker = [];        // kleine Marker zu den Eckpunkten
  var vorschauLinie = null;    // Linie/Fläche während des Zeichnens
  var kreisMitte = null;       // Mittelpunkt beim Kreis-Modus
  var kreisVorschau = null;
  var fertigeFormen = [];      // abgeschlossene Formen (bleiben sichtbar)

  function setzeStatus(text) {
    statusZeile.textContent = text;
  }

  function aktualisiereButtons() {
    btnFlaeche.classList.toggle('ist-aktiv', modus === 'flaeche');
    btnKreis.classList.toggle('ist-aktiv', modus === 'kreis');
    btnZurueck.disabled = !(modus === 'flaeche' && punkte.length > 0);
    btnFertig.disabled = !(modus === 'flaeche' && punkte.length >= 3);
  }

  function rundeAuf5(zahl) {
    return Math.round(zahl * 100000) / 100000;
  }

  // ---- Zwischenstand vom Zeichnen entfernen ----
  function raeumeVorschauAuf() {
    punktMarker.forEach(function (m) { karte.removeLayer(m); });
    punktMarker = [];
    if (vorschauLinie) { karte.removeLayer(vorschauLinie); vorschauLinie = null; }
    if (kreisVorschau) { karte.removeLayer(kreisVorschau); kreisVorschau = null; }
    punkte = [];
    kreisMitte = null;
  }

  function zeichneVorschau() {
    if (vorschauLinie) { karte.removeLayer(vorschauLinie); vorschauLinie = null; }
    if (punkte.length >= 2) {
      vorschauLinie = L.polyline(punkte, { color: FARBE, weight: 2, dashArray: '5,5' }).addTo(karte);
    }
  }

  // ---- Ergebniskarte mit Code rechts anlegen ----
  function baueEintrag(code, beschreibung) {
    leerHinweis.style.display = 'none';

    var box = document.createElement('div');
    box.className = 'gebiet-eintrag';

    var titel = document.createElement('p');
    titel.className = 'gebiet-eintrag-titel';
    titel.textContent = beschreibung;

    var feld = document.createElement('textarea');
    feld.className = 'gebiet-eintrag-code';
    feld.readOnly = true;
    feld.rows = 4;
    feld.value = code;

    var btn = document.createElement('button');
    btn.className = 'btn btn-fill gebiet-kopieren-btn';
    btn.type = 'button';
    btn.textContent = 'Code kopieren';
    btn.style.cssText = 'font-size:.78rem; padding:.5em 1em; cursor:pointer;';

    btn.addEventListener('click', function () {
      feld.select();
      var fertig = function () {
        btn.textContent = 'Kopiert!';
        setTimeout(function () { btn.textContent = 'Code kopieren'; }, 1500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(feld.value).then(fertig, function () { document.execCommand('copy'); fertig(); });
      } else {
        document.execCommand('copy');
        fertig();
      }
    });

    box.appendChild(titel);
    box.appendChild(feld);
    box.appendChild(btn);
    liste.prepend(box);
  }

  // ---- Fläche abschließen ----
  function schliesseFlaecheAb() {
    if (punkte.length < 3) return;

    var label = window.prompt('Wie soll dieses Gebiet heißen? (z. B. "Hamburger Westen")', '') || '';

    var flaeche = L.polygon(punkte, {
      color: FARBE, weight: 2, fillOpacity: 0.15
    }).addTo(karte);
    fertigeFormen.push(flaeche);

    var punkteText = punkte.map(function (p) {
      return '[' + rundeAuf5(p.lat) + ', ' + rundeAuf5(p.lng) + ']';
    });

    var code = "ort: { label: '" + label.replace(/'/g, "\\'") + "', bereich: true, polygon: [" + punkteText.join(', ') + "] }";
    baueEintrag(code, 'Fläche · ' + (label || 'ohne Namen') + ' · ' + punkteText.length + ' Punkte');

    raeumeVorschauAuf();
    aktualisiereButtons();
    setzeStatus('Fläche fertig. Du kannst direkt die nächste zeichnen.');
  }

  // ---- Kreis abschließen ----
  function schliesseKreisAb(randPunkt) {
    var radius = Math.round(kreisMitte.distanceTo(randPunkt));
    var label = window.prompt('Wie soll dieses Gebiet heißen? (z. B. "Hamburger Westen")', '') || '';

    var kreis = L.circle(kreisMitte, {
      radius: radius, color: FARBE, weight: 2, fillOpacity: 0.15
    }).addTo(karte);
    fertigeFormen.push(kreis);

    var code = "ort: { lat: " + rundeAuf5(kreisMitte.lat) + ", lng: " + rundeAuf5(kreisMitte.lng) +
      ", label: '" + label.replace(/'/g, "\\'") + "', bereich: true, radius: " + radius + " }";
    baueEintrag(code, 'Kreis · ' + (label || 'ohne Namen') + ' · Radius ' + radius + ' m');

    raeumeVorschauAuf();
    aktualisiereButtons();
    setzeStatus('Kreis fertig. Klick erneut für den nächsten Mittelpunkt.');
  }

  // ---- Klicks auf der Karte ----
  karte.on('click', function (e) {
    if (modus === 'flaeche') {
      punkte.push(e.latlng);
      var m = L.circleMarker(e.latlng, {
        radius: 4, color: FARBE, fillColor: FARBE, fillOpacity: 1, weight: 1
      }).addTo(karte);
      punktMarker.push(m);
      zeichneVorschau();
      aktualisiereButtons();
      setzeStatus(punkte.length < 3
        ? 'Punkt ' + punkte.length + ' gesetzt — mindestens 3 Punkte nötig.'
        : punkte.length + ' Punkte gesetzt. Weiterklicken oder "Fertig" drücken.');
    } else if (modus === 'kreis') {
      if (!kreisMitte) {
        kreisMitte = e.latlng;
        kreisVorschau = L.circleMarker(e.latlng, {
          radius: 4, color: FARBE, fillColor: FARBE, fillOpacity: 1, weight: 1
        }).addTo(karte);
        setzeStatus('Mitte gesetzt — jetzt außen klicken, um den Radius festzulegen.');
      } else {
        schliesseKreisAb(e.latlng);
      }
    }
  });

  // ---- Werkzeugleiste ----
  btnFlaeche.addEventListener('click', function () {
    raeumeVorschauAuf();
    modus = 'flaeche';
    aktualisiereButtons();
    setzeStatus('Flächen-Modus: klick nacheinander auf die Eckpunkte des Gebiets.');
  });

  btnKreis.addEventListener('click', function () {
    raeumeVorschauAuf();
    modus = 'kreis';
    aktualisiereButtons();
    setzeStatus('Kreis-Modus: erst in die Mitte klicken, dann außen für den Radius.');
  });

  btnZurueck.addEventListener('click', function () {
    if (!punkte.length) return;
    punkte.pop();
    var m = punktMarker.pop();
    if (m) karte.removeLayer(m);
    zeichneVorschau();
    aktualisiereButtons();
    setzeStatus('Letzter Punkt entfernt — noch ' + punkte.length + ' gesetzt.');
  });

  btnFertig.addEventListener('click', schliesseFlaecheAb);

  btnLoeschen.addEventListener('click', function () {
    raeumeVorschauAuf();
    fertigeFormen.forEach(function (f) { karte.removeLayer(f); });
    fertigeFormen = [];
    modus = null;
    aktualisiereButtons();
    setzeStatus('Karte geleert. Der erzeugte Code rechts bleibt zum Kopieren stehen.');
  });

  aktualisiereButtons();
})();
