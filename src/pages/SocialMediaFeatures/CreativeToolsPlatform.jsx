import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { groupmen, resumeFind, resumegirl } from '../../assets/Assets';

// Placeholder image (you should replace this with an actual image asset)
const personImage = 'https://via.placeholder.com/300x400?text=Recruiter+at+Work';

const CreativeToolsPlatform = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-white w-[90%] mx-auto mb-10 border-sky-500 rounded-full py-12 border-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <motion.div
            ref={ref}
            variants={leftVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Background Card */}
            {/* <div className="bg-sky-200 rounded-3xl p-6 relative z-10">
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <FaHeart className="text-white text-sm" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <FaShareAlt className="text-white text-sm" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800">RECRUITING DASHBOARD</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Scale your hiring with our OnDemand solutions
                </p>
                <div className="mt-4 bg-gray-100 rounded-lg p-3">
                  <p className="text-sm font-medium">140 Placements</p>
                  <p className="text-xs text-gray-500">In 3 Months</p>
                </div>
              </div>
            </div> */}
            {/* Person Image */}
            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-64 h-64 bg-yellow-400 rounded-full flex items-center justify-center">
                  <img
                    src={personImage}
                    alt="Recruiter at work"
                    className="w-48 h-64 object-cover"
                  />
                  <img src={resumegirl} />
                </div>
                <div className="absolute top-0 left-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📍</span>
                </div>
              </div>
            </div> */}


<div className='resume-images'>

<img className='group-img' src={groupmen} />
<img className='first-img' src={resumegirl} />
<img className='secoundnd-img' src={resumeFind} />

</div>







          </motion.div>

          {/* Right Side */}
          <motion.div
            ref={ref}
            variants={rightVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <p className="text-sky-500 text-sm font-semibold">Welcome To OnDemand Recruiting</p>
            <h2 className="text-4xl md:text-4xl font-bold leading-tight">
              ALL THE{' '}
              <span className="text-sky-500 font-semibold">Recruiting Tools</span>{' '}
              YOU NEED IN ONE Platform
            </h2>
            <p className="text-gray-500">
              Supercharge your hiring with our OnDemand recruiters who deliver over 300 candidates per month, with 85% qualified, helping you scale your team efficiently.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
                <span className="text-gray-500">Source warm candidates quickly.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
                <span className="text-gray-500">Scale your hiring team as needed.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
                <span className="text-gray-500">Save costs with flexible solutions.</span>
              </li>
            </ul>
            <button className="bg-sky-600 text-white px-6 py-3 rounded-full font-medium hover:bg-sky-700 transition">
              Generate Job Post →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreativeToolsPlatform;