import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import Appointments from '../Appointments/Appointments';

const URL = "http://localhost:5008/vets"; // Ensure the URL is for fetching vet data

// Function to fetch vet data
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Vet Data:", response.data); // Log the fetched data
    return response.data; // Ensure the correct vet data is being returned
  } catch (error) {
    console.error('Error fetching data:', error);
    return { vets: [] }; // Return empty vets array in case of error
  }
};

function Vets() {
  const [vets, setVets] = useState([]); // Store vet data
  const [error, setError] = useState(""); // Store error message

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data.vets && data.vets.length > 0) {
        setVets(data.vets); // Set the fetched vet data
      } else {
        setError("No vets available.");
      }
    }).catch(err => {
      setError("Failed to fetch vet data.");
    });
  }, []); // Empty dependency array to fetch data only once

  return (
    <div>
      <Nav />
      <h1>Vet Details Display Page</h1>
      
      {error ? (
        <p>{error}</p> // Display error message
      ) : (
        <div>
          {vets.map((vet) => {
            console.log("Vet Data Passed to Appointments:", vet); // Log each vet data
            return (
              <div key={vet._id}> {/* Ensure each item has a unique key */}
                <Appointments appointmentDetails={vet} /> {/* Pass the vet data */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Vets;
