import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const FindCandidate = () => {
  const [formData, setFormData] = useState({
    country: '',
    jobTitle: '',
    keywordsInclude: '',
    keywordsExclude: '',
    education: '',
    currentEmployer: '',
    categories: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedQueries, setSavedQueries] = useState([]);

  // Country options with flags
  const countries = [
    { label: '🇺🇸 United States', value: 'US' },
    { label: '🇮🇳 India', value: 'IN' },
    { label: '🇬🇧 United Kingdom', value: 'UK' },
    { label: '🇨🇦 Canada', value: 'CA' },
    { label: '🇦🇺 Australia', value: 'AU' },
    { label: '🇩🇪 Germany', value: 'DE' },
    { label: '🇫🇷 France', value: 'FR' },
    { label: '🇧🇷 Brazil', value: 'BR' },
    { label: '🇯🇵 Japan', value: 'JP' },
    { label: '🇨🇳 China', value: 'CN' },
  ];

  // Education options
  const educationOptions = [
    'All Candidates',
    'Degree',
    'Masters Degree',
    'Doctoral Degree',
  ];

  // Category options
  const categoryOptions = [
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Naukri', value: 'naukri' },
    { label: 'Facebook', value: 'facebook' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('savedQueries');
    if (saved) setSavedQueries(JSON.parse(saved));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      toast.error('Please select at least one Platforms!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    // Generate search query based on selected categories
    const baseQuery = `+"${formData.jobTitle.split(' ').join('+')}" OR "UI+Developer" OR "Javascript"+"${formData.keywordsInclude.split(' ').join('+')}" -"${formData.keywordsExclude}" -intitle:"profiles" -inurl:"dir/+"`;
    const educationQuery = `${formData.education}+licence+"Current+%2A+${formData.currentEmployer.split(' ').join('+')}+%2A+"`;

    let query = '';
    if (formData.categories.includes('linkedin')) {
      query += `https://www.google.com/search?q=${baseQuery}+site:in.linkedin.com/in/+OR+site:in.linkedin.com/pub/&as_oq=${educationQuery}\n`;
    }
    if (formData.categories.includes('naukri')) {
      query += `https://www.google.com/search?q=${baseQuery}+site:naukri.com&as_oq=${educationQuery}\n`;
    }
    if (formData.categories.includes('facebook')) {
      query += `https://www.google.com/search?q=${baseQuery}+site:facebook.com&as_oq=${educationQuery}\n`;
    }

    setSearchQuery(query.trim());
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedQueries = [...savedQueries, searchQuery];
    setSavedQueries(updatedQueries);
    localStorage.setItem('savedQueries', JSON.stringify(updatedQueries));
    toast.success('Query saved successfully!', { position: 'top-right', autoClose: 3000 });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { position: 'top-right', autoClose: 3000 });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, categories: [...formData.categories, value] });
    } else {
      setFormData({ ...formData, categories: formData.categories.filter((cat) => cat !== value) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Advanced Candidate Search
      </h1>
      <p>Effortlessly source the best talent using Google's precision search. Choose platforms like LinkedIn, Naukri, and Facebook, set advanced filters, and generate optimized search queries in seconds. Save and reuse top-performing searches with ease! </p>








      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Search Form - 60% width */}
        <form onSubmit={handleSubmit} className="md:w-3/5 bg-white p-6 rounded-xl shadow-lg">
          {/* Category Selection */}
          <div className="mb-6">
            <h3 className="block text-2xl font-medium text-gray-700 mb-2">
              Select Platforms
            </h3>
            <div className="flex md:flex-row flex-col gap-4">
              {categoryOptions.map((option) => (
                <label key={option.value} className="flex bg-blue-100 shadow-2xl p-2 px-5 rounded-2xl items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={formData.categories.includes(option.value)}
                    onChange={handleCategoryChange}
                    className="form-checkbox h-4 w-4 cursor-pointer text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="md:text-1xl  text-gray-700 cursor-pointer font-semibold">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Country Dropdown */}
            <div className="  col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <Select
                options={countries}
                value={countries.find((country) => country.value === formData.country)}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, country: selectedOption.value })
                }
                className="w-full"
                placeholder=" Country"
              />
            </div>

            {/* Education Dropdown */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <select
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Education</option>
                {educationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Frontend Developer"
              />
            </div>

            {/* Keywords to Include */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords to Include
              </label>
              <input
                type="text"
                value={formData.keywordsInclude}
                onChange={(e) => setFormData({ ...formData, keywordsInclude: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., React, Figma"
              />
            </div>

            {/* Keywords to Exclude */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords to Exclude
              </label>
              <input
                type="text"
                value={formData.keywordsExclude}
                onChange={(e) => setFormData({ ...formData, keywordsExclude: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., CSS"
              />
            </div>

            {/* Current Employer */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Employer
              </label>
              <input
                type="text"
                value={formData.currentEmployer}
                onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Tech Corp Inc"
              />
            </div>

            <button
              type="submit"
              className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Generate Search
            </button>
          </div>
        </form>

        {/* Saved Queries - 40% width */}
        <div className="md:w-2/5 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Saved Queries
          </h2>

          {savedQueries.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved queries yet</p>
          ) : (
            <div className="space-y-3">
              {savedQueries.map((query, index) => (
                <div key={index} className="group relative bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 truncate pr-8">{query}</p>
                  <button
                    onClick={() => handleCopy(query)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 transition-opacity p-1.5 rounded-md hover:bg-gray-200 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Search Query
              </h2>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Copy and use this search string to find candidates:
                </p>
                <div className="relative">
                  <textarea
                    value={searchQuery}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 pr-16 resize-none"
                    rows={4}
                  />
                  <button
                    onClick={() => handleCopy(searchQuery)}
                    className="absolute right-2 top-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Save Query
                </button>
                <button
                  onClick={() => window.open(searchQuery, '_blank')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Open in Google
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindCandidate;