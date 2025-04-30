import React from 'react';
import { FaBullhorn, FaComments, FaExchangeAlt, FaFileAlt, FaHandshake, FaLinkedin, FaPen, FaQuestionCircle, FaUserClock, FaUserTie } from 'react-icons/fa';

const DropdonwMenu = () => {
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
    <div className="bg-gradient-to-b from-gray-700 rounded-b-lg to-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-lg font-semibold text-white mb-6">Features</h3>
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
                <div className="flex items-start space-x-3">
                  <Icon className="text-white text-2xl group-hover:animate-bounce" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
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
    </div>
  );
};

export default DropdonwMenu;