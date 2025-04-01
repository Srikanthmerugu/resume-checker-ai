import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import WidgeLine from "../../components/WidgeLine/WidgeLine";
import InterviewPrepAccordion from "./InterviewPrepAccordion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultOfResume = () => {
  const location = useLocation();
  const { result: rawResult } = location.state || {};
  const [isCopied, setIsCopied] = useState(false);

  // Normalize the response data structure to handle both formats
  const result = rawResult ? {
    // Handle both direct skills and nested job_description formats
    "must-have-skills": rawResult["must-have-skills"] || rawResult.job_description?.must_have_skills,
    "good-to-have-skills": rawResult["good-to-have-skills"] || rawResult.job_description?.good_to_have_skills,
    "desired-profile": rawResult["desired-profile"] || rawResult.job_description?.desired_profile,
    "interviewqna": rawResult.interviewqna || rawResult.interview_questions,
    "overall-match-score": {
      "must-have-skills": rawResult["overall-match-score"]?.["must-have-skills"] || rawResult.overall_match_score?.must_have_skills,
      "good-to-have-skills": rawResult["overall-match-score"]?.["good-to-have-skills"] || rawResult.overall_match_score?.good_to_have_skills,
      "desired-profile": rawResult["overall-match-score"]?.["desired-profile"] || rawResult.overall_match_score?.desired_profile
    }
  } : null;

  const copyToClipboard = () => {
    if (!result) return;

    const textToCopy = [];

    if (result["must-have-skills"]) {
      textToCopy.push("🔹 Must-Have Skills:");
      result["must-have-skills"].forEach((skill, index) => {
        textToCopy.push(
          `${index + 1}. ${skill.skill_name} - ${skill.match_percentage}\n${skill.explanation}`
        );
        if (skill.suggestions) {
          textToCopy.push("   Suggestions:");
          skill.suggestions.forEach((suggestion) => {
            textToCopy.push(`   - ${suggestion}`);
          });
        }
        textToCopy.push("");
      });
    }

    if (result["good-to-have-skills"]) {
      textToCopy.push("🔹 Good-to-Have Skills:");
      result["good-to-have-skills"].forEach((skill, index) => {
        textToCopy.push(
          `${index + 1}. ${skill.skill_name} - ${skill.match_percentage}\n${skill.explanation}`
        );
        if (skill.suggestions) {
          textToCopy.push("   Suggestions:");
          skill.suggestions.forEach((suggestion) => {
            textToCopy.push(`   - ${suggestion}`);
          });
        }
        textToCopy.push("");
      });
    }

    if (result["desired-profile"]) {
      textToCopy.push("🔹 Desired Profile:");
      result["desired-profile"].forEach((item, index) => {
        textToCopy.push(
          `${index + 1}. ${item.skill_name} - ${item.match_percentage}\n${item.explanation}`
        );
      });
      textToCopy.push("");
    }

    if (result["overall-match-score"]) {
      textToCopy.push("🔹 Overall Match Score:");
      Object.entries(result["overall-match-score"]).forEach(([key, value]) => {
        if (value) { // Only add if value exists
          textToCopy.push(`${key.replace(/-/g, " ")}: ${value}`);
        }
      });
    }

    const formattedText = textToCopy.join("\n");

    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  if (!result) {
    return (
      <div className="flex p-5 gap-4 flex-col items-center justify-center h-screen bg-white-900">
        <div><span className="loader"></span></div>
        <h1 className="text-xl text-center md:text-2xl font-bold mt-5 text-slate-800">
          No data found. Please upload your resume again.
        </h1>
      </div>
    );
  }

  const getColor = (percentage) => {
    const value = parseInt(percentage);
    if (value >= 80) return "bg-green-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Chart Data for Skills (Including all categories)
  const skillChartData = {
    labels: [
      ...(result["must-have-skills"] || []).map((s) => s.skill_name),
      ...(result["good-to-have-skills"] || []).map((s) => s.skill_name),
      ...(result["desired-profile"] || []).map((s) => s.skill_name),
    ],
    datasets: [
      {
        label: "Match Percentage",
        data: [
          ...(result["must-have-skills"] || []).map((s) => parseInt(s.match_percentage)),
          ...(result["good-to-have-skills"] || []).map((s) => parseInt(s.match_percentage)),
          ...(result["desired-profile"] || []).map((s) => parseInt(s.match_percentage)),
        ],
        backgroundColor: [
          ...(result["must-have-skills"] || []).map((s) => getColor(s.match_percentage)),
          ...(result["good-to-have-skills"] || []).map((s) => getColor(s.match_percentage)),
          ...(result["desired-profile"] || []).map((s) => getColor(s.match_percentage)),
        ],
        borderColor: [
          ...(result["must-have-skills"] || []).map((s) => getColor(s.match_percentage)),
          ...(result["good-to-have-skills"] || []).map((s) => getColor(s.match_percentage)),
          ...(result["desired-profile"] || []).map((s) => getColor(s.match_percentage)),
        ],
        borderWidth: 1,
      },
    ],
  };

  const skillChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Skills Match Overview" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "Percentage (%)" },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="min-h-screen px-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <h1 className="text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-900 to-blue-600 bg-clip-text mb-0 text-transparent md:mt-10">
          Resume Analysis Results
        </h1>
        <WidgeLine />

        {/* Must-Have Skills */}
        {result["must-have-skills"] && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2">Must-Have Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result["must-have-skills"].map((skill, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-600"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{skill.skill_name}</h3>
                    <span className={`${getColor(skill.match_percentage)} text-white px-3 py-1 rounded-full text-sm`}>
                      {skill.match_percentage}
                    </span>
                  </div>
                  <p className="text-gray-700">{skill.explanation}</p>
                  {skill.suggestions && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-800 mb-2">Suggestions:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {skill.suggestions.map((suggestion, i) => (
                          <li key={i}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Good-to-Have Skills */}
        {result["good-to-have-skills"] && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">Good-to-Have Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result["good-to-have-skills"].map((skill, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{skill.skill_name}</h3>
                    <span className={`${getColor(skill.match_percentage)} text-white px-3 py-1 rounded-full text-sm`}>
                      {skill.match_percentage}
                    </span>
                  </div>
                  <p className="text-gray-700">{skill.explanation}</p>
                  {skill.suggestions && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-800 mb-2">Suggestions:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {skill.suggestions.map((suggestion, i) => (
                          <li key={i}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desired Profile */}
        {result["desired-profile"] && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-teal-500 pb-2">Desired Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result["desired-profile"].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-teal-600"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{item.skill_name}</h3>
                    <span className={`${getColor(item.match_percentage)} text-white px-3 py-1 rounded-full text-sm`}>
                      {item.match_percentage}
                    </span>
                  </div>
                  <p className="text-gray-700">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overall Match Score with Charts */}
        {result["overall-match-score"] && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-6">Overall Match Score</h2>
            <div className="space-y-8">
              {/* Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {Object.entries(result["overall-match-score"]).map(([key, value]) => (
                  value && (
                    <div
                      key={key}
                      className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-lg shadow-md text-center"
                    >
                      <h3 className="font-semibold text-gray-700 capitalize text-sm md:text-base">{key.replace(/-/g, " ")}</h3>
                      <p className="text-3xl font-extrabold text-indigo-600 mt-2">{value}</p>
                      <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 transition-all duration-500"
                          style={{ width: `${parseInt(value)}%` }}
                        />
                      </div>
                    </div>
                  )
                ))}
              </div>
              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-1 md:h-[500px] gap-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Bar data={skillChartData} options={skillChartOptions} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prepare for Interview Section */}
        {result.interviewqna && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-purple-500 pb-2">
              Interview Questions and Answers
            </h2>
            <InterviewPrepAccordion qnaData={result.interviewqna} />
          </div>
        )}  

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="fixed bottom-6 right-6 bg-white text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-md transition-colors duration-300"
        >
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path fillRule="evenodd" d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" clipRule="evenodd"/>
          </svg>
          {isCopied ? "Copied!" : "Copy Results"}
        </button>
      </div>
    </div>
  );
};

export default ResultOfResume;