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
        <Route path="/need-recruiter-f1" element={<Home />} />
        <Route path="/need-recruiter-f1/videoModal" element={<VideoModal />} />
        {/* <Route path="/need-recruiter-f1/result-of-resume" element={<ResultOfRsume />} /> */}
        <Route path="/need-recruiter-f1/login" element={<Login />} />
        <Route path="/need-recruiter-f1/register" element={<Register />} /> 
        {/* <Route path="/need-recruiter-f1/findCandidate" element={<FindCandidate />} />  */}


        <Route path="/need-recruiter-f1/upload-resume" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
        <Route path="/need-recruiter-f1/result-of-resume" element={<ProtectedRoute><ResultOfRsume /></ProtectedRoute>} />
        <Route path="/need-recruiter-f1/findCandidate" element={<ProtectedRoute><FindCandidate /></ProtectedRoute>} />
      </Routes>

       
      <Footer />
    </>
  );
};
