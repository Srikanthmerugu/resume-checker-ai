import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaArrowRight } from 'react-icons/fa';

const NewNavbar = () => {
  return (
    <nav className="bg-white  shadow-xl shadow-blue-200 rounded-lg mx-auto max-w-6xl p-4 mt-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-sky-900">
          <Link to="/">  ɲ𝚎𝚎𝚍ɽ𝚎𝚌𝚛𝕦ί𝚝𝚎𝚛  </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            to="#"
            className="text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
          >
            How It Works
          </Link>
          <div className="relative group">
            <Link
              to="#"
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
            >
              Find Jobs
              {/* <FaAngleDown className="ml-1 text-gray-500" /> */}
            </Link>
          </div>
          <div className="relative group">
            <Link
              to="#"
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
            >
              Post Job
              {/* <FaAngleDown className="ml-1 text-gray-500" /> */}
            </Link>
          </div>
          <div className="relative group">
            <Link
              to="#"
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm uppercase tracking-wider"
            >
              Find Candidate
              {/* <FaAngleDown className="ml-1 text-gray-500" /> */}
            </Link>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/try-for-free"
            className="bg-sky-900 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-sky-800 flex items-center transition-colors"
          >
            Try for free
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NewNavbar;