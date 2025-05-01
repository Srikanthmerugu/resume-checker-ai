import React from 'react'
import Hero from '../../components/hero/Hero'
import CardsAnalyser from '../../components/CardsAnalyser/CardsAnalyser'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import CompanyCarousel from '../../components/CompanyCarousel/CompanyCarousel'
import HeroNew from '../../components/hero/HeroNew'
import CreativeToolsPlatform from '../SocialMediaFeatures/CreativeToolsPlatform'
import SocialMediaFeatures from '../SocialMediaFeatures/SocialMediaFeatures'
import PopularServices from '../PopularServices/PopularServices'
import WhatWeProvide from '../WhatWeProvide/WhatWeProvide'

const Home = () => {
  return (
    <div>
      
      <HeroNew />
      <CreativeToolsPlatform />
      <PopularServices />
      <WhatWeProvide />
      <SocialMediaFeatures />

      {/* <Hero />
      <HowItWorks />
 
      <CardsAnalyser />
      <CompanyCarousel /> */}
   </div>
  )
}

export default Home
