import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaArrowRight } from 'react-icons/fa';
import DropdonwMenu from '../navbar/Dropdonw/DropdonwMenu';

const NewNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-white shadow-xl shadow-blue-200 rounded-lg mx-auto max-w-6xl p-4 mt-4 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-sky-900">
          <Link to="/">ɲ𝚎𝚎𝚍ɽ𝚎𝚌𝚛𝕦ί𝚝𝚎𝚛</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a
            href="#Howitswork"
            className="text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
          >
            How It Works
          </a>
          <div className="relative group">
            <Link
              to="#"
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
            >
              Find Jobs
            </Link>
          </div>
          <div className="relative group">
            <Link
              to="#"
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
            >
              Post Job
            </Link>
          </div>
          <div className="relative group">
            <Link
              to="#"
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
            >
              Find Candidate
            </Link>
          </div>
          <div className="relative group">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider focus:outline-none"
            >
              Features
              <FaAngleDown className={`ml-1 text-gray-500 transition-transform ${showDropdown ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Seecker Login
          </Link>
          <Link
            to="/login"
            className="bg-sky-900 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-sky-800 flex items-center transition-colors"
          >
            Login
            <FaArrowRight className="ml-2" />

          </Link>
          {/* <Link
            to="/try-for-free"
            className="bg-sky-900 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-sky-800 flex items-center transition-colors"
          >
            Try for free
            <FaArrowRight className="ml-2" />
          </Link> */}
        </div>
      </div>
      
      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 z-10000">
          <DropdonwMenu />
        </div>
      )}
    </nav>
  );
};

export default NewNavbar;