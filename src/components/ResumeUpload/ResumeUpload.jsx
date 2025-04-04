import React, { useState } from "react";
import { FaUpload, FaChartLine, FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FileUploadImage } from "../../assets/Assets";

const ResumeUpload = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(""); // Clear any previous errors

    if (!selectedFile) return;

    // Check file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: "20px" },
      });
      setError("File size must be less than 5MB");
      setFile(null);
      return;
    }

    // Check file type (only PDF, DOC, DOCX allowed)
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF or DOC/DOCX file only", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: "20px" },
      });
      setError("Please upload a PDF or DOC/DOCX file only");
      setFile(null);
      return;
    }

    // If file passes all checks, set it and show success toast
    setFile(selectedFile);
    toast.success("File uploaded successfully", {
      position: "top-right",
      autoClose: 2000,
      style: { marginTop: "20px" },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file || !description) {
      toast.error("Please Upload a Resume and Enter a Description", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: "20px" },
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", description);

    try {
      const response = await fetch(
        "https://demo.needrecruiter.com/need-recruiter/api/job-match",
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      const content = data.data.choices[0].message.content;
      const jsonMatch = content.match(/{[\s\S]*}/);
      if (!jsonMatch) throw new Error("Invalid response format");

      const resultData = JSON.parse(jsonMatch[0]);
      navigate("/result-of-resume", { state: { result: resultData } });
    } catch (err) {
      setError(err.message || "Failed to analyze resume");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          .animate-slide-up {
            animation: slideUp 0.8s ease-out forwards;
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-center text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-900 text- to-blue-600 bg-clip-text  text-transparent mt-20 ">
          AI Resume Analyzer
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mt-4 animate-fade-in [animation-delay:0.2s]">
          Elevate your job search with intelligent resume insights.
        </p>
      </div>

      {/* Steps Section */}
      <div className="w-full  max-w-5xl flex flex-col md:flex-row justify-between gap-6 mb-16">
        {[
          {
            icon: <FaUpload className="text-indigo-600 text-3xl" />,
            title: "Upload Resume",
            desc: "Quick and easy upload",
          },
          {
            icon: <FaChartLine className="text-orange-500 text-3xl" />,
            title: "AI Scoring",
            desc: "Smart analysis",
          },
          {
            icon: <FaClipboardCheck className="text-teal-600 text-3xl" />,
            title: "Detailed Report",
            desc: "Actionable feedback",
          },
        ].map((step, index) => (
          <div className="flex flex-wrap justify-center gap-6 mx-auto w-[90%] md:w-full">
            <div
              key={index}
              className="w-[90%] md:w-[90%] lg:w-[90%] flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className="p-3 bg-white rounded-full shadow-sm">
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg mt-4 text-gray-800">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="w-full max-w-4xl bg-gray-50 rounded-xl shadow-lg p-8 animate-slide-up [animation-delay:0.9s]">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          Check Your Resume Fit
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Timeline Steps */}
          <div className="flex flex-col justify-center">
            <ol className="space-y-6">
              {[
                "Upload Your Resume",
                "Add Job Description",
                "Receive Score",
                "Improve Your Fit",
              ].map((step, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full mr-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  </span>
                  <span className="font-medium">{step}</span>
                </li>
              ))}
            </ol>

            {/* <div className="flex justify-center items-center">
              <img src={FileUploadImage} alt="File Upload" className="max-w-full h-auto" />
            </div> */}
          </div>

          {/* Upload Inputs */}
          <div className="space-y-6">
            <div className="group">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-white hover:bg-indigo-50 transition-all duration-300 group-hover:shadow-md"
              >
                <div className="flex flex-col items-center justify-center py-6">
                  <svg
                    className="w-8 h-8 mb-3 text-indigo-500 animate-pulse"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, DOCX (Max 5MB)
                  </p>
                  {file && (
                    <p className="mt-2 text-sm text-teal-600 animate-fade-in">
                      {file.name}
                    </p>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Job Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-sm"
                placeholder="Paste the job description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm animate-fade-in">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Analyzing... (15-20s)
                </span>
              ) : (
                "Start Analysis"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;
