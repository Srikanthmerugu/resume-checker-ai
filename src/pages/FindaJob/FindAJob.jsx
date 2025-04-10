import React, { useState, useEffect } from 'react';
import { FiMapPin, FiBriefcase, FiDollarSign, FiChevronRight, FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import RecruiterFull from '../../components/StatsBanner/StatsBannerFull';
import { NoData } from '../../assets/Assets';

const FindAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [experience, setExperience] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const experienceOptions = [
    { value: '', label: 'Select experience' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const [filters, setFilters] = useState({
    department: new Set(),
    workMode: new Set(),
    location: new Set(),
    education: new Set(),
    industry: new Set(),
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const storedSearch = JSON.parse(localStorage.getItem('jobSearchState')) || {};
    
    // Restore inputs
    setSearchQuery(storedSearch.searchQuery || '');
    setLocationQuery(storedSearch.locationQuery || '');
    setExperience(storedSearch.experience || '');

    // Restore results if available and no new state is provided
    const state = location.state || {};
    const prevSearch = state.prevSearch || {};

    if (prevSearch.jobs) {
      // Use state from navigation if available
      setJobs(prevSearch.jobs);
      setTotalJobs(prevSearch.totalJobs || 0);
      setTotalPages(prevSearch.totalPages || 1);
      setCurrentPage(prevSearch.currentPage || 1);
      setHasSearched(true);
    } else if (storedSearch.jobs) {
      // Fallback to localStorage if no state but data exists
      setJobs(storedSearch.jobs);
      setTotalJobs(storedSearch.totalJobs || 0);
      setTotalPages(storedSearch.totalPages || 1);
      setCurrentPage(storedSearch.currentPage || 1);
      setHasSearched(true);
    } else if (storedSearch.searchQuery || storedSearch.locationQuery || storedSearch.experience) {
      // Trigger fetch if inputs exist but no results
      fetchJobs();
    }
  }, [location.state]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (locationQuery) params.append('location', locationQuery);
      if (searchQuery) params.append('query', searchQuery);
      if (experience) params.append('experience', experience);
      params.append('page', currentPage);
      
      const response = await fetch(
        `https://demo.needrecruiter.com/need-recruiter/api/job-posts?${params.toString()}`
      );
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      setJobs(data.data);
      setTotalJobs(data.total);
      setTotalPages(data.last_page);
      setLoading(false);
      setHasSearched(true);

      // Store the search state in localStorage
      const searchState = {
        searchQuery,
        locationQuery,
        experience,
        jobs: data.data,
        totalJobs: data.total,
        totalPages: data.last_page,
        currentPage
      };
      localStorage.setItem('jobSearchState', JSON.stringify(searchState));
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setHasSearched(true);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchJobs();
  };

  const handleJobClick = (jobId) => {
    // Store current state in localStorage before navigating
    const searchState = {
      searchQuery,
      locationQuery,
      experience,
      jobs,
      totalJobs,
      totalPages,
      currentPage
    };
    localStorage.setItem('jobSearchState', JSON.stringify(searchState));

    // Navigate to job detail with state
    navigate(`/jobs/${jobId}`, {
      state: {
        prevSearch: searchState
      }
    });
  };

  const generateFilterOptions = (key) => {
    if (jobs.length === 0) return [];
    
    const counts = jobs.reduce((acc, job) => {
      const value = job[key === 'workMode' ? 'employment_type' : key] || 'Unknown';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  };

  const workModes = generateFilterOptions('workMode');
  const locations = generateFilterOptions('location');
  const educations = generateFilterOptions('education');
  const industries = generateFilterOptions('industry');

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const newSet = new Set(prev[category]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [category]: newSet };
    });
  };

  const toggleExpand = (category) => {
    setExpandedFilters(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const FilterSection = ({ title, category, options }) => (
    <div className="border-b border-sky-200 pb-1 mb-0 animate-fadeIn">
      <h6 className="text-sky-800 font-semibold mt-2 mb-2">{title}</h6>
      {options.length === 0 ? (
        <div>  
          <p className="text-sky-600 text-sm">No options available</p>
        </div>
      ) : (
        <>
          <div className={`overflow-y-hidden ${expandedFilters[category] ? 'h-auto' : 'max-h-60'}`}>
            {options.map(({ name, count }) => (
              <label 
                key={name}
                className="flex text-sm items-center space-x-2 mb-1 cursor-pointer hover:bg-sky-50 px-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters[category].has(name)}
                  onChange={() => toggleFilter(category, name)}
                  className="form-checkbox text-sky-600 border-sky-300"
                />
                <span className="flex-1 text-sky-700">
                  {name} <span className="text-sky-500">({count})</span>
                </span>
              </label>
            ))}
          </div>
          {options.length > 5 && (
            <button
              onClick={() => toggleExpand(category)}
              className="text-sky-600 border-sky-50 text-sm mt-2 hover:underline"
            >
              {expandedFilters[category] ? 'View Less' : 'View More'}
            </button>
          )}
        </>
      )}
    </div>
  );

  const JobCard = ({ job }) => (
    <div 
      className="p-4 hover:bg-sky-50 shadow border border-sky-100 mb-5 rounded-xl cursor-pointer transition-all duration-300 animate-slideIn"
      onClick={() => handleJobClick(job.id)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sky-900 font-medium text-lg">{job.job_title}</h3>
          <p className="text-sky-600 text-sm">{job.company_name}</p>
        </div>
        <FiChevronRight className="text-sky-400 hover:text-sky-600 transition-colors" />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.skills && job.skills.split(',').slice(0, 4).map((skill, i) => (
          <span 
            key={i}
            className="px-2 py-1 bg-sky-100 text-sky-800 text-xs rounded-full"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sky-700">
        <div className="flex items-center">
          <FiMapPin className="mr-1 text-sky-600" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center">
          <FiBriefcase className="mr-1 text-sky-600" />
          <span className="text-sm">{job.employment_type}</span>
        </div>
        {job.salary && (
          <div className="flex items-center">
            <FiDollarSign className="mr-1 text-sky-600" />
            <span className="text-sm">{job.salary}</span>
          </div>
        )}
        {job.experience && (
          <div className="flex items-center">
            <FiBriefcase className="mr-1 text-sky-600" />
            <span className="text-sm">Exp: {job.experience}</span>
          </div>
        )}
      </div>

      <div className="mt-2 ml-1 justify-between items-center">
        <span className="text-sky-600 text-sm">
          Post Date: 
        </span>
        <span className='text-gray-500 text-sm'> {" "}{new Date(job.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-sky-600 animate-pulse">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-sky-600">
        Error: {error}
      </div>
    );
  }

  return (
    <>
     <div className="mt-25 mb-10 flex flex-col items-center gap-[20px] search-for-find-job bg-gradient-animate py-12 ">
  <h1 className="text-5xl text-sky-700 font-bold animate-fade-in-down">Find your dream job now</h1>
  <p className="text-2xl text-sky-600 animate-fade-in-up">5 lakh+ jobs for you to explore</p>
</div>

      <div className="max-w-[85%] mx-auto py-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center bg-white p-4 rounded-xl shadow border border-sky-100">
          <input
            type="text"
            placeholder="Enter skills / designations / companies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 w-full sm:w-auto px-4 py-2 border border-sky-300 rounded-lg text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="flex-1 w-full sm:w-auto px-4 py-2 border border-sky-300 rounded-lg text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {experienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Enter location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="flex-1 w-full sm:w-auto px-4 py-2 border border-sky-300 rounded-lg text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >  
            <FiSearch className="mr-2" /> Search
          </button>
        </div>
      </div>
      
      {hasSearched && (
        <div id='alljobs-data' className="max-w-[80%] mx-auto py-8">
          {jobs.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters Column */}
              <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
                <div className="sticky top-25 bg-white p-2 rounded-xl shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sky-900 text-xl font-bold">All Filters</h2>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="md:hidden text-sky-600"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <FilterSection
                    title="Work Mode"
                    category="workMode"
                    options={workModes}
                  />

                  <FilterSection
                    title="Location"
                    category="location"
                    options={locations}
                  />

                  <FilterSection
                    title="Education"
                    category="education"
                    options={educations}
                  />

                  <FilterSection
                    title="Industry"
                    category="industry"
                    options={industries}
                  />
                </div>
              </div>

              {/* Job Listings */}
              <div className="flex-1">
                <div className="bg-white p-4 rounded-xl shadow mb-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center">
                      <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden mr-4 flex items-center text-sky-600"
                      >
                        <FiFilter className="mr-1" /> Filters
                      </button>
                      <span className='text-xl text-sky-800 font-bold'>Explore Opportunities</span>
                    </div>
                    <div className="text-sky-700 mb-2 md:mb-0">
                      {`Showing ${(currentPage - 1) * jobsPerPage + 1}-${Math.min(currentPage * jobsPerPage, totalJobs)} of ${totalJobs} jobs`}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl">
                  <div className="divide-y divide-sky-100">
                    {jobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <nav className="inline-flex rounded-md shadow-sm">
                      <button
                        onClick={() => {
                          setCurrentPage(p => Math.max(1, p - 1));
                          fetchJobs();
                        }}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sky-600 bg-white border border-sky-200 rounded-l-lg hover:bg-sky-50 disabled:opacity-50"
                      >
                        Previous
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }

                        const isCurrent = page === currentPage;
                        return (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              fetchJobs();
                            }}
                            className={`px-4 py-2 border-t border-b border-sky-200 ${
                              isCurrent 
                                ? 'bg-sky-600 text-white' 
                                : 'bg-white text-sky-600 hover:bg-sky-50'
                            } ${page === 1 ? 'border-l' : ''} 
                            ${page === totalPages ? 'border-r' : ''}`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => {
                          setCurrentPage(p => Math.min(totalPages, p + 1));
                          fetchJobs();
                        }}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sky-600 bg-white border border-sky-200 rounded-r-lg hover:bg-sky-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center flex items-center flex-col text-sky-600">
              <img src={NoData} alt="No data found" className='w-[40%]' />
              <h3 className='text-2xl'>No jobs found matching your criteria</h3>
            </div>
          )}
        </div>
      )}

<div className='mt-20'>
<RecruiterFull />

</div>
    </>
  );
};

export default FindAllJobs;