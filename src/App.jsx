import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css'
import Home from './pages/Home/Home'
import { AllRoutes } from './pages/AllRoutes/AllRoutes'
import { AuthProvider } from './context/AuthContext'
// import AllRoutes from './pages/AllRoutes/AllRoutes'

function App() {

  return (
    <>
    <ToastContainer
  style={{ zIndex: 9999999, marginTop: "60px" }}
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  newestOnTop
/>
         <AuthProvider>  <AllRoutes /></AuthProvider>

  

    </>
  )
}

export default App
