import React from 'react'
import Header from './components/header/Header'
import Landing from './pages/landing'
import Working from './pages/Working'

export default function page() {
  return (
    <div className='bg-[#131313]'>
      <Header />
      <Landing />
      <Working/>
    </div>
  )
}
