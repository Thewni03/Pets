import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

function VetForm() {
  const [vetData, setVetData] = useState({
    Appointment: "",
    Diagnosis: "",
    treatment: "",
    prescription: "",
    vetId: ""
  });

  const handleChange = (e) => {
    setVetData({ ...vetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/vet/", vetData)
      .then(response => {
        alert("Vet Data Added Successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error adding vet data:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="text-center mt-6 text-2xl font-semibold text-gray-800">Enter Vet Data</div>
      <div className="flex justify-center mt-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl space-y-4 border border-gray-200">
          <input
            type="text"
            name="Appointment"
            placeholder="Appointment"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-lime-200 rounded focus:outline-none focus:ring-2 focus:ring-lime-300"
          />
          <input
            type="text"
            name="Diagnosis"
            placeholder="Diagnosis"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-lime-200 rounded focus:outline-none focus:ring-2 focus:ring-lime-300"
          />
          <input
            type="text"
            name="treatment"
            placeholder="Treatment"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-lime-200 rounded focus:outline-none focus:ring-2 focus:ring-lime-300"
          />
          <input
            type="text"
            name="prescription"
            placeholder="Prescription"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-lime-200 rounded focus:outline-none focus:ring-2 focus:ring-lime-300"
          />
          <input
            type="text"
            name="vetId"
            placeholder="Vet ID"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-lime-200 rounded focus:outline-none focus:ring-2 focus:ring-lime-300"
          />
          <button
            type="submit"
            className="w-full bg-lime-300 text-white font-semibold py-2 rounded hover:bg-lime-400 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default VetForm;
