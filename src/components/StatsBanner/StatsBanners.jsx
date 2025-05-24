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
    <div className="px-4 py-6  rounded-lg ">
      <div className="text-center space-y-2">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="font-medium text-sm text-white tracking-wider uppercase">
            Active users - 
          </p>
          
          {!initialAnimationDone ? (
            <CountUp
              end={count}
              duration={2}
              separator=","
              onEnd={() => setInitialAnimationDone(true)}
              className="text-3xl font-bold text-gray-50 font-[Roboto]"
            />
          ) : (
            <span className="text-3xl font-bold text-gray-200 font-[Roboto]">
              {count.toLocaleString()}          <span className="text-2xl text-emerald-500">+</span>

            </span>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;