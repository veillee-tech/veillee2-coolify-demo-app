# Feu de camp

Petite appli de démo de la [Veillée Tech #2 sur Coolify](https://www.youtube.com/@VeilleeTech) : une page web en Node, sans aucune dépendance.

Elle sert à montrer le **déploiement automatique** : on modifie un réglage en haut de `server.js` (titre, couleur, bûches, version), on pousse sur GitHub, et Coolify reconstruit puis redéploie l'appli tout seul.

## Lancer en local

```bash
node server.js
```

Puis ouvrir http://localhost:3000 (point de contrôle : `/health`).

## Déployer avec Coolify

- Nouvelle ressource → dépôt GitHub → ce dépôt, branche `main`.
- Build pack **Nixpacks** : il voit le `package.json` et lance `npm start`, pas besoin de Dockerfile.
- Port **3000**.

Licence MIT.
