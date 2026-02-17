import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'haute': return 'priority-high';
      case 'moyenne': return 'priority-medium';
      case 'basse': return 'priority-low';
      default: return '';
    }
  };

  const handleUpdate = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, { ...task, title: editedTitle });
      setIsEditing(false);
    }
  };

  const toggleStatus = () => {
    const newStatus = task.status === 'terminé' ? 'en cours' : 'terminé';
    onUpdate(task.id, { ...task, status: newStatus });
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className={`task-item ${getPriorityClass(task.priority)}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className="task-subject">{task.subject || 'Sans matière'}</span>
          <span className={`task-status ${task.status === 'terminé' ? 'status-done' : 'status-progress'}`}>
            {task.status}
          </span>
          <span className="task-date">📅 {task.dueDate}</span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={toggleStatus} className="btn-status" title={task.status === 'terminé' ? 'Réouvrir' : 'Terminer'}>
          {task.status === 'terminé' ? '↩️' : '✅'}
        </button>
        <button onClick={() => setIsEditing(true)} className="btn-edit" title="Modifier">
          ✏️
        </button>
        <button onClick={() => onDelete(task.id)} className="btn-delete" title="Supprimer">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;