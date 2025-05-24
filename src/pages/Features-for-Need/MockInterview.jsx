import { useState, useRef, useEffect } from 'react';
import { FiMic, FiMicOff, FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';

const MockInterview = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    difficulty: 'medium',
    focusArea: 'behavioral'
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAnswers, setRecordedAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const difficultyLevels = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const focusAreas = [
    { value: 'behavioral', label: 'Behavioral' },
    { value: 'technical', label: 'Technical' },
    { value: 'case', label: 'Case Study' },
    { value: 'mixed', label: 'Mixed' }
  ];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
        'Tell me about yourself.',
        `Why are you interested in ${formData.companyName || 'this company'}?`,
        `What makes you a good fit for this ${formData.jobTitle} role?`,
        'Describe a time you faced a challenge at work and how you overcame it.',
        'Where do you see yourself in 5 years?',
        'What is your greatest professional achievement?',
        'How do you handle stress and pressure?',
        'Describe a time you disagreed with a team member and how you resolved it.'
      ].slice(0, formData.difficulty === 'easy' ? 5 : formData.difficulty === 'medium' ? 7 : 8);

      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setRecordedAnswers([]);
      setFeedback(null);
      setIsLoading(false);
    }, 1500);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAnswers(prev => [...prev, {
          question: questions[currentQuestionIndex],
          audioUrl
        }]);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      startTimer();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      stopTimer();
    }
  };

  const playRecording = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const startTimer = () => {
    setTimer(0);
    setIsTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      stopRecording();
      setIsPlaying(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      stopRecording();
      setIsPlaying(false);
    }
  };

  const getFeedback = () => {
    if (recordedAnswers.length === 0) return;

    setIsLoading(true);
    // Simulate API call for feedback
    setTimeout(() => {
      setFeedback({
        overallScore: Math.floor(Math.random() * 30) + 60,
        strengths: [
          'Clear and concise communication',
          'Good structure in your answers',
          'Demonstrated relevant experience'
        ],
        areasForImprovement: [
          'Could provide more specific examples',
          'Try to keep answers under 2 minutes',
          'Work on reducing filler words (um, ah)'
        ],
        tips: [
          'Use the STAR method (Situation, Task, Action, Result) for behavioral questions',
          'Research the company more to tailor your answers',
          'Practice speaking more slowly and clearly'
        ]
      });
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen">
      <div className=" mx-auto">
        {/* Header Card */}
        <div className="bg-blue-50 rounded-lg p-2 mb-8 border-l-4 border-blue-500 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Mock Interview Simulator</h1>
          <p className="text-gray-600 mt-2">
            Practice your interview skills with tailored questions, record your answers, and receive constructive feedback to improve your performance.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Start Your Mock Interview</h2>

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
                  placeholder="e.g. Google"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {difficultyLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Focus Area</label>
                <select
                  name="focusArea"
                  value={formData.focusArea}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {focusAreas.map(area => (
                    <option key={area.value} value={area.value}>{area.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={generateQuestions}
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
                    Generating Questions...
                  </span>
                ) : (
                  'Generate Questions'
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {questions.length > 0 ? (
                <>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FiMic className="mr-2" /> Question {currentQuestionIndex + 1} of {questions.length}
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-gray-700">{questions[currentQuestionIndex]}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex items-center px-4 py-2 rounded-md ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                    >
                      {isRecording ? <FiMicOff className="mr-2" /> : <FiMic className="mr-2" />}
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    <div className="text-gray-700 font-medium">
                      Timer: {formatTime(timer)}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>

                  {recordedAnswers.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Recorded Answers</h3>
                      <div className="space-y-3">
                        {recordedAnswers.map((answer, index) => (
                          <div key={index} className="border border-gray-200 rounded-md p-3 flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-700">{answer.question}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => isPlaying ? pauseRecording() : playRecording(answer.audioUrl)}
                                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                {isPlaying ? <FiPause /> : <FiPlay />}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={getFeedback}
                    disabled={recordedAnswers.length === 0 || isLoading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${recordedAnswers.length === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                        Generating Feedback...
                      </span>
                    ) : (
                      'Get Feedback'
                    )}
                  </button>

                  {feedback && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Interview Feedback</h3>
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <p className="text-gray-700 font-medium">Overall Score: {feedback.overallScore}%</p>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700">Strengths</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {feedback.strengths.map((strength, index) => (
                              <li key={index}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700">Areas for Improvement</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {feedback.areasForImprovement.map((area, index) => (
                              <li key={index}>{area}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700">Tips</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {feedback.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
                  <FiMic className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">Enter a job title to generate mock interview questions</p>
                </div>
              )}
            </div>
          </div>

          <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        </div>
      </div>
    </div>
  );
};

export default MockInterview;