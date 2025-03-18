import React from "react";
import { useLocation } from "react-router-dom";

const ResultOfResume = () => {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) {
    return <div className="text-center flex items-center h-[100%] text-red-500 mt-10"><h1>No data found. Please upload your resume again.</h1></div>;
  }

  // Function to determine border color based on validation status
  const getBorderColor = (status) => {
    switch (status.toLowerCase()) {
      case "valid":
        return "border-l-green-500";
      case "warning":
        return "border-l-yellow-500";
      case "invalid":
        return "border-l-red-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="min-h-screen h-[100%]  p-6 md:p-10 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        Resume Analysis Results
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {Object.entries(result).map(([key, value], index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${getBorderColor(
              value.status
            )}`}
          >
            <h2 className="text-xl font-semibold text-gray-700 capitalize">
              {key.replace(/_/g, " ")}
            </h2>
            <p className="mt-2 text-gray-600">{value.message}</p>
            {value.suggestions && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Suggestions:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {value.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultOfResume;