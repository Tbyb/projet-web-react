import { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    enCours: 0,
    terminees: 0,
    nonCommence: 0,
    prioriteHaute: 0,
    prioriteMoyenne: 0,
    prioriteBasse: 0,
    parMatiere: {}
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const tasks = await taskService.getTasks();

      const enCours = tasks.filter(t => t.status === 'en cours').length;
      const terminees = tasks.filter(t => t.status === 'terminé').length;
      const nonCommence = tasks.filter(t => t.status === 'non commencé').length;
      
      const prioriteHaute = tasks.filter(t => t.priority === 'haute').length;
      const prioriteMoyenne = tasks.filter(t => t.priority === 'moyenne').length;
      const prioriteBasse = tasks.filter(t => t.priority === 'basse').length;

      const parMatiere = tasks.reduce((acc, tache) => {
        const matiere = tache.subject || 'Sans matière';
        acc[matiere] = (acc[matiere] || 0) + 1;
        return acc;
      }, {});

      setStats({
        total: tasks.length,
        enCours,
        terminees,
        nonCommence,
        prioriteHaute,
        prioriteMoyenne,
        prioriteBasse,
        parMatiere
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <h1>📊 Tableau de bord</h1>
        <p>Vue d'ensemble de vos tâches et projets</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <span className="stat-label">Total des tâches</span>
          <span className="stat-value">{stats.total}</span>
        </div>

        <div className="stat-card warning">
          <span className="stat-label">⏳ En cours</span>
          <span className="stat-value">{stats.enCours}</span>
        </div>

        <div className="stat-card success">
          <span className="stat-label">✅ Terminées</span>
          <span className="stat-value">{stats.terminees}</span>
        </div>

        <div className="stat-card info">
          <span className="stat-label">📝 Non commencées</span>
          <span className="stat-value">{stats.nonCommence}</span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stats-section priority-stats">
          <h3>📌 Priorités</h3>
          <div className="priority-breakdown">
            <div className="priority-item high">
              <span className="priority-label">🔴 Haute</span>
              <span className="priority-count">{stats.prioriteHaute}</span>
            </div>
            <div className="priority-item medium">
              <span className="priority-label">🟡 Moyenne</span>
              <span className="priority-count">{stats.prioriteMoyenne}</span>
            </div>
            <div className="priority-item low">
              <span className="priority-label">🟢 Basse</span>
              <span className="priority-count">{stats.prioriteBasse}</span>
            </div>
          </div>
        </div>

        <div className="stats-section subjects-stats">
          <h3>📚 Répartition par matière</h3>
          <div className="subjects-list">
            {Object.entries(stats.parMatiere).length > 0 ? (
              Object.entries(stats.parMatiere).map(([matiere, count]) => (
                <div key={matiere} className="subject-item">
                  <span className="subject-name">{matiere}</span>
                  <div className="subject-bar-container">
                    <div 
                      className="subject-bar" 
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="badge">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">Aucune tâche pour le moment</p>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="btn-action" onClick={() => navigate('/tasks')}>
          ➕ Ajouter une tâche
        </button>
        <button className="btn-action secondary" onClick={() => navigate('/tasks')}>
          📋 Voir toutes les tâches
        </button>
      </div>
    </div>
  );
};

export default Dashboard;