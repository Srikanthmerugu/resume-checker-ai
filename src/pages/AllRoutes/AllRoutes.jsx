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
import FindCandidate from '../FindCandiate/FindCandidate';

export const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videoModal" element={<VideoModal />} />
        {/* <Route path=" /result-of-resume" element={<ResultOfRsume />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        {/* <Route path=" /findCandidate" element={<FindCandidate />} />  */}


        <Route path="/upload-resume" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
        <Route path="/result-of-resume" element={<ProtectedRoute><ResultOfRsume /></ProtectedRoute>} />
        <Route path="/findCandidate" element={<ProtectedRoute><FindCandidate /></ProtectedRoute>} />
      </Routes>

       
      <Footer />
    </>
  );
};
