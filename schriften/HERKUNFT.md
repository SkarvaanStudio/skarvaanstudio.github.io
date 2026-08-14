# Schriften

Selbst gehostet, damit beim Aufruf der Seite keine Verbindung zu
Google-Servern aufgebaut wird. Alle drei stehen unter der
**SIL Open Font License 1.1** — Mitliefern im eigenen Projekt ist
ausdrücklich erlaubt, solange `OFL.txt` dabeibleibt.

| Datei | Schrift | Quelle |
|---|---|---|
| `fraunces-var.woff2` | Fraunces | github.com/google/fonts → ofl/fraunces |
| `fraunces-italic-var.woff2` | Fraunces Italic | dieselbe Quelle |
| `worksans-var.woff2` | Work Sans | github.com/google/fonts → ofl/worksans |
| `jetbrainsmono-var.woff2` | JetBrains Mono | github.com/google/fonts → ofl/jetbrainsmono |

## Was daran gemacht wurde

**Variable Schriften.** Eine Datei deckt alle Strichstärken von 100
bis 900 ab. Deshalb vier Dateien statt zehn einzelner Schnitte.
Fraunces behält zusätzlich die opsz-Achse (optische Größe), damit
Überschriften bei großer Darstellung feiner wirken.

**Auf die gebrauchten Zeichen eingedampft.** Deutsch samt Umlauten
und ß, osteuropäische Sonderzeichen für Namen, typografische
Anführungszeichen, Gedankenstrich, €, ×, sowie die Pfeile ← ↑ → ↓.
Das drückte 1,3 MB auf 287 KB.

**Nicht enthalten:** kyrillisch, griechisch, vietnamesisch. Brauchst
du nicht. Auch das ★ fehlt — das haben diese Schriften schlicht
nicht, auch nicht bei Google. Der Browser nimmt dafür automatisch
eine Systemschrift, genau wie bisher.

## Wenn du später Zeichen nachrüsten musst

Sollte irgendwo ein Kästchen ▯ statt eines Zeichens erscheinen, ist
es beim Eindampfen weggefallen. Sag Bescheid, dann baue ich die
Dateien mit erweitertem Zeichensatz neu.
