import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { BadgeCheck,Info } from "lucide-react";
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';


const Appointment = () => {
    const {docId} = useParams();
    const {doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const navigate = useNavigate()

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSlots = async () => {
        setDocSlots([]);
    
        let today = new Date(); // Current date
        let currentHour = today.getHours();
        let currentMinute = today.getMinutes();
    
        let slotsArray = []; // Store all slots
    
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
    
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(18, 0, 0, 0); // End time: 6 PM
    
            // Set the start time
            if (i === 0 && currentHour >= 18) {
                // If it's today and past 6 PM, disable today
                continue; // Skip today and move to the next date
            } else if (i === 0 && currentHour >= 9) {
                // If today, start from the next available hour
                currentDate.setHours(currentHour + 1);
                currentDate.setMinutes(currentMinute > 30 ? 30 : 0);
            } else {
                // Future dates start at 9 AM
                currentDate.setHours(9);
                currentDate.setMinutes(0);
            }
    
            let timeSlots = [];
    
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                });
    
                // Increment by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            
            

            if (timeSlots.length > 0) {
                slotsArray.push(timeSlots);
            }
        }
    
        // If today is skipped due to unavailable slots, ensure at least one valid date exists
        if (slotsArray.length === 0) {
            let nextAvailableDate = new Date();
            nextAvailableDate.setDate(today.getDate() + 1);
            nextAvailableDate.setHours(9);
            nextAvailableDate.setMinutes(0);
    
            let endTime = new Date(nextAvailableDate);
            endTime.setHours(18, 0, 0, 0);
    
            let timeSlots = [];
    
            while (nextAvailableDate < endTime) {
                let formattedTime = nextAvailableDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
                timeSlots.push({
                    datetime: new Date(nextAvailableDate),
                    time: formattedTime
                });
    
                nextAvailableDate.setMinutes(nextAvailableDate.getMinutes() + 30);
            }
    
            slotsArray.push(timeSlots);
        }
    
        setDocSlots(slotsArray);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment')
            return navigate('/login')
        }
        try {
            const date = docSlots[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth() + 1;
            let year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year

            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, {docId, slotDate, slotTime}, {headers:{token}})
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    

    useEffect(()=>{
        fetchDocInfo()
    },[doctors, docId])

    useEffect(()=>{
        getAvailableSlots()
    },[docInfo])

    useEffect(()=>{
        if (docSlots.length > 0) {
            setSlotIndex(0); // Ensure it starts from the first available day
        }
    },[docSlots])
    console.log("Doctor Image URL:", docInfo?.image);

    return docInfo && (
        <div>
            {/* Doctor details */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={`${backendUrl}/uploads/${docInfo.image}`} alt="" />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    {/* Doc info: name,degree,experience */}
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {docInfo.name} 
                        <BadgeCheck className="w-5 text-green-400"/>
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    {/* Doctor about */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                            About 
                            <Info className="w-5 text-gray-600"/> 
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
                            {docInfo.about}
                        </p>
                    </div>
                    {/* Appintment fee */}
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-600'>{currencySymbol} {docInfo.fees}</span>
                    </p>
                </div>
            </div>
            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300'}`} key={index}>
                                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-8'>
                    {
                        docSlots.length && docSlots[slotIndex].map((item, index) => (
                            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-400'}`} key={index}>
                                {item.time.toLowerCase()}
                            </p>
                        ))
                    }
                </div>
                <button onClick={bookAppointment} className='bg-green-400 text-white font-light px-14 py-3 rounded-full my-12 cursor-pointer'>Book appointment</button>
            </div>

            {/* Listing related doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointment