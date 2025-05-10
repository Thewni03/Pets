import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from "axios";
import Appointments from './Appointments';

const URL = "http://localhost:4000/api/vet/";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Vet Data:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { vets: [] };
  }
};

function Vets() {
  const [vets, setVets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        if (data && data.length > 0) {
          setVets(data);
        } else {
          setError("No vets available.");
        }
      })
      .catch(err => {
        setError("Failed to fetch vet data.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <h1 className="text-3xl font-bold text-center mt-6 text-gray-800">Vet Details Display Page</h1>

      {error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : (
        <div className="p-6 space-y-6">
          {vets.map((vet) => (
            <div
              key={vet._id || vet.vetId}
              className="bg-white border border-gray-300 rounded shadow-sm"
            >
              <Appointments appointmentDetails={vet} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vets;
