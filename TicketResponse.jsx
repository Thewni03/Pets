import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ticketService from '../../api/tickets';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import React from 'react';

export default function TicketResponse() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await ticketService.getTicket(id, user.token);
        setTicket(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch ticket');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [id, user.token]);

  const onSubmit = async (data) => {
    try {
      await ticketService.respondToTicket(id, data.message, user.token);
      navigate(`/tickets/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit response');
    }
  };

  if (isLoading) return <div className="text-center py-8 text-gray-600">Loading ticket...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Respond to Ticket</h1>
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-700">{ticket?.subject}</h2>
          <p className="text-sm text-gray-500 mt-1">Ticket ID: {ticket?._id}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Response
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message', { required: 'Response is required' })}
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 text-sm"
              placeholder="Type your response here..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Response'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
