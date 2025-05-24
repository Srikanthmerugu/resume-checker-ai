import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { groupmen, LoacationIcon, resumeFind, resumeGirl } from '../../assets/Assets';
import { useNavigate } from 'react-router-dom';

// Placeholder image (replace with actual asset if available)
const personImage = 'https://via.placeholder.com/300x400?text=Recruiter+at+Work';

const CreativeToolsPlatform = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  const leftVariants = {
    hidden: { opacity: 0, x: -80 },
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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/job-post");
  };


  return (
    <div className="min-h-screen relative overflow-hidden  bg-[#222831] mx-auto mb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10 sm:py-16 md:py-20">
          {/* Left Side */}
          <motion.div
            ref={ref}
            variants={leftVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="relative w-full max-w-4xl">
              {/* Purple Card (Background with Text and Image) */}
              <div className="card relative w-full sm:w-[400px] md:w-[450px] h-[300px] sm:h-[350px] md:h-[400px] border moving-border rounded-2xl border-gray-700 p-4 sm:p-6 z-10 mx-auto md:ml-[-50px]">
                <div className="card-overlay absolute inset-0"></div>
                <div className="relative z-20 flex items-center gap-4">
                  <div className="absolute -top-10 sm:-top-12 md:-top-15">
                    <img
                      src="https://wpmunai.themesflat.co/wp-content/uploads/2023/09/image-13-1-12.webp"
                      alt="Profile"
                      className="h-64 sm:h-80 md:h-90 object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Location Pin */}
              <div className="absolute top-5 left-40 sm:left-48 md:left-60 w-16 sm:w-20 md:w-26 h-16 sm:h-20 md:h-26 bg-white rounded-full flex items-center justify-center z-20">
                <div className="w-8 sm:w-10 md:w-13 h-10 sm:h-12 md:h-15 rounded-full flex items-center justify-center">
                  <img src={LoacationIcon} className="animate-top-to-bottom w-6 sm:w-8 md:w-10" alt="Location Pin" />
                </div>
              </div>

              {/* Orange Circle Image (Person with Laptop) */}
              <div className="absolute top-40 sm:top-44 md:top-50 left-40 sm:left-48 md:left-40 lg:w-48 md:30 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 circle-image z-30">
                <div className="relative w-full h-full">
                  <img
                    src="https://wpmunai.themesflat.co/wp-content/uploads/2023/09/Image-9-13.webp"
                    alt="Person with Laptop"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            ref={ref}
            variants={rightVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-4 sm:space-y-6 text-center md:text-left"
          >
            <p className="text-[#ffc800] mt-7 md:mt-0 lg:mt-0 text-sm sm:text-base font-semibold">Welcome To OnDemand Recruiting</p>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-white leading-tight">
              ALL THE{' '}
              <span className="text-[#ffc800] font-semibold">Recruiting Tools</span>{' '}
              YOU NEED IN ONE Platform
            </h2>
            <p className="text-white text-sm sm:text-base">
              Supercharge your hiring with our OnDemand recruiters who deliver over 300 candidates per month, with 85% qualified, helping you scale your team efficiently.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <span className="w-3 h-3 bg-[#ffc800] rounded-full"></span>
                <span className="text-white text-sm sm:text-base">Source warm candidates quickly.</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <span className="w-3 h-3 bg-[#ffc800] rounded-full"></span>
                <span className="text-white text-sm sm:text-base">Scale your hiring team as needed.</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <span className="w-3 h-3 bg-[#ffc800] rounded-full"></span>
                <span className="text-white text-sm sm:text-base">Save costs with flexible solutions.</span>
              </li>
            </ul>
            <button
            onClick={handleClick}

style={{ backgroundColor: "#ffc800", border: "2px solid #ffc800" }}
              className="w-full sm:w-auto ganarate-button text-white px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-[#e60074] transition"
            >
              Generate Job Post →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreativeToolsPlatform;