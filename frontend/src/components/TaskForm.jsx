import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    priority: 'moyenne',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const subjects = [
    'Programmation Web',
    'Mathématiques',
    'Algorithmique',
    'Base de données',
    'Réseaux',
    'Anglais',
    'Communication',
    'Autre'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Le titre est obligatoire');
      return;
    }

    try {
      await onAddTask({
        ...formData,
        status: 'en cours'
      });
      
      setFormData({
        title: '',
        description: '',
        subject: '',
        priority: 'moyenne',
        dueDate: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      alert('Erreur lors de l\'ajout');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Ajouter une tâche</h3>
      
      <div className="form-group">
        <label>Titre *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Rendre le projet"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Détails de la tâche..."
          rows="2"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Matière</label>
          <select name="subject" value={formData.subject} onChange={handleChange}>
            <option value="">Choisir</option>
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Priorité</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Date d'échéance</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-submit">
        ➕ Ajouter
      </button>
    </form>
  );
};

export default TaskForm;
