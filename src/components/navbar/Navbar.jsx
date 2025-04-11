import { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, logout, guestLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    const result = await guestLogin();
    if (result.success) {
      navigate("/");
    }
    setLoading(false);
    setIsOpen(false);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Define nav items to avoid repetition
  const navItems = [
    { to: "/find-a-jobs", label: "Find a Job", authRequired: false },
    { to: "/job-post", label: "Post a Job", authRequired: false },
    {
      to: token ? "/findCandidate" : "/login",
      label: "Find a Candidate",
      authRequired: true,
    },
    {
      to: token ? "/upload-resume" : "/login",
      label: "AI Resume Checker",
      authRequired: true,
    },
  ];

  return (
    <nav className="p-4 bg-white shadow-md lg:shadow-none sticky top-0 z-50 w-full">
      <div className="container mx-auto flex px-4 sm:px-6 lg:px-10 justify-between items-center max-w-7xl">
        <a href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
          <h1 className="text-sky-900 text-xl font-bold sm:text-2xl lg:text-2xl">
            <span className="bg-gradient-to-r from-sky-900 to-sky-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-sky-900 transition-all">
              Ɲ𝚎𝚎𝚍
            </span>
            <span className="bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent transition-all">
              Ɽ𝚎𝚌𝚛u
            </span>
            <span className="bg-pink-600 rounded-full p-1 sm:p-2 text-base sm:text-lg text-white hover:bg-purple-600 transition-all">ⓘ</span>
            <span className="bg-gradient-to-r from-sky-600 to-sky-900 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-600 transition-all">
              𝚝𝚎𝚛
            </span>
          </h1>
        </a>

        {/* Toggle Button (visible below 1024px) */}
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop Menu (visible at 1024px and above) */}
        <ul className="hidden lg:flex space-x-2 xl:space-x-4 items-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link to={item.to}>
                <button className="hover:text-blue-600 px-4 py-1.5 xl:px-6 xl:py-2 text-sm xl:text-base cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200">
                  {item.label}
                </button>
              </Link>
            </li>
          ))}
          {token ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-blue-600 px-4 py-1.5 xl:px-6 xl:py-2 text-sm xl:text-base cursor-pointer border-sky-900 text-sky-900 border-2 rounded-full transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleGuestLogin}
                disabled={loading}
                className="flex items-center bg-sky-800 hover:bg-sky-50 hover:border-sky-800 hover:text-sky-800 px-4 py-1.5 xl:px-6 xl:py-2 text-sm xl:text-base cursor-pointer border-sky-100 text-sky-50 border-2 rounded-full transition-colors duration-200"
              >
                <FiUser className="mr-2" />
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-4 w-4 xl:h-5 xl:w-5 mr-2 text-sky-900"
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

      {/* Mobile Menu (visible below 1024px when toggled) */}
      {isOpen && (
        <div className="lg:hidden mt-4 px-4">
          <ul className="space-y-3 text-center bg-white shadow-lg p-4 rounded-lg">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.to} onClick={handleNavClick}>
                  <button className="w-full text-left hover:bg-sky-300 hover:text-sky-900 px-4 py-2 text-sm cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200">
                    {item.label}
                  </button>
                </Link>
              </li>
            ))}
            {!token && (
              <li>
                <button
                  onClick={handleGuestLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-start hover:bg-sky-300 hover:text-sky-900 px-4 py-2 text-sm cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200"
                >
                  <FiUser className="mr-2" />
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-2 text-sky-900"
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
                  className="w-full text-left  hover:bg-sky-300 hover:text-sky-900 px-4 py-2 text-sm cursor-pointer border-l-4 border-sky-900 bg-sky-200 text-sky-900 rounded-lg transition-colors duration-200"
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