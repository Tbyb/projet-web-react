// src/services/taskService.js

let MOCK_TASKS = [
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

const taskService = {
  getTasks: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("📦 Données mock chargées");
        resolve([...MOCK_TASKS]);
      }, 300);
    });
  },

  addTask: async (task) => {
    return new Promise((resolve) => {
      const newTask = {
        ...task,
        id: Date.now(),
        status: "en cours",
      };
      MOCK_TASKS.push(newTask);
      resolve(newTask);
    });
  },

  updateTask: async (id, updatedTask) => {
    return new Promise((resolve, reject) => {
      const index = MOCK_TASKS.findIndex(t => t.id === id);
      if (index !== -1) {
        MOCK_TASKS[index] = { ...MOCK_TASKS[index], ...updatedTask };
        resolve(MOCK_TASKS[index]);
      } else {
        reject(new Error("Tâche non trouvée"));
      }
    });
  },

  deleteTask: async (id) => {
    return new Promise((resolve, reject) => {
      const index = MOCK_TASKS.findIndex(t => t.id === id);
      if (index !== -1) {
        MOCK_TASKS.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error("Tâche non trouvée"));
      }
    });
  }
};

export default taskService;
