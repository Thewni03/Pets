// src/pages/PaymentCancel.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentCancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.info("Payment was cancelled.");
        const timer = setTimeout(() => {
            navigate('/my-appointments');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-red-500">Payment Cancelled</h2>
            <p className="mt-4 text-gray-600">Your payment was not completed. Redirecting...</p>
        </div>
    );
};

export default PaymentCancel;
