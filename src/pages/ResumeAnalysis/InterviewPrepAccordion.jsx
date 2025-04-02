import React, { useState } from "react";

const InterviewPrepAccordion = ({ qnaData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {qnaData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between cursor-pointer items-center p-4 text-left focus:outline-none bg-gradient-to-r from-indigo-50 to-blue-50 hover:bg-indigo-100 transition-colors duration-200"
          >
            <span className="text-sm md:text-base font-semibold text-gray-800 flex-1 pr-4">
              {item.question}
            </span>
            <svg
              className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 p-4" : "max-h-0 p-0"
            } overflow-hidden`}
          >
            <p className="text-gray-700 text-sm md:text-base">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewPrepAccordion;