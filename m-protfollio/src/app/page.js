import React from 'react'
import Header from './components/header/Header'
import Landing from './pages/landing'
import Working from './pages/Working'
import Skils from './pages/Skils'

export default function page() {
  return (
    <div className='bg-[#131313]'>
      <Header />
      <Landing />
      <Working/>
      <Skils/>
    </div>
  )
}
