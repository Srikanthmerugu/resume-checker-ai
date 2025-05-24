import { useState } from 'react';
import { FiFilter, FiCopy } from 'react-icons/fi';

const InterviewQuestions = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    focusArea: 'behavioral',
    industry: ''
  });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = {
    all: 'All Questions',
    behavioral: 'Behavioral',
    technical: 'Technical',
    situational: 'Situational',
    company: 'Company Specific'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateQuestions = () => {
    if (!formData.jobTitle) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const generatedQuestions = [
        { id: 1, question: 'Tell me about yourself.', category: 'behavioral' },
        { id: 2, question: 'What interests you about this position at ' + (formData.companyName || 'our company') + '?', category: 'behavioral' },
        { id: 3, question: 'Describe a time you faced a challenge at work and how you overcame it.', category: 'behavioral' },
        { id: 4, question: 'How would you handle [RELEVANT SCENARIO] in this role?', category: 'situational' },
        { id: 5, question: 'What do you know about ' + (formData.companyName || 'our company') + ' and our products/services?', category: 'company' },
        { id: 6, question: 'Explain your experience with [RELEVANT SKILL].', category: 'technical' },
        { id: 7, question: 'Where do you see yourself in 5 years?', category: 'behavioral' },
        { id: 8, question: 'How do you prioritize your work when you have multiple deadlines?', category: 'situational' },
        { id: 9, question: 'What would you do in your first 30 days in this role?', category: 'situational' },
        { id: 10, question: 'What is your greatest strength and how would it apply to this role?', category: 'behavioral' }
      ];
      
      setQuestions(generatedQuestions);
      setAnswers({});
      setIsLoading(false);
    }, 1500);
  };

  const generateAnswer = (questionId) => {
    // Simulate answer generation
    setAnswers(prev => ({
      ...prev,
      [questionId]: `This is a sample answer for the question about "${questions.find(q => q.id === questionId)?.question}". Tailor this response to your specific experiences and skills. Highlight relevant achievements and quantify results when possible.`
    }));
  };

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <div className=" mx-auto">
        {/* Header Card */}
        <div className="bg-blue-50 rounded-lg p-2 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Interview Questions Generator</h1>
          <p className="text-gray-600 mt-2">
            Generate tailored interview questions for your job role to prepare effectively and impress recruiters.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Interview Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Product Manager"
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
                  placeholder="e.g. Amazon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Focus Area</label>
                <select
                  name="focusArea"
                  value={formData.focusArea}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="behavioral">Behavioral</option>
                  <option value="technical">Technical</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry (optional)</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Tech, Healthcare"
                />
              </div>

              <button
                onClick={generateQuestions}
                disabled={!formData.jobTitle || isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition ${(!formData.jobTitle || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Generating Questions...' : 'Generate Questions'}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200">
                <div className="flex space-x-4">
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'questions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('questions')}
                  >
                    Questions
                  </button>
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'answers' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('answers')}
                  >
                    Model Answers
                  </button>
                </div>
                
                {questions.length > 0 && (
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(categories).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                    <FiFilter className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
                  </div>
                )}
              </div>

              {activeTab === 'questions' ? (
                <div className="space-y-3">
                  {filteredQuestions.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredQuestions.map((q) => (
                        <li key={q.id} className="py-3">
                          <div className="flex justify-between items-start">
                            <p className="text-gray-800">{q.question}</p>
                            <button 
                              onClick={() => navigator.clipboard.writeText(q.question)}
                              className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                              title="Copy question"
                            >
                              <FiCopy size={16} />
                            </button>
                          </div>
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {categories[q.category]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : questions.length > 0 ? (
                    <p className="text-gray-500 text-center py-4">No questions match the selected category.</p>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Enter job details to generate interview questions.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                      <div key={q.id} className="border border-gray-200 rounded-md p-4">
                        <h4 className="font-medium text-gray-800 mb-2">{q.question}</h4>
                        {answers[q.id] ? (
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700">{answers[q.id]}</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => generateAnswer(q.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Generate Model Answer
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No questions available to generate answers.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;