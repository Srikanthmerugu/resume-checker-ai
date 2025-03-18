import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResumeUpload from '../../components/ResumeUpload/ResumeUpload';
import Home from '../Home/Home';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import VideoModal from '../../components/VideoModal/VideoModal';
import ResultOfRsume from '../ResumeAnalysis/ResultOfRsume';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import ProtectedRoute from '../../components/ProtectedRoute';

export const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/need-recruiter-f1" element={<Home />} />
        <Route path="/need-recruiter-f1/videoModal" element={<VideoModal />} />
        <Route path="/need-recruiter-f1/result-of-resume" element={<ResultOfRsume />} />
        <Route path="/need-recruiter-f1/login" element={<Login />} />
        <Route path="/need-recruiter-f1/register" element={<Register />} /> {/* Fixed route spelling */}

        <Route path="/need-recruiter-f1/upload-resume" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
};
