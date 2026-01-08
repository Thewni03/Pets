import { useEffect, useState } from 'react';
import ticketService from '../../api/tickets';
import { Link } from 'react-router-dom';
import React from 'react';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticketService.getTickets();
        setTickets(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tickets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets
    .filter(ticket => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        ticket.subject.toLowerCase().includes(search) ||
        ticket.user?.name.toLowerCase().includes(search) ||
        ticket.user?.email.toLowerCase().includes(search);

      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading tickets...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Support Tickets</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by subject, name, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-5 py-3 text-sm shadow-sm"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 text-sm shadow-sm"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 text-sm shadow-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Ticket Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredTickets.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No tickets match your filters.
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-800">{ticket.subject}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition ${
                    ticket.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : ticket.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Ticket ID: <span className="font-mono">{ticket._id.slice(0, 6)}...</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                From: {ticket.user?.name} (<span>{ticket.user?.email}</span>)
              </p>
              <div className="text-right">
                <Link
                  to={`/tickets/${ticket._id}`}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
