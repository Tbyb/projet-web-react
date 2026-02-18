import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>MyStudyPlanner</h1>
      </div>

      <nav className="nav">
        <Link to="/task" className={location.pathname === "/task" ? "active" : ""}>
          📋 Tâches
        </Link>
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          📊 Dashboard
        </Link>
      </nav>

      <div className="user-info">
        <span>Bienvenue {user?.name}</span>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    </header>
  );
};

export default Header;