import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';

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
    axios.post("http://localhost:5008/vets", vetData)
      .then(response => {
        alert("Vet Data Added Successfully!");
        window.location.reload(); // Refresh the page to update both dashboards
      })
      .catch(error => {
        console.error("Error adding vet data:", error);
      });
  };

  return (
    <div>
      <Nav/>
      <h2>Enter Vet Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Appointment" placeholder="Appointment" onChange={handleChange} required />
        <input type="text" name="Diagnosis" placeholder="Diagnosis" onChange={handleChange} required />
        <input type="text" name="treatment" placeholder="Treatment" onChange={handleChange} required />
        <input type="text" name="prescription" placeholder="Prescription" onChange={handleChange} required />
        <input type="text" name="vetId" placeholder="Vet ID" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VetForm;
