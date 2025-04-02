import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiChevronRight,
  FiSearch,
  FiCalendar,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecruiterFull from "../../components/StatsBanner/StatsBannerFull";


const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const jobsPerPage = 7;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://demo.needrecruiter.com/need-recruiter/api/job-posts"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setJobs(data.data);
        setFilteredJobs(data.data);
        if (data.data.length > 0) {
          setSelectedJob(data.data[0]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let result = jobs;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply employment type filter
    if (employmentTypeFilter !== "all") {
      result = result.filter(
        (job) => job.employment_type === employmentTypeFilter
      );
    }

    // Apply date filter
    if (dateFilter !== "all") {
      result = result.filter((job) => {
        const jobDate = new Date(job.created_at);
        const now = new Date();
        const diffDays = Math.floor((now - jobDate) / (1000 * 60 * 60 * 24));
        
        if (dateFilter === "today") return diffDays === 0;
        if (dateFilter === "week") return diffDays <= 7;
        if (dateFilter === "month") return diffDays <= 30;
        return true;
      });
    }

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [searchTerm, employmentTypeFilter, dateFilter, jobs]);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApply = () => {
    if (!selectedJob) return;
    
    toast.success(
      `Application submitted for ${selectedJob.job_title} at ${selectedJob.company_name}!`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No job listings available.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center bg-gray-50 py-8">
        <div className="w-full max-w-[80%]">
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Side - Job List */}
            <div className="w-full md:w-2/5 lg:w-1/3 bg-white border-r border-gray-200 overflow-y-auto h-[80vh]">
              <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-sky-800">Job Openings</h2>
                  <p className="text-sm text-gray-500">
                    {filteredJobs.length} jobs available
                  </p>
                </div>

                {/* Search and Filters */}
                <div className="space-y-2 mt-3">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <select
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      value={employmentTypeFilter}
                      onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>

                    <div className="relative flex-1">
                      <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                      <select
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                      >
                        <option value="all">Any Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleSelectJob(job)}
                    className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors ${
                      selectedJob?.id === job.id
                        ? "bg-sky-50 border-l-5 shadow transition-all transform-3d border-sky-700"
                        : ""
                    }`}
                  >
                    <h3 className="font-medium text-sky-900">{job.job_title}</h3>
                    <p className="text-xs text-sky-500">{job.company_name}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center text-xs text-gray-500">
                        <FiMapPin className="mr-1" /> {job.location}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <FiBriefcase className="mr-1" /> {job.employment_type}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <FiDollarSign className="mr-1" /> {job.salary_range}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {formatDate(job.created_at)}
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        paginate(currentPage < totalPages ? currentPage + 1 : currentPage)
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Job Details */}
            <div className="w-full md:w-3/5 lg:w-2/3 overflow-y-auto h-[80vh]">
              {selectedJob ? (
                <div className="p-6 md:p-8">
                  <div className="bg-sky-50 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-bold text-sky-800">
                          {selectedJob.job_title}
                        </h1>
                        <p className="text-sm text-sky-600 mt-1">
                          {selectedJob.company_name}
                        </p>
                      </div>
                      <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-600 transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-700">
                        <FiMapPin className="mr-2 text-sky-500" />
                        {selectedJob.location}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FiBriefcase className="mr-2 text-sky-500" />
                        {selectedJob.employment_type}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FiDollarSign className="mr-2 text-sky-500" />
                        {selectedJob.salary_range}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FiClock className="mr-2 text-sky-500" />
                        Posted {formatDate(selectedJob.created_at)}
                      </div>
                    </div>

                    <div className="mt-8">
  <hr className="border mb-2 border-sky-300" />
  <h2 className="text-xl font-semibold text-sky-900 mb-4">
    Job Description
  </h2>
  <div 
    className="text-gray-700 prose" 
    dangerouslySetInnerHTML={{ __html: selectedJob.job_description }} 
  />
</div>

                    {selectedJob.education && (
                      <div className="mt-8">
                        <h2 className="text-xl font-semibold text-sky-900 mb-4">
                          Education
                        </h2>
                        <p className="text-gray-700">{selectedJob.education}</p>
                      </div>
                    )}

                    <div className="mt-8">
                      <h2 className="text-xl font-semibold text-sky-900 mb-4">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.tags.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleApply}
                        className="w-full md:w-auto px-6 py-3 bg-sky-800 text-white rounded-md hover:bg-sky-600 transition-colors"
                      >
                        Apply for this position
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Select a job to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <RecruiterFull />
    </div>
  );
};

export default JobListing;