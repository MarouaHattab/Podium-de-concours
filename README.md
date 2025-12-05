# 🏆 Podium de Concours - Plateforme Gamifiée NIRD

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

Une plateforme d'apprentissage gamifiée pour le Numérique Inclusif Responsable et Durable (NIRD)

## 📹 Vidéo Démo

<!-- TODO: Ajouter le lien de la vidéo démo ici -->
> **🎬 [Voir la démo complète de l'application](/demo/demo.mp4)**

<!-- Alternative: Embed direct -->
<!-- 
[![Démo Podium](thumbnail.png)](/demo/demo.mp4)
-->

---

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies Utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Démarrage](#-démarrage)
- [Structure du Projet](#-structure-du-projet)
- [Utilisation](#-utilisation)
- [API Documentation](#-api-documentation)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## ✨ Fonctionnalités

### 🎯 **Système d'Apprentissage Gamifié**

#### 📚 **Parcours d'Apprentissage (Path)**
- ✅ **6 Unités NIRD complètes** avec 29 leçons au total :
  - 🎯 Accessibilité Numérique (5 leçons)
  - 💻 Logiciels Libres (5 leçons)
  - 🌱 Durabilité Numérique (6 leçons) - Checkpoint
  - ⚡ Sobriété Numérique (5 leçons)
  - 🚀 DevOps Responsable (5 leçons)
  - 🏆 Checkpoint Final (3 leçons)
- ✅ **Progression type Duolingo** avec cercles colorés
- ✅ **Système de verrouillage** progressif des leçons
- ✅ **Checkpoints** pour valider les connaissances
- ✅ Types de leçons variés : Quiz, Practice, Reading

#### 🏅 **Système de Gamification**
- ✅ **Points d'Expérience (XP)** gagnés à chaque leçon
- ✅ **Streak System** - série de jours consécutifs
- ✅ **Hearts (Cœurs)** - système de vies
- ✅ **Gems (Gemmes)** - monnaie virtuelle
- ✅ **Leagues** - ligues compétitives (Bronze, Silver, Gold, Diamond)
- ✅ **Niveaux** basés sur l'XP total
- ✅ **Badges & Achievements** débloquables

### 👥 **Système Social**

#### 👤 **Profils Utilisateurs**
- ✅ **Profils détaillés** avec statistiques complètes
- ✅ **Avatars personnalisés** (CustomAvatars)
- ✅ **Stats visibles** : XP, Streak, League, Level
- ✅ **Graphiques de progression** hebdomadaire
- ✅ **Liste d'achievements** avec progression
- ✅ **Followers/Following** système complet
- ✅ **Modal de profil** avec toutes les informations

#### 🤝 **Follow System**
- ✅ **Follow/Unfollow** avec boutons réactifs
- ✅ **Compteur de followers/following**
- ✅ **Notifications** lors d'un nouveau follower
- ✅ **Liste des followers** avec profils cliquables

#### 👥 **Système d'Équipes**
- ✅ **Créer une équipe** avec nom et description
- ✅ **Rejoindre une équipe** via code d'invitation
- ✅ **Code d'invitation** copiable facilement
- ✅ **Rôles d'équipe** : Captain, Developer, Verifier, Pedagogue
- ✅ **Gestion des membres** (pour Capitaine) :
  - ➕ **Ajouter un membre** par username
  - 🗑️ **Supprimer un membre** de l'équipe
  - 🚪 **Quitter l'équipe** à tout moment
- ✅ **Stats d'équipe** : XP total, nombre de membres
- ✅ **Cartes de membres** avec rôles et stats

### 🏆 **Classements & Compétition**

#### 📊 **Leaderboard Global**
- ✅ **Podium Top 3** avec design premium :
  - 🥇 Or avec couronne animée
  - 🥈 Argent
  - 🥉 Bronze
- ✅ **2 modes de classement** :
  - 👤 **Par Membre** - Classement individuel
  - 👥 **Par Équipe** - Classement par groupe
- ✅ **Liste complète** avec 20+ utilisateurs
- ✅ **Stats détaillées** : XP, Streak, League
- ✅ **Tendances** (↗️ en hausse, etc.)
- ✅ **Badges de ligue** colorés

#### 🎯 **Missions & Défis**
- ✅ **Missions quotidiennes** (Daily)
- ✅ **Missions hebdomadaires** (Weekly)
- ✅ **Missions événementielles** (Event)
- ✅ **Récompenses XP** et gems
- ✅ **Système de progression** par mission
- ✅ **Badges de difficulté** (Easy, Medium, Hard)

### 🔔 **Système de Notifications**
- ✅ **Badge de notification** dans la navbar avec compteur
- ✅ **Panel déroulant** avec liste des notifications
- ✅ **Types de notifications** :
  - 🔵 Follow/Unfollow
  - 💬 Messages (placeholder)
  - 🏆 Achievements
- ✅ **Mark as read** fonctionnel
- ✅ **Stockage Zustand** persistant

### 🛒 **Super Store**
- ✅ **Super NIRD** - abonnement premium
- ✅ **Cœurs illimités**
- ✅ **Sans publicités**
- ✅ **Boost XP personnalisé**
- ✅ **Achievements exclusifs**
- ✅ **Design premium** avec gradients

### 🎨 **Interface Utilisateur**

#### 🖼️ **Design System**
- ✅ **Design inspiré Duolingo** - coloré et engageant
- ✅ **Animations Framer Motion** fluides
- ✅ **Thème vert NIRD** cohérent
- ✅ **Responsive** - mobile, tablette, desktop
- ✅ **Accessibilité** - ARIA labels, contraste

#### 🧭 **Navigation**
- ✅ **Navbar** avec logo et stats
- ✅ **Menu de navigation** :
  - 🏠 Apprendre
  - 🎯 Pratiquer
  - 👥 Équipe
  - 🏆 Classements
  - 👑 Super
  - 👤 Profil
- ✅ **Protection des routes** - authentification requise

### 🔐 **Authentification & Sécurité**
- ✅ **Inscription/Connexion** avec JWT
- ✅ **Hash des mots de passe** avec bcrypt
- ✅ **Middleware de protection** des routes API
- ✅ **Gestion de session** avec Zustand
- ✅ **Logout** fonctionnel

### 🗄️ **Base de Données**
- ✅ **PostgreSQL** avec Prisma ORM
- ✅ **22 utilisateurs** de test avec XP variés
- ✅ **5 équipes** pré-créées
- ✅ **6 unités** avec 29 leçons
- ✅ **Seed complet** pour démo

---

## 🛠️ Technologies Utilisées

### **Frontend**
- ⚛️ **React 18** - Bibliothèque UI
- 📘 **TypeScript** - Typage statique
- 🎨 **TailwindCSS** - Styling utility-first
- 🎬 **Framer Motion** - Animations
- 🔄 **React Router** - Routing
- 🐻 **Zustand** - State management
- 📡 **Axios** - HTTP client
- 🎯 **Lucide React** - Icônes
- ⚡ **Vite** - Build tool

### **Backend**
- 🟢 **Node.js 18+** - Runtime
- 🚂 **Express** - Framework web
- 📘 **TypeScript** - Typage statique
- 🔷 **Prisma** - ORM
- 🐘 **PostgreSQL** - Base de données
- 🔐 **JWT** - Authentification
- 🔒 **bcryptjs** - Hash passwords
- 🌐 **CORS** - Cross-origin
- 🕒 **node-cron** - Tâches planifiées
- 🔌 **ws** - WebSocket

### **DevOps & Tools**
- 🐳 **Docker** - Containerisation
- 📦 **npm workspaces** - Monorepo
- 🔧 **ESLint** - Linting
- 🎨 **Prettier** - Formatting
- 🔄 **Concurrently** - Scripts parallèles

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18.0.0 ou supérieur) - [Télécharger](https://nodejs.org/)
- **npm** (v8.0.0 ou supérieur) - Inclus avec Node.js
- **PostgreSQL** (v14 ou supérieur) - [Télécharger](https://www.postgresql.org/download/)
  - Ou **Docker** pour utiliser PostgreSQL en container

---

## 🚀 Installation

### **Étape 1 : Cloner le repository**

```bash
git clone https://github.com/votre-username/podium-de-concours.git
cd podium-de-concours
```

### **Étape 2 : Installer les dépendances**

```bash
# Installer toutes les dépendances du monorepo
npm install
```

Cette commande installera les dépendances pour :
- Le workspace `apps/api` (Backend)
- Le workspace `apps/web` (Frontend)
- Le package partagé `packages/shared`

---

## ⚙️ Configuration

### **Étape 3 : Configuration de la base de données**

#### **Option A : Avec Docker (Recommandé)**

```bash
# Démarrer PostgreSQL avec Docker
docker-compose up -d
```

Le fichier `docker-compose.yml` démarrera automatiquement PostgreSQL sur le port 5432.

#### **Option B : PostgreSQL local**

1. Créez une base de données PostgreSQL :
```sql
CREATE DATABASE podium_nird;
```

2. Notez les informations de connexion (host, port, username, password).

### **Étape 4 : Configuration des variables d'environnement**

#### **Backend (`apps/api/.env`)**

Créez le fichier `.env` dans `apps/api/` :

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/podium_nird"

# JWT
JWT_SECRET="votre-secret-jwt-super-securise-changez-moi"

# Server
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

⚠️ **Important** : Changez `JWT_SECRET` par une valeur sécurisée en production !

#### **Frontend (`apps/web/.env`)**

Créez le fichier `.env` dans `apps/web/` :

```env
VITE_API_URL=http://localhost:3001/api
```

### **Étape 5 : Initialiser la base de données**

```bash
# Générer le client Prisma
cd apps/api
npx prisma generate

# Créer les tables (migration)
npx prisma migrate dev --name init

# Remplir la base avec des données de test
npx tsx prisma/seed.ts

# Retourner à la racine
cd ../..
```

Le seed créera :
- ✅ 22 utilisateurs avec XP variés
- ✅ 5 équipes pré-configurées
- ✅ 6 unités NIRD avec 29 leçons
- ✅ Quelques leçons complétées pour Alice

---

## 🎬 Démarrage

### **Démarrage Complet (Recommandé)**

```bash
# Démarrer Backend + Frontend en même temps
npm run dev
```

Cette commande démarre :
- 🟢 **Backend API** sur `http://localhost:3001`
- ⚛️ **Frontend Web** sur `http://localhost:5173`

### **Démarrage Séparé**

#### **Backend uniquement**
```bash
npm run dev:api
```

#### **Frontend uniquement**
```bash
npm run dev:web
```

---

## 📂 Structure du Projet

```
podium-de-concours/
├── apps/
│   ├── api/                    # Backend Express + Prisma
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Schéma de base de données
│   │   │   └── seed.ts         # Données de test
│   │   ├── src/
│   │   │   ├── routes/         # Routes API
│   │   │   ├── middleware/     # Middleware (auth, etc.)
│   │   │   ├── cron.ts         # Tâches planifiées
│   │   │   ├── db.ts           # Client Prisma
│   │   │   └── index.ts        # Point d'entrée
│   │   └── package.json
│   │
│   └── web/                    # Frontend React + Vite
│       ├── src/
│       │   ├── components/     # Composants réutilisables
│       │   ├── pages/          # Pages de l'app
│       │   ├── store/          # État global (Zustand)
│       │   ├── lib/            # Utilitaires
│       │   ├── App.tsx         # Composant racine
│       │   └── main.tsx        # Point d'entrée
│       └── package.json
│
├── packages/
│   └── shared/                 # Types TypeScript partagés
│       └── src/types.ts
│
├── docker-compose.yml          # Configuration Docker
├── package.json                # Config monorepo
└── README.md                   # Ce fichier
```

---

## 🎮 Utilisation

### **1. Créer un Compte**

1. Ouvrez **http://localhost:5173/register**
2. Remplissez le formulaire :
   - Username : `test`
   - Nom : `Test User`
   - Email : `test@test.com`
   - Mot de passe : `test123`
3. Cliquez sur "S'inscrire"

### **2. Se Connecter avec un Compte de Test**

Utilisez un compte pré-créé :
- **Username** : `maxpro` / **Password** : `password123` (15,240 XP - 1er du leaderboard)
- **Username** : `sarah_dev` / **Password** : `password123` (12,890 XP)
- **Username** : `alice` / **Password** : `password123` (450 XP)

### **3. Explorer les Fonctionnalités**

#### **📚 Apprendre**
- Cliquez sur "Apprendre" dans le menu
- Sélectionnez une leçon disponible
- Complétez les exercices pour gagner de l'XP

#### **👥 Rejoindre/Créer une Équipe**
- Cliquez sur "Équipe" dans le menu
- **Créer** : Donnez un nom et une description
- **Rejoindre** : Utilisez le code d'invitation d'une équipe existante
- **Codes disponibles** : Regardez dans `apps/api/prisma/seed.ts` ou créez votre équipe

#### **🏆 Voir le Classement**
- Cliquez sur "Classements"
- Basculez entre "Par Membre" et "Par Équipe"
- Admirez le podium animé des 3 premiers !

#### **👤 Consulter un Profil**
- Cliquez sur un follower/following
- Ou cliquez sur "Profil" pour voir votre profil
- Visualisez les stats, achievements, et progression

#### **🎯 Faire des Missions**
- Cliquez sur "Pratiquer"
- Sélectionnez une mission
- Complétez-la pour gagner des récompenses

#### **👑 Découvrir Super NIRD**
- Cliquez sur "Super"
- Explorez les avantages premium
- Testez le bouton "Essayer Super" (démo)

---

## 📡 API Documentation

### **Endpoints Principaux**

#### **Authentification**
```http
POST /api/auth/register     # Inscription
POST /api/auth/login        # Connexion
GET  /api/auth/me           # Profil utilisateur connecté
```

#### **Utilisateurs**
```http
GET  /api/users/:id         # Profil utilisateur
GET  /api/users/:id/stats   # Statistiques
```

#### **Apprentissage**
```http
GET  /api/path              # Toutes les unités
GET  /api/path/:id          # Détails d'une unité
GET  /api/lessons/:id       # Détails d'une leçon
POST /api/lessons/:id/complete  # Compléter une leçon
```

#### **Équipes**
```http
GET    /api/teams/:id          # Détails équipe
POST   /api/teams              # Créer équipe
POST   /api/teams/:id/join     # Rejoindre
POST   /api/teams/:id/leave    # Quitter
POST   /api/teams/:id/invite   # Inviter membre
DELETE /api/teams/:id/members/:userId  # Supprimer membre
```

#### **Classement**
```http
GET  /api/leaderboard          # Classement individuel
GET  /api/leaderboard/teams    # Classement équipes
```

#### **Missions**
```http
GET  /api/missions             # Toutes les missions
POST /api/missions/:id/complete  # Compléter mission
```

#### **Suivis (Follow)**
```http
POST   /api/users/:id/follow    # Suivre
DELETE /api/users/:id/unfollow  # Ne plus suivre
```

**🔐 Routes protégées** : Toutes les routes (sauf register/login) nécessitent un token JWT dans le header `Authorization: Bearer <token>`

---

## 🐛 Dépannage

### **Port déjà utilisé**

Si vous obtenez `EADDRINUSE: address already in use :::3001` :

```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

Puis relancez `npm run dev`.

### **Erreur de connexion à la base de données**

1. Vérifiez que PostgreSQL est démarré
2. Vérifiez le `DATABASE_URL` dans `apps/api/.env`
3. Testez la connexion :
```bash
cd apps/api
npx prisma studio
```

### **Les migrations Prisma ne fonctionnent pas**

```bash
cd apps/api
# Reset la base (⚠️ supprime toutes les données)
npx prisma migrate reset
```

### **Le frontend ne se connecte pas au backend**

1. Vérifiez que `VITE_API_URL` dans `apps/web/.env` pointe vers `http://localhost:3001/api`
2. Vérifiez que le backend est démarré sur le port 3001
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

---

## 🧪 Tests

```bash
# Lancer les tests (à implémenter)
npm test
```

---

## 📦 Build de Production

### **Build du Frontend**

```bash
cd apps/web
npm run build
```

Les fichiers de production seront dans `apps/web/dist/`.

### **Démarrer le Backend en Production**

```bash
cd apps/api
npm run build
npm start
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/ma-feature`)
3. Committez (`git commit -m 'Ajoute ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

---

## 👥 Auteurs

- **Votre Nom** - *Développeur Principal* - [GitHub](https://github.com/votre-username)

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **La Nuit de l'Info** pour le défi NIRD
- Tous les contributeurs et testeurs

---



**Fait avec ❤️ pour le NIRD** 🌱
