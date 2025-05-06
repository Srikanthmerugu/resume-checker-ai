import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleDown, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import DropdonwMenu from '../../pages/Dropdonw/DropdonwMenu';
import { NewLogo2 } from '../../assets/Assets';

const NewNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Toggle dropdown and close if clicking the button again
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
    if (showDropdown) setShowDropdown(false); // Close dropdown when toggling menu
  };

  // Close dropdown and mobile menu when clicking outside
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

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setShowMobileMenu(false);
    setShowDropdown(false);
  }, [location]);

  // Determine active link based on current path
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative flex items-center text-sky-50 font-medium text-sm uppercase tracking-wider transition-colors duration-300 group ${
      isActive ? 'text-blue-500' : 'hover:text-blue-500'
    }`;
  };

  // Common link component for reuse
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

  return (
    <nav className="mx-auto w-full text-white p-4 px-4 sm:px-6 lg:px-10 relative bg-transparent">
      <style>
        {`
          /* Underline animation from center to both sides */
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            width: 0;
            height: 2px;
            background-color: #3b82f6; /* blue-500 */
            box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5); /* Shadow effect */
            transition: width 0.3s ease, left 0.3s ease;
          }

          .nav-link.group:hover::after,
          .nav-link.active::after {
            width: 100%;
            left: 0;
          }

          /* Active link underline */
          .nav-link.active::after {
            width: 100%;
            left: 0;
          }

          /* Mobile menu transition */
          .mobile-menu {
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>

      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-sky-900">
          <Link to="/" onClick={() => setShowMobileMenu(false)}>
            <img
              src={NewLogo2}
              width="100px"
              height="40px"
              alt="Logo"
              className="sm:w-[180px] lg:w-[150px]"
            />
          </Link>
        </div>

        {/* Hamburger Menu Button (visible on mobile) */}
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

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex space-x-8 items-center">
          {/* <NavLink hash="Howitswork">How It Works</NavLink> */}
          <div className="relative group">
            <Link to="/find-all-jobs">Find Jobs</Link>
          </div>
          <div className="relative group">
            <Link to="/job-post">Post Job</Link>
          </div>
          <div className="relative group">
            <Link to="/findCandidate">Find Candidate</Link>
          </div>
          <div className="relative group">
            <Link to="/upload-resume">AI Resume Checker</Link>
          </div>
          <div className="relative group">
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              className="flex items-center text-sky-50 hover:text-blue-500 font-medium text-sm uppercase tracking-wider focus:outline-none transition-colors duration-300"
            >
              Features
              <FaAngleDown
                className={`ml-1 text-sky-50 transition-transform ${
                  showDropdown ? 'transform rotate-180' : ''
                } group-hover:text-blue-500`}
              />
            </button>
          </div>
        </div>

        {/* Buttons (Desktop) */}
        <div className="hidden lg:flex space-x-4">
          <Link
            to="/login"
            className="border ganarate-button border-sky-50 text-sky-50 font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            Job Seeker Login
          </Link>
          <Link
            to="/login"
            className="flex ganarate-button items-center text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-sky-800 transition-colors"
            style={{ backgroundColor: '#182a66' }}
          >
            Login
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="mobile-menu lg:hidden absolute top-full left-0 right-0 bg-[#030513f8] shadow-lg mt-2 z-50 transform translate-y-0"
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            <NavLink hash="Howitswork">How It Works</NavLink>
            <Link to="/find-a-Jobs">Find Jobs</Link>
            <NavLink to="/post-job">Post Job</NavLink>
            <NavLink to="/find-candidate">Find Candidate</NavLink>
            <div className="w-full text-center">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-full text-sky-50 hover:text-blue-500 font-medium text-lg uppercase tracking-wider focus:outline-none transition-colors duration-300"
              >
                Features
                <FaAngleDown
                  className={`ml-2 text-sky-50 transition-transform ${
                    showDropdown ? 'transform rotate-180' : ''
                  } group-hover:text-blue-500`}
                />
              </button>
              {showDropdown && (
                <div className="mt-2">
                  <DropdonwMenu closeMenu={() => setShowMobileMenu(false)} />
                </div>
              )}
            </div>
            <Link
              to="/login"
              className="border border-sky-50 text-sky-50 font-medium text-lg px-6 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Job Seeker Login
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center text-white font-medium text-lg px-6 py-2 rounded-md hover:bg-sky-800 transition-colors"
              style={{ backgroundColor: '#182a66' }}
              onClick={() => setShowMobileMenu(false)}
            >
              Login
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      )}

      {/* Dropdown Menu (Desktop) */}
      {showDropdown && !showMobileMenu && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-2 z-11150"
        >
          <DropdonwMenu closeMenu={() => setShowDropdown(false)} />
        </div>
      )}
    </nav>
  );
};

export default NewNavbar;