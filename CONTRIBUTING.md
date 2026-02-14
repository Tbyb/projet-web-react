# Guide de contribution - MyStudyPlanner

## 🚀 Workflow Git

### Configuration initiale

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd projet-web-react
   ```

2. **Créer sa branche de travail**
   ```bash
   git checkout -b feature/nom-de-la-tache
   ```
   Exemples:
   - `feature/login-page`
   - `feature/task-card`
   - `feature/dashboard`

### Travailler sur une tâche

1. **Avant de commencer**
   ```bash
   git pull origin main
   ```

2. **Faire ses modifications**
   - Coder la fonctionnalité
   - Tester localement

3. **Commit réguliers**
   ```bash
   git add .
   git commit -m "feat: description claire de ce qui a été fait"
   ```

   **Exemples de messages:**
   - `feat: add login page with validation`
   - `feat: create TaskCard component`
   - `fix: correct API endpoint in api.js`
   - `style: improve Dashboard responsive design`

4. **Pousser ses changements**
   ```bash
   git push origin feature/nom-de-la-tache
   ```

5. **Créer une Pull Request sur GitHub**
   - Décrire ce qui a été fait
   - Demander une review à un autre membre
   - Merger après validation

### Avant de merger

- [ ] Le code fonctionne sans erreur
- [ ] Les tests sont OK
- [ ] Le design est responsive
- [ ] Le code est commenté si nécessaire
- [ ] Pas de console.log inutiles

## 📝 Standards de code

### JavaScript/React

```javascript
// ✅ BON
const [tasks, setTasks] = useState([]);

useEffect(() => {
  fetchTasks();
}, []);

// ❌ MAUVAIS
const [Tasks,SetTasks]=useState([])
useEffect(()=>{fetchTasks()},[])
```

### Nommage

- **Composants:** PascalCase (`TaskCard.jsx`, `FilterBar.jsx`)
- **Fonctions:** camelCase (`handleSubmit`, `fetchTasks`)
- **Constantes:** UPPER_CASE (`API_URL`, `MAX_TASKS`)
- **CSS classes:** kebab-case (`task-card`, `btn-primary`)

### Commentaires

```javascript
// Pour les fonctions complexes
/**
 * Filtre les tâches selon les critères sélectionnés
 * @param {Array} tasks - Liste des tâches
 * @param {Object} filters - Filtres à appliquer
 * @returns {Array} Tâches filtrées
 */
const applyFilters = (tasks, filters) => {
  // ...
};

// TODO pour ce qui reste à faire
// TODO: Ajouter validation du formulaire
```

## 🐛 Debugging

### Problèmes courants

**Backend ne démarre pas:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Frontend ne démarre pas:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Erreur CORS:**
- Vérifier que le backend utilise `cors()`
- Vérifier l'URL de l'API dans `frontend/.env`

**Routes ne fonctionnent pas:**
- Vérifier que `AuthProvider` englobe les routes dans App.jsx
- Vérifier que `BrowserRouter` est dans main.jsx

## 💬 Communication

- **Daily stand-up** (rapide):
  - Qu'est-ce que j'ai fait hier?
  - Qu'est-ce que je fais aujourd'hui?
  - Est-ce que j'ai des blocages?

- **Demander de l'aide:**
  - Créer une issue sur GitHub
  - Contacter sur Discord/WhatsApp
  - Ne pas rester bloqué plus de 30 min!

## ✨ Bonnes pratiques

1. **Commiter souvent** (au moins 1-2 fois par jour)
2. **Messages clairs** dans les commits
3. **Tester avant de pousser**
4. **Demander des reviews**
5. **Communiquer les blocages**
6. **Respecter les délais**

## 📅 Deadlines internes suggérées

- **20 février**: Pages de base terminées
- **24 février**: Composants terminés + intégration
- **26 février**: Styles + responsive OK
- **27 février**: Tests + corrections
- **28 février**: LIVRAISON FINALE

Bon courage! 💪
