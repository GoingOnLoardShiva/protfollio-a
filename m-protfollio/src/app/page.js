import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Landing from './pages/landing'
import Working from './pages/Working'
import Skils from './pages/Skils'
import Testimonial from './pages/Testimonial'

export default function page() {
  return (
    <div className='bg-[#131313]'>
      <Header />
      <Landing />
      <Working/>
      <Skils/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}
