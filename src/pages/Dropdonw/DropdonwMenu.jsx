import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileAlt, FaPen, FaQuestionCircle, FaMoneyBillWave, 
  FaLinkedin, FaComments, FaUserTie, FaUserClock, FaExchangeAlt, FaBullhorn 
} from 'react-icons/fa';

const DropdownMenu = ({ onFeatureClick }) => {
  const sparkleCount = 40;

  const features = [
    {
      icon: FaFileAlt,
      title: 'Resume Optimization',
      description: 'Analyze my resume and provide tailored improvements to align with job requirements',
      href: '#ResumeOptimization',
    },
    {
      icon: FaPen,
      title: 'Recruiter Sourcing Strategy',
      description: 'Create a sourcing strategy for specific job roles and industries',
      href: '#RecruiterSourcingStrategy',
    },
    {
      icon: FaQuestionCircle,
      title: 'Interview Preparation',
      description: 'Generate a list of the top 20 interview questions for your target position',
      href: '#InterviewPreparation',
    },
    {
      icon: FaMoneyBillWave,
      title: 'Cost-Saving Analysis',
      description: 'Compare hiring costs with NeedRecruiter vs. traditional methods',
      href: '#CostSavingAnalysis',
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn Outreach Plan',
      description: 'Optimize my LinkedIn profile to attract recruiters',
      href: '#LinkedInOutreachPlan',
    },
    {
      icon: FaComments,
      title: 'Networking Messages',
      description: 'Write professional yet friendly LinkedIn connection messages',
      href: '#NetworkingMessages',
    },
    {
      icon: FaUserTie,
      title: 'Recruiter Branding Strategy',
      description: 'Develop a branding strategy to stand out in the recruiting industry',
      href: '#RecruiterBrandingStrategy',
    },
    {
      icon: FaUserClock,
      title: 'Mock Candidate Screening',
      description: 'Act as a hiring manager to screen candidates with practice questions',
      href: '#MockCandidateScreening',
    },
    {
      icon: FaExchangeAlt,
      title: 'Hiring Roadmap',
      description: 'Provide strategies for building a scalable hiring process',
      href: '#HiringRoadmap',
    },
    {
      icon: FaBullhorn,
      title: 'Candidate Pitch Creation',
      description: 'Craft a compelling 30-second pitch for candidates to present',
      href: '#CandidatePitchCreation',
    },
  ];

  // Animation variants for feature cards
  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0 0 15px rgba(14, 165, 233, 0.5)',
      transition: {
        duration: 0.3,
      },
    },
  };

  // Animation for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'backOut',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-b from-gray-900 to-gray-800  flex flex-col justify-center  font-sans absolute top-0 left-0 w-full z-40"
    >
      

      {/* Features Section */}
      <div className="max-w-7xl mx-auto pt-12 px-4">
        {/* <h3 className="text-lg font-semibold text-white mb-6">All Features</h3> */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={featureCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="feature-card border border-gray-600/50 rounded-lg p-4 bg-gradient-to-br from-gray-800 to-gray-700 hover:border-cyan-400/30 transition-all group"
              >
                <div
                  onClick={() => onFeatureClick(feature.href)}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full p-2 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Icon className="text-white text-2xl group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                    <p className="text-xs text-gray-300 mt-1">
                      {feature.description.substring(0, 35)}{' '}
                     <a href={feature.href}> <span className="text-cyan-400">More..</span></a>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Heading and Sparkles */}
      <div className="relative text-center mt-12">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white relative z-20"
        >
          Need Recruiter
        </motion.h1>

        {/* Gradients and Sparkles Container */}
        <div className="relative w-full h-24 mt-4">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Simulated Sparkles */}
          <div className="sparkle-container">
            {Array.from({ length: sparkleCount }, (_, index) => (
              <motion.div
                key={index}
                className="sparkle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{
                  duration: Math.random() * 1 + 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Radial Gradient to prevent sharp edges */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              maskImage: 'radial-gradient(350px 200px at top, transparent 20%, white)',
            }}
          />
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .feature-card:hover {
            border-color: transparent;
          }

          .group-hover\\:animate-bounce {
            animation: bounce 0.5s ease-in-out;
          }

          /* Sparkles */
          @keyframes sparkle {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0);
            }
          }

          .sparkle-container {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .sparkle {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0;
          }
          
          ${Array.from({ length: sparkleCount }, (_, index) => `
            .sparkle:nth-child(${index + 1}) {
              width: ${Math.random() * 6 + 2}px;
              height: ${Math.random() * 6 + 2}px;
              top: ${Math.random() * 100}%;
              left: ${Math.random() * 100}%;
            }
          `).join('\n')}
        `}
      </style>
    </motion.div>
  );
};

export default DropdownMenu;