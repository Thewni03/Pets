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
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Respond to Ticket</h1>
      <h2 className="text-xl mb-2">{ticket?.subject}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <textarea
            rows={5}
            {...register('message', { required: 'Response is required' })}
            className="w-full border rounded p-2"
            placeholder="Type your response here..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Submit Response
        </button>
      </form>
    </div>
  );
}