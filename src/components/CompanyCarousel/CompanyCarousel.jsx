import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { userlogo1, userlogo2 } from '../../assets/Assets';

const CompanyCarousel = () => {
  // Sample company logos (replace with your actual images)
  const companies = [
    { id: 1, name: 'Google', logo: userlogo1 },
    { id: 2, name: 'Microsoft', logo: userlogo2 },
    { id: 3, name: 'Amazon', logo: userlogo1 },
    { id: 4, name: 'Apple', logo: userlogo2 },
    { id: 5, name: 'Facebook', logo: userlogo1 },
    { id: 6, name: 'Netflix', logo: userlogo2 },
    { id: 7, name: 'Tesla', logo: userlogo1 },
    { id: 8, name: 'Airbnb', logo: userlogo2 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="bg-gray-100 py-3 px-4">
      <div className="max-w-7xl mx-auto">
        {/* <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          <span className="text-sky-600">Companies Using Our Platform</span>
        </h2> */}

        <h1 className="text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-900 text- to-blue-600 bg-clip-text  text-transparent mt-10 mb-8">
        Recruiters using from companies
      </h1>





        
        <Slider {...settings} className="px-4">
          {companies.map((company) => (
            <div key={company.id} className="px-2 focus:outline-none">
              <div className="flex items-center justify-center h-20">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="max-h-12 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompanyCarousel;