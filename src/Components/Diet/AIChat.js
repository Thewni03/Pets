import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './AIChat.css';

function AIChat() {
  const [formData, setFormData] = useState({
    species: '',
    breed: '',
    weightKg: '',
    ageYears: '',
  });

  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes with one function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate inputs
  const validateInputs = () => {
    const { species, breed, weightKg, ageYears } = formData;
    if (!species || !breed || !weightKg || !ageYears) {
      setError('All fields are required.');
      return false;
    }
    if (weightKg <= 0 || ageYears <= 0) {
      setError('Weight and Age must be positive numbers.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5008/generate-diet-plan', {
        species: formData.species,
        breed: formData.breed,
        weight_kg: Number(formData.weightKg),
        age_years: Number(formData.ageYears),
      });

      setAiResponse(response.data); // Storing the entire response
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError('Failed to generate diet plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="ai-chat-container">
        <form onSubmit={handleSubmit} className="ai-chat-form">
          <div className="input-group">
            <label>Species:</label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="Enter species"
            />
          </div>

          <div className="input-group">
            <label>Breed:</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Enter breed"
            />
          </div>

          <div className="input-group">
            <label>Weight (kg):</label>
            <input
              type="number"
              name="weightKg"
              value={formData.weightKg}
              onChange={handleChange}
              placeholder="Enter weight in kg"
            />
          </div>

          <div className="input-group">
            <label>Age (years):</label>
            <input
              type="number"
              name="ageYears"
              value={formData.ageYears}
              onChange={handleChange}
              placeholder="Enter age in years"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Generating...' : 'Generate Diet Plan'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {loading && <p className="loading-message">Generating response...</p>}
        
        {aiResponse && (
          <div className="ai-response">
            <h3>AI Generated Diet Plan</h3>
            {/* Rendering the AI response as formatted JSON */}
            <pre>{JSON.stringify(aiResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIChat;
