import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)
    // const backendUrl = import.meta.env.VITE_BACKEND_URL

    const applyFilter = useCallback(() => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoc(doctors)
        }
    }, [doctors, speciality]);

    useEffect(() => {
        applyFilter()
    }, [applyFilter])

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <div className='flex flex-col gap-4 text-sm text-gray-600'>
                    <p onClick={() => speciality === 'General' ? navigate('/doctors') : navigate('/doctors/General')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General" ? "bg-indigo-100 text-black" : ""}`}>General</p>
                    <p onClick={() => speciality === 'Surgeon' ? navigate('/doctors') : navigate('/doctors/Surgeon')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Surgeon" ? "bg-indigo-100 text-black" : ""}`}>Surgeon</p>
                </div>
                <div className='w-full grid grid-cols-[repeat(3,minmax(200px,1fr))] gap-20 gap-y-15'>
                    {
                        filterDoc.map((item, index) => (
                            <div onClick={() => navigate(`/appointment/${item._id}`)} className='w-64 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                                <img className=' bg-blue-50 w-64 h-72 object-cover' src={item.image} alt="" />
                                <div className='p-4'>
                                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                                    </div>
                                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Doctors