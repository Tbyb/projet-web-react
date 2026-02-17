// Données mock pour le Jour 1
const MOCK_TASKS = [
  {
    id: 1,
    title: "Rendre le projet React",
    description: "Finaliser l'application et pousser sur GitHub",
    subject: "Programmation Web",
    priority: "haute",
    status: "en cours",
    dueDate: "2026-02-28"
  },
  {
    id: 2,
    title: "Réviser l'examen de Maths",
    description: "Chapitres 5 à 8",
    subject: "Mathématiques",
    priority: "moyenne",
    status: "terminé",
    dueDate: "2026-02-20"
  },
  {
    id: 3,
    title: "Préparer la présentation",
    description: "Slides pour la démo du projet",
    subject: "Communication",
    priority: "basse",
    status: "en cours",
    dueDate: "2026-02-25"
  }
];

export const taskService = {
  getTasks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('📦 Données mock chargées');
        resolve([...MOCK_TASKS]);
      }, 500);
    });
  },

  addTask: (task) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          ...task,
          id: Date.now(),
        };
        MOCK_TASKS.push(newTask);
        console.log('➕ Tâche ajoutée:', newTask);
        resolve(newTask);
      }, 500);
    });
  },

  updateTask: (id, updatedTask) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_TASKS.findIndex(t => t.id === id);
        if (index !== -1) {
          MOCK_TASKS[index] = { ...MOCK_TASKS[index], ...updatedTask };
          console.log('✏️ Tâche modifiée:', MOCK_TASKS[index]);
          resolve(MOCK_TASKS[index]);
        } else {
          reject(new Error('Tâche non trouvée'));
        }
      }, 500);
    });
  },

  deleteTask: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_TASKS.findIndex(t => t.id === id);
        if (index !== -1) {
          const deleted = MOCK_TASKS.splice(index, 1);
          console.log('🗑️ Tâche supprimée:', deleted[0]);
          resolve({ message: 'Tâche supprimée' });
        } else {
          reject(new Error('Tâche non trouvée'));
        }
      }, 500);
    });
  }
};