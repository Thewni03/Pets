import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const MyAppointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [payhereReady, setPayhereReady] = useState(false);
    const [scriptLoadError, setScriptLoadError] = useState(false);
    // const [loadingPayment, setLoadingPayment] = useState(false);
    // const [payhereLoaded, setPayhereLoaded] = useState(false);

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const navigate = useNavigate();

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

   
    const handlePayHerePayment = async (appointment) => {
        const { userData, docData, _id } = appointment;
        if (!payhereReady) {
            toast.error('Payment system is still initializing. Please wait...');
            return;
          }
        try {
             // Validate required data
            if (!docData?.fees || isNaN(docData.fees)) {
                throw new Error('Invalid fee amount');
            }
            // Convert fee to number and format
            const amount = parseFloat(docData.fees).toFixed(2);
            if (isNaN(amount)) {
                throw new Error('Invalid fee amount');
              }

             //First get the hash from backend
            const { data } = await axios.post(`${backendUrl}/api/payhere/generate-hash`, {
                merchant_id: "1230311",
                order_id: _id,
                amount: amount,
                currency: 'LKR'
            }, { headers: { token } });

            if (!data?.hash) {
                throw new Error('Failed to generate payment hash');
            }
            const payment = {
                sandbox: true,
                merchant_id: "1230311",
                return_url: `${window.location.origin}/payment-success`,
                cancel_url: `${window.location.origin}/payment-cancel`,
                notify_url: `${backendUrl}/api/payhere/callback`,
        
                order_id: _id,
                items: `${docData.name} - ${docData.speciality}`,
                amount: amount, // Replace with actual appointment cost if applicable
                currency: "LKR",
                hash: data.hash,
                first_name: userData?.firstName || "John",
                last_name: userData?.lastName || "Doe",
                email: userData?.email || "john@example.com",
                phone: userData?.phone || "0771234567",
                address: "No.1, Galle Road",
                city: "Colombo",
                country: "Sri Lanka",
            };
            // window.payhere.onCompleted = () => {
            //     toast.success('Payment completed successfully');
            //     fetchAppointments(); // Refresh appointments
            // };

            // window.payhere.onDismissed = () => {
            //     toast.info('Payment was cancelled');
            // };

            // window.payhere.onError = (error) => {
            //     toast.error(`Payment error: ${error}`);
            // };
            // 4. Set callbacks
            window.payhere.onCompleted = (orderId) => {
                navigate('/payment-success');
            };
        
            window.payhere.onDismissed = () => {
                navigate('/payment-cancel');
            };
        
            window.payhere.onError = (error) => {
                toast.error(`Payment error: ${error}`);
            };
            console.log('Payment data being sent:', payment);
            window.payhere.startPayment(payment);
        } catch (err) {
            console.error('Payment initiation failed:', err);
            toast.error(err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to initiate payment');
        }
    };
    // const handlePayHerePayment = (appointment) => {
    //     const payment = {
    //         merchant_id: '1230311', // Replace with your actual PayHere sandbox Merchant ID
    //         return_url: 'http://localhost:3000/payment-success', // Or your frontend route
    //         cancel_url: 'http://localhost:3000/payment-cancel',
    //         notify_url: `${backendUrl}/api/payhere/notify`, // Your backend route to receive PayHere server notifications
    
    //         order_id: appointment._id,
    //         items: `Consultation with ${appointment.docData.name}`,
    //         amount: appointment.docData.fees || '1000.00', // Ensure this is a number or string
    //         currency: 'LKR',
    //         first_name: appointment.userData?.name?.split(' ')[0] || 'First',
    //         last_name: appointment.userData?.name?.split(' ')[1] || 'Last',
    //         email: appointment.userData?.email || 'demo@payhere.lk',
    //         phone: appointment.userData?.phone || '0771234567',
    //         address: 'No.1, Galle Road, Colombo',
    //         city: 'Colombo',
    //         country: 'Sri Lanka'
    //     };
    
    //     // Create form and submit
    //     const form = document.createElement('form');
    //     form.method = 'POST';
    //     form.action = 'https://sandbox.payhere.lk/pay/checkout';
        
    //     Object.entries(payment).forEach(([key, value]) => {
    //         const input = document.createElement('input');
    //         input.type = 'hidden';
    //         input.name = key;
    //         input.value = value;
    //         form.appendChild(input);
    //     });
    
    //     document.body.appendChild(form);
    //     form.submit();
    // };

    useEffect(() => {
        if (token) {
            fetchAppointments()
        }
    }, [token]);

    // useEffect(() => {
    //     if (!window.payhere) {
    //       const script = document.createElement("script");
    //       script.src = "https://sandbox.payhere.lk/lib/payhere.js";
    //       script.async = true;
    //       script.onload = () => {
    //         window.payhere.setup("1230311", "sandbox"); // Use your sandbox merchant ID
    //       };
    //       document.body.appendChild(script);
    //     }
    //   }, []);

    useEffect(() => {
        // Skip if already loaded or previously failed
        if (window.payhere || scriptLoadError) return;
      
        const script = document.createElement("script");
        script.src = "https://sandbox.payhere.lk/lib/payhere.js";
        script.async = true;
        
        script.onload = () => {
          if (typeof window.payhere !== 'undefined') {
            // Initialize with empty callbacks
            window.payhere.onCompleted = () => {};
            window.payhere.onDismissed = () => {};
            window.payhere.onError = () => {};
            setPayhereReady(true);
          } else {
            console.error('PayHere object not created');
            setScriptLoadError(true);
            toast.error('Payment system failed to initialize');
          }
        };
      
        script.onerror = () => {
          console.error('Script load failed');
          setScriptLoadError(true);
          toast.error('Failed to load payment system. Please refresh the page.');
        };
      
        document.body.appendChild(script);
      
        return () => {
          // Cleanup
          if (script.parentNode) {
            document.body.removeChild(script);
          }
        };
      }, [scriptLoadError]);

    return (
        <div>
            {scriptLoadError && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                    Payment system unavailable. Please refresh the page.
                </div>
                )}
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
            <div>
                {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
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
                                {/* <button 
                                    onClick={() => handlePayHerePayment(appointment)} 
                                    disabled={!payhereReady || loadingPayment || appointment.canceled}
                                    className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded transition-all duration-300 ${
                                        !payhereReady || loadingPayment ? 'opacity-50 cursor-not-allowed' : 
                                        'hover:bg-green-400 hover:text-white'
                                    }`}
                                >
                                    {loadingPayment ? 'Processing...' : 'Pay Online'}
                                </button> */}
                                {!appointment.canceled && <button onClick={() => handlePayHerePayment(appointment)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-400 hover:text-white transition-all duration-300'>Pay Online</button>}
                                {/* {!appointment.canceled && (
                                <button 
                                    onClick={() => handlePayHerePayment(appointment)}
                                    disabled={!payhereReady || scriptLoadError}
                                    className={`pay-button ${!payhereReady ? 'opacity-50' : ''}`}
                                >
                                    {payhereReady ? 'Pay Online' : 'Loading Payment...'}
                                </button>
                                )} */}
                                {!appointment.canceled && <button onClick={() => cancelAppointment(appointment._id)}  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
                                {appointment.canceled && <button className='sm:min-w-48 py-2 border rounded border-red-500 text-red-500'>Appointment cancelled</button>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 mt-6'>No appointments booked.</p>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
