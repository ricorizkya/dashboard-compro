import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userId: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('idUser');
      setIsAuthenticated(!!userId);

      // Redirect ke login jika tidak terautentikasi
      if (!userId && window.location.pathname !== '/login') {
        navigate('/login');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => window.removeEventListener('storage', checkAuth);
  }, [navigate]);

  const login = (userId: string, token: string) => {
    localStorage.setItem('idUser', userId);
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
