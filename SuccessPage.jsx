import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF from '../utils/generatePDF';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appointmentDetails = location.state;

    // const downloadPDF = () => {
    //     const doc = new jsPDF();
    //     doc.text("Appointment Details", 60, 20);
    //     doc.text(`Doctor: ${appointmentDetails?.doctor}`, 40, 40);
    //     doc.text(`Date: ${appointmentDetails?.date}`, 40, 50);
    //     doc.text(`Time: ${appointmentDetails?.time}`, 40, 60);
    //     doc.text(`Fees: ${appointmentDetails?.fees}`, 40, 70);
    //     doc.save("appointment_details.pdf");
    // };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h2 className="text-2xl font-bold text-green-600">Appointment Booked Successfully!</h2>
            <p className="text-gray-600 mt-2">Your appointment has been confirmed.</p>
            <div className="mt-4 space-x-4">
                <button onClick={() => generatePDF(appointmentDetails)} className="px-4 py-2 bg-blue-500 text-white rounded">Download PDF</button>
                <button onClick={() => navigate('/my-appointments')} className="px-4 py-2 bg-gray-500 text-white rounded">Go Back to My Appointments</button>
            </div>
        </div>
    );
};

export default SuccessPage;
