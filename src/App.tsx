import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Carousel from './pages/carousel/Carousel';
import Setting from './pages/setting/Setting';

function App() {
  return (
    // <div className='flex'>
    //   <Sidebar />
    //   <div className='flex-1 p-6 bg-gray-50 min-h-screen mt-12 md:mt-0'>
    //     <Routes>
    //       <Route path='/' element={<Login />} />
    //       <Route path='/dashboard' element={<Dashboard />} />
    //       <Route path='/carousel' element={<Carousel />} />
    //     </Routes>
    //   </div>
    // </div>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        element={
          <div className='flex'>
            <Sidebar />
            <div className='flex-1 p-6 bg-gray-50 min-h-screen mt-12 md:mt-0'>
              <Outlet />
            </div>
          </div>
        }
      >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/carousel' element={<Carousel />} />
        <Route path='/settings' element={<Setting />} />
      </Route>
      <Route path='/' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}

export default App;
