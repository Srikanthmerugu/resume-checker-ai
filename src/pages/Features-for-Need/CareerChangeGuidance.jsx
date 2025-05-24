import { useState } from 'react';
import {  FiBarChart2, FiInfo } from 'react-icons/fi';

const CareerChangeGuidance = () => {
  const [formData, setFormData] = useState({
    currentIndustry: '',
    desiredIndustry: ''
  });
  const [roadmap, setRoadmap] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRoadmap = () => {
    if (!formData.currentIndustry || !formData.desiredIndustry) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const generatedRoadmap = {
        steps: [
          {
            title: 'Research the Desired Industry',
            description: `Investigate ${formData.desiredIndustry} trends, key players, and required skills through online resources and informational interviews.`
          },
          {
            title: 'Identify Transferable Skills',
            description: `Map your ${formData.currentIndustry} experience to ${formData.desiredIndustry} needs, focusing on skills like problem-solving or leadership.`
          },
          {
            title: 'Upskill and Certify',
            description: `Enroll in relevant courses or certifications for ${formData.desiredIndustry} to bridge skill gaps.`
          },
          {
            title: 'Network in the New Industry',
            description: `Attend ${formData.desiredIndustry} events and connect with professionals on LinkedIn to build relationships.`
          },
          {
            title: 'Apply and Transition',
            description: `Tailor your resume and pitch for ${formData.desiredIndustry} roles, starting with entry-level or transitional positions if needed.`
          }
        ],
        timeline: '6-12 months'
      };

      const generatedSkillGap = {
        currentSkills: ['Project Management', 'Communication', 'Problem-Solving'],
        requiredSkills: [`${formData.desiredIndustry}-specific Knowledge`, 'Technical Skills', 'Industry Networking'],
        gaps: [
          {
            skill: `${formData.desiredIndustry}-specific Knowledge`,
            action: `Take online courses or attend workshops in ${formData.desiredIndustry}.`
          },
          {
            skill: 'Technical Skills',
            action: `Learn tools or software common in ${formData.desiredIndustry} (e.g., Python for Tech).`
          },
          {
            skill: 'Industry Networking',
            action: `Join ${formData.desiredIndustry} groups and attend relevant events.`
          }
        ]
      };

      setRoadmap(generatedRoadmap);
      setSkillGap(generatedSkillGap);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Career Change Guidance</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Industry*</label>
            <input
              type="text"
              name="currentIndustry"
              value={formData.currentIndustry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Retail"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desired Industry*</label>
            <input
              type="text"
              name="desiredIndustry"
              value={formData.desiredIndustry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Technology"
              required
            />
          </div>

          <button
            onClick={generateRoadmap}
            disabled={!formData.currentIndustry || !formData.desiredIndustry || isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition ${(!formData.currentIndustry || !formData.desiredIndustry || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Generating Roadmap...' : 'Generate Roadmap'}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {roadmap && skillGap ? (
            <>
              <div>
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FiInfo className="mr-2" /> Transition Roadmap
                </h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-gray-700 mb-2">Estimated Timeline: {roadmap.timeline}</p>
                  {roadmap.steps.map((step, index) => (
                    <div key={index} className="mb-3">
                      <h4 className="font-medium text-gray-800">{index + 1}. {step.title}</h4>
                      <p className="text-sm text-gray-700">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FiBarChart2 className="mr-2" /> Skill Gap Analysis
                </h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-md p-3">
                    <h4 className="font-medium text-gray-800">Current Skills</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {skillGap.currentSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3">
                    <h4 className="font-medium text-gray-800">Required Skills</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {skillGap.requiredSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3">
                    <h4 className="font-medium text-gray-800">Skill Gaps and Actions</h4>
                    <div className="space-y-2">
                      {skillGap.gaps.map((gap, index) => (
                        <div key={index}>
                          <p className="text-sm text-gray-700 font-medium">{gap.skill}</p>
                          <p className="text-sm text-gray-600">{gap.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FiInfo className="mr-2" /> Career Change Insights
                </h3>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-700">
                    Transitioning from {formData.currentIndustry} to {formData.desiredIndustry} requires strategic planning. Research shows that 80% of successful career changers leverage networking and upskilling to bridge gaps, making them 50% more likely to secure roles in their desired field.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
              <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Enter your current and desired industries to generate a career transition roadmap</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerChangeGuidance;