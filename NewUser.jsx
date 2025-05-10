import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Components/Nav';

function NewUser() {
  const navigate = useNavigate();  
  const [inputs, setInputs] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    role: '', 
    phone: '',
  });

  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const validationErrors = {};
    
    if (!inputs.userId) {
      validationErrors.userId = 'User ID is required.';
    }

    const namePattern = /^[A-Za-z]+$/;  
    if (!inputs.name) {
      validationErrors.name = 'Name is required.';
    } else if (!namePattern.test(inputs.name)) {
      validationErrors.name = 'Name must contain only letters (no numbers or symbols).';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email) {
      validationErrors.email = 'Email is required.';
    } else if (!emailPattern.test(inputs.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!inputs.password) {
      validationErrors.password = 'Password is required.';
    } else if (inputs.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }

    if (!inputs.role) {
      validationErrors.role = 'Role is required.';
    }

    const phonePattern = /^[0-9]{10}$/;  
    if (!inputs.phone) {
      validationErrors.phone = 'Phone number is required.';
    } else if (!phonePattern.test(inputs.phone)) {
      validationErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const sendRequest = async () => {
    try {
      await axios.post('http://localhost:4000/api/adm', {
        userId: String(inputs.userId),
        name: String(inputs.name),
        email: String(inputs.email),
        password: String(inputs.password),
        role: String(inputs.role),
        phone: String(inputs.phone),
      });
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      sendRequest().then(() => navigate('/customer'));
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Nav />
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New User</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User Registration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID:</label>
              <input
                type="text"
                name="userId"
                onChange={handleChange}
                value={inputs.userId}
                className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.userId && <p className="mt-1 text-sm text-red-600">{errors.userId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={inputs.email}
                className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={inputs.password}
                className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role:</label>
              <select
                name="role"
                onChange={handleChange}
                value={inputs.role}
                className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="vet">Vet</option>
                <option value="rescue_center">Rescue Center</option>
                <option value="pet_owner">Pet Owner</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
              <input
                type="tel"
                name="phone"
                onChange={handleChange}
                value={inputs.phone}
                className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-blue-200 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewUser;