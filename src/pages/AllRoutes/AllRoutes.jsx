import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResumeUpload from '../../components/ResumeUpload/ResumeUpload';
import Home from '../Home/Home';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import VideoModal from '../../components/VideoModal/VideoModal';
import ResultOfRsume from '../ResumeAnalysis/ResultOfRsume';

export const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/upload-resume" element={<ResumeUpload />} />
        <Route path="/videoModal" element={<VideoModal />} />
        <Route path='/result-of-resume' element={<ResultOfRsume />} />
      </Routes>
      <Footer />

    </>
  );
};
