import { useAuth } from "../contexts/AuthContext";

const Task = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 20 }}>
      <h2>Mes tâches</h2>
      <p>Bienvenue {user?.name}</p>
      <button onClick={logout}>Se déconnecter</button>

      <p> Liste des tâches à venir...</p>
    </div>
  );
};

export default Task;

