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
    logout(); // This should clear the token
    navigate("/"); // Navigate to home immediately
  };

  return (
<nav className="p-4 bg-white   shadow-md sm:shadow-none sticky top-0 z-50">
<div className="container mx-auto flex justify-between sticky items-center">
        <a href="/need-recruiter-f1">
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
          <li>
            <Link
              to="/need-recruiter-f1/login"
              className="hover:text-blue-600 border p-2 rounded-full transition-colors duration-200"
            >
              AI Resume Checker
            </Link>
          </li>
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
                className="hover:text-blue-600 cursor-pointer border p-2 rounded-full transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/need-recruiter-f1/login">
                <button className="hover:text-blue-600 px-10 cursor-pointer border p-2 rounded-full transition-colors duration-200">
                  Login
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="space-y-2 text-center bg-white shadow-lg p-4 rounded-lg">
            <li>
              <Link
                to="/upload-resume"
                className="block py-2 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                AI Resume Checker
              </Link>
            </li>
            {!token && (
              <>
                {/* <li>
                  <Link
                    to="/register"
                    className="block py-2 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/login"
                    className="block py-2  cursor-pointer hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    
                    Login
                  </Link>
                </li>
              </>
            )}
            {token && (
              <li>
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