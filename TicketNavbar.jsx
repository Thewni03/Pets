import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
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
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
              >
                Home
              </Link>
              <Link
                to="/tickets"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
              >
                Tickets
              </Link>
              <Link
                to="/create-ticket"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-700/50"
              >
                Create Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}