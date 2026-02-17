import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Header from './components/Layout/Header';
import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* Dashboard temporairement désactivé - sera ajouté par Membre 1 */}
      </Routes>
    </>
  );
}

export default App;