import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  
  return (
    <AuthContext.Provider value={{ authToken, user,isAuthenticated: !!authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
