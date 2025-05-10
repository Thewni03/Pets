import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ticketService from '../../api/tickets';
import { useForm } from 'react-hook-form';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticketData = await ticketService.getTicket(id);
        setTicket(ticketData);
      } catch (err) {
        setError(err.message || 'Failed to fetch ticket');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await ticketService.respondToTicket(id, data.message);
      
      // Refresh ticket data
      const response = await ticketService.getTicket(id);
      setTicket(response);
      reset({ message: '' });
    } catch (err) {
      setError(err.message || 'Failed to respond to ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResolve = async () => {
    try {
      setIsSubmitting(true);
      await ticketService.resolveTicket(id);
      
      // Refresh ticket data
      const response = await ticketService.getTicket(id);
      setTicket(response);
    } catch (err) {
      setError(err.message || 'Failed to resolve ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading ticket...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Go Back
        </button>
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  if (!ticket) {
    return <div className="text-center py-8">Ticket not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Tickets
      </button>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{ticket.subject}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            ticket.status === 'open'
              ? 'bg-green-100 text-green-800'
              : ticket.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {ticket.status}
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          Created by: {ticket.user?.name} ({ticket.user?.email})
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 whitespace-pre-line">{ticket.message}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold mb-4">Responses</h2>
        {ticket.responses.length === 0 ? (
          <p className="text-gray-500">No responses yet</p>
        ) : (
          <div className="space-y-4">
            {ticket.responses.map((response, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  response.from === 'admin' ? 'bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium">
                    {response.from === 'admin' ? 'Admin' : 'User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(response.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{response.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {ticket.status !== 'resolved' && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Add Response</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <textarea
                rows={4}
                {...register('message', {
                  required: 'Message is required',
                })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Type your response here..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={handleResolve}
                disabled={isSubmitting}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Mark as Resolved'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}