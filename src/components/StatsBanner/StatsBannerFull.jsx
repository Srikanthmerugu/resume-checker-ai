import React from "react";
import CountUp from "react-countup";
import { FiUsers, FiSearch, FiFileText, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import StatsBanner from "./StatsBanners";

const RecruiterFull = () => { 
  return (
    <div className="bg-gradient-to-br from-black-800 bg-black to-black-900 py-12 px-4 sm:px-6 shadow-2xl border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-sky-100">
                Need Recruits?
              </span>{" "}
              We Have Talent!
            </h2>
            
            <p className="text-base sm:text-lg text-sky-100">
              Access our pool of <strong>30,871+ vetted Users</strong> actively seeking new opportunities across all industries.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 text-white text-sm sm:text-base">
                <FiSearch className="text-sky-300" />
                <span>Pre-screened profiles</span>
              </div>
              <div className="flex items-center space-x-2 text-white text-sm sm:text-base">
                <FiFileText className="text-sky-300" />
                <span>Detailed skills analysis</span>
              </div>
            </div>
          </div>
          
          {/* Right Stats */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-[#23282D] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center">
              <Link to="/job-post" className="w-full">
                <button className="w-full lg:text-sm bg-gray-900 hover:bg-sky-900 text-sky-50 cursor-pointer font-bold py-2 sm:py-3 lg:px-4 sm:px-6 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg text-sm sm:text-base">
                  <FiSend /> Post a Job Now
                </button>
              </Link>
            </div>
            
            <div className="bg-[#23282D] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CountUp
                end={92}
                duration={3}
                suffix="%"
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent"
              />
              <p className="mt-1 sm:mt-2 text-sky-100 text-sm sm:text-base">Response Rate</p>
            </div>
            
            <div className="bg-[#23282D] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CountUp
                end={48}
                duration={3}
                suffix="h"
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent"
              />
              <p className="mt-1 sm:mt-2 text-sky-100 text-sm sm:text-base">Avg. Hire Time</p>
            </div>
            
            <div className="bg-[#23282D] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              {/* <CountUp
                end={150}
                duration={3}
                suffix="+"
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent"
              />
              <p className="mt-1 sm:mt-2 text-sky-100 text-sm sm:text-base">Skills Categories</p> */}
              <StatsBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterFull;