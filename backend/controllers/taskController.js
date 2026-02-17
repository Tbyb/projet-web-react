const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

// ============================================
// UTILITAIRES
// ============================================

// Lire les données
const readData = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { tasks: [] };
  }
};

// Écrire les données
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

// Valider une tâche
const validateTask = (task) => {
  const errors = [];

  if (!task.title || task.title.trim() === '') {
    errors.push('Le titre est obligatoire');
  }

  if (!task.subject || task.subject.trim() === '') {
    errors.push('La matière est obligatoire');
  }

  const validPriorities = ['basse', 'moyenne', 'haute'];
  if (!task.priority || !validPriorities.includes(task.priority)) {
    errors.push('La priorité doit être : basse, moyenne ou haute');
  }

  const validStatuses = ['non commencée', 'en cours', 'terminée'];
  if (!task.status || !validStatuses.includes(task.status)) {
    errors.push('Le statut doit être : non commencée, en cours ou terminée');
  }

  return errors;
};

// ============================================
// CONTROLLERS
// ============================================

// GET /api/tasks
// Filtres disponibles : ?subject=React&priority=haute&status=en cours
const getTasks = (req, res) => {
  try {
    const data = readData();
    let tasks = data.tasks;

    // Filtre par matière
    if (req.query.subject) {
      tasks = tasks.filter(t =>
        t.subject.toLowerCase() === req.query.subject.toLowerCase()
      );
    }

    // Filtre par priorité
    if (req.query.priority) {
      tasks = tasks.filter(t =>
        t.priority.toLowerCase() === req.query.priority.toLowerCase()
      );
    }

    // Filtre par statut
    if (req.query.status) {
      tasks = tasks.filter(t =>
        t.status.toLowerCase() === req.query.status.toLowerCase()
      );
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /api/tasks/stats
// Statistiques pour le Dashboard
const getStats = (req, res) => {
  try {
    const data = readData();
    const tasks = data.tasks;

    const stats = {
      total: tasks.length,
      nonCommencee: tasks.filter(t => t.status === 'non commencée').length,
      enCours: tasks.filter(t => t.status === 'en cours').length,
      terminee: tasks.filter(t => t.status === 'terminée').length,
      prioriteHaute: tasks.filter(t => t.priority === 'haute').length,
      parMatiere: {}
    };

    // Compter par matière
    tasks.forEach(task => {
      if (!stats.parMatiere[task.subject]) {
        stats.parMatiere[task.subject] = 0;
      }
      stats.parMatiere[task.subject]++;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/tasks
const createTask = (req, res) => {
  try {
    // Validation
    const errors = validateTask(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const data = readData();
    const newTask = {
      id: Date.now(),
      title: req.body.title.trim(),
      description: req.body.description ? req.body.description.trim() : '',
      subject: req.body.subject.trim(),
      priority: req.body.priority,
      status: req.body.status,
      createdAt: new Date().toISOString()
    };

    data.tasks.push(newTask);
    writeData(data);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// PUT /api/tasks/:id
const updateTask = (req, res) => {
  try {
    const data = readData();
    const taskId = req.params.id;
    const taskIndex = data.tasks.findIndex(t => t.id == taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    // Fusionner les champs modifiés
    const updatedTask = { ...data.tasks[taskIndex], ...req.body };

    // Validation
    const errors = validateTask(updatedTask);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    data.tasks[taskIndex] = updatedTask;
    writeData(data);
    res.json(data.tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  try {
    const data = readData();
    const taskId = req.params.id;
    const taskIndex = data.tasks.findIndex(t => t.id == taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    data.tasks.splice(taskIndex, 1);
    writeData(data);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getTasks,
  getStats,
  createTask,
  updateTask,
  deleteTask
};