import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Vérifie si un utilisateur est déjà stocké (persistance)
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null

  })

  const login = (email, password) => {
    // Simulation de connexion
    const  fakeUser={ email, name: 'Étudiant' }
    setUser(fakeUser)
    localStorage.setItem("user", JSON.stringify(fakeUser))
    return true   // retourne true pour signaler succès
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}