# Brocount

**Brocount** est une application de gestion et de suivi des dépenses, conçue pour faciliter la gestion des dépenses partagées au sein de groupes.

Le projet est développé sous la forme de plusieurs applications distinctes : une API backend, un tableau de bord d'administration et une application mobile.

> **Statut :** en cours de développement.

## Sommaire

- [Présentation](#présentation)
- [Architecture du projet](#architecture-du-projet)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement en développement](#lancement-en-développement)
- [Tests](#tests)
- [Sécurité](#sécurité)
- [Roadmap](#roadmap)
- [Licence](#licence)

## Présentation

Brocount a pour objectif de proposer une solution de gestion des dépenses partagées, avec une séparation entre les services backend, l'interface d'administration et l'application mobile.

Le projet est conçu pour évoluer progressivement, avec une architecture séparant les responsabilités de chaque application.

## Architecture du projet

Le dépôt regroupe les différentes applications du projet :

```text
brocount/
├── brocount-backend/     # API REST Spring Boot
├── brocount-dashboard/   # Tableau de bord d'administration Angular
├── brocount-app/         # Application mobile
├── .gitignore
└── README.md
```

### `brocount-backend`

API backend chargée de la logique métier, de la gestion des données et de la communication avec la base de données.

### `brocount-dashboard`

Interface web d'administration permettant aux utilisateurs autorisés d'accéder aux fonctionnalités d'administration.

### `brocount-app`

Application mobile destinée à l'utilisation de Brocount. Son développement est prévu dans une étape ultérieure.

## Technologies

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- PostgreSQL
- Maven

### Dashboard

- Angular
- TypeScript
- Tailwind CSS
- Angular Material Icons

### Outils

- Git
- Visual Studio Code

_Cette liste pourra être précisée en fonction des dépendances et des fonctionnalités effectivement utilisées dans chaque application._

## Prérequis

Avant de lancer le projet, assurez-vous de disposer des outils suivants :

- Git
- Un JDK compatible avec la version de Java configurée dans le backend
- Maven, ou le Maven Wrapper fourni avec le projet
- Node.js et npm, compatibles avec la version d'Angular utilisée
- PostgreSQL

## Installation

Clonez le dépôt :

```bash
git clone <URL_DU_DEPOT>
cd brocount
```

Suivez ensuite les instructions de configuration et de lancement de chaque application.

## Configuration

### Backend

Le backend utilise une base de données PostgreSQL.

La configuration locale est définie dans `brocount-backend/src/main/resources/application.properties`.

Les paramètres de connexion peuvent être fournis via les variables d'environnement suivantes :

| Variable      | Description                    |
| ------------- | ------------------------------ |
| `DB_URL`      | URL JDBC de la base de données |
| `DB_USERNAME` | Nom d'utilisateur PostgreSQL   |
| `DB_PASSWORD` | Mot de passe PostgreSQL        |

Par défaut, l'URL utilisée est `jdbc:postgresql://localhost:5432/brocount_db` et le nom d'utilisateur est `postgres`.

**Ne publiez jamais de mot de passe, de jeton ou de clé secrète dans le dépôt Git.**

### Dashboard

En développement, le dashboard utilise un proxy configuré dans `proxy.conf.ts` pour communiquer avec le backend local.

Le backend doit être démarré pour que les requêtes API puissent aboutir.

## Lancement en développement

### 1. Démarrer le backend

Depuis le dossier `brocount-backend`, configurez les variables d'environnement nécessaires, notamment `DB_PASSWORD`, puis lancez l'application avec le Maven Wrapper.

Sous Windows :

```powershell
.\mvnw.cmd spring-boot:run
```

Sous Linux ou macOS :

```bash
./mvnw spring-boot:run
```

Le backend écoute par défaut sur le port `9000`.

### 2. Démarrer le dashboard

Dans un second terminal :

```bash
cd brocount-dashboard
npm install
```

Lancez ensuite le serveur de développement Angular avec le proxy :

```bash
npx ng serve --proxy-config proxy.conf.ts
```

L'adresse locale sera généralement :

`http://localhost:4200`

## Tests

### Backend

Depuis le dossier `brocount-backend` :

```bash
.\mvnw.cmd test
```

Sous Linux ou macOS :

```bash
./mvnw test
```

### Dashboard

Les commandes de test dépendent de la configuration Angular du projet. Consultez les scripts disponibles dans `brocount-dashboard/package.json`.

## Sécurité

- Ne versionnez pas les mots de passe ou les clés secrètes.
- Utilisez des variables d'environnement pour les informations sensibles.
- Protégez les routes d'administration côté backend : masquer une page dans l'interface ne constitue pas une protection suffisante.
- Ne considérez jamais les contrôles effectués uniquement côté frontend comme une garantie de sécurité.

## Roadmap

- [ ] Finaliser l'authentification et les autorisations.
- [ ] Développer les fonctionnalités de gestion des groupes et des dépenses.
- [ ] Finaliser le tableau de bord d'administration.
- [ ] Développer l'application mobile.
- [ ] Ajouter et compléter les tests automatisés.
- [ ] Préparer le déploiement des différentes applications.

## Licence

Aucune licence n'a encore été définie pour ce projet.

Tant qu'aucune licence n'est ajoutée, ne considérez pas le code comme librement réutilisable. Une licence pourra être choisie selon les objectifs de distribution de Brocount.
