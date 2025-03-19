import React from "react";
import { AiAnalasys, analyse, imageCV, ScoreCalculator } from "../../assets/Assets";
import WidgeLine from "../WidgeLine/WidgeLine";

const HowItWorks = () => {
  return (
    <div className="px-4  md:px-10 lg:px-20">
      <h1 className="text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-900 text- to-blue-600 bg-clip-text  text-transparent mt-20 ">
        HOW IT WORKS
      </h1>

      <WidgeLine  className=""/>


      <div className="flex cursor-text mt-8 flex-col md:flex-row items-center justify-center md:gap-16">
        {/* Step 1 */}
        <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg flex items-center rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <img src={analyse} alt="Upload Resume" className="w-20 h-20" />
          <div className="ml-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              Upload Resume
            </h1>
            <p className="text-sm md:text-base">
              Upload your resume in PDF or DOC format.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg flex items-center rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <img src={AiAnalasys} alt="AI Analysis" className="w-20 h-20" />
          <div className="ml-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              AI Analysis
            </h1>
            <p className="text-sm md:text-base">
              Our AI scans for keywords, structure, and ATS compatibility.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:gap-16 md:mt-6">
        {/* Step 3 */}
        <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg flex items-center rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <img src={ScoreCalculator} alt="Score Calculation" className="w-20 h-20" />
          <div className="ml-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              Score Calculation
            </h1>
            <p className="text-sm md:text-base">
              Based on industry standards, we generate a resume score.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="w-full md:w-1/2 lg:w-1/3 shadow-lg flex items-center rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <img src={imageCV} alt="Resume Suggestions" className="w-20 h-20" />
          <div className="ml-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              Resume Suggestions
            </h1>
            <p className="text-sm md:text-base">
              Get actionable feedback to improve your resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
