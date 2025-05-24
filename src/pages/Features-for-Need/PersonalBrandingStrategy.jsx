import { useState } from 'react';
import { FiCalendar, FiTrendingUp, FiPieChart } from 'react-icons/fi';

const PersonalBrandingStrategy = () => {
  const [formData, setFormData] = useState({
    careerGoals: '',
    skills: '',
    industry: '',
    platforms: ['linkedin'],
    timeCommitment: 'moderate'
  });
  const [strategy, setStrategy] = useState(null);
  const [contentIdeas, setContentIdeas] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const timeCommitments = [
    { value: 'low', label: 'Low (1-2 hours/week)' },
    { value: 'moderate', label: 'Moderate (3-5 hours/week)' },
    { value: 'high', label: 'High (6+ hours/week)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => {
      const newPlatforms = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms: newPlatforms };
    });
  };

  const generateStrategy = () => {
    if (!formData.careerGoals || !formData.skills) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      // Generate strategy
      setStrategy({
        positioning: `Position yourself as a ${formData.skills.split(',')[0]} specialist with expertise in ${formData.industry || 'your industry'}, focused on ${formData.careerGoals.toLowerCase().includes('lead') ? 'leadership and team growth' : 'innovation and problem-solving'}.`,
        differentiators: [
          `Your unique combination of ${formData.skills.split(',').slice(0, 2).join(' and ')}`,
          formData.careerGoals.toLowerCase().includes('change') ? 'Your career transition story' : 'Your measurable achievements',
          'Your perspective on industry trends'
        ],
        platformStrategies: formData.platforms.map(platform => ({
          platform,
          strategy: platform === 'linkedin' ? 'Weekly posts mixing industry insights and personal achievements' :
                    platform === 'twitter' ? 'Daily engagement with industry leaders and trending topics' :
                    'Visual content showcasing your work process and results'
        }))
      });

      // Generate content ideas
      const ideas = [
        `"How I Use ${formData.skills.split(',')[0]} to Solve ${formData.industry || 'Industry'} Challenges"`,
        `"Lessons Learned From ${formData.careerGoals.toLowerCase().includes('lead') ? 'Leading a Team Through Change' : 'My Most Challenging Project'}"`,
        `"${formData.industry || 'Industry'} Trends to Watch in the Next Year"`,
        `"A Day in the Life of a ${formData.skills.split(',')[0]} Professional"`,
        `"Mistakes I Made and What I Learned as a ${formData.skills.split(',')[0]}"`
      ];
      setContentIdeas(ideas);

      // Generate calendar
      const days = ['Monday', 'Wednesday', 'Friday'];
      const types = ['Post', 'Engagement', 'Article'];
      const generatedCalendar = days.map(day => ({
        day,
        type: types[Math.floor(Math.random() * types.length)],
        idea: ideas[Math.floor(Math.random() * ideas.length)]
      }));
      setCalendar(generatedCalendar);

      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Branding Strategy</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Goals*</label>
            <textarea
              rows="2"
              name="careerGoals"
              value={formData.careerGoals}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Become a thought leader, transition to management role, build professional network"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills/Expertise*</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Digital marketing, Data analysis, Leadership"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Separate with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry (optional)</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Technology, Healthcare, Finance"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
            <div className="grid grid-cols-3 gap-2">
              {['linkedin', 'twitter', 'portfolio'].map(platform => (
                <label key={platform} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Commitment</label>
            <select
              name="timeCommitment"
              value={formData.timeCommitment}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {timeCommitments.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={generateStrategy}
            disabled={!formData.careerGoals || !formData.skills || isGenerating}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition ${(!formData.careerGoals || !formData.skills || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? 'Generating Strategy...' : 'Generate Strategy'}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {strategy ? (
            <>
              <div>
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FiTrendingUp className="mr-2" /> Brand Positioning
                </h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-gray-700">{strategy.positioning}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Key Differentiators</h3>
                <ul className="space-y-3">
                  {strategy.differentiators.map((diff, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                        <FiPieChart />
                      </span>
                      <span className="ml-2 text-sm text-gray-700">{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Platform Strategies</h3>
                <div className="space-y-3">
                  {strategy.platformStrategies.map((platform, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-3">
                      <h4 className="font-medium text-gray-800 capitalize">{platform.platform}</h4>
                      <p className="text-sm text-gray-700 mt-1">{platform.strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Content Ideas</h3>
                <div className="grid grid-cols-2 gap-3">
                  {contentIdeas.map((idea, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-sm text-gray-700">{idea}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FiCalendar className="mr-2" /> Sample Content Calendar
                </h3>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Idea</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {calendar.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.day}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.type}</td>
                          <td className="px-3 py-2 text-sm text-gray-700">{item.idea}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
              <FiTrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Enter your career goals and skills to generate a personal branding strategy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalBrandingStrategy;