import React, { useState } from "react";
import { FaUpload, FaMagic, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ResumeModifier = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modifiedResume, setModifiedResume] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      setError("File size must be less than 5MB");
      setFile(null);
      return;
    }

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF or DOC/DOCX file only");
      setError("Please upload a PDF or DOC/DOCX file only");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    toast.success("File uploaded successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file || !jobTitle || !company || !jobDescription) {
      toast.error("Please fill all fields and upload a resume");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_title", jobTitle);
    formData.append("company", company);
    formData.append("job_description", jobDescription);

    try {
      const response = await fetch(
        "https://demo.needrecruiter.com/need-recruiter/api/modify-resume",
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Resume modification failed");

      const data = await response.json();
      setModifiedResume(data.content);
      toast.success("Resume modified successfully!");
    } catch (err) {
      setError(err.message || "Failed to modify resume");
      console.error("API Error:", err);
      toast.error("Failed to modify resume");
    } finally {
      setLoading(false);
    }
  };

  const formatResumeContent = (content) => {
    // Split by sections marked with ---
    const sections = content.split("\n---\n");
    
    return sections.map((section, index) => {
      // Check for headings (lines that end with :)
      const lines = section.split("\n");
      
      return (
        <div key={index} className="mb-6">
          {lines.map((line, lineIndex) => {
            if (line.match(/\*\*.+?\*\*/)) {
              // Bold text
              return <p key={lineIndex} className="font-bold my-2">{line.replace(/\*\*/g, '')}</p>;
            } else if (line.match(/^###/)) {
              // Subsection heading
              return <h3 key={lineIndex} className="text-lg font-semibold mt-4 mb-2">{line.replace(/^### /, '')}</h3>;
            } else if (line.trim() === "") {
              return <br key={lineIndex} />;
            } else {
              return <p key={lineIndex} className="my-1">{line}</p>;
            }
          })}
        </div>
      );
    });
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-blue-50  rounded-lg p-2 mb-8 border-l-4 border-blue-800 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">AI Resume Tailoring</h1>
        <p className="text-gray-600 mt-2">
          Get your resume professionally tailored for specific job applications
        </p>
      </div>

      {!modifiedResume ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Resume Upload */}
              <div>
                <div className="mb-6">
                  <label className="block text-sm lg:text-sm font-medium text-gray-700 mb-2">
                    Upload Your Current Resume
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <FaUpload className="text-blue-500 text-3xl" />
                      <p className="text-sm text-gray-600">
                        {file ? (
                          <span className="font-medium text-gray-800">{file.name}</span>
                        ) : (
                          "Drag & drop your file here or click to browse"
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Max file size: 5MB (PDF/DOCX)</p>
                      <label className="cursor-pointer mt-3">
                        <span className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors inline-block">
                          Select File
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                    </div>
                  </div>
                  {error && !file && (
                    <p className="mt-3 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Senior Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Target Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Google"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column - Job Description */}
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  rows="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paste the job description you're applying for..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading || !file || !jobTitle || !company || !jobDescription}
                className={`px-6 py-2.5 rounded-md text-white font-medium ${
                  loading || !file || !jobTitle || !company || !jobDescription
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors min-w-[150px] flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Tailoring...
                  </>
                ) : (
                  <>
                    <FaMagic className="mr-2" />
                    Tailor My Resume
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Tailored Resume</h2>
            <button
              onClick={() => setModifiedResume(null)}
              className="px-4 py-2 flex  bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <IoArrowBackCircleOutline className="p-2" />
              Back
            </button>
          </div>
          
          <div className="prose max-w-none p-6 border border-gray-200 rounded-lg">
            {formatResumeContent(modifiedResume)}
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => {
                const blob = new Blob([modifiedResume], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Tailored_Resume_${jobTitle}_${company}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              <FaFileAlt className="mr-2" />
              Download as TXT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeModifier;