import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import taskService from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");


  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const updated = await taskService.updateTask(id, updatedTask);
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    } catch {
      alert("Erreur lors de la modification");
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Supprimer cette tâche ?")) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
      } catch {
        alert("Erreur lors de la suppression");
      }
    }
  };

const filteredTasks = tasks.filter(task => {
  if (filterStatus !== "all" && task.status !== filterStatus) return false;
  if (filterSubject !== "all" && task.subject !== filterSubject) return false;
  if (filterPriority !== "all" && task.priority !== filterPriority) return false;
  return true;
});


  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Mes tâches ({filteredTasks.length})</h2>

        <div className="filters">

  {/* Filtre par état */}
  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
    <option value="all">Tous les états</option>
    <option value="en cours">En cours</option>
    <option value="terminé">Terminées</option>
  </select>

  {/* Filtre par matière */}
  <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
    <option value="all">Toutes les matières</option>
    <option value="Programmation Web">Programmation Web</option>
    <option value="Mathématiques">Mathématiques</option>
    <option value="Communication">Communication</option>
  </select>

  {/* Filtre par priorité */}
  <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
    <option value="all">Toutes les priorités</option>
    <option value="haute">Haute</option>
    <option value="moyenne">Moyenne</option>
    <option value="basse">Basse</option>
  </select>

</div>

      </div>

      {filteredTasks.length === 0 ? (
        <p>Aucune tâche à afficher</p>
      ) : (
        <div className="tasks-container">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

