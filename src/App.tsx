import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
