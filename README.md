# Discord to Web - Publicité et Récompenses

Ce projet permet aux utilisateurs de gagner des points en regardant des publicités vidéo via un lien généré par un bot Discord. Le système utilise des fichiers JSON pour stocker les informations des utilisateurs et des publicités, incluant leur solde de points et l'historique des publicités vues. 

## Fonctionnalités

- **Bot Discord** : Génère des liens uniques pour chaque utilisateur, permettant de regarder des publicités vidéo.
- **Récompenses** : Après avoir regardé une publicité, l'utilisateur reçoit des points.
- **Page Web** : Affiche la vidéo de publicité et suit la progression de l'utilisateur pour s'assurer que la vidéo est vue intégralement avant de donner les points.
- **Stockage des données** : Les points et l'historique des publicités vues sont stockés dans des fichiers JSON.

## Dépendances

- `express` : Pour créer le serveur web.
- `discord.js` : Pour interagir avec l'API Discord.
- `dotenv` : Pour gérer les variables d'environnement.

## Installation

1. Clonez ce repository :
   ```bash
   git clone https://github.com/iyed-dev/discord-to-web.git
   ```
2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier .env avec votre token de bot Discord :
```
BOT_TOKEN=VOTRE_TOKEN
```

4. Démarrez le serveur :
```
npm start   
```
