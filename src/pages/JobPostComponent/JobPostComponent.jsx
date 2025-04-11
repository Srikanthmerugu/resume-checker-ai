import React, { useState, useEffect } from "react";
import { jobpost } from "../../assets/Assets";
import RichTextEditor from "rich-text-editor-for-react";
import useRichTextEditor from "rich-text-editor-for-react/hook";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    experience: "",
    
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorKey, setEditorKey] = useState(0); // Add key state for editor reset


  
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
      const tagsArray = formData.tags.split(',')
                            .map(tag => tag.trim())
                            .filter(tag => tag !== '');

      const payload = {
        ...formData,
        tags: tagsArray,
        job_description: jobDescription
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
      
      if (response.ok) {
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
          experience: "",
        });
        // Reset rich text editor
        setEditorKey(prev => prev + 1);
      } else {
        throw new Error(data.message || "Failed to create job post");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while submitting the form");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
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
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Form */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-sky-800 mb-6">
                Post a Job
              </h1>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-sky-700">
                    Job Title*
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.job_title ? 'border-red-300' : 'border-sky-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                    placeholder="e.g. Front End Developer"
                  />
                  {errors.job_title && <p className="mt-1 text-sm text-red-600">{errors.job_title}</p>}
                </div>

                {/* Grid for Location and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sky-700">
                      Location*
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.location ? 'border-red-300' : 'border-sky-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                      placeholder="e.g. New York, NY"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-700">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.company_name ? 'border-red-300' : 'border-sky-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                      placeholder="e.g. Tech Innovators Inc."
                    />
                    {errors.company_name && <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-sky-700">
                    Skills/Tags (comma separated)*
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.tags ? 'border-red-300' : 'border-sky-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                    placeholder="e.g. Laravel, React, Full-Stack"
                  />
                  {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
                </div>

                {/* Grid for Salary and Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sky-700">
                      Salary Range*
                    </label>
                    <input
                      type="text"
                      name="salary_range"
                      value={formData.salary_range}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.salary_range ? 'border-red-300' : 'border-sky-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                      placeholder="e.g. 80,000 - 100,000 USD"
                    />
                    {errors.salary_range && <p className="mt-1 text-sm text-red-600">{errors.salary_range}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-700">
                      Department*
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.department ? 'border-red-300' : 'border-sky-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                      placeholder="e.g. Engineering"
                    />
                    {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                  </div>
                </div>

                {/* Grid for Employment and Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Employment Type */}
                  <div className="border-r border-sky-300">
                    <label className="block text-sm font-medium text-sky-700 ">
                      Employment Type*
                    </label>
                    {errors.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
                    <div className="mt-1 grid grid-cols-2 gap-3 ">
                      {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="employment_type"
                            value={type}
                            checked={formData.employment_type === type}
                            onChange={handleChange}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300"
                          />
                          <span className="ml-2 text-sm text-sky-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-sky-700">
                      Experience*
                    </label>
                    {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                    <div className="mt-1 grid grid-cols-2 gap-3">
                      {["0-1", "1-3", "3-5", "5-10", "10+"].map((exp) => (
                        <label key={exp} className="flex items-center">
                          <input
                            type="radio"
                            name="experience"
                            value={exp}
                            checked={formData.experience === exp}
                            onChange={handleChange}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300"
                          />
                          <span className="ml-2 text-sm text-sky-700">{exp} years</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid for Education and Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sky-700">
                      Education*
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.education ? 'border-red-300' : 'border-sky-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                      placeholder="e.g. Bachelor's Degree in Computer Science"
                    />
                    {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-700">
                      Industry Type*
                    </label>
                    <select
                      name="industry_type"
                      value={formData.industry_type}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${errors.industry_type ? 'border-red-300' : 'border-sky-300'} focus:outline-none focus:ring-sky-500 focus:border-sky-500 rounded-md`}
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
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-sky-700">
                    Job Description*
                  </label>
                  <RichTextEditor
                          key={editorKey} 
 className="rte-container mt-1 min-h-[150px]"                    toolbarOptions={[
                      "word_count", "clear_format", "undo", "redo", "font", 
                      "header", "bold", "italic", "underline", "strikethrough",
                      "text_color", "highlight_color", "numbered_list", "bulleted_list",
                      "align", "decrease_indent", "increase_indent", "direction",
                      "blockquote", "code_block", "link", "sub_script", "super_script"
                    ]}
                    customizeUI={{
                      backgroundColor: "#fff",
                      primaryColor: "#075985", // Sky-800 color
                      stickyToolbarOnScroll: true,
                      toolbarBackgroundColor: "#e8f0fe",
                      toolbarBorderColor: "#20464b",
                      contentStyles: {
                        'h1, h2, h3, h4, h5, h6': {
                          color: '#075985 !important' // Force heading colors
                        }
                      }
                    }}
                    fetchOutput={fetchOutput}
                  />
                  {errors.job_description && (
                    <p className="mt-1 text-sm text-red-600">{errors.job_description}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Right Side - Image */}
            <div className="md:block md:w-1/2 bg-sky-100">
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <img
                    src={jobpost}
                    alt="Hiring illustration"
                    className="mx-auto h-full w-auto rounded-lg object-cover"
                  />
                  <h2 className="mt-6 text-xl sm:text-2xl font-bold text-sky-800">
                    Find the Perfect Candidate
                  </h2>
                  <p className="mt-2 text-sm text-sky-600">
                    Reach thousands of qualified professionals actively looking
                    for their next opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
};
<style>{`
  .rte-container h1,
  .rte-container h2,
  .rte-container h3,
  .rte-container h4,
  .rte-container h5,
  .rte-container h6 {
    color: #075985 !important;
  }
`}</style>
export default JobPostComponent;