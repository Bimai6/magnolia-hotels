import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsLogged(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsLogged(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
