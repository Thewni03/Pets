import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Users } from "lucide-react";


const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* left side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book appointments <br /> with trusted doctors
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <Users className="w-10 h-10 text-gray-600" />
                <p>Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
            </div>
            <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book Appointment <ArrowRight className="w-5 h-5 text-gray-600 mt-1" />
            </a>
        </div>
        {/* right side */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-20 h-auto rounded-lg' src={assets.img1} alt='' />
        </div>
    </div>
  )
}

export default Header