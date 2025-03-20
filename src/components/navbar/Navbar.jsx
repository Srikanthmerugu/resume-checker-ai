import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { logo } from "../../assets/Assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/");  
    setIsOpen(false); 
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
<nav className="p-4 bg-white   shadow-md sm:shadow-none sticky top-0 z-50">
<div className="container mx-auto flex justify-between sticky items-center">
        <a href="/">
          <img className="w-[100px] md:w-[170px]" src={logo} alt="Menu-Logo" />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {/* <li>
            <Link
              to=" /result-of-resume"
              className="hover:text-blue-600 border p-2 rounded-full transition-colors duration-200"
            >
              AI Resume Checker
            </Link>
          </li> */}


{token ? (
             <li>
             <Link to="/findCandidate">
               <button className="hover:text-blue-600 px-10 cursor-pointer border-sky-900 border-2 p-2 rounded-full transition-colors duration-200">
              Find a Candiate

               </button>
             </Link>
           </li>
          ) : (
            <li>
              <Link to="/login">
                <button className="hover:text-blue-600 px-10 cursor-pointer border-sky-900 border-2 p-2 rounded-full transition-colors duration-200">
                Find a Candiate
                </button>
              </Link>
            </li>
          )}




          {token ? (
             <li>
             <Link to="/upload-resume">
               <button className="hover:text-blue-600 px-10 cursor-pointer border-sky-900 border-2 p-2 rounded-full transition-colors duration-200">
               AI Resume Checker

               </button>
             </Link>
           </li>
          ) : (
            <li>
              <Link to="/login">
                <button className="hover:text-blue-600 px-10 cursor-pointer border-sky-900 border-2 p-2 rounded-full transition-colors duration-200">
                AI Resume Checker
                </button>
              </Link>
            </li>
          )}















          {/* {!token && (
            <li>
              <Link to="/register">
                <button className="hover:text-blue-600 border p-2 rounded-full transition-colors duration-200">
                  Register
                </button>
              </Link>
            </li>
          )} */}
          {token ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-blue-600 cursor-pointer border-sky-900 border-2 p-2 rounded-full transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button className="hover:text-blue-600 px-10 cursor-pointer border-sky-900 border-2 p-2 rounded-full transition-colors duration-200">
                  Login
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden h-[100%] mt-4">
          <ul className="space-y-2 text-center h-screen bg-white shadow-lg p-4 rounded-lg">
            {token ? (
              <li className="w-full bg-gray-600 rounded-2xl text-white">
                <Link to="/findCandidate" onClick={handleNavClick}>
                  <button className="hover:text-blue-600 px-10 cursor-pointer p-2 transition-colors duration-200">
                    Find a Candidate
                  </button>
                </Link>
              </li>
            ) : (
              <li className="w-full bg-gray-600 rounded-2xl text-white">
                <Link to="/login" onClick={handleNavClick}>
                  <button className="hover:text-blue-600 px-10 cursor-pointer p-2 transition-colors duration-200">
                    Find a Candidate
                  </button>
                </Link>
              </li>
            )}

            {token ? (
              <li className="w-full bg-gray-600 rounded-2xl text-white">
                <Link to="/upload-resume" onClick={handleNavClick}>
                  <button className="hover:text-blue-600 px-10 cursor-pointer p-2 transition-colors duration-200">
                    AI Resume Checker
                  </button>
                </Link>
              </li>
            ) : (
              <li className="w-full bg-gray-600 rounded-2xl text-white">
                <Link to="/login" onClick={handleNavClick}>
                  <button className="hover:text-blue-600 px-10 cursor-pointer p-2 transition-colors duration-200">
                    AI Resume Checker
                  </button>
                </Link>
              </li>
            )}

            {!token && (
              <li className="w-full bg-gray-600 rounded-2xl text-white">
                <Link
                  to="/login"
                  className="block py-2 cursor-pointer hover:text-blue-600"
                  onClick={handleNavClick}
                >
                  Login
                </Link>
              </li>
            )}

            {token && (
              <li className="w-full bg-gray-600 rounded-2xl text-white">
                <button
                  onClick={handleLogout}
                  className="block py-2 w-full cursor-pointer hover:text-blue-600"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;