import React, { useState, useEffect } from "react";
import RichTextEditor from "rich-text-editor-for-react";
import useRichTextEditor from "rich-text-editor-for-react/hook";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NewNavbar from "../../components/navbar/NewNavbar";

const JobPostComponent = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { output: jobDescription, fetchOutput } = useRichTextEditor();
  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    company_name: "",
    tags: "",
    salary_range: "",
    employment_type: "",
    industry_type: "",
    department: "",
    education: "",
    experience: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Please login to post a job");
      navigate('/');
    }
  }, [token, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.job_title.trim()) newErrors.job_title = "Job title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.company_name.trim()) newErrors.company_name = "Company name is required";
    if (!formData.tags.trim()) newErrors.tags = "At least one tag is required";
    if (!formData.salary_range.trim()) newErrors.salary_range = "Salary range is required";
    if (!formData.employment_type) newErrors.employment_type = "Employment type is required";
    if (!formData.industry_type) newErrors.industry_type = "Industry type is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.education.trim()) newErrors.education = "Education is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!jobDescription || jobDescription === '<p><br></p>') newErrors.job_description = "Job description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Please login to post a job");
      navigate('/');
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const editorOutput = await fetchOutput();
      
      const tagsArray = formData.tags.split(',')
                            .map(tag => tag.trim())
                            .filter(tag => tag !== '');

      const payload = {
        ...formData,
        tags: tagsArray,
        job_description: editorOutput || jobDescription,
        experience: formData.experience
      };

      const response = await fetch("https://demo.needrecruiter.com/need-recruiter/api/job-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to create job post");
      }

      toast.success("Job post created successfully!");
      setFormData({
        job_title: "",
        location: "",
        company_name: "",
        tags: "",
        salary_range: "",
        employment_type: "",
        industry_type: "",
        department: "",
        education: "",
        experience: ""
      });
      
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-[1000]"
      />
      
      {/* <NewNavbar className="relative z-[50]" /> */}
      
      <div className="max-w-4x mx-auto">
        {/* Header */}
        <div className="bg-blue-50 rounded-lg p-2 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Post a New Job</h1>
          <p className="text-gray-600 mt-2">
            Create a job posting to attract top talent using our AI-powered platform.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Details Card */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Title*
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.job_title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g. Front End Developer"
                  />
                  {errors.job_title && <p className="mt-1 text-sm text-red-600">{errors.job_title}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location*
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g. New York, NY"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.company_name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g. Tech Innovators Inc."
                  />
                  {errors.company_name && <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>}
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Salary Range*
                  </label>
                  <input
                    type="text"
                    name="salary_range"
                    value={formData.salary_range}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.salary_range ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g. 80,000 - 100,000 USD"
                  />
                  {errors.salary_range && <p className="mt-1 text-sm text-red-600">{errors.salary_range}</p>}
                </div>
              </div>
            </div>

            {/* Employment Details Card */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Employment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Employment Type*
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="employment_type"
                          value={type}
                          checked={formData.employment_type === type}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                  {errors.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
                </div>

                {/* Industry Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Industry Type*
                  </label>
                  <select
                    name="industry_type"
                    value={formData.industry_type}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.industry_type ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="" disabled>Select industry</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                  {errors.industry_type && <p className="mt-1 text-sm text-red-600">{errors.industry_type}</p>}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Department*
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.department ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g. Engineering"
                  />
                  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                </div>
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skills/Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skills/Tags (comma separated)*
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.tags ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g. Laravel, React, Full-Stack"
                  />
                  {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Education*
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.education ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g. Bachelor's Degree in Computer Science"
                  />
                  {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education}</p>}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience*
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.experience ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="" disabled>Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>
              </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Description*
                </label>
                <RichTextEditor
                  className="rte-container mt-2"
                  toolbarOptions={[
                    "word_count", "clear_format", "undo", "redo", "font", 
                    "header", "bold", "italic", "underline", "strikethrough",
                    "text_color", "highlight_color", "numbered_list", "bulleted_list",
                    "align", "decrease_indent", "increase_indent", "direction",
                    "blockquote", "code_block", "link", "sub_script", "super_script"
                  ]}
                  customizeUI={{
                    backgroundColor: "#fff",
                    primaryColor: "#2563eb",
                    stickyToolbarOnScroll: true,
                    toolbarBackgroundColor: "#eff6ff",
                    toolbarBorderColor: "#2563eb",
                  }}
                  fetchOutput={fetchOutput}
                />
                {errors.job_description && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_description}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostComponent;