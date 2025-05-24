import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NavbarDashboard from './NavbarDashboard';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Changed to 1024 to include tablets

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Close sidebar by default on mobile/tablet
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidde">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isMobile={isMobile} 
      />

      {/* Main Content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${
        isSidebarOpen && !isMobile ? 'ml-64' : 'ml-16'
      }`}>
        {/* Navbar */}
        <NavbarDashboard 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-1px">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Dashboard;