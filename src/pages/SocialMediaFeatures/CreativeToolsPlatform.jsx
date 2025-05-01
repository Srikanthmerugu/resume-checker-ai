import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { groupmen, LoacationIcon, resumeFind, resumeGirl } from '../../assets/Assets';

// Placeholder image (replace with actual asset if available)
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
    <div className="min-h-screen relative bg-[#222831] mx-auto mb-0">
      {/* Grid Background */}
      {/* <div
        className="absolute inset-0"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
        }}
      />
      Radial Gradient Overlay
      <div
        className="absolute inset-0 bg-gay-200"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 20%, #e5e7eb)',
        }}
      /> */}

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 p-20 md:grid-cols-2 gap-8 items-center">
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
        <div className="card relative w-[450px] h-[400px]  border-1 moving-border rounded-4xl border-gray-700 p-6 z-10 ml-[-50px]">
          <div className="card-overlay absolute inset-0"></div>
          <div className="relative z-20 flex items-center gap-4">
            {/* Background Text Pattern */}
            {/* <div className="absolute buttom-0 inset-0 flex items-center justify-center text-gray-500 opacity-20 text-4xl font-bold rotate-12">
              Need Rescruiter
            </div> */}
            {/* Profile Image */}
            <div className="absolute orunded[2-xl] -top-15">
              
              <img
                src="https://wpmunai.themesflat.co/wp-content/uploads/2023/09/image-13-1-12.webp"
                alt="Profile"
                className="h-90 object-cover rounded-2xl "
              />
            </div>
            {/* Card Content */}
            {/* <div className="text-white">
              <h2 className="text-xl font-semibold">Personalized card</h2>
              <p className="text-sm">Everyone is unique, so design your own</p>
              <div className="flex gap-2 mt-2">
                <span className="text-red-500">♥</span>
                <span className="text-gray-500">⬇</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Credit Card */}
        {/* <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-black rounded-lg z-20 flex items-center justify-center">
          <div className="text-white text-sm">Card Info</div>
        </div> */}

        {/* Location Pin */}
        <div className="absolute top-5 left-60 w-26 h-26 bg-white rounded-full flex items-center justify-center z-20">
          <div className="w-13 h-15  rounded-full flex items-center justify-center">
          <img src={LoacationIcon} className='animate-top-to-bottom' />
          </div>
        </div>

        {/* Orange Circle Image (Person with Laptop) */}
        <div className="absolute top-50 left-60  w-64 h-64 circle-image z-30">
          <div className="relative w-full h-full">
            <img
              src="https://wpmunai.themesflat.co/wp-content/uploads/2023/09/Image-9-13.webp"
              alt="Person with Laptop"
              className="w-full h-full object-cover rounded-full "
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
            className="space-y-6"
          >
            <p className="text-[#ff007f] text-sm font-semibold">Welcome To OnDemand Recruiting</p>
            <h2 className="text-4xl md:text-4xl font-bold text-white leading-tight">
              ALL THE{' '}
              <span className="text-[#ff007f] font-semibold">Recruiting Tools</span>{' '}
              YOU NEED IN ONE Platform
            </h2>
            <p className="text-white">
              Supercharge your hiring with our OnDemand recruiters who deliver over 300 candidates per month, with 85% qualified, helping you scale your team efficiently.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-[#ff007f] rounded-full"></span>
                <span className="text-white">Source warm candidates quickly.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-[#ff007f] rounded-full"></span>
                <span className="text-white">Scale your hiring team as needed.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-[#ff007f] rounded-full"></span>
                <span className="text-white">Save costs with flexible solutions.</span>
              </li>
            </ul>
            <button
            style={{backgroundColor:"#ff007f", border:"2px solod #ff007f"} }
            className="bg-[] ganarate-button text-white px-6 py-3 rounded-full font-medium hover:bg-[#e60074] transition">
              Generate Job Post →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreativeToolsPlatform;