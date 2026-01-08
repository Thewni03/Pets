import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { CalendarRange, UsersRound, ContactRound, ClipboardList } from 'lucide-react'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, dashData, getDashData } = useContext(AdminContext)
  const { slotDataFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        {/* Doctors Card */}
        <div className='flex items-center gap-5 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <UsersRound className="w-15 h-15 p-3 bg-blue-100 text-blue-600 rounded-full" />
          <div>
            <p className='text-xl font-semibold text-gray-700'>{dashData.doctors}</p>
            <p className='text-sm text-gray-500'>Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='flex items-center gap-5 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <CalendarRange className="w-15 h-15 p-3 bg-green-100 text-green-600 rounded-full" />
          <div>
            <p className='text-xl font-semibold text-gray-700'>{dashData.appointments}</p>
            <p className='text-sm text-gray-500'>Appointments</p>
          </div>
        </div>

        {/* Pet Owners Card */}
        <div className='flex items-center gap-5 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <ContactRound className="w-15 h-15 p-3 bg-purple-100 text-purple-600 rounded-full" />
          <div>
            <p className='text-xl font-semibold text-gray-700'>{dashData.users}</p>
            <p className='text-sm text-gray-500'>Pet Owners</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className='bg-white rounded-lg border border-gray-400 mt-8 shadow-sm'>
        <div className='flex items-center gap-2.5 px-6 py-4 border-b  border-gray-400'>
          <ClipboardList className="text-gray-600" />
          <p className='font-semibold text-gray-700'>Latest Appointments</p>
        </div>

        <div className='divide-y divide-gray-400'>
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.userData?.name} • {item.petData?.Petname} ({item.petData?.Species})
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <p className="text-sm font-medium text-gray-600">
                    {slotDataFormat(item.slotDate)} • {item.slotTime}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.canceled
                        ? 'bg-red-100 text-red-800'
                        : item.isCompleted
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                      {item.canceled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Upcoming'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {item.payment ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard