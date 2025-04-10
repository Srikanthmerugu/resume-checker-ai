import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import RecruiterFull from '../../components/StatsBanner/StatsBannerFull';

const SearchForFindJob = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const experienceOptions = [
    { value: '', label: 'Select experience' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || locationQuery.trim() || experience) {
      navigate('/find-a-jobs', { 
        state: { 
          searchQuery, 
          locationQuery,
          experience
        }  
      });
    }
  };

  return (
    <div className='h-screen'>
      <div className="mt-30 mb-10 flex flex-col items-center gap-[20px] search-for-find-job">
        <h1 className='text-5xl text-sky-700'>Find your dream job now</h1>
        <p className='text-2xl text-sky-600'>5 lakh+ jobs for you to explore</p>
      </div>
      
      <div className="mb-30 max-w-[85%] mx-auto py-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center bg-white p-4 rounded-xl shadow border border-sky-100">
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
            className="flex-1 w-full sm:w-auto px-4 py-2 border font-normal border-sky-300 rounded-lg text-blue-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            <FiSearch className="mr-2" /> Search
          </button>
        </form>
      </div>

      <RecruiterFull />
    </div>
  );
};

export default SearchForFindJob;