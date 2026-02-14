import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Pages temporaires (vos pages à remplacer)
const Login = () => <div>Page de connexion</div>
const Dashboard = () => <div>Tableau de bord</div>
const Tasks = () => <div>Gestion des tâches</div>

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  )
}

export default App