import React, { useEffect, useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { PiVideoBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./Hero.css";
import { demoVideo } from "../../assets/Assets";
import StatsBanner from "../StatsBanner/StatsBannerFull";
import StatsBanners from "../StatsBanner/StatsBanners";


const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [isCentered, setIsCentered] = useState(false);
  
    useEffect(() => {
      setTimeout(() => {
        setIsCentered(true);
      }, 1000);
    }, []);

  return (
    <div className="flex flex-col items-center gap-10 justify-center md:mt-30 mt-20 px-4 sm:px-6 lg:px-8">
      <StatsBanners />
      <div className="relative flex flex-col items-center justify-center text-center">
        {/* Outer Glow */}
        <div className="absolute w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full 
                      shadow-[0_0_80px_60px_hsla(210,100%,50%,0.1)] 
                      animate-glow-slow" />
                      
      <div className="absolute w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] rounded-full 
                      shadow-[0_0_60px_40px_hsla(210,100%,50%,0.15)] 
                      animate-glow-medium delay-100" />
                      
      <div className="absolute w-[60vw] h-[60vw] max-w-[300px] max-h-[300px] rounded-full 
                      shadow-[0_0_40px_30px_hsla(210,100%,60%,0.2)] 
                      animate-glow-fast delay-200" />

      {/* Futuristic Robot Image */}
      {/* <img
        src="https://img.freepik.com/free-psd/futuristic-robot-illustration_23-2150978988.jpg"
        alt="Futuristic Robot"
        className="absolute  w-[60%] max-w-[00px] h-auto rounded-lg shadow-2xl"
      /> */}
        {/* Inner Content */}
        <div className="relative flex flex-col items-center justify-center">
        <h1
        className={`animated-h1 text-3xl md:text-5xl sm:text-5xl lg:text-8xl font-bold text-gray-800 ${
          isCentered ? "custom-slide-right" : ""
        }`}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-900 from-sky-900">
          AI RES
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-800 text- to-sky-800">
          UME{" "} SC
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-900 from-sky-900">
          ORER
        </span>
      </h1> 

      {/* Animated h1 for "Advanced Candidate Search" */}
      <h1 className="animated-h1 text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-950 text- to-sky-950 bg-clip-text text-transparent md:mb-10 md:mt-10">
        Advanced Candidate Search
      </h1>

      {/* Animated p (comes from the left) */}
      <p className="animated-p text-gray-700 text-1xl font-semibold sm:text-1xl md:text-3xl">
        Get Resume Relevant Score For Free.
      </p>
          <div className="flex flex-wrap justify-center gap-4 md:mt-8 mt-3">
            <Link to="/upload-resume">
              <button className="rounded-full cursor-pointer border-sky-900 p-3 px-6 bg-sky-900 text-white font-semibold flex items-center hover:bg-white hover:text-sky-900 hover:border-sky-900 border-2 transition">
                Start For Free
                <span className="pl-2"> 
                  <FaArrowRightToBracket size={20} />
                </span>
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-full border-2 cursor-pointer p-2 px-6 flex items-center hover:bg-sky-900 text-sky-900  border-sky-900 hover:text-white font-semibold transition"
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
          <span className="text-sky-900 font-semibold"> AI-Powered</span> relevance
          score with expert feedback.
        </p>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-medium text-gray-900">
                AI Resume Scorer Demo Video
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-lg p-2"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <video controls className="w-full rounded-lg">
                <source
                  src={demoVideo}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-white cursor-pointer bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
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
