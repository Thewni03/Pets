import React, { useEffect, useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const [loading, setLoading] = useState(false)
  const { slotDataFormat, currency } = useContext(AppContext)
  const [cancelingId, setCancelingId] = useState(null)

  useEffect(() => {
    if (aToken) {
      setLoading(true)
      getAllAppointments()
        .finally(() => setLoading(false))
    }
  }, [aToken])

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>
  if (!appointments) return <div className="flex justify-center items-center h-64">No appointments found</div>

  return (
    <div className='w-full max-w-6xl mx-auto p-5'>
      <p className='mb-5 text-xl font-semibold text-gray-800'>All Appointments</p>
      <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
        {/* Header Row */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr_1fr] gap-4 py-3 px-6 bg-gray-50 border-b border-gray-200'>
          <p className='font-medium text-gray-600'>#</p>
          <p className='font-medium text-gray-600'>User & Pet</p>
          <p className='font-medium text-gray-600'>Date & Time</p>
          <p className='font-medium text-gray-600'>Doctor</p>
          <p className='font-medium text-gray-600 text-right'>Fees</p>
          <p className='font-medium text-gray-600 text-center'>Status</p>
          <p className='font-medium text-gray-600 text-center'>Action</p>
        </div>

        {/* Data Rows */}
        <div className='divide-y divide-gray-200 max-h-[70vh] overflow-y-auto'>
          {appointments.map((item, index) => (
            <div
              className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr_1fr] gap-4 items-center py-4 px-6 hover:bg-gray-50 transition-colors'
              key={item._id}
            >
              <p className='text-center text-gray-500'>{index + 1}</p>

              <div>
                <p className='font-medium text-gray-800'>{item.userData.name}</p>
                <p className='text-sm text-gray-500'>{item.petData.Petname} ({item.petData.Species})</p>
              </div>

              <div>
                <p className='text-gray-800'>{slotDataFormat(item.slotDate)}, {item.slotTime}</p>
                <p className='text-xs text-gray-400'>
                    Booked on:{new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className='flex items-center gap-2'>
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className='w-8 h-8 rounded-full object-cover'
                />
                <p className='text-gray-800'>{item.docData.name}</p>
              </div>

              <p className='text-right font-medium text-gray-800'>
                {currency}{item.amount}
              </p>

              <div className='flex justify-center'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.canceled
                    ? 'bg-red-100 text-red-800'
                    : item.isCompleted
                      ? 'bg-green-100 text-green-800'
                      : item.payment
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {item.canceled ? 'Cancelled' :
                    item.isCompleted ? 'Completed' :
                      item.payment ? 'Paid' : 'Pending'}
                </span>
              </div>

              <div className='flex justify-center'>
                {item.canceled ? (
                  <span className='text-xs text-red-500 font-medium'>Cancelled</span>
                ) : (
                  <button
                    onClick={() => {
                      setCancelingId(item._id)
                      cancelAppointment(item._id)
                        .finally(() => setCancelingId(null))
                    }}
                    disabled={cancelingId === item._id}
                    className={`px-3 py-1 rounded text-sm font-medium ${cancelingId === item._id
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                  >
                    {cancelingId === item._id ? 'Processing...' : 'Cancel'}
                  </button>
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
                <span className={`px-2 py-1 rounded-full text-xs ${item.canceled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                  {item.canceled ? 'Cancelled' : 'Active'}
                </span>
              </div>

              <div className='mt-2 grid grid-cols-2 gap-2'>
                <div>
                  <p className='text-sm text-gray-500'>Date & Time</p>
                  <p>{slotDataFormat(item.slotDate)}, {item.slotTime}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Doctor</p>
                  <p className='truncate'>{item.docData.name}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Fees</p>
                  <p>{currency}{item.amount}</p>
                </div>
                <div className='flex items-end justify-end'>
                  {!item.canceled && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='bg-red-500 text-white px-2 py-1 rounded text-xs'
                    >
                      Cancel
                    </button>
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

export default AllAppointments