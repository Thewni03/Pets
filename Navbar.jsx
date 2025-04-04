import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserCircleIcon, ChevronDownIcon } from "lucide-react";
import { AppContext } from '../context/AppContext';


const Navbar = () => {
    const navigate = useNavigate();
    const {token, setToken } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false);
    let timeout;
    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-18 cursor-pointer' src={assets.logo} alt='' />
        <ul className='hidden md:flex items-start gap-8 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>Book Appointment</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token 
                ? <div className="flex items-center gap-4">
                <div 
                    className="relative" 
                    onMouseEnter={() => {
                        clearTimeout(timeout);
                        setIsOpen(true);
                    }}
                    onMouseLeave={() => {
                        timeout = setTimeout(() => setIsOpen(false), 200);
                    }}
                >
                    <div className="flex items-center gap-1 cursor-pointer p-2 rounded-md" onClick={() => setIsOpen(!isOpen)}>
                        <UserCircleIcon className="w-10 h-10 text-gray-600" />
                        <ChevronDownIcon className="w-5 h-5 text-gray-600 mt-1" />
                    </div>
                    {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                        <ul className="text-gray-700">
                        <li onClick={() => navigate('/my-profile')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Profile</li>
                        <li onClick={() => navigate('/my-appointments')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Appointments</li>
                        <li onClick={logout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                    )}
                </div>
                </div>
                : <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light  hidden md:block'>Sign up</button>
            }
           
        </div>

    </div>
  )
}

export default Navbar 