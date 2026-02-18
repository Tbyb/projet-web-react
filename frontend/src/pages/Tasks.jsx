import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { taskService } from '../services/taskService';

const Tasks = () => {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleTaskAdded = async (newTask) => {
    try {
      await taskService.addTask(newTask);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert("Erreur lors de l'ajout de la tâche");
    }
  };

  return (
    <div className="page tasks-page">
      <div className="page-header">
        <h1>Gestion des Tâches</h1>
        <p>Créez et gérez vos devoirs, TP et projets</p>
      </div>
      
      <div className="page-content">
        <div className="form-section">
          <TaskForm onAddTask={handleTaskAdded} />
        </div>
        
        <div className="list-section">
          <TaskList key={refreshKey} refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;