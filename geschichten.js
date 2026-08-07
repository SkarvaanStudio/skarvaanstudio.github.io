/* ============ GESCHICHTEN-ÜBERSICHT AUFBAUEN ============
   Bild, Titel, Kategorie etc. kommen aus GALERIE_BILDER
   (galerie-daten.js). Die Geschichte-TEXTE kommen aus der Google-
   Tabelle über das gemeinsame Modul geschichten-tabelle.js — dieselbe
   Tabelle, die auch geschichte.html befüllt. Ein Motiv taucht hier
   auf, sobald es in der Tabelle eine Zeile mit Text hat. Kein
   Eintrag mehr in galerie-daten.js nötig — einfach in der Tabelle
   schreiben, hier erscheint es automatisch. */
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

  function zeigeLeer() {
    container.innerHTML = '<p class="empty-note">Noch keine Geschichten hinterlegt — schau bald wieder vorbei.</p>';
  }

  function render(geschichtenMap) {
    // Fallback: falls für ein Motiv (noch) nichts in der Tabelle steht,
    // aber galerie-daten.js noch einen alten geschichte-Text hat, wird
    // der übergangsweise mitgenommen.
    var motive = GALERIE_BILDER
      .map(function (b) {
        var text = (geschichtenMap[b.id] || b.geschichte || '').trim();
        return { motiv: b, text: text };
      })
      .filter(function (e) { return e.text !== ''; });

    if (!motive.length) { zeigeLeer(); return; }

    var html = '';

    KATEGORIEN.forEach(function (kategorie) {
      var gruppe = motive.filter(function (e) { return e.motiv.kategorie === kategorie; });
      if (!gruppe.length) return;

      html += '<div class="geschichten-gruppe">';
      html += '<h2>' + kategorie + '</h2>';
      html += '<div class="geschichten-grid">';

      gruppe.forEach(function (e) {
        var b = e.motiv;
        var titel = stripHtml(b.beschriftung) || b.id;
        var text = teaser(e.text, 130);
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
  }

  if (!window.GeschichtenTabelle) {
    // Modul fehlt (z.B. Script-Tag vergessen) — nur Fallback aus galerie-daten.js nutzen.
    render({});
    return;
  }

  window.GeschichtenTabelle.holeAlleGeschichten().then(render);
})();
