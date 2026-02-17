import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        <h1>📚 Gestionnaire de Tâches</h1>
      </div>
      <nav className="nav">
        <Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>
          📋 Tâches
        </Link>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          📊 Dashboard
        </Link>
      </nav>
      <div className="user-info">
        <span>👤 Étudiant</span>
        <button className="btn-logout">Déconnexion</button>
      </div>
    </header>
  );
};

export default Header;