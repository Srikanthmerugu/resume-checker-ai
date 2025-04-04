import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const StatsBanner = () => {
  const [count, setCount] = useState(30871);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);

  // Increment by 1 every 5 seconds (after initial animation)
  useEffect(() => {
    if (!initialAnimationDone) return; // Skip until initial animation completes

    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [initialAnimationDone]);

  return (
    <div className="px-4 py-6 bg-white rounded-lg shadow-sm">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-1">
          <p className="font-medium text-gray-500 tracking-wider uppercase">
            Active users - 
          </p>
          
          {!initialAnimationDone ? (
            <CountUp
              end={count}
              duration={2}
              separator=","
              onEnd={() => setInitialAnimationDone(true)}
              className="text-3xl font-bold text-sky-900 font-[Roboto]"
            />
          ) : (
            <span className="text-3xl font-bold text-sky-900 font-[Roboto]">
              {count.toLocaleString()}
            </span>
          )}
          
          <span className="text-2xl text-emerald-500">+</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;