import React from "react";
import { imageCV } from "../../assets/Assets";

const HowItWorks = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-extrabold mt-30 text-gray-800">
        HOW ITS WORKS
      </h1>
      <div className="flex items-center gap-10 px-46 my-10">
        <div
          className="w-1/2 shadow gap-10 flex items-center rounded-xl p-3"
        >
          <img src={imageCV} alt="Candidate-CV" width="100px" />
          <div className="flex items-start flex-col">
            <h1 className="text-2xl font-bold text-slate-800">Upload Resume</h1>
            <p>Upload your resume in PDF or DOC format.</p>
          </div>
        </div>
        <div className="w-1/2 flex items-center shadow rounded-2xl p-3">
          <img src={imageCV} alt="AI Analysis" width="100px" />

          <div className="flex items-start flex-col">
            <h1 className="text-2xl font-bold text-slate-800">AI Analysis</h1>
            <p>Our AI scans for keywords, structure, and ATS compatibility.</p>
          </div>
        </div>



    





      </div>
      <div className="flex items-center gap-10 px-46 my-0">
        <div
          className="w-1/2 shadow gap-10 flex items-center  rounded-xl p-3"
        >
          <img src={imageCV} alt="Candidate-CV" width="100px" />
          <div className="flex items-start flex-col">
            <h1 className="text-2xl font-bold text-slate-800">Score Calculation</h1>
            <p>Based on industry standards, we generate a resume score.</p>
          </div>
        </div>
        <div className="w-1/2 flex items-center shadow rounded-2xl p-3">
          <img src={imageCV} alt="AI Analysis" width="100px" />

          <div className="flex items-start flex-col">
            <h1 className="text-2xl font-bold text-slate-800">Resume Suggestions</h1>
            <p>Get actionable feedback to improve your resume.</p>
          </div>
        </div>



    





      </div>
    </div>
  );
};

export default HowItWorks;
