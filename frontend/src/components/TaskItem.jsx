import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const priorityColors = {
    haute: 'priority-high',
    moyenne: 'priority-medium',
    basse: 'priority-low'
  };

  const priorityLabels = {
    haute: '🔴 Haute',
    moyenne: '🟡 Moyenne',
    basse: '🟢 Basse'
  };

  const statusLabels = {
    'en cours': '⏳ En cours',
    'terminé': '✅ Terminé'
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Programmation Web': '#6366f1',
      'Mathématiques': '#ef4444',
      'Algorithmique': '#10b981',
      'Base de données': '#f59e0b',
      'Réseaux': '#8b5cf6',
      'Anglais': '#ec4899',
      'Communication': '#14b8a6',
      'Autre': '#6b7280'
    };
    return colors[subject] || '#6b7280';
  };

  const isUrgent = () => {
    if (task.status === 'terminé') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  const handleUpdate = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, { ...task, title: editedTitle });
      setIsEditing(false);
    }
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
    <div className={`task-item ${priorityColors[task.priority]} ${isUrgent() ? 'urgent' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          {isUrgent() && <span className="urgent-badge">⚠️ Urgent</span>}
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span className="task-subject" style={{ backgroundColor: getSubjectColor(task.subject) + '20', color: getSubjectColor(task.subject), borderLeft: `3px solid ${getSubjectColor(task.subject)}` }}>
            📚 {task.subject || 'Sans matière'}
          </span>

          <span className={`task-status status-${task.status}`}>
            {statusLabels[task.status]}
          </span>

          <span className={`task-priority priority-${task.priority}`}>
            {priorityLabels[task.priority]}
          </span>

          <span className="task-date">
            📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString('fr-FR') : 'Date non définie'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onUpdate(task.id, { ...task, status: task.status === 'terminé' ? 'en cours' : 'terminé' })}
          className="btn-status"
          title="Changer le statut"
        >
          {task.status === 'terminé' ? '↩️' : '✅'}
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="btn-edit"
          title="Modifier"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-delete"
          title="Supprimer"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;