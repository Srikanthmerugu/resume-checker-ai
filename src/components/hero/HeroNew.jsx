import React, { useState } from "react";
import {
  aiImg2,
  resumeGirl,
  content12,
  imgaeGirl,
  demoVideo,
} from "../../assets/Assets";
import NewNavbar from "../navbar/NewNavbar";
import { PiVideoBold } from "react-icons/pi";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const NewHero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload-resume");
  };






  return (
    <>
      {/* Large and tablet screen section */}
      <div className="hidden md:block min-h-screen relative bg-black">
        {/* Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
          }}
        />
        {/* Radial Gradient Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
          }}
        />
        
        <NewNavbar />
        <div className="flex items-center justify-center mt-18 p-8">
          <div className="flex w-full flex-col max-w-6xl md:flex-row items-center justify-between gap-8">
            {/* Left Section */}
            <div className="text-white animate-slide-up">
              <div className="mb-6">
                <h1 className="text-4xl md:text-4xl font-extrabold leading-tight">
                  AI RESUME SCORER
                  <br />
                  <span className="text-3xl md:text-3xl font-bold">
                    Advanced in <span className="text-[#ffc800]">Candidate</span>{" "}
                    Search
                  </span>
                </h1>
              </div>
              <p className="text-gray-300 text-xl md:text-xl mb-8 font-light leading-relaxed">
                Get <span className="text-[#ffc800] font-semibold">Resume</span>{" "}
                Relevant Score For Free. <br />
                Upload your resume and receive an instant <br /> AI-Powered relevance score with expert feedback.
              </p>
              <div className="flex items-center gap-4">
                <button
                      onClick={handleClick}

                  style={{ backgroundColor: "#ffc800" }}
                  className="flex ganarate-button bg-purple-600 text-gray-400 px-6 py-3 rounded-full items-center gap-2 hover:bg-purple-700 transition-all duration-300 shadow-lg"
                >
                  Start For Free
                  <span className="pl-2">
                    <FaArrowRightToBracket size={20} />
                  </span>
                </button>
                <button 
                                              style={{ backgroundColor: "black" }}

                  onClick={() => setIsOpen(true)}
                  className="flex ganarate-button bg-gray-700 text-white px-6 py-3 rounded-full items-center gap-2 hover:bg-gray-600 transition-all duration-300 shadow-lg"
                >
                  <span className="pr-2">
                    <PiVideoBold size={20} />
                  </span>
                  Play Demo Video
                </button>
              </div>
            </div>





            {/* Right Section */}
            <div className="border-2 border-dashed border-slate-300 w-100 rounded-2xl p-4 h-100 absolute top-40 right-20 opacity-25"></div>
            <div className="relative animate-move-images z-10000">
              {/* Card 1: Open AI Editor */}
              <div
                className="bg-white/10 backdrop-blur-lg rounded-2xl md:w-30 lg:p-4 md:-top-13 md:p-1 md:text-center lg:w-64 absolute lg:top-10 lg:-left-20 z-40 animate-bottom-to-top"
                style={{
                  background:
                    "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
                }}
              >
                <div className="flex flex-col justify-between items-center mb-4">
                  <span className="text-white">Open AI Editor</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={aiImg2}
                    alt="Profile"
                    className="lg:w-44 lg:h-44 md:w-20 md:h-20 border-2 border-amber-50 rounded-full mb-4"
                  />
                </div>
              </div>

              {/* Card 2: AI Resume Scorer */}
              <div
                className="text-white flex items-center justify-center backdrop-blur-lg rounded-2xl md:top-25 md:-left-53 md:w-30 lg:top-45 lg:-left-60 p-4 lg:w-64 relative z-20 animate-top-to-bottom"
                style={{
                  background:
                    "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
                }}
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-white text-center md:text-sm relative font-semibold lg:mb-5 md:mb-1">
                    AI RESUME SCORER
                  </h3>
                  <img
                    src={imgaeGirl}
                    alt="Profile"
                    className="lg:w-44 lg:h-44 md:w-30 md:h-20 border-2 border-amber-50 rounded-full"
                  />
                  {/* <div className="flex gap-2 mt-2">
                    <span className="text-2xl absolute left-10 bg-amber-50 rounded-full top-20">
                      📸
                    </span>
                    <span className="text-2xl absolute right-10 bg-amber-50 rounded-full top-50">
                      🪪
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Card 3: Find a Candidate */}
              <div
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:w-60 absolute md:top-0 md:w-30  md:-left-25 lg:-top-20 lg:left-10 z-140 animate-bottom-to-top"
                style={{
                  background:
                    "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
                }}
              >
                <div className="flex flex-col items-center z-100">
                  <h3 className="text-white relative text-center font-semibold mb-5">
                    Find a Candidate
                  </h3>
                  <img
                    src={resumeGirl}
                    alt="Profile"
                    className="lg:w-44 lg:h-44 md:w-30 md:h-20 border-2 border-amber-50 rounded-full mb-4"
                  />
                  {/* <div className="flex gap-2 mt-2">
                    <span className="text-2xl absolute left-10 bg-amber-50 rounded-full top-20">
                      🗃️
                    </span>
                    <span className="text-2xl absolute right-10 bg-amber-50 rounded-full top-50">
                      🪪
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Create AI Account Button */}
              <div
                className="absolute lg:-bottom-28 lg:top-80 lg:left-10 md:-left-10 md:top-50 ganarate-butto text-white px-4 py-2 rounded-xl animate-left-to-right"
              >
                <Link to="/register">
                  <img
                    src="https://wpmunai.themesflat.co/wp-content/uploads/2023/09/Group-7-3-12.webp"
                    width="300px"
                    alt="Content"
                  />
                </Link>
              </div>
              <div className="absolute lg:-top-20 lg:-left-40 md:-top-20 md:-left-50 text-white px-4 py-2 rounded-xl flex items-center gap-2 animate-right-to-left">
                <img src={content12} width="150px" alt="Content" />
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Small screen section */}
<div className="block md:hidden min-h-screen relative bg-black">
  {/* Grid Background */}
  <div
    className="absolute inset-0"
    style={{
      backgroundSize: "40px 40px",
      backgroundImage:
        "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
    }}
  />
  {/* Radial Gradient Overlay */}
  <div
    className="absolute inset-0 bg-black"
    style={{
      maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
    }}
  />

  <NewNavbar />
  <div className="flex flex-col justify-between ">
    <div className="flex items-center justify-center mt-4 p-4">
      <div className="flex w-full flex-col max-w-6xl items-center justify-between gap-8">
        {/* Left Section */}
        <div className="text-white animate-slide-up z-10 w-full">
          <div className="mb-4">
            <h1 className="text-3xl font-extrabold leading-tight">
              AI RESUME SCORER
              <br />
              <span className="text-2xl font-bold">
                Advanced in <span className="text-[#ffc800]">Candidate</span>{" "}
                Search
              </span>
            </h1>
          </div>
          <p className="text-gray-300 text-base mb-6 font-light leading-relaxed">
            Get <span className="text-[#ffc800] font-semibold">Resume</span>{" "}
            Relevant Score For Free. <br />
            Upload your resume and receive an instant AI-Powered relevance score with expert feedback.
          </p>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleClick}
              style={{ backgroundColor: "#ffc800" }}
              className="flex w-full ganarate-button text-pink-400 px-4 py-2 rounded-full items-center justify-center gap-2 hover:bg-purple-700 transition-all duration-300 shadow-lg"
            >
              Start For Free
              <FaArrowRightToBracket size={16} />
            </button>
            <button
              style={{ backgroundColor: "black" }}
              onClick={() => setIsOpen(true)}
              className="flex w-full ganarate-button bg-gray-700 text-white px-4 py-2 rounded-full items-center justify-center gap-2 hover:bg-gray-600 transition-all duration-300 shadow-lg"
            >
              <PiVideoBold size={16} />
              <span className="ml-2">Play Demo Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Cards Section - Adjusted for mobile */}
    <div className="relative h-auto w-full">
      {/* Card 1: Open AI Editor */}
      <div
        className="bg-white/10 backdrop-blur-lg rounded-xl p-3 w-28 absolute top-70 right-4 z-40 animate-bottom-to-top"
        style={{
          background: "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
        }}
      >
        <div className="flex flex-col justify-between items-center mb-2">
          <span className="text-white text-xs font-semibold">Open AI Editor</span>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={aiImg2}
            alt="Profile"
            className="w-20 h-20 border-2 border-amber-50 rounded-full"
          />
        </div>
      </div>

      {/* Card 2: AI Resume Scorer */}
      <div
        className="bg-white/10 backdrop-blur-lg rounded-xl p-3 w-28 absolute top-20 left-4 z-40 animate-bottom-to-top"
        style={{
          background: "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
        }}
      >
        <div className="flex flex-col items-center">
          <h3 className="text-white text-xs text-center font-semibold mb-2">
            AI Resume Scorer
          </h3>
          <img
            src={imgaeGirl}
            alt="Profile"
            className="w-16 h-16 border-2 border-amber-50 rounded-full"
          />
        </div>
      </div>

      {/* Card 3: Find a Candidate */}
      <div
        className="bg-white/10 backdrop-blur-lg rounded-xl p-3 w-48 absolute top-35 left-28 z-40 animate-bottom-to-top"
        style={{
          background: "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
        }}
      >
        <div className="flex flex-col items-center">
          <h3 className="text-white text-xs text-center font-semibold mb-2">
            Find a Candidate
          </h3>
          <img
            src={resumeGirl}
            alt="Profile"
            className="w-36 h-36 border-2 border-amber-50 rounded-full"
          />
        </div>
      </div>

      {/* Create AI Account Button */}
      <div className="absolute top-90  left-10  text-white animate-left-to-right">
        <Link to="/register">
          <img
            src="https://wpmunai.themesflat.co/wp-content/uploads/2023/09/Group-7-3-12.webp"
            width="180px"
            alt="Content"
          />
        </Link>
      </div>
      
      <div className="absolute top-4 right-4 text-white px-2 py-1 rounded-xl flex items-center gap-2 animate-right-to-left">
        <img src={content12} width="130px" alt="Content" />
      </div>
    </div>
  </div>
</div>

      {/* Modal - Moved outside of main sections */}
      {isOpen && (
        <div className="fixed inset-0 z-1000050 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
              <h3 className="text-xl font-medium text-gray-900">
                AI Resume Scorer Demo Video
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer rounded-lg p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
    
            {/* Modal Body */}
            <div className="p-0">
              <video 
                controls 
                autoPlay
                className="w-full"
              >
                <source
                  src={demoVideo}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
    
            {/* Modal Footer */}
            <div className="flex items-center p-4 border-t bg-gray-100">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-white cursor-pointer bg-[#ffc800] hover:bg-[#ffc800e7] font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300"
              >
                Need Recruiter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewHero;