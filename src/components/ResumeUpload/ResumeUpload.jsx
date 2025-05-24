import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewNavbar from "../navbar/NewNavbar";

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

    // Check file type (only PDF, DOC, DOCX, JPG, JPEG allowed)
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF, DOC/DOCX, or JPG file only", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: "20px" },
      });
      setError("Please upload a PDF, DOC/DOCX, or JPG file only");
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
      toast.error("Failed to analyze resume. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: "20px" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* <NewNavbar className="relative z-[50]" /> */}
      <div className="max-wxl mx-auto">
        <div className="bg-blue-50 rounded-lg p-2 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">AI Resume Analyzer</h1>
          <p className="text-gray-600 mt-2">
            Upload your resume and a job description to get intelligent insights and improve your job fit.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Check Your Resume Fit</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Upload Section */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume*
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-white hover:bg-blue-50 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center justify-center py-4">
                      <svg
                        className="w-6 h-6 mb-2 text-blue-500"
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
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, DOCX (Max 5MB)
                      </p>
                      {file && (
                        <p className="mt-2 text-sm text-blue-600">
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
                {error && file === null && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              {/* Job Description Section */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 h-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Job Description*
                </label>
                <textarea
                  id="description"
                  rows="6"
                  className="block outline-0 w-full p-3 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 "
                  placeholder="Paste the job description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    </div>
  );
};

export default ResumeUpload;