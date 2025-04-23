import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { RiDashboardFill } from 'react-icons/ri';
import { SlMenu } from 'react-icons/sl';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <RiDashboardFill /> },
    { name: 'Settings', path: '/settings', icon: <RiDashboardFill /> },
    { name: 'Profile', path: '/profile', icon: <RiDashboardFill /> },
    { name: 'Logout', path: '/logout', icon: <RiDashboardFill /> },
  ];

  return (
    <div
      className={`
        bg-white shadow-md z-50 fixed md:relative top-0 left-0 transition-all duration-300 ease-in-out
        w-full md:h-screen
        ${isExpanded ? 'md:w-64' : 'md:w-20'}
      `}
    >
      {/* Header */}
      <div className='flex justify-between items-center p-4 relative'>
        <div
          className='flex items-center cursor-pointer'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img
            src='/src/assets/logo.png'
            className={!isExpanded ? 'hidden' : 'mr-2 w-8'}
            alt='Logo'
          />
          <h1 className='text-sm font-normal md:hidden absolute left-1/2 transform -translate-x-1/2'>
            Laksana Jaya
          </h1>
          <h1
            className={`
              hidden md:block text-xl font-bold transition-all duration-200
              ${isExpanded ? 'opacity-100 ml-2' : 'opacity-0 w-0'}
            `}
          >
            Laksana Jaya
          </h1>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
          {isOpen ? <IoCloseOutline size={24} /> : <SlMenu size={20} />}
        </button>

        {/* Desktop toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='hidden md:block '
        >
          {isExpanded ? (
            <IoCloseOutline size={16} />
          ) : (
            <img
              src='/src/assets/logo.png'
              className={isExpanded ? 'hidden' : 'mr-2 w-8'}
              alt='Logo'
            />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`
          transition-all duration-300 ease-in-out
          flex-col gap-2 px-4 pb-4 justify-center
          ${
            isOpen
              ? 'opacity-100 translate-x-0 flex'
              : 'opacity-0 -translate-x-full hidden'
          }
          md:opacity-100 md:translate-x-0 md:flex
        `}
      >
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-all
              ${
                location.pathname === item.path
                  ? 'bg-[#003366] text-white font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }
              ${isOpen ? 'text-sm' : ''} 
            `}
            onClick={() => setIsOpen(false)}
          >
            <span className='text-lg md:text-xl'>{item.icon}</span>
            <span
              className={`
                ${isExpanded ? 'inline' : 'hidden'} md:inline
                ${isOpen ? 'text-sm' : ''}
              `}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
