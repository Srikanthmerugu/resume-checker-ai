import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { candidateVideo, imgaeGirl } from '../../assets/Assets';
import { CiLogin } from 'react-icons/ci';

const WhatWeProvide = () => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="min-h-screen relative bg-gray-900 flex items-center justify-center p-4 sm:p-8 lg:p-18 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90" />
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z8DAwMgABXwA4m5d3EwAAAABJRU5ErkJggg==')] bg-repeat opacity-10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-8">
        {/* Left Section (Text and Buttons) */}
        <div className="text-white mb-6 sm:mb-8 md:mb-0 md:w-1/2">
          {/* Star Icon */}
          <div className="absolute animate-left-to-right top-0 -left-6 sm:-left-8 md:-left-10 w-10 sm:w-12 h-10 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-xl sm:text-2xl">★</span>
          </div>
          {/* Title and Description */}
          <p className="text-xs md:text-start text-center sm:text-sm text-gray-500 mb-2">What We Provide</p>
          <h1 className="text-2xl md:text-start text-center sm:text-3xl md:text-3xl font-bold mb-4">
            What We Provide
            <br />
            OnDemand Recruiting Solutions
          </h1>
          <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-justify text-sm sm:text-base">
            Efficiency meets expertise with our OnDemand recruiting solutions,
            designed to help companies of all sizes scale their hiring teams.
            Our expert recruiters deliver over 300 qualified candidates monthly,
            saving you time and resources.
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start justify- gap-4 sm:gap-6">
            <div className="flex md:flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
              <button className="bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-pink-700 transition w-full sm:w-auto text-sm sm:text-base">
                AI Resume Score
              </button>
              <button className="bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-pink-700 transition w-full sm:w-auto text-sm sm:text-base">
                Job Fit Analysis
              </button>
            </div>
            <div className="flex md:flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
              <button className="bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-pink-700 transition w-full sm:w-auto text-sm sm:text-base">
                Resume Analysis
              </button>

              <button className="bg-pink-600 flex items-center justify-center text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-pink-700 transition w-full sm:w-auto text-sm sm:text-base">
                Get Started <span className="font-bold text-lg sm:text-2xl ml-2"><CiLogin /></span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section (Dashboard and Image) */}
        <div className="relative md:w-1/2 flex justify-center md:justify-end">
          {/* Dashboard Card */}
          <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-[350px] sm:h-[450px] md:h-[500px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-slate-500">Recruiters</h2>
              <div className="flex gap-2">
                <span className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full"></span>
                <span className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-2 sm:w-3 h-2 sm:h-3 bg-red-400 rounded-full"></span>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <video
                ref={videoRef}
                autoPlay={false}
                loop
                muted
                playsInline
                controls={false}
                className="w-full h-[80%] object-cover rounded-lg"
              >
                <source src={candidateVideo} type="video/mp4" />
              </video>
              <p className="text-slate-500 text-xs sm:text-sm text-center mx-auto pl-3">
                Upload your resume and receive an <span className="text-pink-600 font-semibold">instant AI-Powered</span> relevance score with expert feedback.
              </p>
            </div>
          </div>
          {/* Person Image */}
          <div className="absolute top-40 sm:top-48 md:top-65 -left-12 sm:-left-20 md:-left-25 w-[150px] sm:w-[200px] md:w-[250px] h-[150px] sm:h-[200px] md:h-[250px] bg-orange-300 rounded-full overflow-hidden">
            <img
              src={imgaeGirl}
              alt="Recruiter at Work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Explore More Button */}
        <div className="absolute top-10 right-4 transform translate-y-[-50%]">
          {/* <button className="bg-purple-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-purple-700 transition text-sm sm:text-base">
            Explore More ↑
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WhatWeProvide;