import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 '>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm border-t border-t-gray-400'>
            {/* left section */}
            <div  className='mt-5'>
                <img className='mb-5 w-20' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
            </div>

            {/* center section */}
            <div className='mt-5'>
                <p className='text-xl font-medium mb-5'>Pet Universe</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* right section */}
            <div className='mt-5'>
                <p className='text-xl font-medium mb-5'>Get in touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Telephone: 0116434978</li>
                    <li>Email: petuniverse@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* Copyright text */}
        <div>
                <p className='py-5 text-sm text-center'>Copyright 2025@ Pet Universe - All rights reserved. </p>
        </div>

    </div>
  )
}

export default Footer