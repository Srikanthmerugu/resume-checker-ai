import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { candidateVideo, FAQ } from '../../assets/Assets';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const faqs = [
    {
      question: "What services does NeedRecruiter offer?",
      answer: "NeedRecruiter offers comprehensive recruitment solutions including permanent staffing, contract staffing, executive search, and recruitment process outsourcing (RPO). We specialize in connecting top talent with leading organizations across various industries."
    },
    {
      question: "How does NeedRecruiter source candidates?",
      answer: "We use a multi-channel approach including our extensive database, professional networks, social media platforms, job boards, and referrals. Our proprietary AI-powered matching system also helps identify the best candidates for your requirements."
    },
    {
      question: "What industries does NeedRecruiter specialize in?",
      answer: "We have expertise across multiple sectors including IT, healthcare, finance, engineering, manufacturing, retail, and professional services. Our industry-specific recruiters understand the unique needs and challenges of each sector."
    },
    // {
    //   question: "How long does the recruitment process typically take?",
    //   answer: "The timeline varies based on role complexity and requirements. For most positions, we can present qualified candidates within 5-7 business days. Executive searches may take 4-8 weeks depending on the specificity of the role."
    // },
    {
      question: "What makes NeedRecruiter different from other agencies?",
      answer: "Our combination of cutting-edge technology with human expertise sets us apart. We provide personalized service, deep market insights, and a rigorous screening process that goes beyond resumes to assess cultural fit and potential."
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video?.addEventListener('play', handlePlay);
    video?.addEventListener('pause', handlePause);

    return () => {
      video?.removeEventListener('play', handlePlay);
      video?.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <section className="min-h-scree py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
         {/* <h2 className="text-3xl text-center font-bold text-gray-900 mb-8">
            
          </h2> */}
          <h1 className="text-4xl mb-10 -mt-5 text-center font-bold text-gray-800">
          Frequently Asked  <span className="text-[#ff007f] font-bold">Questions</span>
          </h1>
      {/* Background Gradient with Spots */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute -top-40 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-cente relative">
        {/* Video Section */}
        <div className="  ">
  <video
    ref={videoRef}
    className="w-full h-full rounded-3xl object-cover"
    poster="/video-poster.jpg"
    muted
    loop
    autoPlay
    playsInline
  >
    <source src={FAQ} type="video/mp4" />
  </video>
</div>

        {/* FAQ Section */}
        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-pink-50/20 to-blue-50/20 backdrop-blur-xl border border-white/20 shadow-l">
         

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group transition-all"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className={`p-5 rounded-xl cursor-pointer transition-all ${
                  activeIndex === index
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/80'
                }`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      {faq.question}
                    </h3>
                    <motion.span
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      className="text-blue-600"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;