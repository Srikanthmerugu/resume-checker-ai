import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShare2, FiLinkedin, FiMessageSquare, FiCopy, FiBriefcase, 
  FiMapPin, FiDollarSign, FiClock, FiCalendar, FiUser, FiBook, FiUpload } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import { useAuth } from '../../../context/AuthContext'; // Adjust path as needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleJobPost = () => {
  const { id } = useParams();
  const { token, guestLogin, userData } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applicationError, setApplicationError] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      console.log("userData",userData)
      try {
        const response = await fetch(
          `https://demo.needrecruiter.com/need-recruiter/api/job-posts/${id}`
        );
        
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        
        const data = await response.json();
        setJob(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!token) {
      const result = await guestLogin();
      if (!result.success) return;
    }
  
    if (!selectedFile) {
      setApplicationError('Please upload your resume');
      return;
    }
  
    setApplyLoading(true);
    setApplicationError(null);
  
    const formData = new FormData();
    formData.append('user_id', userData.id);
    console.log('user_id', userData)
    formData.append('resume', selectedFile);  // This is correct - use 'resume' as the key
    formData.append('job_post_id', id);
    
    try {
      const response = await fetch('https://demo.needrecruiter.com/need-recruiter/api/apply-job', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type header - let the browser set it with the correct boundary
        },
        body: formData,
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        if (data.message === 'You have already applied to this job.') {
          setAlreadyApplied(true);
          toast.error(data.message);
        } else {
          const errorMsg = data.errors 
            ? Object.values(data.errors).flat().join(' ') 
            : data.message || 'Application failed';
          setApplicationError(errorMsg);
          toast.error(errorMsg);
        }
      } else {
        setAlreadyApplied(true);
        toast.success('Application submitted successfully!');
        setApplyModalOpen(false);
      }
    } catch (error) {
      setApplicationError('Network error. Please try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setApplyLoading(false);
    }
  };
  
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const handleShare = (type) => {
    const jobUrl = window.location.href;
    const message = `Check out this ${job.job_title} position at ${job.company_name}: ${jobUrl}`;

    switch(type) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(jobUrl)}&title=${encodeURIComponent(job.job_title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(jobUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShare(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-sky-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 bg-sky-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
        <p className="text-sky-600 font-medium">⚠️ Error loading job: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-sky-900">Apply for {job.job_title}</h3>
            
            <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center">
              <label className="cursor-pointer">
              <input
  type="file"
  onChange={(e) => setSelectedFile(e.target.files[0])}
  accept=".pdf,.doc,.docx"
  className="hidden"
/>
                <div className="space-y-2">
                  <FiUpload className="w-8 h-8 text-sky-600 mx-auto" />
                  <p className="text-sky-600 font-medium">
                    {selectedFile ? selectedFile.name : 'Click to upload resume'}
                  </p>
                  <p className="text-sm text-sky-500">PDF or DOCX (Max 5MB)</p>
                </div>
              </label>
            </div>

            {applicationError && (
              <p className="text-red-500 text-sm">{applicationError}</p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setApplyModalOpen(false)}
                className="px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={applyLoading}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg disabled:opacity-50 hover:bg-sky-700 transition-colors"
              >
                {applyLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Applying...
                  </span>
                ) : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative border border-sky-100">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-sky-100 rounded-lg">
                  <FiBook className="text-2xl text-sky-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-sky-900">{job.job_title}</h1>
                  <p className="text-sm text-sky-600 mt-1">{job.company_name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 p-1 border-sky-800 border text-gray-500 text-sm font-medium rounded-full 
                             hover:bg-sky-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Button */}
            <div className="relative md:self-start">
              <button
                onClick={() => setShowShare(!showShare)}
                className="p-3 hover:bg-sky-50 cursor-pointer rounded-xl text-sky-600 transition-colors"
              >
                <FiShare2 className="w-6 h-6" />
              </button>

              {showShare && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-sky-100 
                            animate-fade-in-up">
                  <div className="p-2 space-y-2">
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-sky-50 rounded-lg"
                    >
                      <FiLinkedin className="text-sky-600 flex-shrink-0" />
                      <span className="text-sky-700">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-sky-50 rounded-lg"
                    >
                      <FiMessageSquare className="text-sky-600  flex-shrink-0" />
                      <span className="text-sky-700">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-sky-50 rounded-lg"
                    >
                      <FiCopy className="text-sky-600 cursor-pointer flex-shrink-0" />
                      <span className="text-sky-700">{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group flex items-center gap-3 p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors">
  <div className="p-2 bg-white rounded-lg shadow-sm border border-sky-100">
    <FiMapPin className="text-sky-600 transition-transform duration-300 delay-100 group-hover:scale-175" />
  </div>
  <div>
    <p className="text-sm text-sky-500">Location</p>
    <p className="text-sky-700 text-sm font-medium">{job.location}</p>
  </div>
</div>

            <div className="flex group items-center gap-3 p-4 bg-sky-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-sky-100">
                <FiBriefcase className="transition-transform duration-300 delay-100 group-hover:scale-175 text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-sky-500">Employment Type</p>
                <p className="text-sky-700 text-sm font-medium">{job.employment_type}</p>
              </div>
            </div>

            <div className="flex group items-center gap-3 p-4 bg-sky-50 rounded-xl">
              <div className="p-2 bg-white text-sm rounded-lg shadow-sm border border-sky-100">
                <FiDollarSign className="transition-transform duration-300 delay-100 group-hover:scale-175 text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-sky-500">Salary Range</p>
                <p className="text-sky-700 text-sm font-medium">{job.salary_range}</p>
              </div>
            </div>

            <div className="flex group items-center gap-3 p-4 bg-sky-50 rounded-xl">
              <div className="p-2  bg-white rounded-lg shadow-sm border border-sky-100">
                <FiCalendar className=" transition-transform duration-300 delay-100 group-hover:scale-175  text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-sky-500">Posted</p>
                <p className="text-sky-700 text-sm font-medium">
                  {new Date(job.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Job Description */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-sky-100">
              <h2 className="text-2xl font-bold text-sky-900 mb-2">Job Description</h2>
              <article 
                className="prose text-justify prose-sky max-w-none text-sky-700
                         prose-headings:text-sky-900 prose-strong:text-sky-900
                         prose-a:text-sky-600 hover:prose-a:text-sky-700"
                dangerouslySetInnerHTML={sanitizeHTML(job.job_description)}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-sky-100">
              <h3 className="text-lg font-bold text-sky-900 mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiUser className="text-sky-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sky-500">Department</p>
                    <p className="text-sky-700 text-sm font-medium">{job.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiBriefcase className="text-sky-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sky-500">Industry</p>
                    <p className="text-sky-700 text-sm font-medium">{job.industry_type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiBook className="text-sky-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-sky-500">Education</p>
                    <p className="text-sky-700 text-sm font-medium">{job.education}</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
            onClick={() => !alreadyApplied && setApplyModalOpen(true)}
            disabled={alreadyApplied || applyLoading}
            className={`w-full py-4 px-6 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              alreadyApplied 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-sky-600 hover:bg-sky-700 hover:shadow-md focus:ring-sky-600 text-white'
            }`}
          >
            {applyLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Applying...
              </span>
            ) : alreadyApplied ? (
              'Already Applied'
            ) : (
              'Apply Now'
            )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobPost;