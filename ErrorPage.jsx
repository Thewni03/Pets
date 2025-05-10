import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h2 className="text-2xl font-bold text-red-600">Something Went Wrong</h2>
            <p className="text-gray-600 mt-2">An error occurred while booking your appointment.</p>
            <div className="mt-4 space-x-4">
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-yellow-500 text-white rounded">Retry</button>
                <button onClick={() => navigate('/')} className="px-4 py-2 bg-gray-500 text-white rounded">Back to Home</button>
            </div>
        </div>
    );
};

export default ErrorPage;
