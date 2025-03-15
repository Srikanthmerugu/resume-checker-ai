import React from "react";
import './Hero.css'
import { FaArrowRightToBracket } from "react-icons/fa6";
import { PiVideoBold } from "react-icons/pi";
import HowItWorks from "../HowItWorks/HowItWorks";

const Hero = () => {
  return (
    <>    <div className="flex flex-col items-center gap-20  justify-center mt-40 ">
      <div className="relative flex flex-col items-center  justify-center ">
        {/* Outer Glow */}
        <div className="absolute bg-shadow-new w-[500px] h-[500px] rounded-full animate-pulse "></div>
        <div className="absolute bg-shadow-new-2 w-[400px] h-[400px] animate-pulse bg-violet-200 opacity-40 rounded-full  "></div>
        <div className="absolute bg-shadow-new-3 w-[300px] h-[300px] animate-pulse bg-purple-200 opacity-30 rounded-full  "></div>
        <div className="absolute w-[300px] h-[300px] animate-pulse bg-white opacity-60 rounded-full"></div>

       
        
        {/* Inner Circle */}
        <div className="relative  flex items-center flex-col justify-center ">
          <h1 className="text-center text-8xl px-4 font-bold text-gray-800">
          AI RESUME SCORER
                  
          
          </h1>
          <p className="text-gray-700 text-4xl mt-10">    Get Resume Relevent Score For Free. </p> 
          <div className="flex items-center gap-5 mt-10">
          <button className="rounded-full border p-3 px-10 bg-black text-white cursor-pointer font-semibold flex items-center  border-2 hover:bg-white hover:text-black  ">Start For Free <span className="px-2"><FaArrowRightToBracket size={25}/>
          </span></button>
          <button className="rounded-full  flex items-center border border-2 p-3 px-10 hover:bg-black hover:text-white cursor-pointer font-semibold">Play Demo Video <span className="px-2"><PiVideoBold size={25} />
          </span> </button>
          </div>
         

         
        </div>
       

      </div>
      <div>
            <p className="text-3xl bg-white w-[800px] text-center">
            Upload your resume and receive an instant <span className="text-sky-900 font-bold">AI-powered</span>  relevance score with expert feedback
            </p>
        </div>


        
    </div>

    <div>
        <HowItWorks />
    </div>

    </>

  );
};

export default Hero;
