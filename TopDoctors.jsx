import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top doctors to book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our list of trusted doctors.</p>
        <div className='max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-6 pt-5 px-3 sm:px-0'>
            {doctors.slice(0,3).map((item, index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`)}} className='w-full max-w-[300px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-lg bg-white mx-auto' key={index}>
                    <img className='w-full h-48 object-cover bg-indigo-100 transition-all duration-500 hover:scale-105' src={`${backendUrl}/uploads/${item.image}`} alt="" />
                    <div className='p-4 text-center'>
                        <div className='flex justify-center items-center gap-2 text-sm text-green-500 mb-2'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                    <p className='text-gray-900 text-lg font-semibold'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('./doctors'); scrollTo(0,0)}} className='bg-blue-200 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopDoctors