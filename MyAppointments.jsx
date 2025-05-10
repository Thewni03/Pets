import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search } from "lucide-react";

const MyAppointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [payhereLoaded, setPayhereLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDataFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/my-appointments`, {}, { headers: { token } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                setAppointments([]);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    // const cancelAppointment = async (appointmentId) => {
    //     try {
    //         const { data } = await axios.post(
    //             `${backendUrl}/api/user/cancel-appointment`,
    //             { appointmentId },
    //             { headers: { token } }
    //         );
    //         if (data.success) {
    //             toast.success("Appointment canceled successfully");
    //             fetchAppointments(); // Refresh appointments
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed to cancel appointment");
    //     }
    // };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            );
            if (data.success) {
                toast.success("Appointment canceled successfully");
                fetchAppointments(); // Refresh appointments
                getDoctorsData()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to cancel appointment");
        }
    }

    // Load PayHere script when component mounts
    useEffect(() => {
        // Check if already loaded
        if (window.payhere && typeof window.payhere.startPayment === 'function') {
            setPayhereLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.payhere.lk/lib/payhere.js';
        script.async = true;

        script.onload = () => {
            // Initialize PayHere with all required methods
            window.payhere = window.payhere || {};
            window.payhere.onCompleted = function (orderId) {
                console.log("Payment completed. OrderID:" + orderId);
                // Handle successful payment
            };

            window.payhere.onDismissed = function () {
                console.log("Payment dismissed");
                // Handle cancelled payment
            };

            window.payhere.onError = function (error) {
                console.log("Error:" + error);
                // Handle payment error
            };

            // Ensure startPayment exists
            if (!window.payhere.startPayment) {
                window.payhere.startPayment = function (payment) {
                    console.log("PayHere payment would start with:", payment);
                    // Fallback implementation if needed
                };
            }

            setPayhereLoaded(true);
        };

        script.onerror = () => {
            console.error("Failed to load PayHere script");
            setPayhereLoaded(false);
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup
            document.body.removeChild(script);
        };
    }, []);

    const initPayHerePayment = (paymentData) => {
        if (!payhereLoaded || !window.payhere?.startPayment) {
            console.error("PayHere not ready");
            return;
        }

        try {
            window.payhere.startPayment({
                sandbox: import.meta.env.VITE_PAYHERE_SANDBOX === 'true',
                merchant_id: import.meta.env.VITE_PAYHERE_MERCHANT_ID,
                ...paymentData,
                return_url: undefined,
                cancel_url: undefined,
                notify_url: import.meta.env.VITE_PAYHERE_NOTIFY_URL
            });
            window.payhere.onCompleted = function (orderId) {
                toast.success("Payment completed!");
                fetchAppointments(); // Refresh the appointments list
            };
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    const appointmentPayHere = async (appointmentId) => {
        if (!payhereLoaded) {
            console.error("PayHere SDK not loaded yet");
            return;
        }

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment-payhere`,
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                initPayHerePayment(data.paymentData);
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    const filteredAppointments = appointments.filter(a =>
        a.docData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.docData.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    );



    useEffect(() => {
        if (token) {
            fetchAppointments()
        }
    }, [token]);

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
            <div className="flex justify-center my-4 gap-4 flex-wrap">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by doctor or speciality"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className="px-4 py-2 text-sm bg-red-100 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition duration-300"
                    >
                        Clear Search
                    </button>
                )}
            </div>

            <div>
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => (
                        <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
                            <div>
                                <img className='w-32 bg-indigo-50' src={appointment.docData.image} alt="" />
                            </div>
                            <div className='flex-1 text-sm text-zinc-600'>
                                <p className='text-neutral-800 font-semibold'>{appointment.docData.name}</p>
                                <p>{appointment.docData.speciality}</p>
                                <p className='text-zinc-700 font-medium mt-2'>Date & Time: <span className='text-zinc-600 font-normal ml-1'>{slotDataFormat(appointment.slotDate)} | {appointment.slotTime}</span> </p>
                            </div>
                            <div className='flex flex-col gap-2 justify-center'>
                                {!appointment.canceled && appointment.payment && <button className='sm:min-w-48 py-2 border rounded text-blue-100 bg-green-400'>Paid</button>}
                                {!appointment.canceled && !appointment.payment && <button onClick={() => appointmentPayHere(appointment._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-400 hover:text-white transition-all duration-300'>Pay Online</button>}
                                {!appointment.canceled && <button onClick={() => cancelAppointment(appointment._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
                                {appointment.canceled && <button className='sm:min-w-48 py-2 border rounded border-red-500 text-red-500'>Appointment cancelled</button>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 mt-6'>{appointments.length > 0 ? "No results found." : "No appointments booked."}</p>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
