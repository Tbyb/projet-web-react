import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'  // ← IMPORT À AJOUTER
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>  {/* ← PROVIDER À AJOUTER */}
        <App />
      </AuthProvider>  {/* ← FERMETURE DU PROVIDER */}
    </BrowserRouter>
  </React.StrictMode>,
)