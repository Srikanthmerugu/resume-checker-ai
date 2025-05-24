import React, { useState, useEffect } from 'react';
import { FiSend, FiTrendingUp, FiBriefcase, FiUsers, FiChevronRight, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import StatsBanner from '../components/StatsBanner/StatsBanners';
// import StatsBanner from './StatsBanner'; // Import the provided StatsBanner component

const DashboardItems = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch real-time job updates
  const fetchRealTimeJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://demo.needrecruiter.com/need-recruiter/api/job-posts?page=1&per_page=5'
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setJobs(data.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Initial fetch and periodic updates
  useEffect(() => {
    fetchRealTimeJobs();
    const interval = setInterval(fetchRealTimeJobs, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Mock data for job postings and candidates (replace with API if available)
  const jobPostings = [
    { id: 1, title: 'Software Engineer', applicants: 45, status: 'Active', posted: '2025-05-10' },
    { id: 2, title: 'Product Manager', applicants: 30, status: 'Active', posted: '2025-05-08' },
    { id: 3, title: 'UX Designer', applicants: 20, status: 'Closed', posted: '2025-05-05' },
  ];

  const candidates = [
    { id: 1, name: 'John Doe', role: 'Software Engineer', stage: 'Interview', matchScore: 92 },
    { id: 2, name: 'Jane Smith', role: 'Product Manager', stage: 'Screening', matchScore: 88 },
    { id: 3, name: 'Alex Johnson', role: 'UX Designer', stage: 'Offer', matchScore: 95 },
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-blue-50 rounded-lg p-2 mb-8 border-l-4 border-blue-500">
          <h1 className="text-2xl font-bold text-gray-800">Wellcome to your Dashboard</h1>
          <p className="text-gray-600 mt-2">Power your recruitment with AI-driven insights and tools.</p>
        </div>

        {/* Recruiter Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800">Find Top Talent with NeedRecruiter</h2>
              <p className="text-gray-600 mt-2">
                Connect with 30,000+ vetted candidates across industries. Post jobs, source talent, and hire faster with our AI-powered platform.
              </p>
              <p className="text-gray-600 mt-2">
                Offer your candidates our AI Career Tools to enhance their job search.
              </p>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                <Link to="/job-post" className="w-full">
                  <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center justify-center gap-2 transition-colors">
                    <FiSend /> Post a Job Now
                  </button>
                </Link>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <CountUp
                  end={95}
                  duration={3}
                  suffix="%"
                  className="text-3xl font-bold text-blue-600"
                />
                <p className="mt-2 text-gray-600">Candidate Match Accuracy</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <CountUp
                  end={36}
                  duration={3}
                  suffix="h"
                  className="text-3xl font-bold text-blue-600"
                />
                <p className="mt-2 text-gray-600">Avg. Time to Hire</p>
              </div>
              <div className="bg-blue-600 hover:bg-blue-700p-4 rounded-lg border border-blue-100">
              <StatsBanner />
                {/* <p className="mt-2 text-gray-600">Avg. Time to Hire</p> */}
              </div>
              {/* Active Users stat */}
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-center gap-4">
            <FiTrendingUp className="text-3xl text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">New Applicants</h3>
              <p className="text-2xl font-bold text-blue-600">500</p>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-center gap-4">
            <FiBriefcase className="text-3xl text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Active Jobs</h3>
              <p className="text-2xl font-bold text-blue-600">10</p>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-center gap-4">
            <FiUsers className="text-3xl text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Pending Reviews</h3>
              <p className="text-2xl font-bold text-blue-600">25</p>
            </div>
          </div>
        </div>

        {/* Job Postings Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Job Postings Overview</h2>
            <Link to="/find-all-jobs" className="text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-3">Job Title</th>
                  <th className="p-3">Applicants</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Posted</th>
                </tr>
              </thead>
              <tbody>
                {jobPostings.map((job) => (
                  <tr key={job.id} className="border-t hover:bg-blue-50 transition-colors">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.applicants}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          job.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="p-3">{job.posted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Time Job Updates */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Real-Time Job Updates</h2>
            <Link to="/find-all-jobs" className="text-blue-600 hover:underline">View All Jobs</Link>
          </div>
          {loading ? (
            <div className="text-center text-blue-600 animate-pulse">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600">Error: {error}</div>
          ) : jobs.length === 0 ? (
            <div className="text-center text-gray-600">No new jobs available</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 cursor-pointer transition-all"
                  onClick={() => window.location.href = `/jobs/${job.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{job.job_title}</h3>
                      <p className="text-blue-600 text-sm">{job.company_name}</p>
                    </div>
                    <FiChevronRight className="text-blue-400 hover:text-blue-600" />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-blue-600" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Posted: {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Candidate Pipeline */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Candidate Pipeline</h2>
            <Link to="/findCandidate" className="text-blue-600 hover:underline">View All Candidates</Link>
          </div>
          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-semibold">{candidate.stage}</p>
                    <p className="text-gray-600">AI Match: {candidate.matchScore}/100</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* AI Recruiting Tools */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Recruiting Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
              <h3 className="text-lg font-medium text-gray-800">AI Candidate Matching</h3>
              <p className="text-gray-600 mt-2">Find the best candidates with AI-driven matching algorithms.</p>
              <Link to="/findCandidate" className="text-blue-600 hover:underline mt-2 inline-block">
                Match Now
              </Link>
            </div>
            <div className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
              <h3 className="text-lg font-medium text-gray-800">Resume Analysis</h3>
              <p className="text-gray-600 mt-2">Analyze resumes with AI to identify top talent quickly.</p>
              <Link to="/upload-resume" className="text-blue-600 hover:underline mt-2 inline-block">
                Analyze Resumes
              </Link>
            </div>
            <div className="p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
              <h3 className="text-lg font-medium text-gray-800">Job Description Optimization</h3>
              <p className="text-gray-600 mt-2">Optimize job postings for better candidate attraction.</p>
              <Link to="/job-post" className="text-blue-600 hover:underline mt-2 inline-block">
                Optimize Now
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              'New applicant for Software Engineer position',
              'Job posting for Product Manager closed',
              'Candidate Jane Smith moved to Offer stage',
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-gray-600">{activity}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardItems;