import React from "react";
import {
  aiImg,
  aiImg2,
  resumeGirl,
  content12,
  imgaeGirl,
} from "../../assets/Assets";
import NewNavbar from "../navbar/NewNavbar";
import { PiVideoBold } from "react-icons/pi";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";


const NewHero = () => {
  return (
    <div className="min-h-screen relative bg-black">
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
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                AI RESUME SCORER
                <br />
                <span className="text-3xl md:text-4xl font-bold">
                  Advanced in <span className="text-[#ff007f]">Candidate</span>{" "}
                  Search
                </span>
              </h1>
            </div>
            <p className="text-gray-300 text-xl md:text-xl mb-8 font-light leading-relaxed">
              Get <span className="text-[#ff007f] font-semibold">Resume</span>{" "}
              Relevant Score For Free. <br />
              Upload your resume and receive an instant <br /> AI-Powered relevance score with expert feedback.
            </p>
            <div className="flex items-center gap-4">
              <button             style={{ backgroundColor: "#ff007f" }}
 className="flex ganarate-button bg-purple-600 text-white px-6 py-3 rounded-full items-center gap-2 hover:bg-purple-700 transition-all duration-300 shadow-lg">
                Start For Free
                <span className="pl-2">
                  <FaArrowRightToBracket size={20} />
                </span>
              </button>
              <button className="flex ganarate-button bg-gray-700 text-white px-6 py-3 rounded-full items-center gap-2 hover:bg-gray-600 transition-all duration-300 shadow-lg">
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
            {/* Card 1: Open AI Editor (Left Card - Bottom to Top) */}
            <div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 w-64 absolute top-10 -left-20 z-40 animate-bottom-to-top"
              style={{
                background:
                  "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
              }}
            >
              <div className="flex flex-col justify-between items-center mb-4">
                <span className="text-white">Open AI Editor</span>
                <div className="flex gap-2"></div>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={aiImg2}
                  alt="Profile"
                  className="w-44 h-44 border-2 border-amber-50 rounded-full mb-4"
                />
              </div>
            </div>

            {/* Card 2: AI Resume Scorer (Center Card - Top to Bottom) */}
            <div
              className="text-white flex items-center justify-center backdrop-blur-lg rounded-2xl top-45 -left-60 p-4 w-64 relative z-20 animate-top-to-bottom"
              style={{
                background:
                  "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
              }}
            >
              <div className="flex flex-col items-center">
                <h3 className="text-white relative font-semibold mb-5">
                  AI RESUME SCORER
                </h3>
                <img
                  src={imgaeGirl}
                  alt="Profile"
                  className="w-40 h-40 border-2 border-amber-50 rounded-full mb-4"
                />
                <div className="flex gap-2 mt-2">
                  <span className="text-2xl absolute left-10 bg-amber-50 rounded-full top-20">
                    📸
                  </span>
                  <span className="text-2xl absolute right-10 bg-amber-50 rounded-full top-50">
                  🪪
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Find a Candidate (Right Card - Bottom to Top) */}
            <div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 w-60 absolute -top-20 left-10 z-140 animate-bottom-to-top"
              style={{
                background:
                  "radial-gradient(circle, rgba(10, 73, 105, 1) 7%, rgba(126, 174, 207, 1) 85%)",
              }}
            >
              <div className="flex flex-col items-center z-100">
                <h3 className="text-white relative font-semibold mb-5">
                  Find a Candidate
                </h3>
                <img
                  src={resumeGirl}
                  alt="Profile"
                  className="w-44 h-44 border-2 border-amber-50 rounded-full mb-4"
                />
                <div className="flex gap-2 mt-2">
                  <span className="text-2xl absolute left-10 bg-amber-50 rounded-full top-20">
                    🗃️
                  </span>
                  <span className="text-2xl absolute right-10 bg-amber-50 rounded-full top-50">
                    🪪
                  </span>
                </div>
              </div>
            </div>

            {/* Create AI Account Button (Left to Right) */}
            {/* <div            style={{ backgroundColor: "#f93c5a" }}
 className="absolute -bottom-28 top-20  left-10 ganarate-button text-white px-4 py-2 rounded-xl  animate-left-to-right">
             <Link className="flex items-center gap-2" to="/register">Create your AI Account 
             <span className="text-2xl p-0"><CiLogin /></span></Link> 
            </div> */}
            <div
 className="absolute -bottom-28 top-80  left-10 ganarate-butto text-white px-4 py-2 rounded-xl  animate-left-to-right">             
             <Link to="/register"> <img src="https://wpmunai.themesflat.co/wp-content/uploads/2023/09/Group-7-3-12.webp" width="300px" alt="Content" /></Link>
            </div>
            <div className="absolute -top-20 -left-40 text-white px-4 py-2 rounded-xl flex items-center gap-2 animate-right-to-left">
              <img src={content12} width="150px" alt="Content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHero;