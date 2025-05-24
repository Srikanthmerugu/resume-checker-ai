import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "./SearchForm";
import SavedQueries from "./SavedQueries";
import SearchModal from "./SearchModal";
import WidgeLine from "../../components/WidgeLine/WidgeLine";
import NewNavbar from "../../components/navbar/NewNavbar";
import { FiUsers } from "react-icons/fi";

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
    <div className="relative min-h-screen   ">
        {/* <div
          className="absolute inset-0"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
          }}
        /> */}
        {/* Radial Gradient Overlay */}
        {/* <div
          className="absolute inset-0 bg-black"
          style={{
            maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
          }}
        /> */}
      {/* <NewNavbar  className="bg-black relative"/> */}
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <div className=" animate-slide-up  md:mx-auto md:mb-15 mb-2">
      <div className="flex items-center gap-3 mb-2">
          <FiUsers className="text-[#B3C100] text-2xl" />
          <h1 className="text-2xl font-bold text-[#B3C100]">
            Advanced Candidate Search
          </h1>
        </div>
        <p className="relative p-5  text-justify">
          Effortlessly source the best talent using Google's precision search.
          Choose platforms like LinkedIn, Naukri, and Facebook, set advanced
          filters, and generate optimized search queries in seconds. Save and
          reuse top-performing searches with ease! <WidgeLine />
        </p>
      </div> */}



      <div className="bg-blue-50 animate-slide-up rounded-lg p-2 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">            Advanced Candidate Search
          </h1>
          <p className="text-gray-600 mt-2">
          Effortlessly source the best talent using Google's precision search.          </p>
        </div>






      <div className="flex relative flex-col md:flex-row gap-8 max-w-7xl mx-auto">
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