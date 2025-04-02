import React from 'react'
import CountUp from 'react-countup'

const StatsBanner = () => {
  return (
    <div className="px-4 py-6 bg-white rounded-lg shadow-sm">
      <div className="text-center space-y-2">
        {/* <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">
          AI-Validated Active Candidates
        </p> */}
        <div className="flex items-center justify-center gap-1">
        <p className=" font-medium text-gray-500 tracking-wider uppercase">
         Active Candidates - 
        </p>
          <CountUp
            end={30871}
            duration={2}
            separator=","
            className="text-3xl font-bold text-sky-900 font-[Roboto]"
          />
          <span className="text-2xl text-emerald-500">+</span>
        </div>
      
      </div>
    </div>
  )
}

export default StatsBanner