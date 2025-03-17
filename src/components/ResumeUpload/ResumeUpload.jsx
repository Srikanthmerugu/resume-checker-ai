import React from "react";
import { FaUpload, FaChartLine, FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResumeUpload = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-6 mb-20">
      {/* Header Section */}
      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800">
        GET RESUME RELEVANT SCORE
      </h1>
      <p className="text-gray-700 text-lg md:text-2xl mt-4 text-center">
        Boost your job search with our AI-powered resume scoring tool.
      </p>

      {/* Steps Section */}
      <div className="w-full max-w-4xl mt-12 p-4">
        <ol className="flex flex-col md:flex-row items-center w-full text-sm md:text-base font-medium text-gray-500">
          <li className="flex flex-col items-center text-center w-full md:w-1/3 mb-6 md:mb-0">
            <FaUpload className="text-blue-600 text-4xl md:text-3xl" />
            <h3 className="font-semibold mt-2">Submit your CV</h3>
            <p className="text-sm text-gray-500">Upload your resume easily.</p>
          </li>
          <li className="flex flex-col items-center text-center w-full md:w-1/3 mb-6 md:mb-0">
            <FaChartLine className="text-yellow-500 text-4xl md:text-3xl" />
            <h3 className="font-semibold text-yellow-500 mt-2">ANALYZER</h3>
            <p className="text-sm text-gray-500">AI-powered analysis.</p>
          </li>
          <li className="flex flex-col items-center text-center w-full md:w-1/3">
            <FaClipboardCheck className="text-green-600 text-4xl md:text-3xl" />
            <h3 className="font-semibold text-green-600 mt-2">DETAIL REPORT</h3>
            <p className="text-sm text-gray-500">Get detailed insights.</p>
          </li>
        </ol>
      </div>





      {/* Upload Section */}

      <h1 className="text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-900 text- to-blue-600 bg-clip-text  text-transparent mt-20 mb-0">
        CHECK YOUR RESUME
        </h1>

        
        <div class="inline-flex items-center justify-center w-full">
    <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded-sm dark:bg-sky-900"/>
    <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
        <svg class="w-4 h-4 text-white-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
  </svg>
    </div>
</div>




      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-0 md:p-0 md:p-10">
        {/* <h3 className="text-xl font-semibold text-center text-gray-900">
          CHECK YOUR RESUME
        </h3> */}
        

        <div className="flex flex-col sm:flex-col md:flex-row items-center gap-10 mt-6">
          {/* Steps */}
          <ol className="relative text-gray-500 border-s border-gray-200 w-full md:w-1/2">
            <li className="mb-15 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white">
                <svg className="w-3.5 h-3.5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
              </span>
              <h3 className="font-medium leading-tight">Upload Resume</h3>
              {/* <p className="text-sm">Step details here</p> */}
            </li>
            <li className="mb-15 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
                <svg className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                </svg>
              </span>
              <h3 className="font-medium leading-tight">AI Analyzes It</h3>
              {/* <p className="text-sm">Step details here</p> */}
            </li>
            <li className="mb-15 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
                <svg className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                </svg>
              </span>
              <h3 className="font-medium leading-tight">Get Your Score</h3>
              {/* <p className="text-sm">Step details here</p> */}
            </li>
            <li className="ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
                <svg className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                </svg>
              </span>
              <h3 className="font-medium leading-tight">Improve with Insights</h3>
              {/* <p className="text-sm">Step details here</p> */}
            </li>
          </ol>

          {/* Upload Box */}
          <div className="flex flex-col items-center w-full md:w-1/2 text-center">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500"> Accepted files only: PDF, JPG, DOCS ( 5MB Below )</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <Link to="/result-of-resume"><button className="mt-4 w-[100%] cursor-pointer bg-pink-500 text-white px-6 py-2 rounded-lg shadow-md">
              Proceed to Check
            </button></Link>
          </div>
        </div>
      </div>


{/* text area input  */}
<div className="flex flex-col items-center w-full md:w-1/2 text-center">
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
</div>
    </div>
  );
};

export default ResumeUpload;