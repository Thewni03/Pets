import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './NewUser.css';

function NewUser() {
  const navigate = useNavigate();  // Correctly using navigate from useNavigate
  const [inputs, setInputs] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    role: '', // Initially empty
    phone: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      await axios.post('http://localhost:5008/users', {
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
    console.log(inputs);
    sendRequest().then(() => navigate('/customers'));  // Use navigate instead of history
  };

  return (
    <div>
      <Nav />
      <p>
   
      </p>
      <h1>Add New One</h1>
      <form onSubmit={handleSubmit}>
        <h2>User Registration</h2>

        <label>User ID:</label>
        <br />
        <input
          type="text"
          name="userId"
          onChange={handleChange}
          value={inputs.userId}
          required
        />
        <br />

        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          required
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
          required
        />
        <br />

        <label>Role:</label>
        <select
          name="role"
          onChange={handleChange}
          value={inputs.role}
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="vet">Vet</option>
          <option value="rescue_center">Rescue Center</option>
          <option value="pet_owner">Pet Owner</option>
        </select>
        <br />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          onChange={handleChange}
          value={inputs.phone}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewUser;
