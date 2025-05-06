import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useSidebar } from './SidebarContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isExpanded, toggleExpanded } = useSidebar();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const menuItems = useMemo(
    () => [
      { name: 'Dashboard', path: '/', icon: <RiDashboardFill /> },
      { name: 'Carousels', path: '/carousel', icon: <PiImagesFill /> },
      {
        name: 'Services & Products',
        path: '/product',
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
    ],
    []
  );

  useEffect(() => {
    if (isOpen && navRef.current) {
      const contentHeight = navRef.current.scrollHeight;
      navRef.current.style.height = `${contentHeight + 32}px`;
    }
  }, [isOpen, menuItems]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
        bg-amber-500 shadow-md z-50 fixed
        top-0 left-0 w-full
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${isOpen ? 'max-h-[100vh]' : 'max-h-16'}
        ${isExpanded ? 'md:w-72' : 'md:w-20'}
        md:max-h-none md:h-screen md:overflow-visible
      `}
    >
      {/* Header */}
      <div className='flex justify-between items-center p-4 relative h-16'>
        <div
          className='flex items-center cursor-pointer'
          onClick={() => toggleExpanded()}
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
          onClick={() => toggleExpanded()}
          className='hidden md:block transition-transform duration-300 hover:rotate-180'
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
    h-[calc(100vh-8rem)]
    overflow-y-auto
    transition-opacity duration-300
    ${isOpen ? 'opacity-100' : 'opacity-0'}
    md:transition-none md:h-[calc(100vh-4rem)] md:opacity-100
    ${isExpanded ? 'md:w-72' : 'md:w-20'}
  `}
      >
        <div className='flex flex-col gap-2'>
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg 
                transition-all duration-200 ease-out 
                hover:translate-x-1 hover:bg-opacity-80
                active:scale-95
                ${
                  (item.path === '/' && location.pathname === item.path) ||
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? 'bg-[#003366] text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              <span className='text-lg md:text-xl'>{item.icon}</span>
              <span className={`${isExpanded ? 'inline' : 'hidden'}`}>
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
