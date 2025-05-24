import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiBell, FiMessageSquare, FiX } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarDashboard = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { token, logout, guestLogin } = useAuth();
  
  const profileRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <header className="bg-[#23282D] shadow-sm z-40 border-b border-[#1F3F49]">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Left Side - Mobile Menu Button and Welcome Message */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-[#1F3F49] text-yellow-300 "
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen && isMobile ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <h1 className="text-lg md:text-xl font-bold text-yellow-300">
            Welcome to Dashboard
          </h1>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* <button
            className="p-2 rounded-full hover:bg-[#1F3F49] text-[#B3C100]"
            aria-label="Notifications"
          >
            <FiBell size={20} />
          </button>
          <button
            className="p-2 rounded-full hover:bg-[#1F3F49] text-[#B3C100]"
            aria-label="Messages"
          >
            <FiMessageSquare size={20} />
          </button> */}
          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-md bg-[#1F3F49] text-yellow-300"
              aria-label="User profile"
              aria-expanded={isProfileOpen}
            >
              <FaUserCircle className="text-xl md:text-2xl" />
              <span className="hidden md:inline-block text-sm md:text-base">User</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#23282D] rounded-lg shadow-lg py-2 z-50 border border-[#1F3F49]">
                <button className="w-full mb-4 px-4 py-2 rounded-2xl text-center bg-amber-200 hover:bg-[#1F3F49] text-sm">
                  Profile
                </button>
                {/* <button className="w-full text-left px-4 py-2 text-[#B3C100] hover:bg-[#1F3F49] text-sm">
                  Settings
                </button> */}
                <button onClick={handleLogout} className="w-full  px-4 py-2 text-[#D32D41] text-center bg-amber-200 rounded-2xl hover:bg-[#1F3F49] text-sm">
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarDashboard;