import React, { createContext, useState } from 'react';

// Creiamo il contesto per l'autenticazione
export const AuthContext = createContext();

// Provider che avvolge i componenti per fornire lo stato di autenticazione
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
