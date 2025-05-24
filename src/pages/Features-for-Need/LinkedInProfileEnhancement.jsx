import { useState } from 'react';
import { FiCopy, FiCheck, FiAlertTriangle, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const LinkedInProfileEnhancement = () => {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [optimizedSummary, setOptimizedSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setOptimizedSummary('');

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
    toast.success("Resume uploaded successfully");
  };

  const generateOptimization = async () => {
    if (!file) {
      toast.error("Please upload a resume first");
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        "https://demo.needrecruiter.com/need-recruiter/api/linkedin-summary",
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to generate LinkedIn summary");

      const data = await response.json();
      setOptimizedSummary(data.linkedin_summary);
      toast.success("LinkedIn summary generated successfully!");
    } catch (err) {
      setError(err.message || "Failed to generate LinkedIn summary");
      toast.error("Failed to generate LinkedIn summary");
      console.error("API Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w mx-auto">
        {/* Header Card */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">LinkedIn Profile Enhancement</h1>
          <p className="text-gray-600 mt-2">
            Generate an optimized LinkedIn summary directly from your resume
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Enhance Your Profile</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Your Resume
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <FiUpload className="text-blue-500 text-3xl" />
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

              <button
                onClick={generateOptimization}
                disabled={!file || isGenerating}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition ${
                  !file || isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate LinkedIn Summary'}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {optimizedSummary ? (
                <>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Optimized LinkedIn Summary</h3>
                    <div className="relative">
                      <textarea
                        rows="8"
                        className="w-full px-3 py-2 scrollbar-1px border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        value={optimizedSummary}
                        readOnly
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(optimizedSummary);
                          toast.success("Summary copied to clipboard!");
                        }}
                        className="absolute top-2 right-2 p-1 bg-white rounded border border-gray-300 hover:bg-gray-100"
                        title="Copy to clipboard"
                      >
                        <FiCopy className="text-gray-600" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{optimizedSummary.length}/2,600 characters</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-3 flex items-center">
                      <FiCheck className="mr-2" /> Best Practices
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <FiCheck />
                        </span>
                        <span className="ml-2 text-sm text-gray-700">
                          Keep your summary between 3-5 short paragraphs (40-300 words)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <FiCheck />
                        </span>
                        <span className="ml-2 text-sm text-gray-700">
                          Include relevant keywords for your industry
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <FiCheck />
                        </span>
                        <span className="ml-2 text-sm text-gray-700">
                          Highlight your unique value proposition
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center h-full flex flex-col items-center justify-center">
                  <FiAlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    {file 
                      ? "Click 'Generate LinkedIn Summary' to create your optimized profile"
                      : "Upload your resume to generate an optimized LinkedIn summary"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInProfileEnhancement;