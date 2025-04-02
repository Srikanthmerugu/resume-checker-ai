import React from "react";
import { toast } from "react-toastify";

const SavedQueries = ({ savedQueries }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="md:w-2/5 bg-blue-50 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Saved Queries
      </h2>
      {savedQueries.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved queries yet</p>
      ) : (
        <div className="space-y-3">
          {savedQueries.map((query, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 p-3 rounded-lg"
            >
              <p className="text-sm text-gray-600 truncate pr-8">{query}</p>
              <button
                onClick={() => handleCopy(query)}
                className="absolute right-2 top-1/2 -translate-y-1/2 transition-opacity p-1.5 rounded-md hover:bg-gray-200 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedQueries;