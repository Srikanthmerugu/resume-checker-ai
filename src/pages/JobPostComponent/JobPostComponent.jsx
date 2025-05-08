import React, { useState, useEffect } from "react";
import { jobpost } from "../../assets/Assets";
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
      // First fetch the editor output if needed
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
      // Reset form
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
    <div className="min-h-screen bg-black relative">
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

      {/* Background Container */}
      <div
          className="absolute inset-0"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
          }}
        />
        {/* Radial Gradient Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
          }}
        />
      
      <NewNavbar className="relative" /> 
      
      <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-black shadow-xl rounded-lg">
          <div className="md:flex">
            {/* Left Side - Form */}
            <div className="md:w-1/2 relative p-8 sm:p-10 lg:p-12">
              <h1 className="text-3xl font-bold text-white mb-6">
                Post a Job
              </h1>

              <form className="space-y-4 text-white" onSubmit={handleSubmit}>
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-white">
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

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-white">
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

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-white">
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

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-white">
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

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-medium text-white">
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

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium text-white">
                    Employment Type*
                  </label>
                  {errors.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
                  <div className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="employment_type"
                          value={type}
                          checked={formData.employment_type === type}
                          onChange={handleChange}
                          className="h-4 w-4 text-white focus:ring-sky-500 border-sky-300"
                        />
                        <span className="ml-2 text-sm text-white">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Industry Type */}
                <div>
                  <label className="block text-sm font-medium text-white">
                    Industry Type*
                  </label>
                  <select
                    name="industry_type"
                    value={formData.industry_type}
                    onChange={handleChange}
                    className={`mt-1 block w-full bg-black pl-3 pr-10 py-2 text-base border ${errors.industry_type ? 'border-red-300' : 'border-sky-300'} focus:outline-none focus:ring-sky-500 focus:border-sky-500 rounded-md`}
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
                  <label className="block text-sm font-medium text-white">
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

                {/* Education */}
                <div>
                  <label className="block text-sm font-medium text-white">
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

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-white">
                    Experience*
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`mt-1 block w-full bg-black pl-3 pr-10 py-2 text-base border ${errors.experience ? 'border-red-300' : 'border-sky-300'} focus:outline-none focus:ring-sky-500 focus:border-sky-500 rounded-md`}
                  >
                    <option value="" disabled>Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-white">
                    Job Description*
                  </label>
                  <RichTextEditor
                    className="rte-container mt-10"
                    toolbarOptions={[
                      "word_count", "clear_format", "undo", "redo", "font", 
                      "header", "bold", "italic", "underline", "strikethrough",
                      "text_color", "highlight_color", "numbered_list", "bulleted_list",
                      "align", "decrease_indent", "increase_indent", "direction",
                      "blockquote", "code_block", "link", "sub_script", "super_script"
                    ]}
                    customizeUI={{
                      backgroundColor: "#fff",
                      primaryColor: "#20464b",
                      stickyToolbarOnScroll: true,
                      toolbarBackgroundColor: "#e8f0fe",
                      toolbarBorderColor: "#20464b",
                    }}
                    fetchOutput={fetchOutput}
                  />
                  {errors.job_description && (
                    <p className="mt-1 text-sm text-red-600">{errors.job_description}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="pt-2">
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
            <div className="hidden md:block md:w-1/2 bg-sky-100 relative overflow-hidden">
              <div className="absolute inset-0 z-0 animate-wave" style={{
                background: 'linear-gradient(45deg, rgba(224, 242, 254, 0.8), rgba(186, 230, 253, 0.6), rgba(125, 211, 252, 0.4), rgba(224, 242, 254, 0.8))',
                backgroundSize: '200% 200%',
              }}></div>
              <div className="h-full flex items-center justify-center p-8 relative z-10">
                <div className="text-center">
                  <img
                    src={jobpost}
                    alt="Hiring illustration"
                    className="mx-auto max-h-[400px] w-auto rounded-lg object-contain"
                  />
                  <h2 className="mt-6 text-2xl font-bold text-white">
                   Post a Job & Find the Perfect Candidate
                  </h2>
                  <p className="mt-2 text-sm text-white">
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

export default JobPostComponent;