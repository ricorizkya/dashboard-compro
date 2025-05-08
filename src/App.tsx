import './App.css';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Carousel from './pages/carousel/Carousel';
import Setting from './pages/setting/Setting';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import AddCarousel from './pages/carousel/AddCarousel';
import EditCarousel from './pages/carousel/EditCarousel';
import Product from './pages/product/Product';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import {
  SidebarProvider,
  useSidebar,
} from './components/sidebar/SidebarContext';
import { AnimatePresence, motion } from 'framer-motion';
import PortfolioImages from './pages/portfolio/images/PortfolioImages';
import AddPortfolioImages from './pages/portfolio/images/AddPortfolioImages';
import EditPortfolioImages from './pages/portfolio/images/EditPortfolioImages';
import PortfolioReview from './pages/portfolio/review/PortfolioReview';
import AddPortfolioReview from './pages/portfolio/review/AddPortfolioReview';
import EditPortfolioReview from './pages/portfolio/review/EditPortfolioReview';
import Message from './pages/message/Message';
import User from './pages/user/User';
import EditUser from './pages/user/EditUser';
import AddUser from './pages/user/AddUser';

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router />
      </SidebarProvider>
    </AuthProvider>
  );
}

const Router = () => {
  const { isAuthenticated } = useAuth();
  const { isExpanded } = useSidebar();

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
      <AnimatePresence mode='wait'>
        <div className='flex overflow-x-hidden'>
          <Sidebar />
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className={`flex-1 p-6 bg-gray-50 min-h-screen mt-12 md:mt-0 
              transition-[margin-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isExpanded ? 'md:ml-72' : 'md:ml-20'}`}
          >
            <Outlet />
          </motion.div>
        </div>
      </AnimatePresence>
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
        <Route path='/carousel/add' element={<AddCarousel />} />
        <Route path='/carousel/edit/:id' element={<EditCarousel />} />

        <Route path='/product' element={<Product />} />
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/product/edit/:id' element={<EditProduct />} />

        <Route path='/portfolio/images' element={<PortfolioImages />} />
        <Route path='portfolio/images/add' element={<AddPortfolioImages />} />
        <Route
          path='/portfolio/images/edit/:id'
          element={<EditPortfolioImages />}
        />

        <Route path='portfolio/reviews' element={<PortfolioReview />} />
        <Route path='portfolio/reviews/add' element={<AddPortfolioReview />} />
        <Route
          path='portfolio/reviews/edit/:id'
          element={<EditPortfolioReview />}
        />

        <Route path='/messages' element={<Message />} />

        <Route path='/users' element={<User />} />
        <Route path='/users/add' element={<AddUser />} />
        <Route path='/users/edit/:id' element={<EditUser />} />

        <Route path='/settings' element={<Setting />} />
      </Route>

      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};

export default App;
