import { useState } from 'react';
import {
  HiMiniChatBubbleLeftRight,
  HiUsers,
  HiWrenchScrewdriver,
} from 'react-icons/hi2';
import { IoMdImages } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { MdRateReview } from 'react-icons/md';
import { PiImagesFill } from 'react-icons/pi';
import { RiDashboardFill, RiSettings3Fill } from 'react-icons/ri';
import { SlMenu } from 'react-icons/sl';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <RiDashboardFill /> },
    { name: 'Carousels', path: '/carousel', icon: <PiImagesFill /> },
    {
      name: 'Services & Products',
      path: '/profile',
      icon: <HiWrenchScrewdriver />,
    },
    {
      name: 'Portfolio Images',
      path: '/portfolio/images',
      icon: <IoMdImages />,
    },
    {
      name: 'Portfolio Reviews',
      path: '/portfolio/reviews',
      icon: <MdRateReview />,
    },
    {
      name: 'Messages',
      path: '/messages',
      icon: <HiMiniChatBubbleLeftRight />,
    },
    { name: 'Users', path: '/users', icon: <HiUsers /> },
    { name: 'Settings', path: '/settings', icon: <RiSettings3Fill /> },
  ];

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
        bg-amber-500 shadow-md z-50 fixed md:relative
        top-0 left-0 w-full h-[calc(100vh-4rem)] md:h-screen
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'md:w-64' : 'md:w-20'}
      `}
    >
      {/* Header */}
      <div className='flex justify-between items-center p-4 relative h-16'>
        <div
          className='flex items-center cursor-pointer'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img
            src='/src/assets/logo-black-no-title.png'
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
        <button onClick={handleOpenToggle} className='md:hidden'>
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
              src='/src/assets/logo-black-no-title.png'
              className={isExpanded ? 'hidden' : 'mr-2 w-8'}
              alt='Logo'
            />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`
          px-4 pb-4 bg-amber-500
          absolute top-16 left-0 w-full h-[calc(100%-4rem)]
          transition-all duration-300 ease-in-out
          shadow-lg md:shadow-none
          transform overflow-y-auto
          ${
            isOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-[150%] opacity-0'
          }
          md:translate-y-0 md:opacity-100 md:relative md:top-0
        `}
      >
        <div className='flex flex-col gap-2'>
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-all
                ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-[#003366] text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              <span className='text-lg md:text-xl'>{item.icon}</span>
              <span className={`${isExpanded ? 'inline' : 'hidden'} md:inline`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
