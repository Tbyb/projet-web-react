import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { taskService } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

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
      setError('Erreur de chargement');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const result = await taskService.updateTask(id, updatedTask);
      setTasks(tasks.map(t => t.id === id ? result : t));
    } catch (err) {
      alert('Erreur lors de la modification');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Supprimer cette tâche ?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'en cours') return task.status === 'en cours';
    if (filter === 'terminé') return task.status === 'terminé';
    return true;
  });

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Mes Tâches ({filteredTasks.length})</h2>
        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Toutes</button>
          <button onClick={() => setFilter('en cours')} className={filter === 'en cours' ? 'active' : ''}>En cours</button>
          <button onClick={() => setFilter('terminé')} className={filter === 'terminé' ? 'active' : ''}>Terminées</button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>Aucune tâche à afficher</p>
        </div>
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