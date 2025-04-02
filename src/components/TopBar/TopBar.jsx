import React from 'react';

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Left side - could be logo or other elements */}
      <div className="text-xl font-bold text-blue-600">YourLogo</div>
      
      {/* Right side navigation */}
      <div className="flex space-x-4">
        <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
          Find a
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
          Find a job
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add a job
        </button>
      </div>
    </div>
  );
};

export default TopBar;