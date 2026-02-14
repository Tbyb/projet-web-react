# MyStudyPlanner - Projet React L3 Informatique

Application web de gestion de devoirs et projets pour étudiants.

## 📁 Structure du projet

```
projet-web-react/
├── backend/                    # Serveur Node.js/Express
│   ├── server.js              # Point d'entrée du serveur
│   ├── package.json           # Dépendances backend
│   ├── .env                   # Variables d'environnement (à créer)
│   ├── .env.example           # Exemple de configuration
│   ├── controllers/           # Logique métier
│   │   └── taskController.js  # CRUD des tâches
│   ├── routes/                # Routes API
│   │   └── tasks.js          # Routes /api/tasks
│   ├── data/                  # Stockage JSON
│   │   └── db.json           # Base de données JSON
│   └── middleware/            # Middlewares (auth, etc.) - À créer
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── Navbar.jsx           # ✅ Navigation
│   │   │   ├── TaskCard.jsx         # TODO: Carte de tâche
│   │   │   ├── TaskForm.jsx         # TODO: Formulaire de tâche
│   │   │   ├── FilterBar.jsx        # TODO: Barre de filtres
│   │   │   ├── StatsCard.jsx        # TODO: Carte de statistique
│   │   │   └── ProtectedRoute.jsx   # ✅ Route protégée
│   │   │
│   │   ├── pages/             # Pages de l'application
│   │   │   ├── Login.jsx            # TODO: Page de connexion
│   │   │   ├── Dashboard.jsx        # TODO: Tableau de bord
│   │   │   └── Tasks.jsx            # TODO: Gestion des tâches
│   │   │
│   │   ├── contexts/          # Contextes React
│   │   │   └── AuthContext.jsx      # ✅ Gestion authentification
│   │   │
│   │   ├── services/          # Services API
│   │   │   └── api.js               # ✅ Appels API
│   │   │
│   │   ├── hooks/             # Hooks personnalisés - Vide pour l'instant
│   │   ├── utils/             # Utilitaires - Vide pour l'instant
│   │   ├── App.jsx            # ✅ Composant principal
│   │   ├── main.jsx           # ✅ Point d'entrée
│   │   └── App.css            # Styles globaux
│   │
│   ├── package.json           # Dépendances frontend
│   ├── .env                   # Variables d'environnement
│   └── vite.config.js         # Configuration Vite
│
├── .gitignore                 # Fichiers à ignorer par Git
└── README.md                  # Ce fichier

```

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd projet-web-react
   ```

2. **Installer les dépendances du backend**
   ```bash
   cd backend
   npm install
   ```

3. **Installer les dépendances du frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configurer les variables d'environnement**
   
   Backend (`backend/.env`) :
   ```
   PORT=5000
   NODE_ENV=development
   ```
   
   Frontend (`frontend/.env`) :
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Démarrage

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Le serveur démarre sur http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
L'application démarre sur http://localhost:5173

## 📋 Tâches à réaliser

### ✅ Fait (Structure de base)
- [x] Configuration backend (Express, CORS, routes)
- [x] Configuration frontend (React, Router, Axios)
- [x] API CRUD pour les tâches
- [x] AuthContext pour l'authentification simulée
- [x] Service API (api.js)
- [x] Route protégée (ProtectedRoute.jsx)
- [x] Fichiers de configuration (.env, .gitignore)

### 📝 À faire - Frontend

#### **Tâche 1: Page Login (Login.jsx)** 🎨
- Formulaire de connexion avec email et mot de passe
- Validation des champs
- Messages d'erreur
- Design moderne et responsive
- Redirection après connexion

#### **Tâche 2: Page Dashboard (Dashboard.jsx)** 📊
- Afficher les statistiques (total, en cours, terminées, priorité haute)
- Liste des 5 dernières tâches
- Intégrer Navbar et StatsCard
- Appels API pour récupérer les données
- Design responsive

#### **Tâche 3: Page Tasks (Tasks.jsx)** 📝
- Liste complète des tâches
- Bouton "Nouvelle tâche"
- Intégration des filtres (FilterBar)
- CRUD complet (Créer, Lire, Modifier, Supprimer)
- Changement rapide de statut
- Utiliser TaskCard et TaskForm

#### **Tâche 4: Composant Navbar (Navbar.jsx)** 🧭
- Logo et titre de l'application
- Navigation (Dashboard, Tâches)
- Affichage nom utilisateur
- Bouton déconnexion
- Style moderne et sticky

#### **Tâche 5: Composant TaskCard (TaskCard.jsx)** 🃏
- Affichage d'une tâche (titre, description, matière, priorité, statut)
- Badges de couleur pour priorité et statut
- Boutons éditer/supprimer
- Sélecteur rapide de statut
- Effet hover

#### **Tâche 6: Composant TaskForm (TaskForm.jsx)** 📋
- Modal/Overlay pour le formulaire
- Champs: titre, description, matière, priorité, statut
- Mode création ET édition
- Validation des champs
- Boutons Annuler/Sauvegarder

#### **Tâche 7: Composant FilterBar (FilterBar.jsx)** 🔍
- Filtres: matière, statut, priorité
- Bouton "Effacer les filtres"
- Mise à jour en temps réel de la liste

#### **Tâche 8: Composant StatsCard (StatsCard.jsx)** 📈
- Affichage d'une statistique (icône, valeur, titre)
- Couleur personnalisable
- Design attrayant avec animation

#### **Tâche 9: Styles CSS** 🎨
- Créer les fichiers CSS pour chaque composant/page
- Design cohérent et moderne
- Responsive (mobile, tablette, desktop)
- Palette de couleurs harmonieuse

### 🔧 Tâches bonus (optionnelles)

- [ ] Middleware d'authentification backend
- [ ] Tri des tâches (par date, priorité, etc.)
- [ ] Recherche de tâches
- [ ] Export des tâches (PDF, CSV)
- [ ] Thème sombre/clair
- [ ] Notifications/Alertes
- [ ] Graphiques de progression (Chart.js)
- [ ] Date limite pour les tâches
- [ ] Catégories personnalisées

## 🎯 Concepts React utilisés

- ✅ Composants fonctionnels
- ✅ Hooks (useState, useEffect, useContext)
- ✅ React Router (navigation, routes protégées)
- ✅ Context API (AuthContext)
- ⏳ Gestion d'état locale et globale
- ⏳ Appels API avec Axios
- ⏳ Formulaires contrôlés
- ⏳ Conditional rendering
- ⏳ Lists & Keys

## 📊 Modèle de données

### Tâche (Task)
```javascript
{
  id: number,
  title: string,
  description: string,
  subject: string,          // "React", "JavaScript", "Node.js", etc.
  priority: string,         // "basse", "moyenne", "haute"
  status: string,           // "non commencée", "en cours", "terminée"
  createdAt: string (ISO)
}
```

## 🔗 Routes API

- `GET    /api/tasks`       - Récupérer toutes les tâches
- `POST   /api/tasks`       - Créer une tâche
- `PUT    /api/tasks/:id`   - Modifier une tâche
- `DELETE /api/tasks/:id`   - Supprimer une tâche
- `GET    /api/health`      - Vérifier l'état du serveur

## 🔗 Routes Frontend

- `/login`       - Page de connexion
- `/dashboard`   - Tableau de bord (protégé)
- `/tasks`       - Gestion des tâches (protégé)
- `/`            - Redirection vers /login

## 👥 Répartition suggérée (3 membres)

### Membre 1: Backend + API
- Vérification et amélioration du backend
- Tests des routes API
- Documentation API

### Membre 2: Pages + Navigation
- Tâches 1, 2, 3, 4 (Login, Dashboard, Tasks, Navbar)
- Intégration des composants

### Membre 3: Composants + UI
- Tâches 5, 6, 7, 8, 9 (TaskCard, TaskForm, FilterBar, StatsCard, CSS)
- Design et responsive

*Note: Cette répartition est flexible, adaptez-la selon vos compétences*

## 📅 Planning suggéré

- **Semaine 1** (14-20 février): Pages et composants de base
- **Semaine 2** (21-27 février): Intégration, styles, tests
- **28 février**: Livraison finale

## 📝 Livrables

- [ ] Code source complet et fonctionnel
- [ ] Dépôt GitHub avec commits réguliers
- [ ] README à jour
- [ ] Document de rapport (architecture, choix techniques)
- [ ] Démonstration (vidéo ou présentation orale)

## 🐛 Problèmes connus

Aucun pour le moment. Le squelette est prêt !

## 📚 Ressources utiles

- [Documentation React](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [Express.js](https://expressjs.com)

## 📧 Contact

Pour toute question, contactez les membres de l'équipe.

---

**Prêt à coder ! Bonne chance à l'équipe ! 🚀**