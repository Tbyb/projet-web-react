const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

// Lire les données
const readData = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

// Écrire les données
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET /api/tasks
const getTasks = (req, res) => {
  try {
    const data = readData();
    res.json(data.tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/tasks
const createTask = (req, res) => {
  try {
    const data = readData();
    const newTask = {
      id: Date.now(),
      ...req.body,
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
    const taskId = parseInt(req.params.id);
    const taskIndex = data.tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...req.body };
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
    const taskId = parseInt(req.params.id);
    const taskIndex = data.tasks.findIndex(t => t.id === taskId);
    
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
  createTask,
  updateTask,
  deleteTask
};