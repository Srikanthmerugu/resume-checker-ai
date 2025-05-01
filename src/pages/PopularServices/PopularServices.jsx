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
    <div className="min-h-screen relative bg-gray-100 p-8">
      {/* Grid Background */}
      <div
        className="absolute inset-0 mt-20"
        style={{
          backgroundSize: '40px 40px',
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
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-500 mb-2">How It Works</p>
          <h1 className="text-4xl font-bold text-gray-800">
            Why Choose <span className="text-[#ff007f] font-bold">Need Recruiter</span>
          </h1>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 flex items-center gap-4"
          >
            <div className="text-[#ff007f] text-2xl">⏰</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Save Time and Effort</h3>
              <p className="text-sm text-gray-600">
                Generate content in seconds by using AI to generate unique captions and images.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 flex items-center gap-4"
          >
            <div className="text-[#ff007f] text-2xl">✍️</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Eliminate Writer's Block</h3>
              <p className="text-sm text-gray-600">
                Enhance strong AI proofread clean and turn them into engaging posts instantly.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 flex items-center gap-4"
          >
            <div className="text-[#ff007f] text-2xl">📅</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Post Consistently</h3>
              <p className="text-sm text-gray-600">
                Schedule social media posts consistently and keep your accounts active without the hassle.
              </p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 flex items-center gap-4"
          >
            <div className="text-[#ff007f] text-2xl">✂️</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Eliminate Your Posts</h3>
              <p className="text-sm text-gray-600">
                Create custom posts for each social media platform and consistency for your social media.
              </p>
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 flex items-center gap-4"
          >
            <div className="text-[#ff007f] text-2xl">⚙️</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Summarize & Simplify</h3>
              <p className="text-sm text-gray-600">
                Summarize and amplify your posts to enhance content readability.
              </p>
            </div>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 flex items-center gap-4"
          > 
            <div className="text-[#ff007f] text-2xl">📦</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Repurpose Your Content</h3>
              <p className="text-sm text-gray-600">
                Turn past content into compelling posts that boost conversions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PopularServices;