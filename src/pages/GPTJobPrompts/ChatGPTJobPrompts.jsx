import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaFileAlt, FaPen, FaQuestionCircle, FaMoneyBillWave, 
  FaLinkedin, FaEnvelope, FaUserTie, FaMicrophone, FaRoute, FaBullhorn 
} from 'react-icons/fa';

const ChatGPTJobPrompts = () => {
  const steps = [
    {
      title: 'Resume Optimization',
      description: 'Analyze my resume and provide tailored improvements to align it with a [job title] role at [company]. Highlight skills, achievements, and keywords from the job description. Ensure it passes ATS screening and appeals to hiring managers.',
      icon: FaFileAlt,
      id:"Optimization"
    },
    {
      title: 'Cover Letter Creation',
      description: 'Craft a compelling, personalized cover letter for a [job title] position at [company]. Emphasize my experience in [industry/skill] and how it aligns with the company\'s values and mission. Make it concise, engaging, and unique.',
      icon: FaPen,
    },
    {
      title: 'Interview Questions',
      description: 'Generate a list of the top 20 interview questions for a [job title] role at [company]. Include behavioral, technical, and industry-specific questions. Provide model answers tailored to my experience in [industry/skill].',
      icon: FaQuestionCircle,
    },
    {
      title: 'Salary Negotiation Strategy',
      description: 'Help me craft a strong salary negotiation strategy for a [job title] role at [company]. Consider industry benchmarks, my experience level in [industry], and how to confidently communicate my value without kindizing the offer.',
      icon: FaMoneyBillWave,
    },
    {
      title: 'LinkedIn Profile Enhancement',
      description: 'Revise my LinkedIn profile summary and experience sections to optimize for [job title] positions at [company]. Focus on SEO keywords, achievements, and storytelling to attract recruiters in [industry].',
      icon: FaLinkedin,
    },
    {
      title: 'Networking Outreach Messages',
      description: 'Write a professional yet friendly LinkedIn message to connect with [job title] professionals at [company]. My goal is to build rapport and learn about potential opportunities without seeming too transactional.',
      icon: FaEnvelope,
    },
    {
      title: 'Personal Branding Strategy',
      description: 'Develop a personal branding strategy for me as a [job title] in [industry]. Include content ideas for LinkedIn, networking tactics, and ways to position myself as an expert to attract top recruiters.',
      icon: FaUserTie,
    },
    {
      title: 'Mock Interview',
      description: 'Act as a hiring manager for a [job title] role at [company] and conduct a mock interview. Ask 5 behavioral and 5 technical questions. After my responses, provide feedback on clarity, impact, and areas for improvement.',
      icon: FaMicrophone,
    },
    {
      title: 'Career Change Guidance',
      description: 'I\'m transitioning from [current industry] to [new industry]. Develop a roadmap to position my experience effectively for a [job title] role at [company], including skill gaps, networking tips, and resume adjustments.',
      icon: FaRoute,
    },
    {
      title: 'Elevator Pitch Creation',
      description: 'Help me craft a compelling 30-second elevator pitch for a [job title] role at [company]. Ensure it highlights my unique value, key achievements, and why I\'m the perfect fit in a confident yet natural tone.',
      icon: FaBullhorn,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const getCardVariants = (isEven) => ({
    hidden: { 
      opacity: 0, 
      x: isEven ? -100 : 100, // Left cards from left, right cards from right
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        mass: 0.5,
      },
    },
  });

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: {
        duration: 1.5,
        ease: [0.6, 0.01, -0.05, 0.9],
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <div className='bg-background'>
  <div className="min-h-screen   py-24 font-sans">
      <div className="text-center mb-12 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-sky-800 bg-clip-text text-transparent tracking-tight"
        >
          AI-Powered Career Mastery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto"
        >
          Transform your job search with our 10-step optimization framework powered by ChatGPT intelligence
        </motion.p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div 
          className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-cyan-500/30 to-blue-600/30 rounded-full -translate-x-1/2"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative space-y-12"
        >
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const { ref, inView } = useInView({ threshold: 0.25 });
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                ref={ref}
                id='Optimization'
                variants={getCardVariants(isEven)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className={`group relative flex ${isEven ? 'justify-start' : 'justify-end'}`}
              >
                {/* Glowing dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <div className="absolute -inset-2 bg-cyan-400/30 rounded-full blur-lg group-hover:bg-blue-400/40 transition-all" />
                  <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-xl" />
                </div>

                {/* Content card */}
                <div className={`w-full md:w-[45%] p-6 rounded-3xl bg-sky-800 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-cyan-400/30 transition-all ${isEven ? 'mr-2' : 'ml-2'}`}>
                  <div className="flex gap-6 items-start mb-6">
                    <motion.div
                      variants={floatingVariants}
                      animate={inView ? 'float' : 'hidden'}
                      className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-cyan-400 font-mono mb-1">Step {index + 1}</div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sky-50 leading-relaxed">
                    {step.description}
                  </p>
                  <a href='#' className='text-blue-400'>Read more...</a>
                </div>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    className={`absolute ${isEven ? 'right-[50%] top-[50%]' : 'left-[50%] top-[50%]'} top-ful -translate-y-4`}
                  >
                    <svg
                      width="60"
                      height="30"
                      viewBox="0 0 24 24"
                      className={`text-cyan-500 transform ${isEven ? 'rotate-180' : '-rotate-0'}`}
                    >
                      <path
                        fill="currentColor"
                        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
    </div>
  
  );
};

export default ChatGPTJobPrompts;