import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

// Custom CSS for enhanced animations and styling
const styles = `
  .wave-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    overflow: hidden;
    z-index: 0;
  }
  .wave-bg::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: 
      radial-gradient(circle at 30% 30%, rgba(255, 0, 127, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 70% 70%, rgba(0, 221, 235, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 25%);
    animation: wave 20s infinite linear;
    opacity: 0.8;
  }
  @keyframes wave {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  .social-icon {
    transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }
  .social-icon:hover {
    transform: translateY(-5px) scale(1.2);
    box-shadow: 0 10px 20px rgba(0, 221, 235, 0.3);
  }
  .link-hover-effect::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #ec4899, #00ddeb);
    transition: width 0.4s ease;
  }
  .link-hover-effect:hover::after {
    width: 100%;
  }
  .newsletter-input {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .newsletter-input:focus {
    outline: none;
    border-color: rgba(0, 221, 235, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 221, 235, 0.2);
  }
`;

const Footer = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -3,
      color: "#00ddeb",
      textShadow: "0 0 8px rgba(0, 221, 235, 0.5)",
      transition: { 
        duration: 0.3,
        ease: "easeOut",
      }
    },
  };

  const socialVariants = {
    hover: {
      scale: [1, 1.2, 1.1],
      rotate: [0, 10, -10, 0],
      color: "#00ddeb",
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="relative  bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 overflow-hidden">
      <style>{styles}</style>
      <div className="wave-bg" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 5 + 1 + 'px',
              height: Math.random() * 5 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() * 100) - 50],
              x: [0, (Math.random() * 60) - 30],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Need Recruiter
            </motion.h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Revolutionizing recruitment with AI-powered solutions that connect top talent with visionary companies.
            </p>
            
            {/* Newsletter */}
            {/* <motion.div 
              className="mb-6"
              whileHover={{ y: -2 }}
            >
              <h4 className="text-sm font-semibold text-gray-400 mb-3">STAY UPDATED</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="newsletter-input flex-grow px-4 py-2 rounded-l-lg text-white placeholder-gray-400 focus:placeholder-transparent transition-all"
                />
                <motion.button
                  className="bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 rounded-r-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSend className="mr-2" />
                  <span>Join</span>
                </motion.button>
              </div>
            </motion.div> */}

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-3">
              {[
                { icon: FaFacebookF, color: "#3b5998" },
                { icon: FaTwitter, color: "#1DA1F2" },
                { icon: FaLinkedin, color: "#0077B5" },
                { icon: FaInstagram, color: "#E1306C" },
                { icon: FaYoutube, color: "#FF0000" },
                { icon: FaGithub, color: "#333" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  variants={socialVariants}
                  whileHover="hover"
                  className="social-icon flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white"
                  style={{ backgroundColor: social.color }}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Contact Us", href: "#" },
                { name: "About Us", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Blog", href: "#" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  variants={hoverVariants}
                  whileHover="hover"
                  className="link-hover-effect relative"
                >
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {[
                { name: "AI Resume Scoring", href: "#" },
                { name: "Job Fit Analysis", href: "#" },
                { name: "Candidate Sourcing", href: "#" },
                { name: "Recruiting Analytics", href: "#" },
                { name: "Interview Scheduling", href: "#" },
                { name: "Employer Branding", href: "#" },
              ].map((service, index) => (
                <motion.li
                  key={index}
                  variants={hoverVariants}
                  whileHover="hover"
                  className="link-hover-effect relative"
                >
                  <a href={service.href} className="text-gray-300 hover:text-white transition-colors">
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-center justify-center md:justify-start"
                whileHover={{ x: 5 }}
              >
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">123 Recruit St, Talent City</span>
              </motion.li>
              <motion.li 
                className="flex items-center justify-center md:justify-start"
                whileHover={{ x: 5 }}
              >
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </motion.li>
              <motion.li 
                className="flex items-center justify-center md:justify-start"
                whileHover={{ x: 5 }}
              >
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">info@needrecruiter.com</span>
              </motion.li>
            </ul>

            {/* Working Hours */}
            {/* <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">WORKING HOURS</h4>
              <p className="text-gray-300">Mon - Fri: 9am - 6pm</p>
              <p className="text-gray-300">Sat - Sun: Closed</p>
            </div> */}
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Need Recruiter. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">Terms of Service</a>
              {/* <a href="#" className="text-gray-400 hover:text-cyan-400 transition">Sitemap</a> */}
            </div>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            Developed by <a href="https://synchronage.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Synchronage</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;