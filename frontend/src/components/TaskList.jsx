import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { taskService } from '../services/taskService';

const TaskList = ({ refreshKey = 0 }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, [refreshKey]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les tâches');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const result = await taskService.updateTask(id, updatedTask);
      setTasks(tasks.map(t => t.id === id ? result : t));
    } catch (err) {
      alert('Erreur modification');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Supprimer cette tâche ?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
      } catch (err) {
        alert('Erreur suppression');
      }
    }
  };

  const counts = {
    all: tasks.length,
    enCours: tasks.filter(t => t.status === 'en cours').length,
    termine: tasks.filter(t => t.status === 'terminé').length
  };

  const subjects = ['all', ...new Set(tasks.map(t => t.subject).filter(Boolean))];

  const filteredTasks = tasks.filter(task => {
    if (filter === 'en cours' && task.status !== 'en cours') return false;
    if (filter === 'terminé' && task.status !== 'terminé') return false;
    if (subjectFilter !== 'all' && task.subject !== subjectFilter) return false;
    return true;
  });

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Mes Tâches</h2>
        
        <div className="filter-section">
          <div className="filter-group">
            <label>Statut :</label>
            <div className="filter-buttons">
              <button
                onClick={() => setFilter('all')}
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              >
                Toutes <span className="count">{counts.all}</span>
              </button>
              <button
                onClick={() => setFilter('en cours')}
                className={`filter-btn ${filter === 'en cours' ? 'active' : ''}`}
              >
                ⏳ En cours <span className="count">{counts.enCours}</span>
              </button>
              <button
                onClick={() => setFilter('terminé')}
                className={`filter-btn ${filter === 'terminé' ? 'active' : ''}`}
              >
                ✅ Terminées <span className="count">{counts.termine}</span>
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Matière :</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="subject-select"
            >
              <option value="all">Toutes les matières</option>
              {subjects.filter(s => s !== 'all').map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
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