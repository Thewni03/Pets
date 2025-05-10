import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { CircleX, CircleCheckBig } from 'lucide-react'

const VetAppointments = () => {
    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { slotDataFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    return (
        <div className='w-full max-w-6xl mx-auto p-5'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-semibold text-gray-800'>Appointments</h2>
                <div className='bg-blue-50 px-4 py-2 rounded-lg'>
                    <p className='text-blue-600 font-medium'>
                        Total Earnings: <span className='text-gray-700'>{currency}{appointments.reduce((sum, item) => sum + (item.payment ? item.amount : 0), 0)}</span>
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
                {/* Header Row */}
                <div className='hidden sm:grid grid-cols-[50px_1.5fr_1fr_1.5fr_1fr_120px] gap-4 py-3 px-6 bg-gray-50 border-b border-gray-200'>
                    <p className='font-medium text-gray-600 text-center'>#</p>
                    <p className='font-medium text-gray-600'>Pet Owner</p>
                    <p className='font-medium text-gray-600'>Payment</p>
                    <p className='font-medium text-gray-600'>Date & Time</p>
                    <p className='font-medium text-gray-600 text-right'>Fees</p>
                    <p className='font-medium text-gray-600 text-center'>Action</p>
                </div>

                {/* Data Rows */}
                <div className='divide-y divide-gray-200 max-h-[70vh] overflow-y-auto'>
                    {appointments.map((item, index) => (
                        <div
                            className='grid grid-cols-1 sm:grid-cols-[50px_1.5fr_1fr_1.5fr_1fr_120px] gap-4 items-center py-4 px-6 hover:bg-gray-50 transition-colors'
                            key={item._id}
                        >
                            {/* Index */}
                            <p className='text-center text-gray-500 hidden sm:block'>{index + 1}</p>

                            {/* Pet Owner */}
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium'>
                                    {item.userData.name.charAt(0)}
                                </div>
                                <div>
                                    <p className='font-medium text-gray-800'>{item.userData.name}</p>
                                    <p className='text-sm text-gray-500'>{item.petData.Petname} ({item.petData.Species})</p>
                                </div>
                            </div>

                            {/* Payment */}
                            <div>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.payment
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {item.payment ? 'Online' : 'Cash'}
                                </span>
                            </div>

                            {/* Date & Time */}
                            <div>
                                <p className='text-gray-800'>{slotDataFormat(item.slotDate)}, {item.slotTime}</p>
                                <p className='text-xs text-gray-400'>
                                    Booked on: {new Date(item.date).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Fees */}
                            <p className='text-right font-medium text-gray-800'>
                                {currency}{item.amount}
                            </p>

                            {/* Action */}
                            <div className='flex justify-center'>
                                {item.canceled ? (
                                    <span className='text-red-500 text-sm font-medium'>Cancelled</span>
                                ) : item.isCompleted ? (
                                    <span className='text-green-500 text-sm font-medium'>Completed</span>
                                ) : (
                                    <div className='flex gap-3'>
                                        <button
                                            onClick={() => cancelAppointment(item._id)}
                                            className='text-red-500 hover:text-red-700 transition-colors'
                                            title="Cancel Appointment"
                                        >
                                            <CircleX className='w-6 h-6' />
                                        </button>
                                        <button
                                            onClick={() => completeAppointment(item._id)}
                                            className='text-green-500 hover:text-green-700 transition-colors'
                                            title="Complete Appointment"
                                        >
                                            <CircleCheckBig className='w-6 h-6' />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View */}
                <div className='sm:hidden divide-y divide-gray-200'>
                    {appointments.map((item, index) => (
                        <div key={item._id} className='p-4'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <p className='font-medium text-gray-800'>#{index + 1} {item.userData.name}</p>
                                    <p className='text-sm text-gray-600'>{item.petData.Petname} ({item.petData.Species})</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${item.canceled
                                        ? 'bg-red-100 text-red-800'
                                        : item.isCompleted
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {item.canceled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}
                                </span>
                            </div>

                            <div className='mt-3 grid grid-cols-2 gap-3'>
                                <div>
                                    <p className='text-sm text-gray-500'>Date & Time</p>
                                    <p>{slotDataFormat(item.slotDate)}, {item.slotTime}</p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Payment</p>
                                    <p className={`text-xs inline-block px-2 py-1 rounded-full ${item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {item.payment ? 'Online' : 'Cash'}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Fees</p>
                                    <p>{currency}{item.amount}</p>
                                </div>
                                <div className='flex items-end justify-end gap-2'>
                                    {!item.canceled && !item.isCompleted && (
                                        <>
                                            <button
                                                onClick={() => cancelAppointment(item._id)}
                                                className='text-red-500 hover:text-red-700'
                                                title="Cancel"
                                            >
                                                <CircleX className='w-5 h-5' />
                                            </button>
                                            <button
                                                onClick={() => completeAppointment(item._id)}
                                                className='text-green-500 hover:text-green-700'
                                                title="Complete"
                                            >
                                                <CircleCheckBig className='w-5 h-5' />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VetAppointments