import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

// Custom CSS for pulse animation
const styles = `
  .pulse {
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 0, 127, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 0, 127, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 0, 127, 0);
    }
  }
`;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: {
      scale: 1.2,
      rotate: 360,
      backgroundImage: "linear-gradient(45deg, #00ddeb, #ff007f)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.9 },
  };

  return (
    <>
      <style>{styles}</style>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            className="fixed bottom-4 cursor-pointer sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-[#ffc800] to-yellow-700 text-white p-3 sm:p-4 rounded-full shadow-lg pulse z-50 focus:outline-none"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg sm:text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTopButton;