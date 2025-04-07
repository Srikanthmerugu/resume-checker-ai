// SingleJobPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShare2, FiLinkedin, FiMessageSquare, FiCopy, FiBriefcase, 
  FiMapPin, FiDollarSign, FiClock, FiCalendar, FiUser, FiBook } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplyModal from './ApplyModal';

const SingleJobPost = () => {
  const { id } = useParams();
  const { token, guestLogin } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `https://demo.needrecruiter.com/need-recruiter/api/job-posts/${id}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch job: ${response.status}`);
        }
        
        const data = await response.json();
        setJob(data.data);
      } catch (err) {
        setError(err.message);
        toast.error(`Error loading job: ${err.message}`);
      } finally {
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
    
    setApplyModalOpen(true);
  };

  const submitApplication = async (resumeFile) => {
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_post_id', id);
      
      const response = await fetch('https://demo.needrecruiter.com/need-recruiter/api/apply-job', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        if (data.message === 'You have already applied to this job.') {
          setAlreadyApplied(true);
          throw new Error(data.message);
        }
        throw new Error(data.errors 
          ? Object.values(data.errors).flat().join(' ') 
          : data.message || 'Application failed');
      }
  
      setAlreadyApplied(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const handleShare = (type) => {
    if (!job) return;
    
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
        toast.success('Link copied to clipboard!');
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

  if (error || !job) return (
    <div className="text-center py-20 bg-sky-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
        <p className="text-sky-600 font-medium">⚠️ Error loading job: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-50">
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        jobTitle={job.job_title}
        onApply={submitApplication}
        alreadyApplied={alreadyApplied}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8 md:py-12 sm:py-3">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg md:p-8 p-4 mb-8 relative border border-sky-100">
        <div className="flex flex-col md:flex-row justify-between items-start">
  {/* Main Content with relative positioning */}
  <div className="flex-1 relative">
    {/* Share Button - Mobile (top right) */}
    <div className="md:hidden absolute top-0 right-0 z-10">
      <button
        onClick={() => setShowShare(prev => !prev)}
        className="p-2 hover:bg-sky-50 cursor-pointer rounded-lg text-sky-600 transition-colors"
      >
        <FiShare2 className="w-5 h-5" />
      </button>
    </div>

    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pr-8 md:pr-0">
      <div className="p-2 sm:p-3 bg-sky-100 rounded-lg">
        <FiBook className="text-xl sm:text-2xl text-sky-600" />
      </div>
      <div> 
        <h1 className="text-xl sm:text-xl md:text-2xl font-bold text-sky-900">{job.job_title}</h1>
        <p className="text-xs sm:text-sm text-sky-600 mt-0.5 sm:mt-1">{job.company_name}</p>
      </div> 
    </div>

    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
      {job.tags.map((tag, index) => (
        <span 
          key={index}
          className="px-2 sm:px-3 py-0.5 sm:py-1 border-sky-800 border text-gray-500 text-xs sm:text-sm font-medium rounded-full 
                   hover:bg-sky-200 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>

  {/* Share Button - Desktop */}
  <div className="hidden md:block relative self-start z-10">
    <button
      onClick={() => setShowShare(prev => !prev)}
      className="p-2 sm:p-3 hover:bg-sky-50 cursor-pointer rounded-lg sm:rounded-xl text-sky-600 transition-colors"
    >
      <FiShare2 className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>

    {/* Shared Dropdown Menu (works for both mobile and desktop) */}
    {showShare && (
      <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg sm:rounded-xl shadow-xl border border-sky-100 
                  animate-fade-in-up z-20">
        <div className="p-1 sm:p-2 space-y-1 sm:space-y-2">
          <button
            onClick={() => handleShare('linkedin')}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 cursor-pointer flex items-center gap-2 sm:gap-3 hover:bg-sky-50 rounded-lg"
          >
            <FiLinkedin className="text-sky-600 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm text-sky-700">LinkedIn</span>
          </button>
          <button
            onClick={() => handleShare('whatsapp')}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 cursor-pointer flex items-center gap-2 sm:gap-3 hover:bg-sky-50 rounded-lg"
          >
            <FiMessageSquare className="text-sky-600 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm text-sky-700">WhatsApp</span>
          </button>
          <button
            onClick={() => handleShare('copy')}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 cursor-pointer flex items-center gap-2 sm:gap-3 hover:bg-sky-50 rounded-lg"
          >
            <FiCopy className="text-sky-600 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm text-sky-700">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    )}
  </div>

  {/* Mobile Dropdown Menu - positioned differently */}
  {showShare && (
    <div className="md:hidden fixed inset-0 z-10" onClick={() => setShowShare(false)}>
      <div className="absolute top-20 right-4 w-48 bg-white rounded-xl shadow-xl border border-sky-100 animate-fade-in-up z-20">
        <div className="p-2 space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare('linkedin');
            }}
            className="w-full px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-sky-50 rounded-lg"
          >
            <FiLinkedin className="text-sky-600 flex-shrink-0 w-5 h-5" />
            <span className="text-sky-700">LinkedIn</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare('whatsapp');
            }}
            className="w-full px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-sky-50 rounded-lg"
          >
            <FiMessageSquare className="text-sky-600 flex-shrink-0 w-5 h-5" />
            <span className="text-sky-700">WhatsApp</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare('copy');
            }}
            className="w-full px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-sky-50 rounded-lg"
          >
            <FiCopy className="text-sky-600 flex-shrink-0 w-5 h-5" />
            <span className="text-sky-700">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  )}
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
                className="prose text-justify prose-sky max-w-none  text-sm
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
              onClick={handleApply}
              disabled={alreadyApplied}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                alreadyApplied 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-sky-600 hover:bg-sky-700 hover:shadow-md focus:ring-sky-600 text-white'
              }`}
            >
              {alreadyApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobPost;