import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import Header from './components/Layout/Header';
import './styles/App.css'; // ou './styles/App.css' selon ton projet

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />
        {/* Routes protégées */}
        <Route path="/dashboard" element={ <ProtectedRoute>   <Dashboard />  </ProtectedRoute> }/>
        <Route path="/task"   element={ <ProtectedRoute>  <Task /> </ProtectedRoute>  } />
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;