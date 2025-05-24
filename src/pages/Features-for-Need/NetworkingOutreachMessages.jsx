import { useState } from 'react';
import { FiMail, FiCopy, FiSave } from 'react-icons/fi';

const NetworkingOutreachMessages = () => {
  const [formData, setFormData] = useState({
    targetIndustry: '',
    connectionLevel: 'weak',
    goal: '',
    tone: 'professional',
    commonGround: ''
  });
  const [messages, setMessages] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const connectionLevels = [
    { value: 'weak', label: 'Weak (No prior connection)' },
    { value: 'moderate', label: 'Moderate (Some common ground)' },
    { value: 'strong', label: 'Strong (Mutual connection/prior interaction)' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'casual', label: 'Casual' },
    { value: 'enthusiastic', label: 'Enthusiastic' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateMessages = () => {
    if (!formData.targetIndustry || !formData.goal) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const generatedMessages = [
        {
          title: 'Initial Connection Request',
          content: `Hi [Name],

I came across your profile and noticed your experience in ${formData.targetIndustry}. ${formData.commonGround ? `We both ${formData.commonGround}, which caught my attention. ` : ''}I'd love to connect and learn more about your journey.

${formData.goal.includes('job') ? 'I’m currently exploring opportunities in this space and would appreciate any insights.' : 
formData.goal.includes('advice') ? 'I’d appreciate any advice you might have for someone looking to grow in this field.' : 
'Looking forward to connecting!'}

Best,
[Your Name]`
        },
        {
          title: 'Follow-Up Message',
          content: `Hi [Name],

Thank you for connecting! ${formData.commonGround ? `Given our shared ${formData.commonGround}, ` : ''}I'd love to hear more about your experience in ${formData.targetIndustry}.

${formData.goal.includes('job') ? 'I’m particularly interested in learning about how you got started in this field and any advice for someone looking to make a transition.' : 
formData.goal.includes('advice') ? 'Would you be open to a quick 15-minute chat in the coming weeks to share your perspective?' : 
'Looking forward to staying in touch!'}

Best,
[Your Name]`
        },
        {
          title: 'Informational Interview Request',
          content: `Hi [Name],

I hope this message finds you well. ${formData.commonGround ? `As someone who also ${formData.commonGround}, ` : ''}I’ve been admiring your work in ${formData.targetIndustry} and would love to learn from your experience.

Would you be available for a 20-30 minute virtual coffee chat in the coming weeks to share your insights? ${formData.goal.includes('job') ? 'I’m exploring career opportunities in this space and would value your perspective.' : ''}

Thank you for considering this request. I completely understand if you’re unavailable.

Best regards,
[Your Name]`
        }
      ];
      
      setMessages(generatedMessages);
      setIsGenerating(false);
    }, 1500);
  };

  const saveTemplate = (message) => {
    setSavedTemplates(prev => [...prev, {
      name: `${message.title} - ${formData.targetIndustry}`,
      content: message.content
    }]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Networking Outreach Messages</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Industry/Role*</label>
            <input
              type="text"
              name="targetIndustry"
              value={formData.targetIndustry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Tech, Marketing, Healthcare"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Connection Level</label>
            <select
              name="connectionLevel"
              value={formData.connectionLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {connectionLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Goal*</label>
            <textarea
              rows="2"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Get career advice, learn about job opportunities, expand network"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Common Ground (optional)</label>
            <input
              type="text"
              name="commonGround"
              value={formData.commonGround}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. attended the same university, worked at the same company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message Tone</label>
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
            onClick={generateMessages}
            disabled={!formData.targetIndustry || !formData.goal || isGenerating}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition ${(!formData.targetIndustry || !formData.goal || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? 'Generating Messages...' : 'Generate Messages'}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <h3 className="font-medium text-gray-700">Generated Messages</h3>
          
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">{message.title}</h4>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => navigator.clipboard.writeText(message.content)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="Copy message"
                      >
                        <FiCopy size={16} />
                      </button>
                      <button 
                        onClick={() => saveTemplate(message)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="Save as template"
                      >
                        <FiSave size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{message.content}</pre>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
              <FiMail className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Enter your networking details to generate outreach messages</p>
            </div>
          )}

          {savedTemplates.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Saved Templates</h4>
              <ul className="space-y-2">
                {savedTemplates.map((template, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100">
                    <span className="text-sm">{template.name}</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => navigator.clipboard.writeText(template.content)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkingOutreachMessages;