import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import { Spinner } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  // Stato per messaggio di errore
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Compila tutti i campi');  // Imposta il messaggio di errore
      return;
    }
    setError('');
    setLoading(true);  // Mostra lo spinner
    setTimeout(() => {
      const mockUser = {
        id: 1,
        name: 'GiuppyUser',
        email: email
      };
      login(mockUser);
      setLoading(false);
      navigate('/feed');
    }, 2000);  // Simula una chiamata API
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}  {/* Mostra il messaggio di errore */}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          disabled={loading}  // Disabilita l'input durante il caricamento
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
