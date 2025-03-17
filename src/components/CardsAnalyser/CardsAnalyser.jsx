import React from 'react';
import { analyse, personalization, relevant, resumeScore, SmartSkils } from '../../assets/Assets';
import WidgeLine from '../WidgeLine/WidgeLine';

const CardsAnalyser = () => {
  return (
    <>
      <h1 className="text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-900 text- to-blue-600 bg-clip-text  text-transparent mt-20 ">
        RESUME ANALYSIS & OPTIMIZATION
      </h1>
       <WidgeLine  className="mb-8"/>
      
      <div className="container  cursor-text mx-auto flex flex-wrap justify-center gap-10 my-10">
        {/** First Row */}
        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={analyse} alt="Candidate-CV" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">Resume Analysis</h1>
          <p className="text-center text-gray-600">
            Get noticed by recruiters and surpass the Applicant Tracking System (ATS) using our job-specific feedback.
          </p>
        </div>

        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={SmartSkils} alt="AI Analysis" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">Smart Skill Scoring</h1>
          <p className="text-center text-gray-600">
            AI-powered skill extraction highlights the most relevant skills, keywords, and industry buzzwords.
          </p>
        </div>

        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={relevant} alt="AI Analysis" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">Relevance Score</h1>
          <p className="text-center text-gray-600">
            Beyond just keyword matching—we analyze your experience, skills, education, and achievements.
          </p>
        </div>

        {/** Second Row */}
        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={personalization} alt="Candidate-CV" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">Personalized Insights</h1>
          <p className="text-center text-gray-600">
            Receive AI-driven feedback tailored to improve your resume for the job market.
          </p>
        </div>

        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={resumeScore} alt="AI Analysis" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">AI Resume Score</h1>
          <p className="text-center text-gray-600">
            Get a real-time score and suggestions to improve your resume’s effectiveness.
          </p>
        </div>

        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={analyse} alt="AI Analysis" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">Job Fit Analysis</h1>
          <p className="text-center text-gray-600">
            Compare your resume with job descriptions to see how well you fit.
          </p>
        </div>

        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={analyse} alt="AI Analysis" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">Improvement Tips</h1>
          <p className="text-center text-gray-600">
            Receive step-by-step recommendations on structure, wording, your resume’s effectiveness.
          </p>
        </div>

        <div className="w-80 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center rounded-2xl flex-col p-5 h-[350px] gap-5 bg-white hover:bg-gray-50">
          <img src={analyse} alt="AI Analysis" width="150px" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-2xl font-bold text-slate-800">Benchmarking</h1>
          <p className="text-center text-gray-600">
            Our AI evaluates your resume against top industry standards, helping you compete with the best candidates.
          </p>
        </div>
      </div>
    </>
  );
};

export default CardsAnalyser;