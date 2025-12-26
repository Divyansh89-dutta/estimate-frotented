import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { getToken, setToken, clearToken } from '../utils/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserFromToken = () => {
    const token = getToken();
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id || decoded._id,
        email: decoded.email,
        name: decoded.name
      });
    } catch {
      clearToken();
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  const login = (token) => {
    setToken(token);
    loadUserFromToken();
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
