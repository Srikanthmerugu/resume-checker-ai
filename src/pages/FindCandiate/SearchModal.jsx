import React from "react";
import { toast } from "react-toastify";

const SearchModal = ({ searchQuery, searchUrl, setShowModal, handleSave }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Search Query
          </h2>
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">
              Copy and use this search string to find candidates:
            </p>
            <div className="relative">
              <textarea
                value={searchQuery}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 pr-16 resize-none"
                rows={6}
              />
              <button
                onClick={() => handleCopy(searchQuery)}
                className="absolute right-2 top-2 p-2 text-white bg-gray-400 hover:bg-gray-200 rounded-lg cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-black hover:text-black"
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
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Save Query
            </button>
            <button
              onClick={() => window.open(searchUrl, "_blank")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Open in Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;