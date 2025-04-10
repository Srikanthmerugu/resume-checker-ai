import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { 
  userlogo1, userlogo2, b2Tech,
  company1, company2, company3, company4, company5, 
  company6, company7, company8, company10, 
  company11, company12, company13, company14, company15 
} from '../../assets/Assets';

const CompanyCarousel = () => {
  // Fixed company data with unique IDs and proper logos
  const companies = [
    { id: 1, name: 'Google', logo: userlogo1 },
    { id: 2, name: 'Microsoft', logo: userlogo2 },
    { id: 3, name: 'B2Tech', logo: b2Tech },
    { id: 4, name: 'Company 1', logo: company1 },
    { id: 5, name: 'Company 2', logo: company2 },
    { id: 6, name: 'Company 3', logo: company3 },
    { id: 7, name: 'Company 4', logo: company4 },
    { id: 8, name: 'Company 5', logo: company5 },
    { id: 9, name: 'Company 6', logo: company6 },
    { id: 10, name: 'Company 7', logo: company7 },
    { id: 11, name: 'Company 8', logo: company8 },
    { id: 12, name: 'Company 10', logo: company10 },
    { id: 13, name: 'Company 11', logo: company11 },
    { id: 14, name: 'Company 12', logo: company12 },
    { id: 15, name: 'Company 13', logo: company13 },
    { id: 16, name: 'Company 14', logo: company14 },
    { id: 17, name: 'Company 15', logo: company15 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true, // Changed to true for better UX
    centerMode: false, // Changed to false for better layout
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        }
      },
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
          centerMode: false
        }
      }
    ]
  };

  return (
    <div className="bg-gray-100 py-8 px-4"> {/* Increased vertical padding */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-900 to-blue-600 bg-clip-text text-transparent mt-10 mb-8">
          Recruiters from Top Companies
        </h1>

        <Slider {...settings}>
          {companies.map((company) => (
            <div key={company.id} className="px-2">
              <div className="flex items-center justify-center h-20 p-4"> {/* Increased height and padding */}
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="max-h-12  w-full object-contain opacity-100 hover:opacity-100 transition-opacity duration-300" // Increased size and added duration
                  loading="lazy" // Added lazy loading
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