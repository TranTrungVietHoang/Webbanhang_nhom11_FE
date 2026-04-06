import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Khởi động - load từ localStorage
  useEffect(() => {
    console.log('[AuthProvider] Mounting...');
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    console.log('[AuthProvider] Saved token:', savedToken ? 'EXISTS' : 'NULL');
    console.log('[AuthProvider] Saved user:', savedUser ? 'EXISTS' : 'NULL');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        console.log('[AuthProvider] Loaded user:', JSON.parse(savedUser));
      } catch (e) {
        console.error('Error loading auth:', e);
      }
    }
  }, []);

  const login = (token, userData) => {
    console.log('[AuthContext.login] Called with token:', token);
    console.log('[AuthContext.login] Called with user:', userData);
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('[AuthContext.login] Saved to localStorage');
  };

  const logout = () => {
    console.log('[AuthContext.logout] Called');
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('[AuthContext.logout] Cleared from localStorage');
  };

  console.log('[AuthContext] Current user:', user);
  console.log('[AuthContext] Current token:', token ? 'EXISTS' : 'NULL');

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  console.log('[useAuth] Hook called, user:', context.user);
  return context;
};
