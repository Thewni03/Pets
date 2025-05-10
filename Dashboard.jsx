import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ticketService from '../api/tickets';
import { useAuth } from '../context/AuthContext.jsx';
import React from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response =
          user.user.role === 'admin'
            ? await ticketService.getTickets(user.token)
            : await ticketService.getMyTickets(user.token);

        setTickets(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tickets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [user.token, user.user.role]);

  const getStatusBadge = (status) => {
    const base = 'px-3 py-1 text-xs font-semibold rounded-full';
    if (status === 'open') return `${base} bg-green-100 text-green-700`;
    if (status === 'in-progress') return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-blue-100 text-blue-700`;
  };

  return (
    <div className="bg-gradient-to-tr from-indigo-50 to-blue-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            {user.user.role === 'admin' ? 'Admin Ticket Dashboard' : 'My Support Tickets'}
          </h1>
          {user.user.role !== 'admin' && (
            <Link
              to="/create-ticket"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Ticket
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-xl shadow-md p-5 h-36"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : tickets.length === 0 ? (
          <p className="text-gray-600 text-center">No tickets found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-xl shadow-md p-5 transition transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{ticket.subject}</h3>
                  <span className={getStatusBadge(ticket.status)}>
                    {ticket.status === 'open'
                      ? '🟢 Open'
                      : ticket.status === 'in-progress'
                      ? '🟡 In Progress'
                      : '🔵 Resolved'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Created on {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <Link
                    to={`/tickets/${ticket._id}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition shadow"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m0 0l3-3m-3 3l3 3" />
                    </svg>
                    View
                  </Link>

                  {user.user.role === 'admin' && ticket.status !== 'resolved' && (
                    <Link
                      to={`/tickets/${ticket._id}/respond`}
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition shadow"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m0 0l7 7" />
                      </svg>
                      Respond
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
