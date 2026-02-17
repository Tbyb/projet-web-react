import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import Header from './components/Layout/Header';
import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;