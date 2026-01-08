import React from 'react'
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Services from '../components/Services'
import PetTypes from '../components/PetTypes'
import Testimonials from '../components/Testimonials'

const Home = () => {
  
  return (
    <div>
        <Header />
        <Services />
        <SpecialityMenu />
        <TopDoctors />
        <PetTypes />
        <Banner />
        <Testimonials />
    </div>
  )
}

export default Home