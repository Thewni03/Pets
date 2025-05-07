import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/tickets';


// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

// Get all tickets (admin only)
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

// Respond to ticket (admin only)
const respondToTicket = async (ticketId, message, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/${ticketId}/respond`,
    { message },
    config
  );
  return response.data;
};

// Resolve ticket (admin only)
const resolveTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${API_URL}/${ticketId}/resolve`,
    {},
    config
  );
  return response.data;
};

const getMyTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/my-tickets`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    throw error;
  }
};


const getTicket = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    // Handle different error cases
    if (error.response?.status === 404) {
      throw new Error('Ticket not found');
    } else if (error.response?.status === 403) {
      throw new Error('Not authorized to view this ticket');
    } else {
      throw new Error(error.response?.data?.message || 'Failed to fetch ticket');
    }
  }
};

const ticketService = {
  createTicket,
  getTickets,
  respondToTicket,
  resolveTicket,
  getMyTickets,
  getTicket,
};

export default ticketService;