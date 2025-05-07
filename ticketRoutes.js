import express from 'express';
import { createTicket, getTickets, respondToTicket, resolveTicket, getMyTickets, getTicket } from '../controllers/ticketController.js';
import auth from '../MiddleWare/AuthUser.js';
import admin from '../MiddleWare/AuthAdmin.js';

const ticketrouter = express.Router();

ticketrouter.post('/', auth, createTicket);
ticketrouter.get('/', [auth, admin], getTickets);
ticketrouter.post('/:id/respond', [auth, admin], respondToTicket);
ticketrouter.patch('/:id/resolve', [auth, admin], resolveTicket);
ticketrouter.get('/my-tickets', auth, getMyTickets);
ticketrouter.get('/:id', auth, getTicket);

export default ticketrouter;