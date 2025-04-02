import React, { useState } from "react";

const InterviewModal = ({ questions, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null); // Tracks which accordion item is open

  // Handle clicking outside the modal content to close it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-[90%] sm:max-w-lg max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Interview Preparation</h2>

        {/* Accordion */}
        <div className="space-y-4">
          {questions && questions.length > 0 ? (
            questions.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left font-semibold text-gray-800 hover:text-indigo-600 flex justify-between items-center py-2 focus:outline-none"
                >
                  <span className="text-sm sm:text-base">{item.question}</span>
                  <span className="text-sm sm:text-base">
                    {openIndex === index ? "▲" : "▼"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-2 pl-4 text-gray-600 text-sm sm:text-base">
                    {item.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">No interview questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewModal;