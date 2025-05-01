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
      className="min-h-screen  relative bg-gray-900 flex items-center justify-center p-18 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90" />
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z8DAwMgABXwA4m5d3EwAAAABJRU5ErkJggg==')] bg-repeat opacity-10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Section (Text and Buttons) */}
        <div className="text-white mb-8 md:mb-0 md:w-1/2">
          {/* Star Icon */}
          <div className="absolute animate-left-to-right top-0 -left-10 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">★</span>
          </div>
          {/* Title and Description */}
          <p className="text-sm text-gray-500 mb-2">What We Provide</p>

          <h1 className="text-3xl font-bold mb-4">
            What We Provide
            <br />
            OnDemand Recruiting
          
            Solutions
          </h1>
          <p className="text-gray-300 mb-6 max-w-md text-justify">
            Efficiency meets expertise with our OnDemand recruiting solutions,
            designed to help companies of all sizes scale their hiring teams.
            Our expert recruiters deliver over 300 qualified candidates monthly,
            saving you time and resources.
          </p>
          {/* Buttons */}
          <div className="flex md:flex-col items-start justify-center sm:flex-row gap-6">
            <div className="flex gap-5 items-center justify-center">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
              AI Resume Score

              </button>
              <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
              Job Fit Analysis

              </button>
            </div>
            <div className="flex gap-5 items-center justify-center">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
              Resume Analysis
              </button>
              <button className="bg-pink-600 flex items-center  text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
                Get Started <span className='font-bold text-2xl ml-2'><CiLogin /> </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section (Dashboard and Image) */}
        <div className="relative md:w-1/2 flex justify-end">
          {/* Dashboard Card */}
          <div className="bg-slate-800 rounded-2xl p-6 w-[600px] h-[500px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-500">Recruiters</h2>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
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
              <p className='text-slate-500 w-90 text-center mx-auto pl-3' >Upload your resume and receive an <span className='text-pink-600 font-semibold'>instant AI-Powered</span>  relevance score with expert feedback.</p>
            </div>
          </div>
          {/* Person Image */}
          <div className="absolute top-65 -left-25 w-[250px] h-[250px] bg-orange-300 rounded-full overflow-hidden">
            <img
              src={imgaeGirl}
              alt="Recruiter at Work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Explore More Button */}
        <div className="absolute top-1/2 right-4 top-10 transform translate-y-[-50%]">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
            Explore More ↑
          </button>

        </div>
      </div>
    </div>
  );
};

export default WhatWeProvide;