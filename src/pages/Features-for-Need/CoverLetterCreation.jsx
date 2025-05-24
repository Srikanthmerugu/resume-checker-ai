import { useState } from 'react';
import { FiCopy, FiSave, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const CoverLetterCreation = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    hiringManager: 'Hiring Manager', 
  });
  const [file, setFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [savedTemplates, setSavedTemplates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setCoverLetter('');

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

  const generateCoverLetter = async () => {
    if (!file || !formData.jobTitle || !formData.companyName || !formData.jobDescription || 
        !formData.yourName || !formData.yourEmail || !formData.yourPhone) {
      toast.error("Please fill all required fields and upload a resume");
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("resume", file);
      formDataToSend.append("job_title", formData.jobTitle);
      formDataToSend.append("company", formData.companyName);
      formDataToSend.append("job_description", formData.jobDescription);
      formDataToSend.append("applicant_name", formData.yourName);
      formDataToSend.append("applicant_email", formData.yourEmail);
      formDataToSend.append("applicant_phone", formData.yourPhone);
      formDataToSend.append("hiring_manager", formData.hiringManager);

      const response = await fetch(
        "https://demo.needrecruiter.com/need-recruiter/api/generate-cover-letter",
        {
          method: "POST",
          body: formDataToSend,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to generate cover letter");

      const data = await response.json();
      
      // Ensure company name and job title are included in the cover letter
      let generatedLetter = data.cover_letter || "";
      
      // If the API response doesn't include these, we'll add them
      if (!generatedLetter.includes(formData.companyName)) {
        generatedLetter = generatedLetter.replace(/\[Company Name\]/g, formData.companyName);
      }
      if (!generatedLetter.includes(formData.jobTitle)) {
        generatedLetter = generatedLetter.replace(/\[Job Title\]/g, formData.jobTitle);
      }
      
      setCoverLetter(generatedLetter);
      toast.success("Cover letter generated successfully!");
    } catch (err) {
      setError(err.message || "Failed to generate cover letter");
      toast.error("Failed to generate cover letter");
      console.error("API Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAsTemplate = () => {
    if (!coverLetter.trim()) return;
    const templateName = `Cover Letter for ${formData.jobTitle} at ${formData.companyName}`;
    setSavedTemplates(prev => [...prev, { name: templateName, content: coverLetter }]);
    toast.success("Template saved successfully!");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w mx-auto">
        {/* Header Card */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Cover Letter Creator</h1>
          <p className="text-gray-600 mt-2">
            Generate a professional cover letter tailored to your job application
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Cover Letter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                  <input
                    type="text"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
                  <input
                    type="text"
                    name="hiringManager"
                    value={formData.hiringManager}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Hiring Manager's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email*</label>
                  <input
                    type="email"
                    name="yourEmail"
                    value={formData.yourEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone*</label>
                  <input
                    type="tel"
                    name="yourPhone"
                    value={formData.yourPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Google"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                <textarea
                  rows="4"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paste the job description you're applying for..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Your Resume*
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
                        required
                      />
                    </label>
                  </div>
                </div>
                {error && !file && (
                  <p className="mt-3 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                onClick={generateCoverLetter}
                disabled={!file || !formData.jobTitle || !formData.companyName || 
                         !formData.jobDescription || !formData.yourName || 
                         !formData.yourEmail || !formData.yourPhone || isGenerating}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${
                  !file || !formData.jobTitle || !formData.companyName || 
                  !formData.jobDescription || !formData.yourName || 
                  !formData.yourEmail || !formData.yourPhone || isGenerating
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isGenerating ? (
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
                    Generating...
                  </span>
                ) : (
                  'Generate Cover Letter'
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6 ">
              <div className="flex justify-between  items-center">
                <h3 className="font-medium text-gray-700">Generated Cover Letter</h3>
                <div className="flex space-x-2 over">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coverLetter);
                      toast.success("Cover letter copied to clipboard!");
                    }}
                    disabled={!coverLetter}
                    className={`p-2 rounded-md ${
                      coverLetter
                        ? 'text-blue-600 hover:bg-blue-50'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title="Copy to clipboard"
                  >
                    <FiCopy />
                  </button>
                    {/* <button
                      onClick={saveAsTemplate}
                      disabled={!coverLetter}
                      className={`p-2 rounded-md ${
                        coverLetter
                          ? 'text-blue-600 hover:bg-blue-50'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      title="Save as template"
                    >
                      <FiSave />
                    </button> */}
                </div>
              </div>

              {coverLetter ? (
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 h-full">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{coverLetter} For the deportment </pre>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    {file
                      ? "Click 'Generate Cover Letter' to create your customized cover letter"
                      : "Fill in all required fields and upload your resume to generate a cover letter"}
                  </p>
                </div>
              )}

              {savedTemplates.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Saved23456789 Templates</h4>
                  <ul className="space-y-2 max-h-40 overflow-y-auto">
                    {savedTemplates.map((template, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100"
                      >
                        <span className="text-sm truncate">{template.name}</span>
                        <button
                          onClick={() => setCoverLetter(template.content)}
                          className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap ml-2"
                        >
                          Load
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterCreation;