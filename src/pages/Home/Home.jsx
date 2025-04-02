import React from 'react'
import Hero from '../../components/hero/Hero'
import CardsAnalyser from '../../components/CardsAnalyser/CardsAnalyser'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import CompanyCarousel from '../../components/CompanyCarousel/CompanyCarousel'

const Home = () => {
  return (
    <div>
      
      <Hero />
      <HowItWorks />
 
      <CardsAnalyser />
      <CompanyCarousel />
   </div>
  )
}

export default Home
