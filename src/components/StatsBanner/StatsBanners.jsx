import React, { useState, useEffect, useRef } from 'react';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-default.css'; // Import the default theme (you can choose other themes)

const StatsBanner = () => {
  const [count, setCount] = useState(30871);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const odometerRef = useRef(null);
  const odometerInstance = useRef(null);

  // Initialize odometer when component mounts
  useEffect(() => {
    if (odometerRef.current && !odometerInstance.current) {
      odometerInstance.current = new Odometer({
        el: odometerRef.current,
        value: 0, // Initial value
        format: '(,ddd)', // Format with commas
        duration: 2000, // Animation duration in milliseconds
        theme: 'default' // You can change this to other themes like 'minimal', 'car', etc.
      });

      // Initial animation
      odometerInstance.current.update(count);
      setTimeout(() => setInitialAnimationDone(true), 2000); // Match duration
    }
  }, []);

  // Update count every 5 seconds after initial animation
  useEffect(() => {
    if (!initialAnimationDone) return;

    const interval = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + 1;
        if (odometerInstance.current) {
          odometerInstance.current.update(newCount);
        }
        return newCount;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [initialAnimationDone]);

  return (
    <div className="px-4 py-6 bg-white rounded-lg shadow-sm">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-1">
          <p className="font-medium text-gray-500 tracking-wider uppercase">
          Recruiters using platform daily 
          </p>
          
          <div 
            ref={odometerRef}
            className="text-3xl font-bold text-sky-900 font-[Roboto] inline-block min-w-[150px]"
          >
            {/* Odometer will render here */}
          </div>
          
          {/* <span className="text-2xl text-emerald-500">+</span> */}
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;