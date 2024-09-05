import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';  // Importiamo il contesto del tema

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <ul>
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/profile">Profilo</Link></li>
        {user ? (
          <>
            <li>{user.name}</li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/">Login</Link></li>
        )}
        <li>
          <button onClick={toggleTheme}>
            {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
