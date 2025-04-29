import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLogOut, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavigationMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout, guestLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const menuItems = {
    recruiter: [
      {
        text: 'Job Posting',
        href: '/job-post',
        icon: '💼',
        description:
          'Create optimized job postings that attract top talent with AI-driven recommendations.',
      },
      {
        text: 'Find Candidates',
        href: '/findCandidate',
        icon: '🤖',
        description:
          'Advanced candidate matching to identify qualified applicants based on skills and culture fit.',
      },
      {
        text: 'Analytics',
        href: '#',
        icon: '📊',
        description:
          'Real-time insights into your hiring funnel with predictive analytics and diversity metrics.',
      },
      {
        text: 'Branding Kit',
        href: '#',
        icon: '🏢',
        description:
          'Customizable templates to build a compelling employer brand for recruitment marketing.',
      },
      {
        text: 'Pipeline Mgmt',
        href: '#',
        icon: '🔍',
        description:
          'Organize talent communities and automate engagement for future hiring needs.',
      },
    ],
    seeker: [
      {
        text: 'Resume Tools',
        href: '/upload-resume',
        icon: '📝',
        description:
          'Optimize your resume with AI-driven suggestions tailored to specific job roles.',
      },
      {
        text: 'Cover Letters',
        href: '#',
        icon: '✉️',
        description:
          'Craft personalized cover letters that align with company values and job requirements.',
      },
      {
        text: 'Interviews',
        href: '#',
        icon: '💬',
        description:
          'Prepare with tailored interview questions and model answers for specific roles.',
      },
      {
        text: 'Find Jobs',
        href: '/find-a-jobs',
        icon: '🔎',
        description:
          'Discover job opportunities matching your skills and career goals with AI recommendations.',
      },
      // {
      //   text: 'Salary Negotiation',
      //   href: '#',
      //   icon: '💰',
      //   description:
      //     'Develop a strong salary negotiation strategy based on industry benchmarks.',
      // },
      {
        text: 'LinkedIn Profile',
        href: '#',
        icon: '🔗',
        description:
          'Optimize your LinkedIn profile with SEO keywords and compelling storytelling.',
      },
      {
        text: 'Networking',
        href: '#',
        icon: '🤝',
        description:
          'Craft professional LinkedIn messages to connect with industry professionals.',
      },
      // {
      //   text: 'Elevator Pitch',
      //   href: '#',
      //   icon: '🎤',
      //   description:
      //     'Craft a 30-second elevator pitch highlighting your unique value and fit for a role.',
      // },
      {
        text: 'Career Change',
        href: '#',
        icon: '🔄',
        description:
          'Develop a roadmap to transition industries, with skill gap analysis and networking tips.',
      },
      {
        text: 'Mock Interview',
        href: '#',
        icon: '🎭',
        description:
          'Conduct a mock interview with behavioral and technical questions, plus feedback.',
      },
      // {
      //   text: 'Personal Branding',
      //   href: '#',
      //   icon: '🌟',
      //   description:
      //     'Build a personal brand with LinkedIn content and networking to attract recruiters.',
      // },
    ],
  };

  const getRadialPosition = (index, totalItems, radius) => {
    const angle = index * (360 / totalItems) - 90;
    return {
      x: radius * Math.cos((angle * Math.PI) / 180),
      y: radius * Math.sin((angle * Math.PI) / 180),
    };
  };

  const getResponsiveStyles = () => {
    if (window.innerWidth < 640) {
      return { radius: 100, itemSize: 'w-24 h-24', textSize: 'text-xs', cardWidth: 'w-56' };
    } else if (window.innerWidth < 1024) {
      return { radius: 120, itemSize: 'w-28 h-28', textSize: 'text-sm', cardWidth: 'w-64' };
    }
    return { radius: 140, itemSize: 'w-32 h-32', textSize: 'text-sm', cardWidth: 'w-72' };
  };

  const { radius, itemSize, textSize, cardWidth } = getResponsiveStyles();

  const handleLogout = () => {
    logout();
    setActiveMenu(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    const result = await guestLogin();
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
    setActiveMenu(null);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white relative z-50">
      {/* Logo */}
      <a href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
        <h1 className="text-sky-900 text-xl font-bold sm:text-2xl lg:text-2xl">
          <span className="bg-gradient-to-r from-sky-900 to-sky-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-sky-900 transition-all">
            Ɲ𝚎𝚎𝚍
          </span>
          <span className="bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent transition-all">
            Ɽ𝚎𝚌𝚛u
          </span>
          <span className="bg-pink-600 rounded-full p-1 sm:p-2 text-base sm:text-lg text-white hover:bg-purple-600 transition-all">
            ⓘ
          </span>
          <span className="bg-gradient-to-r from-sky-600 to-sky-900 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-600 transition-all">
            𝚝𝚎𝚛
          </span>
        </h1>
      </a>

      {/* Menu Icon for Small Screens */}
      <div className="flex items-center sm:hidden">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-sky-900 text-3xl p-2 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {/* Horizontal Menu (Tablet and Larger) */}
      <div className="hidden sm:flex gap-4 items-center relative z-20">
        {!activeMenu && (
          <>
            {['recruiter', 'seeker'].map((menuType) => (
              <motion.button
                key={menuType}
                onClick={() => setActiveMenu(menuType)}
                className="px-6 py-2 rounded-full border-2 border-sky-900 text-sky-900 font-medium hover:bg-sky-900 hover:text-sky-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                For {menuType === 'recruiter' ? 'Recruiters' : ' job Seekers'}
              </motion.button>
            ))}
            <motion.button
              onClick={() => {
                if (token) {
                  handleLogout();
                } else {
                  navigate('/login');
                }
              }}
              className="px-6 py-2 rounded-full border-2 border-sky-900 text-sky-900 font-medium hover:bg-sky-900 hover:text-sky-50 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {token ? <FiLogOut /> : <FiUser />}
              {token ? 'Logout' : 'Login'}
            </motion.button>
          </>
        )}
      </div>

      {/* Vertical Menu (Small Screens) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-2xl z-50 sm:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4 gap-4">
              <motion.button
                onClick={() => {
                  setActiveMenu('recruiter');
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 text-left text-sky-900 font-medium hover:bg-sky-100 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                For Recruiters
              </motion.button>
              <motion.button
                onClick={() => {
                  setActiveMenu('seeker');
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 text-left text-sky-900 font-medium hover:bg-sky-100 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                For Job Seekers
              </motion.button>
              <motion.button
                onClick={() => {
                  if (token) {
                    handleLogout();
                  } else {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }
                }}
                className="px-4 py-2 text-left text-sky-900 font-medium hover:bg-sky-100 rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {token ? <FiLogOut /> : <FiUser />}
                {token ? 'Logout' : 'Login'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial Menu (when active) */}
      <AnimatePresence>
        {activeMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl"
              onClick={() => setActiveMenu(null)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.button
                onClick={() => setActiveMenu(null)}
                className="w-30 h-30 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-50 text-sm font-bold shadow-2xl flex flex-col items-center justify-center "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-2 p-4">
                  <span className="text-4xl">{activeMenu === 'recruiter' ? '👔' : '👤'}</span>
                  For {activeMenu === 'recruiter' ? 'Recruiters' : ' Job Seekers'}
                </div>
              </motion.button>

              {menuItems[activeMenu]?.map((item, index) => {
                const position = getRadialPosition(index, menuItems[activeMenu].length, radius);
                return (
                  <motion.div
                    key={item.text}
                    className="absolute top-0 right-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x: position.x,
                      y: position.y,
                      transition: {
                        type: 'spring',
                        delay: index * 0.1,
                        stiffness: 100,
                        damping: 20,
                      },
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    onHoverStart={() => setHoveredItem(index)}
                    onHoverEnd={() => setHoveredItem(null)}
                    style={{
                      filter: hoveredItem !== null && hoveredItem !== index ? 'blur(4px)' : 'none',
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    <a
                      href={item.href}
                      className={`${itemSize} rounded-full flex items-center justify-center text-center p-5 ${textSize} text-pink-800 bg-yellow-300 border-2 border-yellow-600 shadow-lg hover:bg-yellow-300 hover:text-pink-500 transition-colors relative`}
                      onClick={() => setActiveMenu(null)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xl sm:text-2xl">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    </a>

                    {/* Hover Card Overlay */}
                    <AnimatePresence>
                      {hoveredItem === index && (
                        <motion.div
                          className={`${cardWidth} bg-white border-l-amber-400   shadow-2xl border-8 border-white p-4 z-50 absolute`}
                          style={{
                            top: position.y > 0 ? `${radius + 20}px` : `-${radius + 20}px`,
                            left: '50%',
                            transform: 'translateX(-50%)',
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                         <a href={item.href}>
                                                       <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl sm:text-2xl">{item.icon}</span>
                              <h3 className="text-sky-900 font-semibold">{item.text}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                            <span
                              className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm"
                            >
                              Explore <FiChevronRight className="ml-1" />
                            </span>
                          </div> </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationMenu;