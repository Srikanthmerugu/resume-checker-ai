import { useState } from 'react'

import './App.css'
import Home from './pages/Home/Home'
import { AllRoutes } from './pages/AllRoutes/AllRoutes'
import { AuthProvider } from './context/AuthContext'
// import AllRoutes from './pages/AllRoutes/AllRoutes'

function App() {

  return (
    <>
         <AuthProvider>  <AllRoutes /></AuthProvider>

  

    </>
  )
}

export default App
