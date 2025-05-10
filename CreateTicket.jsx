import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ticketService from '../../api/tickets';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function CreateTicket() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await ticketService.createTicket(data, user.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Support Ticket
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              {...register('subject', {
                required: 'Subject is required',
                minLength: {
                  value: 5,
                  message: 'Subject must be at least 5 characters',
                },
              })}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={5}
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
              })}
              placeholder="Detailed description of your issue"
              className="w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Ticket'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
