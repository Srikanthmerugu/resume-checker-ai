import { useState } from 'react';
import { FiDollarSign, FiTrendingUp, FiInfo } from 'react-icons/fi';

const SalaryNegotiation = () => {
  const [formData, setFormData] = useState({
    currentRole: '',
    desiredRole: '',
    experienceLevel: 'mid',
    location: '',
    currentSalary: ''
  });
  const [strategies, setStrategies] = useState([]);
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 0, avg: 0 });
  const [scripts, setScripts] = useState([]);
  const [confidence, setConfidence] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-7 years)' },
    { value: 'senior', label: 'Senior Level (8+ years)' },
    { value: 'executive', label: 'Executive' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateStrategy = () => {
    if (!formData.desiredRole) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Generate salary range based on role and experience
      const base = formData.experienceLevel === 'entry' ? 50000 : 
                  formData.experienceLevel === 'mid' ? 80000 : 
                  formData.experienceLevel === 'senior' ? 120000 : 180000;
      
      setSalaryRange({
        min: Math.round(base * 0.8),
        max: Math.round(base * 1.3),
        avg: Math.round(base * 1.05)
      });

      // Generate strategies
      setStrategies([
        'Research shows the market range for this role is $' + 
          Math.round(base * 0.8).toLocaleString() + ' - $' + 
          Math.round(base * 1.3).toLocaleString() + '. Aim for the top 25% of this range.',
        'Highlight 2-3 key accomplishments that demonstrate your value.',
        'Consider the total compensation package (bonuses, equity, benefits) not just base salary.',
        'Practice your negotiation conversation with a friend to build confidence.'
      ]);

      // Generate scripts
      setScripts([
        {
          title: 'Initial Response to Offer',
          content: `"Thank you for the offer. I'm excited about the opportunity to work as a ${formData.desiredRole} at [Company]. Based on my research and experience, I was expecting something in the range of $${Math.round(base * 1.1).toLocaleString()} to $${Math.round(base * 1.25).toLocaleString()}. Is there flexibility in the offer?"`
        },
        {
          title: 'Countering a Low Offer',
          content: `"I appreciate the offer. While I'm very interested in this role, the compensation is below market rate for someone with my [specific skills/experience]. Would you be open to discussing an increase to $${Math.round(base * 1.15).toLocaleString()} to better align with industry standards?"`
        },
        {
          title: 'Non-Salary Negotiation',
          content: `"If the salary is fixed at this stage, I'd be interested in discussing other aspects of the compensation package. Would you consider increasing the [bonus/equity/PTO/professional development budget] to make the offer more competitive?"`
        }
      ]);

      // Set confidence based on inputs
      setConfidence(formData.currentSalary ? Math.min(80, Math.floor(Math.random() * 30) + 50) : Math.floor(Math.random() * 30) + 30);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Salary Negotiation Strategy</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Role (optional)</label>
            <input
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Marketing Specialist"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desired Role*</label>
            <input
              type="text"
              name="desiredRole"
              value={formData.desiredRole}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Marketing Manager"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {experienceLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location (optional)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. San Francisco, CA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary (optional)</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleChange}
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">USD</span>
              </div>
            </div>
          </div>

          <button
            onClick={generateStrategy}
            disabled={!formData.desiredRole || isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition ${(!formData.desiredRole || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Generating Strategy...' : 'Generate Strategy'}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {salaryRange.avg > 0 ? (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-3">Market Salary Range</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Minimum</p>
                    <p className="text-lg font-bold">${salaryRange.min.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average</p>
                    <p className="text-lg font-bold text-blue-600">${salaryRange.avg.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Maximum</p>
                    <p className="text-lg font-bold">${salaryRange.max.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Your Target Range</span>
                    <span>${Math.round(salaryRange.avg * 1.1).toLocaleString()} - ${Math.round(salaryRange.avg * 1.25).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Negotiation Confidence</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${confidence > 70 ? 'bg-green-500' : confidence > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 font-bold text-gray-700">{confidence}%</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {confidence > 70 ? 'High confidence! You have strong negotiation leverage.' : 
                   confidence > 40 ? 'Moderate confidence. Consider more preparation.' : 
                   'Low confidence. Focus on building your case with market data.'}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FiTrendingUp className="mr-2" /> Key Strategies
                </h3>
                <ul className="space-y-3">
                  {strategies.map((strategy, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                        <FiInfo />
                      </span>
                      <span className="ml-2 text-sm text-gray-700">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Negotiation Scripts</h3>
                <div className="space-y-3">
                  {scripts.map((script, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <h4 className="font-medium text-gray-800 mb-2">{script.title}</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{script.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
              <FiDollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Enter your desired role to generate salary negotiation strategies</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryNegotiation;