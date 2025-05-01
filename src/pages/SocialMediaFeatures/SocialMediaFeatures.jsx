import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaUsers, FaSearch, FaChartLine, FaUserPlus, FaShareSquare, FaTasks 
} from 'react-icons/fa';

const SocialMediaFeatures = () => {
  const features = [
    { title: 'SOURCE TOP TALENT', icon: FaSearch },
    { title: 'MANAGE CANDIDATE PIPELINES', icon: FaUsers },
    { title: 'SCALE YOUR HIRING TEAM', icon: FaUserPlus },
    { title: 'TRACK RECRUITING METRICS', icon: FaChartLine },
    { title: 'SHARE JOB POSTINGS', icon: FaShareSquare },
    { title: 'OPTIMIZE HIRING WORKFLOWS', icon: FaTasks },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-4xl max-w-5xl mx-auto font-bold leading-tight">
            DISCOVER MORE HELPFUL RECRUITING{' '}
            <span className="text-sky-500 font-semibold">
              OnDemand Solutions
            </span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex flex-col items-center p-4 bg-purple-100 hover:bg-sky-200 rounded-2xl"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md mb-3">
                  <Icon className="text-sky-500 text-xl" />
                </div>
                <p className="text-sm font-medium text-center text-gray-800">
                  {feature.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMediaFeatures;