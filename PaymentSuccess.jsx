// src/pages/PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.success("Payment successful!");
        // Optionally redirect after a short delay
        const timer = setTimeout(() => {
            navigate('/my-appointments');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-green-600">Payment Successful!</h2>
            <p className="mt-4 text-gray-600">Thank you for your payment. You will be redirected shortly...</p>
        </div>
    );
};

export default PaymentSuccess;
