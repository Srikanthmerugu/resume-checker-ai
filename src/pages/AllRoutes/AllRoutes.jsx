import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResumeUpload from '../../components/ResumeUpload/ResumeUpload';
import Home from '../Home/Home';
import Footer from '../../components/Footer/Footer';
import VideoModal from '../../components/VideoModal/VideoModal';
import ResultOfRsume from '../ResumeAnalysis/ResultOfRsume';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import ProtectedRoute from '../../components/ProtectedRoute';
import FindCandidate from '../FindCandiate/FindCandidatenew';
import JobPostComponent from '../JobPostComponent/JobPostComponent';
import FindAJob from '../FindaJob/FindAJob';
import FindAllJobs from '../FindaJob/FindAllJobs';
import SingleJobPost from '../FindaJob/SingleJobPost/SingleJobPost';
import LinkedInProfileEnhancement from '../Features-for-Need/LinkedInProfileEnhancement';
import DashboardItems from '../../Dashboard/DashboardItems';
import Dashboard from '../../Dashboard/Dashboard';
import InterviewPrepAccordion from '../ResumeAnalysis/InterviewPrepAccordion';
import InterviewQuestions from '../Features-for-Need/InterviewQuestions';
import CoverLetterCreation from '../Features-for-Need/CoverLetterCreation';
import ElevatorPitchCreation from '../Features-for-Need/ElevatorPitchCreation';
import MockInterview from '../Features-for-Need/MockInterview';
import NetworkingOutreachMessages from '../Features-for-Need/NetworkingOutreachMessages';
import PersonalBrandingStrategy from '../Features-for-Need/PersonalBrandingStrategy';
import SalaryNegotiation from '../Features-for-Need/SalaryNegotiation';
import ResumeOptimization from '../Features-for-Need/ResumeOptimization';
import CareerChangeGuidance from '../Features-for-Need/CareerChangeGuidance';

// Helper component to wrap public routes with footer
const PublicRoute = ({ element }) => (
  <>
    {element}
    <Footer />
  </>
);

export const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Footer */}
      <Route path="/" element={<PublicRoute element={<Home />} />} />
      <Route path="/videoModal" element={<PublicRoute element={<VideoModal />} />} />
      <Route path="/find-all-jobs" element={<PublicRoute element={<FindAllJobs />} />} />
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/register" element={<PublicRoute element={<Register />} />} />

      {/* Protected Routes (no footer) */}
      <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardItems />} />
        <Route path="/upload-resume" element={<ResumeUpload />} />
        <Route path="/job-post" element={<JobPostComponent />} />
        <Route path="/result-of-resume" element={<ResultOfRsume />} />
        <Route path="/findCandidate" element={<FindCandidate />} />
        <Route path="/find-a-Jobs" element={<FindAJob />} />
        <Route path="/jobs/:id" element={<SingleJobPost />} />
        <Route path="/linkedIn-profile-enhancement" element={<LinkedInProfileEnhancement />} />
        <Route path="/InterviewPreparation" element={<InterviewQuestions />} />
        <Route path="/cover-letter-creation" element={<CoverLetterCreation />} />
        <Route path="/elevator-pitch-creation" element={<ElevatorPitchCreation />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/networking-outreach-messages" element={<NetworkingOutreachMessages />} />
        <Route path="/personal-branding-strategy" element={<PersonalBrandingStrategy />} />
        <Route path="/salary-negotiation" element={<SalaryNegotiation />} />
        {/* <Route path="/RecruiterSourcingStrategy" element={<RecruiterSourcingStrateg />} /> */}
        <Route path="/ResumeOptimization" element={<ResumeOptimization />} />
        <Route path="/career-change-guidance" element={<CareerChangeGuidance />} />
      </Route>
    </Routes>
  );
};