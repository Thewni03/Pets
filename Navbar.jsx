import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import React from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
              >
                Pet Universe Support    
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-6">
                {user.user.role === 'admin' ? (
                  <Link
                    to="/tickets"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
                  >
                    My Tickets
                  </Link>
                )}
                <Link
                  to="/create-ticket"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
                >
                  Create Ticket
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
                >
                  Logout
                </button>
                <span className="text-gray-300 text-sm bg-gray-700/50 px-3 py-1.5 rounded-full flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                  {user.user.name} ({user.user.role})
                </span>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 px-4 py-2 rounded-md text-sm font-medium transition duration-200 shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}