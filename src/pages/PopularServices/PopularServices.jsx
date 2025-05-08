import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PopularServices = () => {
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
    <div className="min-h-screen relative bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Grid Background */}
      <div
        className="absolute inset-0 mt-20"
        style={{
          backgroundSize: '30px 30px sm:40px 40px',
          backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
        }}
      />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <p className="text-xs sm:text-sm text-gray-500 mb-2">How It Works</p>
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800">
            Why Choose <span className="text-[#ffc800] font-bold">Need Recruiter</span>
          </h1>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">⏰</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Rapid Recruitment</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Deliver contract recruiters within 48 hours and a pipeline of candidates in 7 days or less.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">👥</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Scale Your Hiring</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Flexibly scale your hiring team up or down with month-to-month commitments.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">🎯</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Source Quality Candidates</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Access over 300 qualified candidates monthly through expert sourcing solutions.
              </p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">💰</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Cost-Effective Solutions</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Save significant costs compared to traditional recruiting options with agile solutions.
              </p>
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">🤝</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Expert Recruiter Network</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Leverage a vetted network of recruiters to augment your internal hiring team.
              </p>
            </div>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">📈</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Predictable Hiring Engine</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Build a predictable and scalable recruiting process tailored to your needs.
              </p>
            </div>
          </motion.div>

          {/* Card 7 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">🔍</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Targeted Candidate Outreach</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Engage warm candidates through proven sourcing strategies for better results.
              </p>
            </div>
          </motion.div>

          {/* Card 8 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">📅</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Flexible Scheduling</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Schedule recruiting support when you need it, with no long-term commitments.
              </p>
            </div>
          </motion.div>

          {/* Card 9 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-md border border-gray-200 flex items-center gap-3 sm:gap-4"
          >
            <div className="text-[#ffc800] text-xl sm:text-2xl">📊</div>
            <div>
              <h3 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800">Data-Driven Insights</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">
                Use data-driven strategies to optimize your hiring process and improve outcomes.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PopularServices;