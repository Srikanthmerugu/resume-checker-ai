import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaLightbulb, FaMagic, FaEdit, FaShareAlt } from 'react-icons/fa';

const GPTJobPrompts = () => {
  const steps = [
    {
      title: 'Choose Your Writing Project',
      description: "Don't settle for uninspired content! Good posts help your brand effectively",
      icon: <FaLightbulb />,
    },
    {
      title: 'Give MuAI a bit of context',
      description: "It's a powerful tool designed to help you craft unique posts",
      icon: <FaMagic />,
    },
    {
      title: 'Edit and polish to perfection',
      description: "It could be any topic that resonates with your audience",
      icon: <FaEdit />,
    },
    {
      title: 'Publish your Social Post',
      description: "Generate social media content with the click of a button",
      icon: <FaShareAlt />,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Working Process</h2>
        <h3 className="text-2xl font-semibold text-purple-600">
          Create Engaging Social Media Content in 4 Steps
        </h3>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <VerticalTimeline layout="1-column" lineColor="rgba(149, 85, 245, 0.5)">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: 'linear-gradient(to right, rgba(149, 85, 245, 0.1), rgba(149, 85, 245, 0.2))',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '24px',
                  width: '300px',
                  transition: 'all 0.3s ease-in-out',
                }}
                contentArrowStyle={{ borderRight: '10px solid rgba(149, 85, 245, 0.1)' }}
                iconStyle={{ background: 'rgba(149, 85, 245, 0.8)', color: '#fff', fontSize: '20px' }}
                icon={step.icon}
                date={<span className="text-purple-600 font-bold">{index + 1}</span>}
              >
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
              </VerticalTimelineElement>
              {index < steps.length - 1 && (
                <div className="absolute right-[-40px] top-[50%] translate-y-[-50%] w-20 h-0.5 bg-gray-300">
                  <svg
                    className="absolute -left-2 top-[-5px]"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10H15M15 10L12 7M15 10L12 13"
                      stroke="rgba(149, 85, 245, 0.5)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default GPTJobPrompts;