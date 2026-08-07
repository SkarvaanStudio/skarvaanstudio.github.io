/* ============ GESCHICHTEN-ÜBERSICHT AUFBAUEN ============
   Liest GALERIE_BILDER aus galerie-daten.js, nimmt nur Motive mit
   einem hinterlegten geschichte-Text (also nicht null/leer) und
   baut daraus automatisch die Übersichtsseite, gruppiert nach
   Kategorie. Neue Geschichte in galerie-daten.js eintragen — sie
   taucht danach von selbst hier auf. Kein weiterer Schritt nötig. */
(function () {
  var container = document.getElementById('geschichten-liste');
  if (!container || typeof GALERIE_BILDER === 'undefined') return;

  var KATEGORIEN = ['Teichleben', 'Gartenleben', 'Waldleben', 'Reduktion'];

  function escapeAttr(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function stripHtml(str) {
    var div = document.createElement('div');
    div.innerHTML = str || '';
    return div.textContent || div.innerText || '';
  }

  function teaser(text, maxLen) {
    var t = text.trim();
    if (t.length <= maxLen) return t;
    var cut = t.slice(0, maxLen);
    var lastSpace = cut.lastIndexOf(' ');
    return cut.slice(0, lastSpace > 0 ? lastSpace : maxLen) + ' …';
  }

  var motive = GALERIE_BILDER.filter(function (b) {
    return b.geschichte && b.geschichte.trim() !== '';
  });

  if (!motive.length) {
    container.innerHTML = '<p class="empty-note">Noch keine Geschichten hinterlegt — schau bald wieder vorbei.</p>';
    return;
  }

  var html = '';

  KATEGORIEN.forEach(function (kategorie) {
    var gruppe = motive.filter(function (b) { return b.kategorie === kategorie; });
    if (!gruppe.length) return;

    html += '<div class="geschichten-gruppe">';
    html += '<h2>' + kategorie + '</h2>';
    html += '<div class="geschichten-grid">';

    gruppe.forEach(function (b) {
      var titel = stripHtml(b.beschriftung) || b.id;
      var text = teaser(b.geschichte, 130);
      html += '<a class="geschichten-card" href="geschichte.html?id=' + escapeAttr(b.id) + '">' +
        '<img src="' + escapeAttr(b.bild) + '" alt="' + escapeAttr(b.alt) + '" loading="lazy">' +
        '<div class="geschichten-card-body">' +
        '<h3>' + b.beschriftung + '</h3>' +
        '<p>' + escapeAttr(text) + '</p>' +
        '<span class="geschichten-card-link">Geschichte lesen &rarr;</span>' +
        '</div></a>';
    });

    html += '</div></div>';
  });

  container.innerHTML = html;
})();
