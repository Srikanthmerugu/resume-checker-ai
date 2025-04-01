import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import WidgeLine from "../../components/WidgeLine/WidgeLine";

const FindCandidate = () => {
  const [formData, setFormData] = useState({
    country: "",
    jobTitle: "",
    keywordsInclude: [],
    keywordsExclude: [],
    education: "",
    currentEmployer: "",
    categories: [],
  });
  const [inputValue, setInputValue] = useState("");
  const [excludeInput, setExcludeInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [savedQueries, setSavedQueries] = useState([]);

  const countries = [
    { label: "🇺🇸 United States", value: "US", tld: ".us" },
    { label: "🇮🇳 India", value: "IN", tld: ".in" },
    { label: "🇬🇧 United Kingdom", value: "UK", tld: ".uk" },
    { label: "🇨🇦 Canada", value: "CA", tld: ".ca" },
    { label: "🇦🇺 Australia", value: "AU", tld: ".au" },
    { label: "🇩🇪 Germany", value: "DE", tld: ".de" },
    { label: "🇫🇷 France", value: "FR", tld: ".fr" },
    { label: "🇧🇷 Brazil", value: "BR", tld: ".br" },
    { label: "🇯🇵 Japan", value: "JP", tld: ".jp" },
    { label: "🇨🇳 China", value: "CN", tld: ".cn" },
    { label: "🇮🇹 Italy", value: "IT", tld: ".it" },
  ];

  const educationOptions = [
    "All Candidates",
    "Degree",
    "Masters Degree",
    "Doctoral Degree",
  ];

  const categoryOptions = [
    { label: "LinkedIn", value: "linkedin" },
    { label: "Naukri", value: "naukri" },
    { label: "Facebook", value: "facebook" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("savedQueries");
    if (saved) setSavedQueries(JSON.parse(saved));
  }, []);

  const handleKeywordAdd = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setFormData({
        ...formData,
        keywordsInclude: [...formData.keywordsInclude, inputValue.trim()],
      });
      setInputValue("");
      e.preventDefault();
    }
  };

  const handleExcludeAdd = (e) => {
    if (e.key === "Enter" && excludeInput.trim()) {
      setFormData({
        ...formData,
        keywordsExclude: [...formData.keywordsExclude, excludeInput.trim()],
      });
      setExcludeInput("");
      e.preventDefault();
    }
  };

  const removeKeyword = (index, type) => {
    if (type === "include") {
      setFormData({
        ...formData,
        keywordsInclude: formData.keywordsInclude.filter((_, i) => i !== index),
      });
    } else {
      setFormData({
        ...formData,
        keywordsExclude: formData.keywordsExclude.filter((_, i) => i !== index),
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.categories.length === 0) {
      toast.error("Please select at least one platform!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    // Construct the base query
    const jobTitleTerms = formData.jobTitle
      ? `+"${formData.jobTitle.split(" ").join("+")}"`
      : "";
    const includeTerms = formData.keywordsInclude
      .map((term) => `+"${term}"`)
      .join(" ");
    const excludeTerms = formData.keywordsExclude
      .map((term) => `-${term}`)
      .join(" ");
  
    // Construct the base query with exclusions
    const baseQuery = `${jobTitleTerms} ${includeTerms} ${excludeTerms} -intitle:"profiles" -inurl:"dir/+"`.trim();
  
    // Construct the site query
    const selectedCountry = countries.find(
      (country) => country.value === formData.country
    );
    const countryTld = selectedCountry ? selectedCountry.tld : "";
  
    const sites = [];
    if (formData.categories.includes("linkedin")) {
      sites.push(`site:${countryTld}.linkedin.com/in/`, `site:${countryTld}.linkedin.com/pub/`);
    }
    if (formData.categories.includes("naukri")) {
      sites.push(`site:naukri.com`);
    }
    if (formData.categories.includes("facebook")) {
      sites.push(`site:facebook.com`);
    }
  
    const siteQuery = sites.join(" OR ");
  
    // Combine the base query and site query
    const finalQuery = `${baseQuery} ${siteQuery}`.trim();
  
    // Add degree and licence with AND (without OR)
    const educationTerm = formData.education
      ? `${formData.education.toLowerCase().replace(/\s+/g, "+")}+AND+licence`
      : "";
  
    // Combine the final query with the education term
    const fullQuery = educationTerm ? `${finalQuery} ${educationTerm}` : finalQuery;
  
    // Generate the Google search URL
    const generatedSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      fullQuery
    )}`;
  
    setSearchQuery(fullQuery);
    setSearchUrl(generatedSearchUrl);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedQueries = [...savedQueries, searchQuery];
    setSavedQueries(updatedQueries);
    localStorage.setItem("savedQueries", JSON.stringify(updatedQueries));
    toast.success("Query saved successfully!");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      categories: checked
        ? [...formData.categories, value]
        : formData.categories.filter((cat) => cat !== value),
    });
  };

  return (
    <div className="min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="md:w-[50%] w-[100%] md:mx-auto md:mb-15 mb-2">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-900 to-blue-600 bg-clip-text text-transparent md:mb-10 md:mt-10">
          Advanced Candidate Search
        </h1>
        <p className="text-center text-justify">
          Effortlessly source the best talent using Google's precision search.
          Choose platforms like LinkedIn, Naukri, and Facebook, set advanced
          filters, and generate optimized search queries in seconds. Save and
          reuse top-performing searches with ease! <WidgeLine />
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="md:w-3/5 bg-blue-50 p-6 rounded-xl shadow-lg"
        >
          <div className="mb-6">
            <h3 className="block text-2xl font-medium text-gray-700 mb-2">
              Select Platforms
            </h3>
            <div className="flex md:flex-row flex-col gap-4">
              {categoryOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex Select-Platforms p-2 px-5 rounded-2xl items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={formData.categories.includes(option.value)}
                    onChange={handleCategoryChange}
                    className="form-checkbox h-4 w-4 cursor-pointer text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="md:text-1xl cursor-pointer font-semibold">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <Select
                options={countries}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    border: "1px solid black",
                    borderRadius: "0.5rem",
                    backgroundColor: "#eff6ff",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#2563eb",
                      cursor: "pointer",
                    },
                  }),
                }}
                value={countries.find(
                  (country) => country.value === formData.country
                )}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, country: selectedOption.value })
                }
                className="w-full bg-blue-50 cursor-pointer"
                placeholder="Select Country"
                getOptionLabel={(option) => option.label} // Display flag + country name in dropdown
                getOptionValue={(option) => option.value} // Use value (e.g., "AU") internally
                formatOptionLabel={(option) => (
                  <div>{option.label}</div> // Ensure flag + name is rendered
                )}
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <select
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer focus:border-blue-500"
              >
                <option value="">Select Education</option>
                {educationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title (comma-separated for OR)
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Fullstack Developer, Engineer"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords to Include (press Enter to add as pills)
              </label>
              <div className="w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.keywordsInclude.map((kw, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 px-2 py-1 rounded flex items-center"
                    >
                      {kw}
                      <button
                        onClick={() => removeKeyword(index, "include")}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeywordAdd}
                  className="w-full outline-none border-none"
                  placeholder="e.g., React"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords to Exclude (press Enter to add as pills)
              </label>
              <div className="w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.keywordsExclude.map((kw, index) => (
                    <div
                      key={index}
                      className="bg-red-100 px-2 py-1 rounded flex items-center"
                    >
                      {kw}
                      <button
                        onClick={() => removeKeyword(index, "exclude")}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={excludeInput}
                  onChange={(e) => setExcludeInput(e.target.value)}
                  onKeyPress={handleExcludeAdd}
                  className="w-full outline-none border-none"
                  placeholder="e.g., CSS"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Employer
              </label>
              <input
                type="text"
                value={formData.currentEmployer}
                onChange={(e) =>
                  setFormData({ ...formData, currentEmployer: e.target.value })
                }
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

        <div className="md:w-2/5 bg-blue-50 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Saved Queries
          </h2>
          {savedQueries.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved queries yet</p>
          ) : (
            <div className="space-y-3">
              {savedQueries.map((query, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-50 p-3 rounded-lg"
                >
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

      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative">
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
              rows={6}
            />
            <button
              onClick={() => handleCopy(searchQuery)}
              className="absolute right-2 top-2 p-2 text-white bg-gray-400 hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-black hover:text-black"
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
            onClick={() => window.open(searchUrl, "_blank")}
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