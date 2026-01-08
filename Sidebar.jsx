import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { House, CalendarClock, UserPlus, Users } from 'lucide-react'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    return (
        <div className='bg-white mt-5'>
            {
                aToken && <ul className='text-zinc-800 mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/admin-dashboard'}>
                        <House className='text-red-400' />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/all-appointments'}>
                        <CalendarClock className='text-green-400' />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/add-doctor'}>
                        <UserPlus className='text-blue-400' />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/doctor-list'}>
                        <Users className='text-orange-400' />
                        <p>Doctors List</p>
                    </NavLink>
                    {/* <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/add-user'}>
                        <Users className='text-orange-400' />
                        <p>Add User</p>
                    </NavLink> */}
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/customer'}>
                        <Users className='text-orange-400' />
                        <p>Customer</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/ai'}>
                        <Users className='text-orange-400' />
                        <p>Diet</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/vet-visit'}>
                        <Users className='text-orange-400' />
                        <p>Vet Visit</p>
                    </NavLink>
                </ul>
            }

            {
                dToken && <ul className='text-zinc-800 mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/vet-dashboard'}>
                        <House className='text-red-400' />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/vet-appointments'}>
                        <CalendarClock className='text-green-400' />
                        <p>Appointments</p>
                    </NavLink>
                    {/* <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/vet-profile'}>
                        <UserPlus className='text-blue-400' />
                        <p>Profile</p>
                    </NavLink> */}

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 border-r-4 border-gray-400' : ''}`} to={'/vets'}>
                        <UserPlus className='text-blue-400' />
                        <p>Vets</p>
                    </NavLink>
                    
                </ul>
            }
        </div>


    )
}

export default Sidebar