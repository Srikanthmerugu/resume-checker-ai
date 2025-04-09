import { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi"; // Import FiUser for the login icon
import { logo } from "../../assets/Assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for guest login
  const { token, logout, guestLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleGuestLogin = async () => {
    setLoading(true); // Start loading
    const result = await guestLogin();
    if (result.success) {
      navigate("/");
    }
    setLoading(false); // Stop loading
    setIsOpen(false);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="p-4  bg-white  shadow-md sm:shadow-none sticky top-0 z-50">
      <div className="container mx-auto flex mx:px-10  justify-between items-center">
      <a href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
  {/* Logo Text */}
  <h1 className="text-sky-900  hover:from-sky-900 hover:to-sky-600 font-bold text-2xl md:text-2xl">
    <span className="bg-gradient-to-r from-sky-900 to-sky-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-sky-900 transition-all">
      Ɲ𝚎𝚎𝚍
    </span>
    <span className="bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent  transition-all">
      Ɽ𝚎𝚌𝚛u
    </span>
    <span className="bg-pink-600 rounded-full p-2 text-lg text-white hover:bg-purple-600 transition-all">ⓘ</span>
    <span className="bg-gradient-to-r from-sky-600 to-sky-900 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-600 transition-all">
      𝚝𝚎𝚛
    </span>
  </h1>
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
              <Link to="/find-all-jobs">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  Find All Job
                </button>
              </Link>
            </li> */}
            
            
            
            {token ? (
           
            <li>
              <Link to="/SearchForFindJob">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  Find a Job
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/SearchForFindJob">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  Find a Job
                </button>
              </Link>
            </li>
          )}
          {token ? (
            <li>
              <Link to="/job-post">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  Post a Job
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/job-post">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  Post a Job
                                </button>
              </Link>
            </li>
          )}
          {token ? (
            <li>
              <Link to="/findCandidate">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  Find a Candidate
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  Find a Candidate
                </button>
              </Link>
            </li>
          )}

          {token ? (
            <li>
              <Link to="/upload-resume">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  AI Resume Checker
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  AI Resume Checker
                </button>
              </Link>
            </li>
          )}

          {token ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleGuestLogin}
                disabled={loading} // Disable button while loading
                className="flex items-center hover:text-blue-600 px-6 py-2 cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200"
              >
                <FiUser className="mr-2" />
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-sky-900"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Login...
                  </span>
                ) : (
                  "Guest Login"
                )}
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="space-y-4 text-center bg-white shadow-lg p-4 rounded-lg">
          {token ? (
           
           <li>
             <Link to="/SearchForFindJob">
             <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
             Find a Job
               </button>
             </Link>
           </li>
         ) : (
           <li>
             <Link to="/SearchForFindJob">
             <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
             Find a Job
               </button>
             </Link>
           </li>
         )}
         {token ? (
           <li>
             <Link to="/job-post">
             <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
             Post a Job
               </button>
             </Link>
           </li>
         ) : (
           <li>
             <Link to="/job-post">
             <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
             Post a Job
                               </button>
             </Link>
           </li>
         )}
            {token ? (
              <li>
                <Link to="/findCandidate" onClick={handleNavClick}>
                  <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
                    Find a Candidate
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={handleNavClick}>
                  <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
                    Find a Candidate
                  </button>
                </Link>
              </li>
            )}

            {token ? (
              <li>
                <Link to="/upload-resume" onClick={handleNavClick}>
                  <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
                    AI Resume Checker
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={handleNavClick}>
                  <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
                    AI Resume Checker
                  </button>
                </Link>
              </li>
            )}

            {!token && (
              <li>
                <button
                  onClick={handleGuestLogin}
                  disabled={loading} // Disable button while loading
                  className="w-full flex items-center justify-start hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200"
                >
                  <FiUser className="mr-2" />
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-sky-900"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Login...
                    </span>
                  ) : (
                    "Guest Login"
                  )}
                </button>
              </li>
            )}

            {token && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-6 py-2 cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200"
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