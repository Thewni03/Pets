import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateVetForm() {
  const [inputs, setInputs] = useState({
    Appointment: '',
    Diagnosis: '',
    treatment: '',
    prescription: '',
    vetId: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/vet/${id}`);
        console.log("Fetched data:", res.data);

        setInputs({
          Appointment: res.data.Appointment || '',
          Diagnosis: res.data.Diagnosis || '',
          treatment: res.data.treatment || '',
          prescription: res.data.prescription || '',
          vetId: res.data.vetId || ''
        });
      } catch (err) {
        console.error('Failed to fetch vet data:', err.response?.data || err.message);
      }
    };

    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:4000/api/vet/${id}`, {
        Appointment: inputs.Appointment,
        Diagnosis: inputs.Diagnosis,
        treatment: inputs.treatment,
        prescription: inputs.prescription,
        vetId: inputs.vetId
      });

      console.log('Vet appointment updated successfully:', res.data);
      navigate('/vets');
    } catch (err) {
      console.error('Error updating vet appointment:', err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Update Vet Appointment
        </h2>

        <input
          type="text"
          name="Appointment"
          placeholder="Appointment"
          value={inputs.Appointment}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="Diagnosis"
          placeholder="Diagnosis"
          value={inputs.Diagnosis}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="treatment"
          placeholder="Treatment"
          value={inputs.treatment}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="prescription"
          placeholder="Prescription"
          value={inputs.prescription}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="vetId"
          placeholder="Vet ID"
          value={inputs.vetId}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateVetForm;
