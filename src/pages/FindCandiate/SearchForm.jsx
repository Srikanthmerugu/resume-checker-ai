import React, { useState } from "react";
import Select from "react-select";
import KeywordInput from "./KeywordInput";
import { toast } from "react-toastify";

const SearchForm = ({ formData, setFormData, setShowModal, setSearchQuery, setSearchUrl }) => {
  const [inputValue, setInputValue] = useState("");
  const [excludeInput, setExcludeInput] = useState("");
  const countries = [
    { label: "\uD83C\uDDFA\uD83C\uDDF8 United States", value: "US", tld: ".us" },
    { label: "\uD83C\uDDEE\uD83C\uDDF3 India", value: "IN", tld: ".in" },
    { label: "\uD83C\uDDEC\uD83C\uDDE7 United Kingdom", value: "UK", tld: ".uk" },
    { label: "\uD83C\uDDE8\uD83C\uDDE6 Canada", value: "CA", tld: ".ca" },
    { label: "\uD83C\uDDE6\uD83C\uDDFA Australia", value: "AU", tld: ".au" },
    { label: "\uD83C\uDDE9\uD83C\uDDEA Germany", value: "DE", tld: ".de" },
    { label: "\uD83C\uDDEB\uD83C\uDDF7 France", value: "FR", tld: ".fr" },
    { label: "\uD83C\uDDE7\uD83C\uDDF7 Brazil", value: "BR", tld: ".br" },
    { label: "\uD83C\uDDEF\uD83C\uDDF5 Japan", value: "JP", tld: ".jp" },
    { label: "\uD83C\uDDE8\uD83C\uDDF3 China", value: "CN", tld: ".cn" },
    { label: "\uD83C\uDDEE\uD83C\uDDF9 Italy", value: "IT", tld: ".it" },
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

  const handleKeywordAdd = (e, type) => {
    const value = type === "include" ? inputValue : excludeInput;
    if (e.key === "Enter" && value.trim()) {
      setFormData({
        ...formData,
        [`keywords${type === "include" ? "Include" : "Exclude"}`]: [
          ...formData[`keywords${type === "include" ? "Include" : "Exclude"}`],
          value.trim(),
        ],
      });
      type === "include" ? setInputValue("") : setExcludeInput("");
      e.preventDefault();
    }
  };

  const removeKeyword = (index, type) => {
    setFormData({
      ...formData,
      [`keywords${type === "include" ? "Include" : "Exclude"}`]: 
        formData[`keywords${type === "include" ? "Include" : "Exclude"}`].filter((_, i) => i !== index),
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.categories.length === 0) {
      toast.error("Please select at least one platform!");
      return;
    }
  
    const jobTitleTerms = formData.jobTitle
      ? `+"${formData.jobTitle.split(" ").join("+")}"`
      : "";
    const includeTerms = formData.keywordsInclude
      .map((term) => `+"${term}"`)
      .join(" ");
    const excludeTerms = formData.keywordsExclude
      .map((term) => `-${term}`)
      .join(" ");
  
    const baseQuery = `${jobTitleTerms} ${includeTerms} ${excludeTerms} -intitle:"profiles" -inurl:"dir/+"`.trim();
  
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
    const finalQuery = `${baseQuery} ${siteQuery}`.trim();
    const educationTerm = formData.education
      ? `${formData.education.toLowerCase().replace(/\s+/g, "+")}+AND+licence`
      : "";
    const fullQuery = educationTerm ? `${finalQuery} ${educationTerm}` : finalQuery;
  
    const generatedSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      fullQuery
    )}`;
  
    setSearchQuery(fullQuery);
    setSearchUrl(generatedSearchUrl);
    setShowModal(true);
  };

  // Custom component to render options with flags
  const formatOptionLabel = ({ label }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "8px" }}>{label}</span>
    </div>
  );

  return (
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
              singleValue: (base) => ({
                ...base,
                display: "flex",
                alignItems: "center",
              }),
              option: (base) => ({
                ...base,
                display: "flex",
                alignItems: "center",
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
            formatOptionLabel={formatOptionLabel}
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

        <KeywordInput
          label="Keywords to Include (press Enter to add as pills)"
          keywords={formData.keywordsInclude}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleKeyPress={(e) => handleKeywordAdd(e, "include")}
          removeKeyword={(index) => removeKeyword(index, "include")}
          pillColor="bg-blue-100"
        />

        <KeywordInput
          label="Keywords to Exclude (press Enter to add as pills)"
          keywords={formData.keywordsExclude}
          inputValue={excludeInput}
          setInputValue={setExcludeInput}
          handleKeyPress={(e) => handleKeywordAdd(e, "exclude")}
          removeKeyword={(index) => removeKeyword(index, "exclude")}
          pillColor="bg-red-100"
        />

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
  );
};

export default SearchForm;