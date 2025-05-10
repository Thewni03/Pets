import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../../components/Components/Nav';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/diet-plans/generate-diet-plan', {
        species: formData.species,
        breed: formData.breed,
        weight_kg: Number(formData.weightKg),
        age_years: Number(formData.ageYears),
      });

      console.log('AI Response Data:', response.data);

      if (response.data.diet_plan) {
        setAiResponse(response.data.diet_plan);
      } else {
        setError('No diet plan available in the response.');
        setAiResponse(null);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError('Failed to generate diet plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Species:</label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="Enter species"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Breed:</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Enter breed"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Weight (kg):</label>
            <input
              type="number"
              name="weightKg"
              value={formData.weightKg}
              onChange={handleChange}
              placeholder="Enter weight in kg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Age (years):</label>
            <input
              type="number"
              name="ageYears"
              value={formData.ageYears}
              onChange={handleChange}
              placeholder="Enter age in years"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Generating...' : 'Generate Diet Plan'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-4 p-3 text-sm text-blue-700 bg-blue-100 rounded-md">
            Generating response...
          </div>
        )}

        {aiResponse && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-lg font-medium text-blue-800 mb-3">AI Generated Diet Plan</h3>
            <ul className="space-y-2">
              <li><strong className="text-blue-700">Daily Calories:</strong> {aiResponse.daily_calories || 'N/A'} kcal</li>
              <li><strong className="text-blue-700">Feeding Schedule:</strong> {aiResponse.feeding_schedule || 'N/A'}</li>
              <li><strong className="text-blue-700">Food Type:</strong> {aiResponse.food_type || 'N/A'}</li>
              <li><strong className="text-blue-700">Recommendations:</strong></li>
              <ul className="ml-5 list-disc space-y-1">
                {aiResponse.recommendations?.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
              <li><strong className="text-blue-700">Meal Plan:</strong></li>
              <ul className="ml-5 list-disc space-y-2">
                {aiResponse.meal_plan?.map((meal, index) => (
                  <li key={index} className="space-y-1">
                    <strong>{meal.meal_time}:</strong> {meal.food_amount_grams}g - {meal.description}
                    {meal.supplements?.length > 0 && (
                      <ul className="ml-5 list-disc space-y-1">
                        {meal.supplements.map((supplement, idx) => (
                          <li key={idx}>
                            <strong>{supplement.type}:</strong> {supplement.dosage} - {supplement.reason}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIChat;