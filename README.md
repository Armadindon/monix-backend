# Monix 2.0 Backend

[![Build and Deploy docker image](https://github.com/ClubNix/monix-backend/actions/workflows/deploy.yaml/badge.svg)](https://github.com/ClubNix/monix-backend/actions/workflows/deploy.yaml)

<p align="center" width="100%">
    <img width="33%" src="https://raw.githubusercontent.com/ClubNix/monix-2.0/master/src/assets/monixcoin.svg"> 
</p>

Projet du Club *Nix permettant de gérer les stocks ainsi que de permettre aux membres d'acheter des produits contre des monix-coins.

Le projet associé au front-end du projet est trouvable [ici](https://github.com/ClubNix/monix-2.0)

Le projet correspond à la version 2 du projet, la première version est consultable [ici](https://github.com/ClubNix/monix)  
La version 1.5 (version intermédiaire) est également consultatble [ici](https://github.com/ClubNix/monix-1.5)

## Installation

Un docker est associé à ce projet, il est trouvable [ici](https://github.com/ClubNix/monix-backend/pkgs/container/monix-backend).

Pour utiliser le registry github, il est nécéssaire de [se connecter](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) avant !

Plusieurs variables d'environnement sont nécéssaire à son utilisation:
- `HOST` : Host de l'application (par défaut, 0.0.0.0)
- `PORT` : Port de l'application (par défaut, 1337)
- `APP_KEYS` : Pour les clés secrètes de l'application, listes séparé par ","
- `API_TOKEN_SALT` : Salt pour la creation de mot de passe, utilisé par l'algorithme [Bcrypt](https://fr.wikipedia.org/wiki/Bcrypt)
- `ADMIN_JWT_SECRET` : Secret du jeton JWT pour le panel d'administration du backend
- `JWT_SECRET` : Secret du jeton JWT   

Ces variables d'environnements ne seront obligatoire seulement si vous voulez utiliser votre mail pour les alertes backend :
- `MAIL_ADDRESS`: Mail utilisé par le backend
- `MAIL_PASSWORD` : Mot de passe du mail utilisé
- `SMTP_SERVER` : Serveur SMTP pour l'envoi de mail
- `SMTP_PORT` : Port du serveur SMT pour l'envoi de mail

Quelques volumes peuvent être utiles si vous souhaitez conserver certains éléménts:
- `/app/.tmp` : Pour garder la base de données et les données associés (sqlite3)
- `/app/config` : Pour garder la config de l'instance Strapi
- `/app/public/uploads` : Pour garder les fichiers uploads

### Examples d'utilisations

- Via docker run: `docker run ghcr.io/clubnix/monix-backend:latest -e APP_KEYS=key1,key2,key3 -e API_TOKEN_SALT=Salt1234 -e ADMIN_JWT_SECRET=Secret1234 -e JWT_SECRET=Secret_2_1234`

- Via docker-compose: 
```
version: '2'

services:
  monix-back:
    image: ghcr.io/clubnix/monix-backend:latest
    environment:
      - APP_KEYS=key1,key2,key3
      - API_TOKEN_SALT=Salt1234
      - ADMIN_JWT_SECRET=Secret1234
      - JWT_SECRET=Secret_2_1234
    volumes:
      - "/app/.tmp"
      - "/app/config"
      - "/app/public/uploads"
```

## Développement

Afin de développer, il vous sera nécéssaire d'utiliser ses commandes:
- `npm i` Installation Packages + hook
- `npm run develop` Pour lancer l'application en debug
- `npm run build` Pour build le panel administrateur
- `npm start` Pour lancer le serveur sans les fonctionnalités de développement
- `npm run lint:fix` Pour régler certains problèmes de style de code automatiquement
- `npm run format` Pour formatter les fichiers avec prettier
- `npm run check` Verifie le formattage + la qualité du code (⚠️ lancé automatiquement avant chaque commit ⚠️)

Il peut également utile d'utiliser le [CLI de strapi](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) pour les actions plus spécifiques.

Pour la qualité de code, nous utilisons ESLINT et Prettier pour le formattage.  
Le Back-End est basé sur TypeScript et Strapi.

