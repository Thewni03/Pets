import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/adm/${id}`);
        setInputs(res.data.user || {});
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchHandler();
  }, [id]);

  const validateInputs = () => {
    const validationErrors = {};

    const namePattern = /^[A-Za-z]+$/;
    if (!inputs.name) {
      validationErrors.name = 'Name is required.';
    } else if (!namePattern.test(inputs.name)) {
      validationErrors.name = 'Name must contain only letters.';
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
      await axios.put(`http://localhost:4000/api/adm/${id}`, {
        userId: String(inputs.userId),
        name: String(inputs.name),
        email: String(inputs.email),
        password: String(inputs.password),
        role: String(inputs.role),
        phone: String(inputs.phone),
      });
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        await sendRequest();
        navigate('/customer');
      } catch (err) {
        console.error('Submission error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID:</label>
            <input
              type="text"
              name="userId"
              onChange={handleChange}
              value={inputs.userId || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={inputs.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={inputs.password || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role:</label>
            <select
              name="role"
              onChange={handleChange}
              value={inputs.role || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              value={inputs.phone || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;