import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { taskService } from '../services/taskService';

const Tasks = () => {
  const [refresh, setRefresh] = React.useState(0);

  const handleAddTask = async (newTask) => {
    await taskService.addTask(newTask);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="page tasks-page">
      <div className="page-header">
        <h1>Gestion des Tâches</h1>
        <p>Créez et gérez vos devoirs, TP et projets</p>
      </div>
      
      <div className="page-content">
        <div className="form-section">
          <TaskForm onAddTask={handleAddTask} />
        </div>
        
        <div className="list-section">
          <TaskList key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;