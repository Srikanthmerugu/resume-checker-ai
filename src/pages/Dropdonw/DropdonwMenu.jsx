import React from 'react';
import { FaBullhorn, FaComments, FaExchangeAlt, FaFileAlt, FaHandshake, FaLinkedin, FaPen, FaQuestionCircle, FaUserClock, FaUserTie } from 'react-icons/fa';
import { NewLogo2 } from '../../assets/Assets';

const DropdonwMenu = () => {
  const sparkleCount = 40;

  const features = [
    {
      icon: FaFileAlt,  // You can change this icon if you have a better one
      title: 'Resume Optimization',
      description: 'Analyze my resume and provide tailored improvements to align with job requirements',
      href: '#Optimization', 
    },
    {
      icon: FaPen,  // Assuming you have FaPen from react-icons
      title: 'Cover Letter Creation',
      description: 'Craft a compelling, personalized cover letter for specific job applications',
      href: '#',
    },
    {
      icon: FaQuestionCircle,
      title: 'Interview Questions',
      description: 'Generate a list of the top 20 interview questions for your target position',
      href: '#',
    },
    {
      icon: FaHandshake,
      title: 'Salary Negotiation Strategy',
      description: 'Help me craft a strong salary negotiation strategy based on market rates',
      href: '#',
    },
    {
      icon: FaLinkedin,  // For LinkedIn specific icon
      title: 'LinkedIn Profile Enhancement',
      description: 'Revise my LinkedIn profile summary and experience to attract recruiters',
      href: '#',
    },
    {
      icon: FaComments,
      title: 'Networking Outreach Messages',
      description: 'Write professional yet friendly LinkedIn connection messages',
      href: '#',
    },
    {
      icon: FaUserTie,
      title: 'Personal Branding Strategy',
      description: 'Develop a personal branding strategy to stand out in my industry',
      href: '#',
    },
    {
      icon: FaUserClock,
      title: 'Mock Interview',
      description: 'Act as a hiring manager for a specific role to conduct practice interviews',
      href: '#',
    },
    {
      icon: FaExchangeAlt,
      title: 'Career Change Guidance',
      description: 'Provide transition strategies when moving between industries',
      href: '#',
    },
    {
      icon: FaBullhorn,
      title: 'Elevator Pitch Creation',
      description: 'Help me craft a compelling 30-second elevator pitch for networking',
      href: '#',
    }
];

  return (
    <div className="bg-gradient-to-b from-black rounded-b-lg to-gray-900 py-12 h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-lg font-semibold text-white mb-6">All Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <a
                key={index}
                href={feature.href}
                className="feature-card border border-gray-600/50 rounded-lg p-4 bg-gray-800/50 hover:bg-gray-700/50 hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3 icon-group">
                  <span className=' w-10 h-10 rounded-full p-2  bg-blue-700'>                  <Icon className="text-white rounded-full text-2xl icon-group-hover:text-3xl group-hover:animate-bounce" />
</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{feature.description.substring(0, 35)} <span className='text-blue-500'>More..</span>
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          .feature-card {
            animation: fadeInUp 0.5s ease-out forwards;
          }
          .feature-card:hover {
            border-color: transparent;
            box-shadow: 0 0 15px rgba(14, 165, 233, 0.5); /* sky-500 glow */
          }
          .group-hover\\:animate-bounce {
            animation: bounce 0.5s ease-in-out;
          }
        `}
      </style>


      <style>
        {`
          /* Simulate sparkles with animated pseudo-elements */
          @keyframes sparkle {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0);
            }
          }

          .sparkle-container {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .sparkle {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 2s infinite;
          }

          /* Define styles for each sparkle with varied positions, sizes, and delays */
          ${Array.from({ length: sparkleCount }, (_, index) => `
            .sparkle:nth-child(${index + 1}) {
              width: ${Math.random() * 6 + 2}px; /* Random size between 2px and 8px */
              height: ${Math.random() * 6 + 2}px;
              top: ${Math.random() * 100}%; /* Random vertical position */
              left: ${Math.random() * 100}%; /* Random horizontal position */
              animation-delay: ${Math.random() * 2}s; /* Random delay between 0 and 2s */
              animation-duration: ${Math.random() * 1 + 1.5}s; /* Random duration between 1.5s and 2.5s */
            }
          `).join('\n')}
        `}
      </style>

      {/* Heading */}
      <h1 
      className="md:text-7xl mt-20 text-3xl lg:text-6xl font-bold text-center text-white relative z-20"
      >
        Need Recruiter
      </h1>
      {/* <div className='flex justify-center'>   <img       className="md:w-79 mx-auto flex  mt-20 text-3xl lg:text-6xl font-bold text-center text-white relative z-20"
 src={NewLogo2}  /></div> */}
   

      {/* Gradient and Sparkles Container */}
      <div className="w-full mx-auto h-40  relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Simulated Sparkles */}
        <div className="sparkle-container">
          {Array.from({ length: sparkleCount }, (_, index) => (
            <div key={index} className="sparkle"></div>
          ))}
        </div>

        {/* Radial Gradient to prevent sharp edges */}
        <div
          className="absolute inset-0 w-full h-ful "
          style={{
            maskImage: "radial-gradient(350px 200px at top, transparent 20%, white)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default DropdonwMenu;