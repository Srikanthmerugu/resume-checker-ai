import React, { useState, useEffect } from 'react';
import { FiMapPin, FiBriefcase, FiDollarSign, FiChevronRight, FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import RecruiterFull from '../../components/StatsBanner/StatsBannerFull';
import { NoData } from '../../assets/Assets';

const FindAllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    department: new Set(),
    workMode: new Set(),
    location: new Set(),
    education: new Set(),
    industry: new Set(),
  });

  // Fetch all jobs initially
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        // First fetch to get total pages
        const initialResponse = await fetch(
          `https://demo.needrecruiter.com/need-recruiter/api/job-posts?page=1`
        );
        
        if (!initialResponse.ok) throw new Error(`HTTP error! status: ${initialResponse.status}`);
        
        const initialData = await initialResponse.json();
        setTotalPages(initialData.last_page);
        setTotalJobs(initialData.total);
        
        // Fetch all pages
        const allJobsData = [];
        for (let page = 1; page <= initialData.last_page; page++) {
          const response = await fetch(
            `https://demo.needrecruiter.com/need-recruiter/api/job-posts?page=${page}`
          );
          const data = await response.json();
          allJobsData.push(...data.data);
        }
        
        setAllJobs(allJobsData);
        setFilteredJobs(allJobsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  // Handle pagination with filtered jobs
  useEffect(() => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    setJobs(filteredJobs.slice(startIndex, endIndex));
  }, [currentPage, filteredJobs, jobsPerPage]);

  const handleSearch = () => {
    let results = [...allJobs];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(job => 
        job.job_title.toLowerCase().includes(query) ||
        job.company_name.toLowerCase().includes(query) ||
        (job.tags && job.tags.some(tag => tag.toLowerCase().includes(query)))
   ) }
    
    // Apply location filter
    if (locationQuery) {
      const location = locationQuery.toLowerCase();
      results = results.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }
    
    // Apply other filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.size > 0) {
        results = results.filter(job => 
          values.has(job[key === 'workMode' ? 'employment_type' : key])
        );
      }
    });

    // Apply sorting
    results.sort((a, b) => sortBy === 'date' ? 
      new Date(b.created_at) - new Date(a.created_at) :
      a.id - b.id
    );

    setFilteredJobs(results);
    setTotalJobs(results.length);
    setTotalPages(Math.ceil(results.length / jobsPerPage));
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, [filters, sortBy]);

  const generateFilterOptions = (key) => {
    const counts = allJobs.reduce((acc, job) => {
      const value = job[key.toLowerCase()] || 'Unknown';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  };

  // const departments = generateFilterOptions('department');
  const workModes = generateFilterOptions('employment_type');
  const locations = generateFilterOptions('location');
  const educations = generateFilterOptions('education');
  const industries = generateFilterOptions('industry_type');

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
      <h6 className="text-sky-800 font-semibold mt-2 mb-2 ">{title}</h6>
      {options.length === 0 ? (
        <div>  
          <p className="text-sky-600 text-sm">There is no Data here</p>
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
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sky-900 font-medium text-lg">{job.job_title}</h3>
          <p className="text-sky-600 text-sm">{job.company_name}</p>
        </div>
        <FiChevronRight className="text-sky-400 group-hover:text-sky-600 transition-colors" />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.tags?.map((tag, i) => (
          <span 
            key={i}
            className="px-2 py-1 bg-sky-100 text-sky-800 text-xs rounded-full"
          >
            {tag}
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
        <div className="flex items-center">
          <FiDollarSign className="mr-1 text-sky-600" />
          <span className="text-sm">{job.salary_range}</span>
        </div>
      </div>

      <div className="mt-2 ml-1 justify-between items-center">
        <span className="text-sky-600  text-sm">
          Post Date: 
        </span>
        <span className='text-gray-500 text-sm'> {" "}{new Date(job.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen text-sky-600 animate-pulse">
      Loading...
    </div>
  );

  if (error) return (
    <div className="text-center p-8 text-sky-600">
      Error: {error}
    </div>
  );

  return (
    <>
      <RecruiterFull />
      <div className="max-w-[85%] mx-auto py-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center bg-white p-4 rounded-xl shadow border border-sky-100">
          <input
            type="text"
            placeholder="Enter skills / designations / companies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 w-full sm:w-auto px-4 py-2 border border-sky-300 rounded-lg text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
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
      <div className="max-w-[80%] mx-auto py-8">
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

              {/* <FilterSection
                title="Department"
                category="department"
                options={departments}
              /> */}

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
            <div className="bg-white p-4 rounded-xl shadow mb-4 ">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <span className='text-xl text-sky-800 font-bold'>Explore Opportunities</span>
                </div>
                <div className="text-sky-700 mb-2 md:mb-0">
                  {filteredJobs.length > 0 ? (
                    `Showing ${(currentPage - 1) * jobsPerPage + 1}-${Math.min(currentPage * jobsPerPage, totalJobs)} of ${totalJobs} jobs`
                  ) : (
                    "No jobs found"
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl  ">
              {filteredJobs.length === 0 ? (
                <div className="text-center flex items-center flex-col p-8 text-sky-600">
                  <img src={NoData} alt="No data found" />
                  <h3 className='text-3xl'>No jobs found matching your criteria</h3>
                </div>
              ) : (
                <div className="divide-y divide-sky-100">
                  {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                        onClick={() => setCurrentPage(page)}
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
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
      </div>
    </>
  );
};

export default FindAllJobs;