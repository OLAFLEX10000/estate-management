import React from 'react'
import Project from './components/Project'
import About from './components/About'
import Header from './components/Header'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'


const App = () => {
  return (
     <div className='w-full overflow-hidden'>
      <ToastContainer/>
      <Header/>
      <About/>
      <Project/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
