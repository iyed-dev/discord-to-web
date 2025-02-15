# Publicité Web et Récompenses

Ce projet permet de gérer un système de publicités vidéo sur une plateforme web, où les utilisateurs peuvent gagner des points en regardant des publicités. Le programme intègre un serveur Express, une base de données JSON pour stocker les informations des utilisateurs et des publicités, et un bot Discord permettant aux utilisateurs d'interagir avec le système de points.

## Fonctionnalités

- **Publicités Vidéo** : Les utilisateurs peuvent regarder des vidéos publicitaires via une interface web et gagner des points lorsqu'ils terminent la vidéo.
- **Points Utilisateurs** : Un système de points permet aux utilisateurs de cumuler des récompenses en fonction des publicités qu'ils ont regardées. Les points sont stockés et peuvent être consultés via une commande Discord.
- **Intégration avec Discord** : Un bot Discord permet aux utilisateurs de générer un lien unique pour chaque publicité et de consulter leur solde de points via des commandes simples (`!link`, `!points`).
- **Gestion des publicités et des points** : Les publicités et les points sont stockés dans des fichiers JSON locaux (`ads.json` et `points.json`). Les utilisateurs sont identifiés par leur `userId` Discord et chaque publicité a un identifiant unique.
- **Désactivation du saut en avant dans la vidéo** : Lors de la lecture d'une publicité, l'utilisateur ne peut pas sauter la vidéo, garantissant ainsi qu'il regarde la publicité dans son intégralité.
- **Récompenses et historique** : Le système évite la récompense multiple pour une même publicité grâce à une gestion des publicités déjà regardées par l'utilisateur.

## Installation

### Prérequis

- Node.js
- npm (Node Package Manager)
- Une clé d'API Discord (nécessaire pour le bot Discord)

### Étapes

1. Clonez le repository :
   ```bash
   git clone https://github.com/votre-utilisateur/publicite-web.git
   cd publicite-web
