import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import './App.css'

// Pages temporaires (vos pages à remplacer)
/*const Login = () => <div>Page de connexion</div>
const Dashboard = () => <div>Tableau de bord</div>
const Tasks = () => <div>Gestion des tâches</div>
*/
function App() {
  return (
    <div className="App">
  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard />  </ProtectedRoute> } />
        <Route path="/task" element={ <ProtectedRoute> <Task />  </ProtectedRoute> } />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  )
}

export default App