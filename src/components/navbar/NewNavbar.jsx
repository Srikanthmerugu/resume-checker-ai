import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import DropdonwMenu from '../../pages/Dropdonw/DropdonwMenu';
import { NewLogo2 } from '../../assets/Assets';
import { FiSettings, FiBriefcase, FiPlusCircle, FiUsers, FiGrid, FiChevronDown, FiArrowRight as FiArrowRightIcon, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const NewNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Update token state when localStorage changes
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      style: {
        background: '#0a1120',
        color: '#fff',
        border: '1px solid #ffc800',
        Zindex: "1000000000"
      },
    });
    navigate('/');
  };

  const dashboardNav = () => {
    navigate('/dashboard');
  };

  const handleProtectedNav = (path) => {
    if (!token) {
      navigate('/login');
      setShowMobileMenu(false);
    } else {
      navigate(path);
      setShowMobileMenu(false);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
    if (showDropdown) setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-button')
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowDropdown(false);
  }, [location]);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative flex items-center text-sky-50 font-medium text-sm uppercase tracking-wider transition-colors duration-300 group ${
      isActive ? 'text-blue-500' : 'hover:text-blue-500'
    }`;
  };

  const NavLink = ({ to, hash, children }) => (
    <a
      href={hash ? `#${hash}` : undefined}
      onClick={() => hash && setShowMobileMenu(false)}
      className={`${getLinkClass(to || `/#${hash}`)} nav-link ${
        hash && location.hash === `#${hash}` ? 'active' : ''
      } ${showMobileMenu ? 'text-lg py-2' : ''}`}
    >
      {children}
    </a>
  );

  const MobileNavItem = ({ to, children, icon, onClick, protectedRoute = false }) => {
    const handleClick = () => {
      if (protectedRoute && !token) {
        navigate('/login');
        setShowMobileMenu(false);
      } else {
        navigate(to);
        if (onClick) onClick();
      }
    };

    return (
      <button
        onClick={handleClick}
        className="flex items-center w-full px-4 py-3 text-left text-gray-200 hover:bg-gray-800 rounded-lg transition-colors group relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffc800] rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        {icon && <span className="mr-3">{icon}</span>}
        <span>{children}</span>
        <FiArrowRightIcon className="ml-auto text-gray-400 group-hover:text-[#ffc800] transition-colors" />
      </button>
    );
  };

  return (
    <nav className="mx-auto w-full text-white p-4 px-4 sm:px-6 lg:px-10 relative bg-transparent">
      <style>
        {`
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            width: 0;
            height: 2px;
            background-color: #3b82f6;
            box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
            transition: width 0.3s ease, left 0.3s ease;
          }

          .nav-link.group:hover::after,
          .nav-link.active::after {
            width: 100%;
            left: 0;
          }

          .nav-link.active::after {
            width: 100%;
            left: 0;
          }

          .mobile-menu {
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>

      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-sky-900">
          <Link to="/" onClick={() => setShowMobileMenu(false)}>
            <img
              src={NewLogo2}
              width="150px"
              height="40px"
              alt="Logo"
              className="sm:w-[180px] lg:w-[200px]"
            />
          </Link>
        </div>

        <button
          className="mobile-menu-button lg:hidden text-sky-50 hover:text-blue-500 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        <div className="hidden lg:flex space-x-8 items-center">
          {/* Navigation links can be added here */}
        </div>

        <div className="hidden items-center lg:flex space-x-4">
          <div className="relative group">
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              className="flex items-center cursor-pointer ganarate-button text-sky-50 hover:text-blue-500 font-medium text-sm uppercase tracking-wider focus:outline-none transition-colors duration-300"
            >
              Features
              <FaAngleDown
                className={`ml-1 text-sky-50 transition-transform ${
                  showDropdown ? 'transform rotate-180' : ''
                } group-hover:text-blue-500`}
              />
            </button>
          </div>
          
          <div className="relative ganarate-button group">
            <Link to="/find-all-jobs">Find Jobs</Link>
          </div>
          
          {token && (
            <button
              onClick={dashboardNav}
              className="px-6 py-2 text-sky-50 ganarate-button border cursor-pointer border-sky-50 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
            >
              Dashboard
            </button>
          )}
          
          {!token && (
            <Link
              to="/login"
              className="border ganarate-button border-sky-50 text-sky-50 font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Job Seeker Login
            </Link>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 ganarate-button cursor-pointer text-sky-50 border border-sky-50 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 ganarate-button bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              Login
              <FaArrowRight className="ml-2" />
            </Link>
          )}
        </div>
      </div>

      {showMobileMenu && (
        <div className="fixed inset-0 z-5000000">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div
            ref={mobileMenuRef}
            className="relative h-full w-4/5 max-w-sm bg-gradient-to-b from-[#030513] to-[#0a1120] shadow-2xl"
          >
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="px-6 pt-8 pb-6 border-b border-gray-800">
              <img
                src={NewLogo2}
                width="100px"
                height="40px"
                alt="Logo"
                className="w-24"
              />
            </div>

            <nav className="flex scrollbar-1px flex-col space-y-1 p-4 overflow-scroll min-h-screen">
              <MobileNavItem
                to="/find-all-jobs"
                icon={<FiBriefcase className="text-blue-400" />}
              >
                Find Jobs
              </MobileNavItem>
              
              {token && (
                <>
                  <MobileNavItem
                    to="/dashboard"
                    icon={<FiSettings className="text-[#ffc800]" />}
                  >
                    Dashboard
                  </MobileNavItem>
                </>
              )}

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center w-full px-4 py-3 text-left text-gray-200 hover:bg-gray-800 rounded-lg transition-colors group"
                >
                  <FiGrid className="text-[#ffc800] mr-3" />
                  <span className="flex-1">Features</span>
                  <FiChevronDown
                    className={`transition-transform ${
                      showDropdown ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {showDropdown && (
                  <div className="ml-8 mt-1 space-y-1 animate-fade-in">
                    <DropdonwMenu
                      closeMenu={() => setShowMobileMenu(false)}
                      mobileVersion
                    />
                  </div>
                )}
              </div>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-[#0a1120]/50">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#ffc800] to-yellow-500 text-gray-900 font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 text-center border-2 border-[#ffc800] text-[#ffc800] font-medium rounded-lg hover:bg-[#ffc800]/10 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Job Seeker Login
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                    <FiArrowRightIcon className="ml-2" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showDropdown && !showMobileMenu && (
        <div
          ref={dropdownRef}
          className="absolute h-70 overflow-scroll left-0 right-0 mt-2 z-50000"
        >
          <DropdonwMenu closeMenu={() => setShowDropdown(false)} />
        </div>
      )}
    </nav>
  );
};

export default NewNavbar;