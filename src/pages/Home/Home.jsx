import React from 'react'
import Hero from '../../components/hero/Hero'
import CardsAnalyser from '../../components/CardsAnalyser/CardsAnalyser'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import CompanyCarousel from '../../components/CompanyCarousel/CompanyCarousel'
import NewHero2 from '../../components/hero/NewHero2'
import NewNavbar from '../../components/hero/NewNavbar'
import GPTJobPrompts from '../GPTJobPrompts/ChatGPTJobPrompts'

const Home = () => {
  return (
    <div>
      {/* <NewNavbar /> */}
      <NewHero2 />
      <GPTJobPrompts />
      
      {/* <Hero />
      <HowItWorks />
 
      <CardsAnalyser />
      <CompanyCarousel /> */}
   </div>
  )
}

export default Home
