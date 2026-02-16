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
