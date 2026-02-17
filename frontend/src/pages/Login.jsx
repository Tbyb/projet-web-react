import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
     const success = login(email, password);
    if (success) navigate('/task');
 /*if (email && password) {
      login(email, password)
      navigate('/dashboard') // Redirection après connexion
    } 
 else {
      alert("Veuillez remplir tous les champs")
    }*/

  };

  const { user } = useAuth();
useEffect(() => {
  if (user) navigate('/task');
}, [user, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br /><br />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br /><br />
        <button type="submit">Se connecter</button>
      </form>
      <p>N'importe quel email/mot de passe fonctionne (simulation)</p>
    </div>
  );
};

export default Login;