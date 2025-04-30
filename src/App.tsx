import './App.css';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Carousel from './pages/carousel/Carousel';
import Setting from './pages/setting/Setting';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

const Router = () => {
  const { isAuthenticated } = useAuth();

  const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
      }
      setIsLoading(false);
    }, [isAuthenticated, navigate]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? (
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 p-6 bg-gray-50 min-h-screen mt-12 md:mt-0'>
          <Outlet />
        </div>
      </div>
    ) : null;
  };

  const LoginRoute = () => {
    return isAuthenticated ? <Navigate to='/' replace /> : <Login />;
  };

  return (
    <Routes>
      <Route path='/login' element={<LoginRoute />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/carousel' element={<Carousel />} />
        <Route path='/settings' element={<Setting />} />
      </Route>

      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};

export default App;
