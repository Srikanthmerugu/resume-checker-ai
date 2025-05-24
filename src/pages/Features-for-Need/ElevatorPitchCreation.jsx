import { useState } from 'react';
import { FiMic, FiStar, FiInfo } from 'react-icons/fi';

const ElevatorPitchCreation = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    tone: 'confident'
  });
  const [pitch, setPitch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tones = [
    { value: 'confident', label: 'Confident' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'professional', label: 'Professional' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePitch = () => {
    if (!formData.jobTitle) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const generatedPitch = {
        text: `Hi, I'm [Your Name], a ${formData.jobTitle} with a passion for driving innovation at ${formData.companyName || 'leading companies'}. I've successfully led projects that increased efficiency by 20% and bring a unique blend of technical expertise and strategic vision. I'm excited to contribute my skills to ${formData.companyName || 'your team'} and help achieve transformative results.`,
        tone: formData.tone,
        duration: 'Approximately 30 seconds'
      };
      setPitch(generatedPitch);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-scree">
      <div className="m-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-blue-50 rounded-lg p-2 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Elevator Pitch Creator</h1>
          <p className="text-gray-600 mt-2">
            Create a concise, impactful elevator pitch to showcase your skills and make a memorable impression in networking or interviews.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Craft Your Elevator Pitch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Data Scientist"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (optional)</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Tesla"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {tones.map(tone => (
                    <option key={tone.value} value={tone.value}>{tone.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={generatePitch}
                disabled={!formData.jobTitle || isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${(!formData.jobTitle || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Generating Pitch...
                  </span>
                ) : (
                  'Generate Pitch'
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {pitch ? (
                <>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FiMic className="mr-2" /> Your Elevator Pitch
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-gray-700">{pitch.text}</p>
                      <p className="text-sm text-gray-500 mt-2">Tone: {pitch.tone.charAt(0).toUpperCase() + pitch.tone.slice(1)}</p>
                      <p className="text-sm text-gray-500">Duration: {pitch.duration}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FiStar className="mr-2" /> Pitch Tips
                    </h3>
                    <div className="space-y-3">
                      <div className="border border-gray-200 rounded-md p-3">
                        <h4 className="font-medium text-gray-800">Keep It Concise</h4>
                        <p className="text-sm text-gray-700 mt-1">
                          Aim for a 30-second pitch that captures attention quickly.
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3">
                        <h4 className="font-medium text-gray-800">Highlight Unique Value</h4>
                        <p className="text-sm text-gray-700 mt-1">
                          Focus on what sets you apart and why you’re the perfect fit for the role.
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3">
                        <h4 className="font-medium text-gray-800">Practice Confidence</h4>
                        <p className="text-sm text-gray-700 mt-1">
                          Deliver your pitch with a natural, confident tone to make a lasting impression.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FiInfo className="mr-2" /> Pitch Insights
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <p className="text-sm text-gray-700">
                        A well-crafted elevator pitch can boost your confidence by up to 55% and make a strong impression on recruiters. Tailor your pitch to highlight your career aspirations and unique skills.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
                  <FiMic className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">Enter a job title to generate a 30-second elevator pitch</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorPitchCreation;