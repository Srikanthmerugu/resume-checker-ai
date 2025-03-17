import React, { useState } from "react";
import "./Hero.css";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { PiVideoBold } from "react-icons/pi";
import HowItWorks from "../HowItWorks/HowItWorks";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {" "}
      <div className="flex flex-col items-center gap-20  justify-center mt-40 ">
        <div className="relative flex flex-col items-center  justify-center ">
          {/* Outer Glow */}
          <div className="absolute bg-shadow-new w-[500px] h-[500px] rounded-full animate-pulse "></div>
          <div className="absolute bg-shadow-new-2 w-[400px] h-[400px] animate-pulse bg-violet-200 opacity-40 rounded-full  "></div>
          <div className="absolute bg-shadow-new-3 w-[300px] h-[300px] animate-pulse bg-purple-200 opacity-30 rounded-full  "></div>
          <div className="absolute w-[300px] h-[300px] animate-pulse bg-white opacity-60 rounded-full"></div>

          {/* Inner Circle */}
          <div className="relative  flex items-center flex-col justify-center ">
            <h1 className="text-center text-8xl px-4 font-bold text-gray-800">
              AI RESUME SCORER
            </h1>
            <p className="text-gray-700 text-4xl mt-10">
              {" "}
              Get Resume Relevent Score For Free.{" "}
            </p>
            <div className="flex items-center gap-5 mt-10">
              <Link to="/upload-resume">
                <button className="rounded-full border p-3 px-10 bg-black text-white cursor-pointer font-semibold flex items-center  border-2 hover:bg-white hover:text-black  ">
                  Start For Free{" "}
                  <span className="px-2">
                    <FaArrowRightToBracket size={25} />
                  </span>
                </button>
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-full cursor-pointer flex items-center border border-2 p-3 px-10 hover:bg-black hover:text-white cursor-pointer font-semibold"
              >
                Play Demo Video{" "}
                <span className="px-2">
                  <PiVideoBold size={25} />
                </span>{" "}
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-3xl bg-white w-[800px] text-center">
            Upload your resume and receive an instant{" "}
            <span className="text-sky-900 font-bold">AI-powered</span> relevance
            score with expert feedback
          </p>
        </div>
      </div>
      <div>
        <HowItWorks />
      </div>
      <div className="flex justify-center items-center">
        {/* Button to open the modal */}

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative w-full max-w-xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                AI Resume Scorer Demo Video
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal body with video */}
              <div className="p-4">
                <video controls className="w-full rounded-lg">
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal footer */}
              <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Close Video
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
