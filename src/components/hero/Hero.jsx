import React, { useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { PiVideoBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-10 justify-center md:mt-40 mt-10 px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center justify-center text-center">
        {/* Outer Glow */}
        <div className="absolute bg-shadow-new w-80 sm:w-[400px] md:w-[500px] h-80 sm:h-[400px] md:h-[500px] rounded-full animate-pulse"></div>
        <div className="absolute bg-shadow-new-2 w-64 sm:w-[320px] md:w-[400px] h-64 sm:h-[320px] md:h-[400px] bg-violet-200 opacity-40 rounded-full animate-pulse"></div>
        <div className="absolute bg-shadow-new-3 w-48 sm:w-[250px] md:w-[300px] h-48 sm:h-[250px] md:h-[300px] bg-purple-200 opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute w-48 sm:w-[250px] md:w-[300px] h-48 sm:h-[250px] md:h-[300px] bg-white opacity-60 rounded-full animate-pulse"></div>

        {/* Inner Content */}
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl sm:text-5xl  lg:text-8xl font-bold text-gray-800">  
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-sky-600">AI RES</span>
           <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-400">UME {" "} SCORER</span>
          </h1>
          <p className="text-gray-700 text-1xl  font-semibold sm:text-1xl md:text-3xl md:mt-6">
            Get Resume Relevant Score For Free.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:mt-8 mt-3">
            <Link to="/upload-resume">
              <button className="rounded-full cursor-pointer border-2 p-3 px-6 bg-black text-white font-semibold flex items-center hover:bg-white hover:text-black transition">
                Start For Free
                <span className="pl-2">
                  <FaArrowRightToBracket size={20} />
                </span>
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-full border-2 cursor-pointer p-3 px-6 flex items-center hover:bg-black hover:text-white font-semibold transition"
            >
              Play Demo Video
              <span className="pl-2">
                <PiVideoBold size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center relative px-4 md:mt-25 text-center">
        <p className="text-lg sm:text-2xl md:text-2xl  max-w-3xl">
          Upload your resume and receive an instant
          <span className="text-sky-900 font-semibold"> AI-powered</span> relevance
          score with expert feedback.
        </p>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-medium text-gray-900">
                AI Resume Scorer Demo Video
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:bg-gray-200 rounded-lg p-2"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <video controls className="w-full rounded-lg">
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
