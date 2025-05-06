import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import { 
  FaUsers, FaSearch, FaChartLine, FaUserPlus, FaShareSquare, FaTasks 
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom CSS for carousel and glassmorphism
const styles = `
  .gradient-border {
    position: relative;
    border: none;
    border-radius: 1rem;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 1rem;
    background: linear-gradient(45deg, #ec4899, #3b82f6);
    z-index: -1;
  }
  .glass-card {
    background: linear-gradient(135deg, rgba(224, 242, 254, 0.3), rgba(240, 249, 255, 0.3));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(236, 72, 153, 0.3);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .carousel-card {
    transform: perspective(1000px) rotateY(0deg);
    transition: transform 0.3s ease;
  }
  .carousel-card:hover {
    transform: perspective(1000px) rotateY(5deg) scale(1.03);
  }
  .slick-dots li button:before {
    color: #ec4899;
  }
  .slick-dots li.slick-active button:before {
    color: #3b82f6;
  }
`;

// Slider settings for mobile carousel
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerMode: true,
  centerPadding: '20px',
  autoplay: true,
  autoplaySpeed: 3000,
};

const SocialMediaFeatures = () => {
  const features = [
    { title: 'SOURCE TOP TALENT', icon: FaSearch },
    { title: 'MANAGE CANDIDATE PIPELINES', icon: FaUsers },
    { title: 'SCALE YOUR HIRING TEAM', icon: FaUserPlus },
    { title: 'TRACK RECRUITING METRICS', icon: FaChartLine },
    { title: 'SHARE JOB POSTINGS', icon: FaShareSquare },
    { title: 'OPTIMIZE HIRING WORKFLOWS', icon: FaTasks },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, rotate: 5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
      },
    },
    hover: {
      y: -5,
      scale: 1.03,
      backgroundColor: "#f0f9ff",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div id='Howitswork' className="bg-sky-50 py-8 sm:py-10 lg:py-12">
      <style>{styles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 lg:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-4xl max-w-5xl mx-auto font-bold leading-tight">
            DISCOVER MORE HELPFUL RECRUITING{' '}
            <span className="bg-gradient-to-r from-pink-500 to-sky-600 bg-clip-text text-transparent font-semibold">
              OnDemand Solutions
            </span>
          </h2>
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="block sm:hidden">
          <Slider {...sliderSettings}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="px-2">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col items-center p-4 gradient-border carousel-card"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md mb-2">
                      <Icon className="text-pink-500 text-lg" />
                    </div>
                    <p className="text-xs font-medium text-center text-sky-900">
                      {feature.title}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </Slider>
        </div>

        {/* Tablet and Large: Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="hidden sm:grid sm:grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 lg:gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={`flex flex-col items-center p-3 sm:p-4 ${
                  index % 2 === 0 ? 'sm:mt-4' : 'sm:mb-4'
                } glass-card`}
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-white rounded-full shadow-md mb-2 sm:mb-3">
                  <Icon className="text-pink-500 text-lg sm:text-xl lg:text-xl" />
                </div>
                <p className="text-xs sm:text-sm lg:text-sm font-medium text-center text-sky-900">
                  {feature.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMediaFeatures;