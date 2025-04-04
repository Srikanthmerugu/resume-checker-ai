import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "./SearchForm";
import SavedQueries from "./SavedQueries";
import SearchModal from "./SearchModal";
import WidgeLine from "../../components/WidgeLine/WidgeLine";

const FindCandidate = () => {
  const [formData, setFormData] = useState({
    country: "",
    jobTitle: "",
    keywordsInclude: [],
    keywordsExclude: [],
    education: "",
    currentEmployer: "",
    company: "",
    categories: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [savedQueries, setSavedQueries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedQueries");
    if (saved) setSavedQueries(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    const updatedQueries = [...savedQueries, searchQuery];
    setSavedQueries(updatedQueries);
    localStorage.setItem("savedQueries", JSON.stringify(updatedQueries));
    toast.success("Query saved successfully!");
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
        <SearchForm
          formData={formData}
          setFormData={setFormData}
          setShowModal={setShowModal}
          setSearchQuery={setSearchQuery}
          setSearchUrl={setSearchUrl}
        />

        <SavedQueries savedQueries={savedQueries} />
      </div>

      {showModal && (
        <SearchModal
          searchQuery={searchQuery}
          searchUrl={searchUrl}
          setShowModal={setShowModal}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default FindCandidate;