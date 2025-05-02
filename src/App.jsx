import { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllRoutes } from './pages/AllRoutes/AllRoutes';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './ScrollToTop';
import './Animations.css'
import './App.css'
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa6';

function App() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const trackVisit = async () => {
      // 1. Get or create visitor ID (using localStorage)
      let visitorId = localStorage.getItem('visitorId');
      const isNewVisitor = !visitorId;
      
      if (!visitorId) {
        visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('visitorId', visitorId);
      }

      // 2. Prepare tracking data
      const trackingData = {
        visitor_id: visitorId,
        ip_address: 'unknown',
        user_agent: navigator.userAgent,
        is_new_visitor: isNewVisitor
      };

      try {
        // 3. Get IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
        trackingData.ip_address = ip;
      } catch (error) {
        // console.log("IP detection failed");
      }

      try {
        // 4. Send to your tracking API
        const response = await fetch('https://demo.needrecruiter.com/need-recruiter/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trackingData)
        });

        const result = await response.json();
        
        // 5. If your API returns visitor count, update state
        if (result.total_visitors) {
          setVisitorCount(result.total_visitors);
        }
      } catch (error) {
        // console.log("Tracking failed", error);
      }
    };

    trackVisit();
    
    // 6. Optional: Fetch current visitor count on load
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('https://demo.needrecruiter.com/need-recruiter/api/visitor-count');
        const { count } = await response.json();
        setVisitorCount(count);
      } catch (error) {
        // console.log("Couldn't fetch visitor count");
      }
    }; 
    
    fetchVisitorCount();
  }, []);

  return (
    <>
      {/* <div className="visitor-counter">
        Total Visitors: {visitorCount}
      </div> */}
      
      <ToastContainer
        style={{ zIndex: 9999999, marginTop: "60px" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        newestOnTop
      />

      <ScrollToTop />
      
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
     <ScrollToTop />
    </>
  );
}

export default App;