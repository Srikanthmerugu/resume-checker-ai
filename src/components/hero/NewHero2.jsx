import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import NewNavbar from "./NewNavbar";

function LandingPage() {
  const avatars = [
    { id: 1, label: "John Doe" },
    { id: 2, label: "Emma Smith" },
    { id: 3, label: "Michael Johnson" },
    { id: 4, label: "Olivia Brown" },
  ];

  return (
    <div>
      <NewNavbar />
      <div className="relative min-h-screen  flex items-center justify-center overflow-hidden">
        {/* Background Gradient Blur */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        {/* Decorative Arrows */}
        <div className="absolute left-20 top-1/3 transform -translate-y-1/2">
          <div className="relative ">
            <span className="absolute w-[123px] -top-17 left-22 bg-sky-100 text-blue-600 text-xs font-medium px-7 py-2 rounded-full animate-[floatLR_3s_ease-in-out_infinite] ">
FIND A JOB            </span>
            <span className="absolute -top-21 left-53  text-blue-100 text-xs font-medium  rounded-full animate-[floatLR_3s_ease-in-out_infinite]">
              
              <FaLocationArrow className="text-sky-400 " size={20} />
            </span>
          </div>
        </div>
        <div className="absolute right-20 top-2/3 transform -translate-y-1/2">
          <div className="relative">
            <span className="absolute -top-7 right-22 w-[130px] bg-pink-600 text-white text-xs font-medium px-7 py-2 rounded-full animate-[floatLR_3s_ease-in-out_infinite]">
  POST A JOB </span>

            <span className="absolute -top-11 right-18 text-blue-100 text-xs font-medium rounded-full animate-[floatLR_3s_ease-in-out_infinite]">
              <FaLocationArrow className="text-pink-600" size={20} />
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Testimonial Section */}
          <div className="absolute -top-15 left-55 transform translate-x-1/4 -translate-y-1/2 flex items-center space-x-2 bg-white rounded-full shadow-lg px-4 py-2">
            {/* <div className="flex -space-x-2">
            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745835074~exp=1745838674~hmac=9b057abf87b1d7061a2514f10a33e848ef68b46a2f7d39fe3e2d2d231d42dc06&w=740" alt="Avatar 1" className="w-8 h-8 rounded-full border-2 border-sky-300" />
            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745835074~exp=1745838674~hmac=9b057abf87b1d7061a2514f10a33e848ef68b46a2f7d39fe3e2d2d231d42dc06&w=740" alt="Avatar 2" className="w-8 h-8 rounded-full border-2 border-sky-300" />
            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745835074~exp=1745838674~hmac=9b057abf87b1d7061a2514f10a33e848ef68b46a2f7d39fe3e2d2d231d42dc06&w=740" alt="Avatar 3" className="w-8 h-8 rounded-full border-2 border-sky-300" />
            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745835074~exp=1745838674~hmac=9b057abf87b1d7061a2514f10a33e848ef68b46a2f7d39fe3e2d2d231d42dc06&w=740" alt="Avatar 4" className="w-8 h-8 rounded-full border-2 border-sky-300" />
          </div> */}

            <div className="flex -space-x-2">
              {avatars.map((avatar) => (
                <div key={avatar.id}>
                  <img
                    data-tooltip-id={`tooltip-${avatar.id}`}
                    data-tooltip-content={avatar.label}
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745835074~exp=1745838674~hmac=9b057abf87b1d7061a2514f10a33e848ef68b46a2f7d39fe3e2d2d231d42dc06&w=740"
                    alt={avatar.label}
                    className="w-8 h-8 rounded-full border-2 border-sky-700 cursor-pointer"
                  />
                  <ReactTooltip
                    id={`tooltip-${avatar.id}`}
                    place="top"
                    className="!bg-sky-500 !text-white !text-xs !px-2 !py-1 !rounded"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="text-sky-800 font-medium">Top Product Review</p>
              <p className="text-gray-500">Over 37,000+ users</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-green-500"
            >
              <path
                d="M8 0L10.35 5.64L16 6.16L11.64 9.76L12.7 15.36L8 12.64L3.3 15.36L4.36 9.76L0 6.16L5.65 5.64L8 0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-sky-950 text-center leading-tight mb-8">
            Boost your hiring
            <br />
            process with AI solution
          </h1>

          {/* AI Resume Checker Button */}
          <button className="bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:from-sky-600 hover:to-sky-800 transition-colors border-8 border-sky-300">
          AI Resume Analyzer
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
