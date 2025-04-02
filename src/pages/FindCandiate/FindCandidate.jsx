import React, { useState } from 'react';

const FindCandidate = () => {
  const [formData, setFormData] = useState({
    jobTitle: 'frontend',
    similarJobs: false,
    locationKeywords: '',
    excludeKeywords: '',
    education: 'bachelor degree licence',
    currentEmployer: 'adp',
    country: 'de'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateSearchUrl = () => {
    let queryParts = [];
    
    // Basic job title search
    if (formData.jobTitle) {
      queryParts.push(`"${formData.jobTitle}"`);
    }
    
    // Site restrictions
    queryParts.push(`site:${formData.country}.linkedin.com/in OR site:${formData.country}.linkedin.com/pub`);
    
    // Exclude certain patterns
    queryParts.push('-intitle:"profiles"');
    queryParts.push('-inurl:"dir/"');
    
    // Education
    if (formData.education) {
      queryParts.push(formData.education);
    }
    
    // Current employer
    if (formData.currentEmployer) {
      queryParts.push(`"current * ${formData.currentEmployer} *"`);
    }
    
    // Location/keywords to include
    if (formData.locationKeywords) {
      queryParts.push(formData.locationKeywords);
    }
    
    // Keywords to exclude
    if (formData.excludeKeywords) {
      const excludeTerms = formData.excludeKeywords.split(/\s+/).map(term => `-${term}`).join(' ');
      queryParts.push(excludeTerms);
    }
    
    // Combine all parts
    const query = queryParts.join(' ');
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = generateSearchUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md" style={{ backgroundColor: '#eff6ff' }}>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Find the right people on LinkedIn</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
            <span className="text-xs text-gray-500 ml-1">Help</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
          >
            <option value="de">Germany (de.linkedin.com)</option>
            <option value="it">Italy (it.linkedin.com)</option>
            <option value="fr">France (fr.linkedin.com)</option>
            <option value="www">Global (linkedin.com)</option>
            <option value="us">United States (linkedin.com)</option>
            <option value="uk">United Kingdom (linkedin.com)</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        
        {/* Rest of the form remains the same as previous example */}
        {/* ... */}
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{ backgroundColor: '#7eb3fc' }}
          >
            Search LinkedIn Profiles
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindCandidate;