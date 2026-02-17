import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import  taskService  from '../services/taskService';

const Task = () => {
  const [refresh, setRefresh] = React.useState(0);

  const handleAddTask = async (newTask) => {
    await taskService.addTask(newTask);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="page task-page">
      
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

export default Task;

