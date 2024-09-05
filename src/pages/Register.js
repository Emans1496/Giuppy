import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  // Stato per messaggio di errore

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Compila tutti i campi');  // Imposta il messaggio di errore
      return;
    }
    setError('');
    setLoading(true);  // Mostra lo spinner
    setTimeout(() => {
      console.log({ name, email, password });
      setLoading(false);
    }, 2000);  // Simula una chiamata API
  };

  return (
    <div className="register-container">
      <h2>Registrati</h2>
      {error && <p className="error-message">{error}</p>}  {/* Mostra il messaggio di errore */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          disabled={loading}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          disabled={loading}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Registrati'}
        </button>
      </form>
    </div>
  );
}

export default Register;
