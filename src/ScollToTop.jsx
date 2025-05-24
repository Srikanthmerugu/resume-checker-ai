import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScollToTop = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // Show the button when the user scrolls down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Styles for the Button */}
      <style jsx>{`
        button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
};

export default ScollToTop;