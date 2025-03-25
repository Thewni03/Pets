import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5008/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:5008/users/${id}`, {
        userId: String(inputs.userId),
        name: String(inputs.name),
        email: String(inputs.email),
        password: String(inputs.password),
        role: String(inputs.role),
        phone: String(inputs.phone),
      });
      console.log('User updated:', response.data);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', inputs);
  
    try {
      await sendRequest();  // Wait for the update to complete
      navigate('/customers');  // Only navigate after the update is successful
    } catch (err) {
      console.error('Error during form submission:', err);
      // Optionally, show an error message to the user
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>User Registration</h2>
        <label>User ID:</label>
        <br />
        <input
          type="text"
          name="userId"
          onChange={handleChange}
          value={inputs.userId || ''}
          required
        />
        <br />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name || ''}
          required
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email || ''}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={inputs.password || ''}
          required
        />
        <br />
        <label>Role:</label>
        <input
          type="text"
          name="role"
          onChange={handleChange}
          value={inputs.role || ''}
          required
        />
        <br />
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          onChange={handleChange}
          value={inputs.phone || ''}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateUser;
