import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleDown, FaArrowRight } from 'react-icons/fa';
import DropdonwMenu from '../../pages/Dropdonw/DropdonwMenu';
import { NewLogo2 } from '../../assets/Assets';

const NewNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // Toggle dropdown and close if clicking the button again
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Determine active link based on current path
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative flex items-center text-sky-50 font-medium text-sm uppercase tracking-wider transition-colors duration-300 group ${
      isActive ? 'text-blue-500' : 'hover:text-blue-500'
    }`;
  };

  return (
    <nav className="mx-auto w-full text-white p-4 px-10 relative bg-transparent">
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
        `}
      </style>

      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-sky-900">
          <Link to="/">
            <img src={NewLogo2} width="200px" height="80px" alt="Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a
            href="#Howitswork"
            className={`${getLinkClass('/how-it-works')} nav-link ${
              location.hash === '#Howitswork' ? 'active' : ''
            }`}
          >
            How It Works
          </a>
          <div className="relative group">
            <Link
              to="/find-jobs"
              className={`${getLinkClass('/find-jobs')} nav-link`}
            >
              Find Jobs
            </Link>
          </div>
          <div className="relative group">
            <Link
              to="/post-job"
              className={`${getLinkClass('/post-job')} nav-link`}
            >
              Post Job
            </Link>
          </div>
          <div className="relative group">
            <Link
              to="/find-candidate"
              className={`${getLinkClass('/find-candidate')} nav-link`}
            >
              Find Candidate
            </Link>
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

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className='ganarate-button'
            // className="border border-sky-50 text-sky-50 font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
           Job Seeker Login
          </Link>
          <Link
            to="/login"
            style={{ backgroundColor: "#182a66" }}
            className='ganarate-button flex'
            // className="flex items-center text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-sky-800 transition-colors"
          >
            Login
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-2 z-1500000"
        >
          <DropdonwMenu />
        </div>
      )}
    </nav>
  );
};

export default NewNavbar;