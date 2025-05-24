import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaFileAlt, FaPen, FaQuestionCircle, FaMoneyBillWave, 
  FaLinkedin, FaEnvelope, FaUserTie, FaMicrophone, FaRoute, FaBullhorn 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChatGPTJobPrompts = () => {

 const navigate = useNavigate();
 
   const handleClick = () => {
     navigate("/login");
   };
 



  const steps = [
    {
      id: 'ResumeOptimization',
      title: 'Resume Optimization',
      description: 'Analyze my resume and suggest improvements for a [job title] role at [company]. Highlight skills and keywords to pass ATS screening and impress hiring managers.',
      icon: FaFileAlt,
      height: 'h-[300px]',
    },
    {
      id: 'RecruiterSourcingStrategy',
      title: 'Recruiter Sourcing Strategy',
      description: 'Create a sourcing strategy for a [job title] role at [company]. Focus on platforms, keywords, and outreach methods to attract top talent in [industry].',
      icon: FaPen,
      height: 'h-[280px]',
    },
    {
      id: 'InterviewPreparation',
      title: 'Interview Preparation',
      description: 'Generate 20 interview questions for a [job title] role at [company]. Include behavioral and technical questions, with answers tailored to my [industry] experience.',
      icon: FaQuestionCircle,
      height: 'h-[350px]',
    },
    {
      id: 'CostSavingAnalysis',
      title: 'Cost-Saving Analysis',
      description: 'Compare the costs of hiring with NeedRecruiter vs. traditional methods for a [job title] role at [company]. Highlight savings and efficiency gains.',
      icon: FaMoneyBillWave,
      height: 'h-[300px]',
    },
    {
      id: 'LinkedInOutreachPlan',
      title: 'LinkedIn Outreach Plan',
      description: 'Optimize my LinkedIn profile and create an outreach plan for [job title] roles at [company]. Use keywords and strategies to attract recruiters in [industry].',
      icon: FaLinkedin,
      height: 'h-[370px]',
    },
    {
      id: 'NetworkingMessages',
      title: 'Networking Messages',
      description: 'Write a professional LinkedIn message to connect with [job title] professionals at [company]. Build rapport and explore opportunities naturally.',
      icon: FaEnvelope,
      height: 'h-[300px]',
    },
    {
      id: 'RecruiterBrandingStrategy',
      title: 'Recruiter Branding Strategy',
      description: 'Develop a branding strategy for me as a recruiter in [industry]. Include LinkedIn content ideas and networking tactics to attract top clients.',
      icon: FaUserTie,
      height: 'h-[330px]',
    },
    {
      id: 'MockCandidateScreening',
      title: 'Mock Candidate Screening',
      description: 'Act as a hiring manager for a [job title] role at [company]. Screen a candidate with 5 behavioral and 5 technical questions, then provide feedback.',
      icon: FaMicrophone,
      height: 'h-[300px]',
    },
    {
      id: 'HiringRoadmap',
      title: 'Hiring Roadmap',
      description: 'Create a hiring roadmap for a [job title] role at [company]. Identify skill gaps, sourcing tips, and strategies to build a scalable hiring process.',
      icon: FaRoute,
      height: 'h-[280px]',
    },
    {
      id: 'CandidatePitchCreation',
      title: 'Candidate Pitch Creation',
      description: 'Craft a 30-second pitch for a [job title] candidate to present to [company]. Highlight their unique value and fit in a confident, natural tone.',
      icon: FaBullhorn,
      height: 'h-[350px]',
    },
  ];

  // Animation variants for the heading
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

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
      transition: {
        duration: 0.3,
      },
    },
  };

  // Animation for the icon
  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: 'backOut',
      },
    },
    hover: {
      rotate: 10,
      transition: {
        duration: 0.3,
        repeat: 1,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 font-sans">
      {/* Heading */}
      <div className="text-center mb-12 space-y-4">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-yellow-500 bg-clip-text text-transparent tracking-tight"
        >
          AI-Powered Recruiting Mastery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Streamline your hiring with NeedRecruiter’s AI-driven framework for faster, smarter recruiting
        </motion.p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-4  columns-1 sm:columns-2 lg:columns-3 gap-6">
        {steps.map((step, index) => {
          const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              id={step.id}
              ref={ref}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover="hover"
              className={`break-inside-avoid mb-6 ${step.height} rounded-2xl p-1 border border-gray-600/50 shadow-lg hover:border-cyan-400/30 transition-all relative overflow-hidden card flex flex-col justify-between`}
            >
              {/* Blob Background Effect (Visible on Hover) */}
              <div className="blob"></div>

              {/* Inner Content Container */}
              <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-5 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="text-gray-200 text-base leading-relaxed">{step.description}                   <button onClick={handleClick} className='text-blue-500 cursor-pointer'>More...</button>
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Styles for Blob Effect */}
      <style jsx>{`
        .card {
          position: relative;
          border-radius: 14px;
          z-index: 1;
          overflow: hidden;
        }

        .blob {
          position: absolute;
          z-index: 0;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff0000, #ff00ff, #00ff00, #00ffff);
          opacity: 0;
          filter: blur(12px);
          transition: opacity 0.3s ease;
        }

        .card:hover .blob {
          opacity: 1;
          animation: blob-bounce 5s infinite ease;
        }

        @keyframes blob-bounce {
          0% {
            transform: translate(-100%, -100%) translate3d(0, 0, 0);
          }
          25% {
            transform: translate(-100%, -100%) translate3d(100%, 0, 0);
          }
          50% {
            transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
          }
          75% {
            transform: translate(-100%, -100%) translate3d(0, 100%, 0);
          }
          100% {
            transform: translate(-100%, -100%) translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatGPTJobPrompts;