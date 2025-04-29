import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavigationMenuTwo = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { token, logout, guestLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const menuItems = {
    recruiter: [
      { text: 'Job Posting', href: '/job-post', icon: '💼' },
      { text: 'Find Candidates', href: '/findCandidate', icon: '🤖' },
      { text: 'Analytics', href: '#', icon: '📊' },
      { text: 'Branding Kit', href: '#', icon: '🏢' },
      { text: 'Pipeline Mgmt', href: '#', icon: '🔍' },
    ],
    seeker: [
      { text: 'Resume Tools', href: '/upload-resume', icon: '📝' },
      { text: 'Cover Letters', href: '#', icon: '✉️' },
      { text: 'Interviews', href: '#', icon: '💬' },
      { text: 'Find Jobs', href: '/find-a-jobs', icon: '🔎' },
    ]
  };

  const getRadialPosition = (index, totalItems, radius = 140) => {
    const angle = (index * (360 / totalItems)) - 90;
    return {
      x: radius * Math.cos(angle * (Math.PI / 180)),
      y: radius * Math.sin(angle * (Math.PI / 180)),
    };
  };

  const handleLogout = () => {
    logout();
    setActiveMenu(null);
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
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white">
      {/* Logo */}
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

      {/* Horizontal Menu (initial state) */}
      <div className="flex gap-4 items-center relative z-20">
        {!activeMenu && (
          <>
            {['recruiter', 'seeker'].map((menuType) => (
              <motion.button
                key={menuType}
                onClick={() => setActiveMenu(menuType)}
                className="px-6 cursor-pointer py-2 rounded-4xl border-2 border-sky-900 text-sky-900 font-medium hover:bg-sky-900 hover:text-sky-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                For {menuType === 'recruiter' ? 'Recruiters' : 'Seekers'}
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
              className="px-6 py-2 cursor-pointer rounded-4xl border-2 border-sky-900 text-sky-900 font-medium hover:bg-sky-900 hover:text-sky-50 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {token ? <FiLogOut /> : <FiUser />}
              {token ? 'Logout' : 'Login'}
            </motion.button>
          </>
        )}

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
                  className="w-30 cursor-pointer h-30 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white text-sm font-bold shadow-2xl flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center gap-2 p-4">
                    <span className="text-4xl">
                      {activeMenu === 'recruiter' ? '👔' : '👤'}
                    </span>
                    For {activeMenu === 'recruiter' ? 'Recruiters' : 'Seekers'}
                  </div>
                </motion.button>

                {menuItems[activeMenu]?.map((item, index) => {
                  const position = getRadialPosition(index, menuItems[activeMenu].length);
                  return (
                    <motion.a
                      key={item.text}
                      href={item.href}
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
                          damping: 20
                        }
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute w-32 h-32 top-0 right-0 rounded-full flex items-center justify-center text-center p-5 text-sm bg-white border-2 border-sky-900 shadow-lg hover:bg-sky-900 hover:text-white transition-colors"
                      onClick={() => setActiveMenu(null)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavigationMenuTwo;