// Petite appli de démo pour Coolify : aucune dépendance, juste Node.
// Pendant la vidéo, on modifie les trois réglages ci-dessous sur GitHub,
// puis Coolify reconstruit et redéploie l'appli tout seul.
const http = require("node:http");

// --- Réglages à modifier pendant la démo ---
const VERSION = "v1.2";
const TITLE = "Bonsoir les Veilleurs v1.2";
const ACCENT = "#E8743B"; // braise ; essayer "#86BD9C" (vert forêt)
const LOGS = ["Chêne", "Hêtre", "Accacia"]; // une bûche par ligne : en ajouter une
// -------------------------------------------

const PORT = Number(process.env.PORT) || 3000;
// Heure de démarrage du conteneur : elle change à chaque redéploiement
const startedAt = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" });

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const page = () => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(TITLE)} · ${escapeHtml(VERSION)}</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1B2033;color:#F4EBDD;font:20px/1.5 system-ui,sans-serif}
  main{text-align:center;padding:24px}
  .version{display:inline-block;padding:6px 18px;border-radius:999px;border:2px solid ${ACCENT};color:${ACCENT};font:700 22px ui-monospace,monospace}
  h1{font-size:clamp(40px,8vw,88px);margin:24px 0 8px;color:${ACCENT}}
  ul{list-style:none;padding:0;margin:24px 0;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  li{padding:8px 18px;border-radius:12px;background:#232A44}
  footer{color:#8E93AB;font-size:16px}
</style>
</head>
<body>
<main>
  <span class="version">${escapeHtml(VERSION)}</span>
  <h1>${escapeHtml(TITLE)}</h1>
  <p>${LOGS.length} bûche${LOGS.length > 1 ? "s" : ""} dans le feu</p>
  <ul>${LOGS.map((log) => `<li>${escapeHtml(log)}</li>`).join("")}</ul>
  <footer>Conteneur démarré à ${startedAt}</footer>
</main>
</body>
</html>`;

http
  .createServer((req, res) => {
    // Point de contrôle pour Coolify et Uptime Kuma
    if (req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "ok", version: VERSION }));
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(page());
  })
  .listen(PORT, () => console.log(`Feu de camp ${VERSION} sur le port ${PORT}`));
