# 📡 Documentation API Backend - MyStudyPlanner

## Base URL
```
http://localhost:5000/api
```

---

## 📋 Format d'une tâche (Task)
```json
{
  "id": 1771288914397,
  "title": "string (requis)",
  "description": "string (requis)",
  "subject": "string (requis)",
  "priority": "basse | moyenne | haute (requis)",
  "status": "non commencé | en cours | terminé (requis)",
  "createdAt": "2026-02-17T00:41:54.397Z (auto-généré)"
}
```

---

## 🔗 Endpoints disponibles

### 1️⃣ **GET /api/health**
Vérifier l'état du serveur

**Réponse :**
```json
{
  "status": "OK",
  "message": "Backend is running"
}
```

---

### 2️⃣ **GET /api/tasks**
Récupérer toutes les tâches

**Réponse :**
```json
[
  {
    "id": 1,
    "title": "Exemple de tâche",
    "description": "Ceci est une tâche exemple",
    "subject": "React",
    "priority": "haute",
    "status": "en cours",
    "createdAt": "2026-02-14T10:00:00.000Z"
  }
]
```

---

### 3️⃣ **POST /api/tasks**
Créer une nouvelle tâche

**Body (JSON) :**
```json
{
  "title": "Apprendre Node.js",
  "description": "Comprendre Express et les API REST",
  "subject": "Backend",
  "priority": "haute",
  "status": "en cours"
}
```

**Réponse (201 Created) :**
```json
{
  "id": 1771288914397,
  "title": "Apprendre Node.js",
  "description": "Comprendre Express et les API REST",
  "subject": "Backend",
  "priority": "haute",
  "status": "en cours",
  "createdAt": "2026-02-17T00:41:54.397Z"
}
```

---

### 4️⃣ **PUT /api/tasks/:id**
Modifier une tâche existante

**Exemple :** `PUT /api/tasks/1`

**Body (JSON) :**
```json
{
  "status": "terminé"
}
```

**Réponse :**
```json
{
  "id": 1,
  "title": "Exemple de tâche",
  "description": "Ceci est une tâche exemple",
  "subject": "React",
  "priority": "haute",
  "status": "terminé",
  "createdAt": "2026-02-14T10:00:00.000Z"
}
```

---

### 5️⃣ **DELETE /api/tasks/:id**
Supprimer une tâche

**Exemple :** `DELETE /api/tasks/1`

**Réponse :** `204 No Content`

---

## 🧪 Tester l'API

### Avec `curl` :
```bash
# GET toutes les tâches
curl http://localhost:5000/api/tasks

# POST créer une tâche
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test desc","subject":"Math","priority":"moyenne","status":"non commencé"}'

# PUT modifier une tâche
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"terminé"}'

# DELETE supprimer une tâche
curl -X DELETE http://localhost:5000/api/tasks/1
```

### Avec JavaScript (frontend) :
```javascript
// GET
const response = await fetch('http://localhost:5000/api/tasks');
const tasks = await response.json();

// POST
await fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Nouvelle tâche",
    description: "Description",
    subject: "React",
    priority: "haute",
    status: "en cours"
  })
});

// PUT
await fetch(`http://localhost:5000/api/tasks/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: "terminé" })
});

// DELETE
await fetch(`http://localhost:5000/api/tasks/${id}`, {
  method: 'DELETE'
});
```

---

## ⚠️ Gestion des erreurs

| Code | Message | Signification |
|------|---------|---------------|
| 200 | OK | Succès |
| 201 | Created | Ressource créée |
| 204 | No Content | Suppression réussie |
| 404 | Not Found | Tâche non trouvée |
| 500 | Internal Server Error | Erreur serveur |

---

## 🚀 Démarrer le backend
```bash
cd backend
npm run dev
```

Le serveur démarre sur **http://localhost:5000**

---

**Contact :** Membre 3 (Backend Developer)
