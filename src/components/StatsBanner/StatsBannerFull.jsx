import React from "react";
import CountUp from "react-countup";
import { FiUsers, FiSearch, FiFileText, FiSend } from "react-icons/fi";

const RecruiterFull = () => { 
  return (
    <div className="bg-gradient-to-br from-sky-800 to-sky-900 py-12 px-6 rounded-2xl shadow-2xl border border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-sky-100">
                Need Recruits?
              </span>{" "}
              We Have Talent!
            </h2>
            
            <p className="text-lg text-sky-100">
              Access our pool of <strong>30,871+ vetted Users</strong> actively seeking new opportunities across all industries.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-white">
                <FiSearch className="text-sky-300" />
                <span>Pre-screened profiles</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <FiFileText className="text-sky-300" />
                <span>Detailed skills analysis</span>
              </div>
            </div>
            
            <button className="mt-4 bg-sky-300 hover:bg-sky-200 text-sky-900 font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-lg">
              <FiSend /> Post a Job Now
            </button>
          </div>
          
          {/* Right Stats */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CountUp
                end={30871}
                duration={3}
                separator=","
                className="text-4xl font-bold bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent"
              />
              <p className="mt-2 text-sky-100">Active Candidates</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CountUp
                end={92}
                duration={3}
                suffix="%"
                className="text-4xl font-bold bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent"
              />
              <p className="mt-2 text-sky-100">Response Rate</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CountUp
                end={48}
                duration={3}
                suffix="h"
                className="text-4xl font-bold bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent"
              />
              <p className="mt-2 text-sky-100">Avg. Hire Time</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <CountUp
                end={150}
                duration={3}
                suffix="+"
                className="text-4xl font-bold bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent"
              />
              <p className="mt-2 text-sky-100">Skills Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterFull;