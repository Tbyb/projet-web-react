import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // ← PAS de BrowserRouter !
import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import Header from './components/Layout/Header';
import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>  {/* ✅ Routes seulement, pas de Router */}
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;