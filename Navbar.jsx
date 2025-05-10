import React, { useContext, useEffect } from 'react'
import { UserCircleIcon } from "lucide-react";
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()
    
    useEffect(() => {
        document.title = aToken ? 'Admin Dashboard' : dToken ? 'Doctor Dashboard' : 'PetUniverse Login'
    }, [aToken, dToken])

    const logout = () => {
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }
        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }
        document.title = 'PetUniverse Login'
        navigate('/')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-4 text-xs'>
                <img className='w-18 cursor-pointer' src={assets.logo} alt="" />
                <p className='border px-2 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Veterinarian'}</p>
            </div>
            <button onClick={logout} className='bg-red-400 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
        </div>
    )
}

export default Navbar