import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/tickets/CreateTicket';
import TicketList from './pages/tickets/TicketList';
import TicketDetail from './pages/tickets/TicketDetail';
import TicketResponse from './pages/tickets/TicketResponse';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-ticket" element={<CreateTicket />} />
                <Route path="/tickets/:id" element={<TicketDetail />} />
                
                <Route element={<AdminRoute />}>
                  <Route path="/tickets" element={<TicketList />} />
                  <Route path="/tickets/:id/respond" element={<TicketResponse />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;