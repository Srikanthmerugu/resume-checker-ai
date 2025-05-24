import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiClipboard,
  FiGrid,
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { NewLogo2 } from "../assets/Assets";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: FiHome },
  { title: "Post Job", path: "/job-post", icon: FiClipboard },
  { title: "Find Candidate", path: "/findCandidate", icon: FiGrid },
  { title: "AI Resume Checker", path: "/upload-resume", icon: FiBell },
];

const dropdownItems = [
  { title: "Resume Optimization", href: "/ResumeOptimization" },
  { title: "Career Change Guidance", href: "/career-change-guidance" },
  { title: "Interview Questions", href: "/InterviewPreparation" },
  { title: "Cover Letter Creation", href: "/cover-letter-creation" },
  { title: "Elevator Pitch Creation", href: "/elevator-pitch-creation" },
  { title: "LinkedIn Profile Enhancement", href: "/linkedIn-profile-enhancement" },
  { title: "Mock Interview", href: "/mock-interview" },
  { title: "Networking Outreach Messages", href: "/networking-outreach-messages" },
  { title: "Personal Branding Strategy", href: "/personal-branding-strategy" },
  { title: "Salary Negotiation", href: "/salary-negotiation" },
];

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Combine the open states - either forced open or hovered open (but not on mobile)
  const shouldShowExpanded = isOpen || (isHovered && !isMobile);

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/')
  }

  // Close sidebar when a nav item is clicked on mobile
  const handleNavClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-[#23282D] shadow-lg z-50 transition-all duration-300 flex flex-col ${
        shouldShowExpanded ? "w-64" : "w-16"
      } ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1F3F49]">
        {shouldShowExpanded ? (
          <div onClick={navigateHome} className="text-[#B3C100] font-bold cursor-pointer text-xl">
            <img src={NewLogo2} width="" alt="Logo" className="w-40" />
          </div>
        ) : (
          <div className="text-[#B3C100] cursor-pointer p-1 font-bold text-lg mx-auto">N</div>
        )}
        
        {/* Close button for mobile */}
        {isMobile && isOpen && (
          <button 
            onClick={toggleSidebar}
            className="text-[#CED2CC] hover:text-[#f1f374] p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-1px">
        {shouldShowExpanded ? (
          <div className="p-4">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center p-3 mb-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-yellow-300 text-yellow- border-l-6 border-yellow-500"
                      : "text-[#CED2CC] hover:bg-[#1F3F49] hover:text-[#B3C100]"
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.title}</span>
              </NavLink>
            ))}

            {/* Dropdown Section */}
            <div className="mb-2">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full p-3 mb-2 rounded-lg text-[#CED2CC] hover:bg-[#1F3F49] hover:text-[#B3C100] transition-colors duration-200"
              >
                <div className="flex items-center cursor-pointer">
                  <FiGrid className="w-5 h-5 mr-3" />
                  <span>All Features</span>
                </div>
                {isDropdownOpen ? <FiChevronDown /> : <FiChevronRight />}
              </button>

              {isDropdownOpen && (
                <div className="pl-8">
                  {dropdownItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={handleNavClick}
                      className="flex items-center p-2 mb-1 rounded-lg text-[#CED2CC] hover:bg-[#1F3F49] hover:text-[#B3C100] transition-colors duration-200"
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4 space-y-4">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-[#B3C100]/20 text-[#B3C100]"
                      : "text-[#CED2CC] hover:bg-[#1F3F49] hover:text-[#B3C100]"
                  }`
                }
                title={item.title}
              >
                <item.icon className="w-5 h-5" />
              </NavLink>
            ))}

            {/* Collapsed dropdown icon */}
            <button
              onClick={toggleDropdown}
              className="p-3 rounded-lg text-[#CED2CC] hover:bg-[#1F3F49] hover:text-[#B3C100] transition-colors duration-200"
              title="More Items"
            >
              <FiGrid className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;