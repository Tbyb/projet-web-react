import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    enCours: 0,
    terminees: 0,
    parMatiere: {}
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const tasks = await taskService.getTasks();
    
    const enCours = tasks.filter(t => t.status === 'en cours').length;
    const terminees = tasks.filter(t => t.status === 'terminé').length;
    
    const parMatiere = tasks.reduce((acc, task) => {
      const matiere = task.subject || 'Sans matière';
      acc[matiere] = (acc[matiere] || 0) + 1;
      return acc;
    }, {});

    setStats({
      total: tasks.length,
      enCours,
      terminees,
      parMatiere
    });
  };

  return (
    <div className="page dashboard-page">
      <h1>Tableau de Bord</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total des tâches</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">En cours</span>
          <span className="stat-value">{stats.enCours}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Terminées</span>
          <span className="stat-value">{stats.terminees}</span>
        </div>
      </div>

      <div className="subjects-stats">
        <h3>Répartition par matière</h3>
        <div className="subjects-list">
          {Object.entries(stats.parMatiere).map(([matiere, count]) => (
            <div key={matiere} className="subject-item">
              <span>{matiere}</span>
              <span className="badge">{count}</span>
            </div>
          ))}
        </div>
      </div>
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Bienvenue {user?.name} ({user?.email})</p>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default Dashboard;
