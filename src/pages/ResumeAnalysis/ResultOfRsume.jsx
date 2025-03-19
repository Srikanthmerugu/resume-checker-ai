import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import WidgeLine from "../../components/WidgeLine/WidgeLine";

const ResultOfResume = () => {
  const location = useLocation();
  const { result } = location.state || {};
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (!result) return;

    const textToCopy = [];

    // Must-Have Skills
    if (result["must-have-skills"]) {
      textToCopy.push("🔹 Must-Have Skills:");
      result["must-have-skills"].forEach((skill, index) => {
        textToCopy.push(
          `${index + 1}. ${skill.skill_name} - ${skill.match_percentage}%\n${skill.explanation}`
        );
        if (skill.suggestions) {
          textToCopy.push("   Suggestions:");
          skill.suggestions.forEach((suggestion) => {
            textToCopy.push(`   - ${suggestion}`);
          });
        }
        textToCopy.push(""); // Add a new line for spacing
      });
    }

    // Good-to-Have Skills
    if (result["good-to-have-skills"]) {
      textToCopy.push("🔹 Good-to-Have Skills:");
      result["good-to-have-skills"].forEach((skill, index) => {
        textToCopy.push(
          `${index + 1}. ${skill.skill_name} - ${skill.match_percentage}%\n${skill.explanation}`
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

    // Desired Profile
    if (result["desired-profile"]) {
      textToCopy.push("🔹 Desired Profile:");
      textToCopy.push(result["desired-profile"].join("\n"));
      textToCopy.push("");
    }

    // Overall Match Score
    if (result["overall-match-score"]) {
      textToCopy.push("🔹 Overall Match Score:");
      Object.entries(result["overall-match-score"]).forEach(([key, value]) => {
        textToCopy.push(`${key.replace(/-/g, " ")}: ${value}`);
      });
    }

    // Join all parts into a single text string
    const formattedText = textToCopy.join("\n");

    // Copy to Clipboard
    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  if (!result) {
    return React.createElement(
      "div",
      { className: "flex items-center justify-center h-screen bg-gray-50" },
      React.createElement("h1", { className: "text-2xl text-red-500" }, "No data found. Please upload your resume again.")
    );
  }

  const getBorderColor = (percentage) => {
    const value = parseInt(percentage);
    if (value >= 80) return "border-l-green-500";
    if (value >= 50) return "border-l-yellow-500";
    return "border-l-red-500";
  };

  const renderSection = (title, items) =>
    React.createElement(
      "div",
      { className: "space-y-4 mb-10" },
      React.createElement("h2", { className: "text-2xl font-bold mb-4 text-gray-800 capitalize" }, title.replace(/-/g, " ")),
      items?.map((item, index) =>
        React.createElement(
          "div",
          { key: index, className: `bg-white p-6 rounded-lg shadow-md border-l-4 ${getBorderColor(item.match_percentage)}` },
          React.createElement(
            "div",
            { className: "flex justify-between items-start" },
            React.createElement("h3", { className: "text-lg font-semibold text-gray-700" }, item.skill_name),
            React.createElement("span", { className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm" }, item.match_percentage)
          ),
          React.createElement("p", { className: "mt-2 text-gray-600" }, item.explanation),
          item.suggestions &&
            React.createElement(
              "div",
              { className: "mt-4 bg-gray-50 p-4 rounded-lg" },
              React.createElement("h4", { className: "font-medium text-gray-700 mb-2" }, "Suggestions:"),
              React.createElement(
                "ul",
                { className: "list-disc list-inside space-y-1" },
                item.suggestions.map((suggestion, i) =>
                  React.createElement("li", { key: i, className: "text-gray-600" }, suggestion)
                )
              )
            )
        )
      )
    );

  return React.createElement(
    "div",
    { className: "min-h-screen  p-6 md:p-10 bg-gray-50" },
    React.createElement(
      "div",
      { className: "max-w-4xl mx-auto" },
      React.createElement("h1", { className: "text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-900 text- to-blue-600 bg-clip-text  text-transparent mt-0 mb-20" }, "Resume Analysis Results"),
      renderSection("Must-Have Skills", result["must-have-skills"]),
      renderSection("Good-to-Have Skills", result["good-to-have-skills"]),
      renderSection("Desired Profile", result["desired-profile"]),
      

      
      
      
      
      
      
      
      
      React.createElement(
        "div",
        { className: "bg-white p-6 rounded-lg shadow-md border-l-4 border-l-blue-500" },
        React.createElement("h2", { className: "text-2xl font-bold mb-4 text-gray-800" }, "Overall Match Score"),
        React.createElement(
          "div",
          { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
          Object.entries(result["overall-match-score"]).map(([key, value]) =>
            React.createElement(
              "div",
              { key: key, className: "bg-gray-50 p-4 rounded-lg" },
              React.createElement("h3", { className: "font-semibold text-gray-700 capitalize" }, key.replace(/-/g, " ")),
              React.createElement("p", { className: "text-2xl font-bold text-blue-600 mt-2" }, value)
            )
          )
        )
      ),
      React.createElement(
        "button",
        {
          onClick: copyToClipboard,
          className:
            "fixed end-4 top-100 text-gray-900 cursor-pointer hover:bg-gray-100 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border border-gray-200 h-8 shadow-md",
        },
        React.createElement("svg", {
          className: "w-4 h-4 me-2",
          "aria-hidden": "true",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          viewBox: "0 0 18 19",
          dangerouslySetInnerHTML: {
            __html:
              '<path fill-rule="evenodd" d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" clip-rule="evenodd"/>',
          },
        }),
        isCopied ? "Copied!" : "Copy Results"
      )
    )
  );
};

export default ResultOfResume;
