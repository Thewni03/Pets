import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { AppContext } from '../../context/AppContext';

function UpdateUser() {
  const { backendUrl, token } = useContext(AppContext);
  const history = useNavigate();
  const { petId } = useParams();
  const [inputs, setInputs] = useState({
    Petname: "",
    Species: "",
    Breed: "",
    Age: "",
    Gender: "",
    Bday: "",
    Address: "",
    Num: "",
  });

  const [errors, setErrors] = useState({});

  const speciesOptions = [
    "Dog", "Cat", "Parrot", "Hamster", "Rabbits", "Pigs",
    "Cows", "Goats", "Sheep", "Horses", "Turtles", "Snakes",
    "Lizards", "Ferrets", "Other"
  ];

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchHandler = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/pet/${petId}`, {
                headers: { token }
            });
            
            if (res.data.success) {
                const petData = res.data.pet;
                // Convert ISO date to yyyy-MM-dd format for the input field
                if (petData.Bday) {
                    petData.Bday = petData.Bday.split('T')[0];
                }
                setInputs(petData);
            } else {
                console.error("Failed to fetch pet:", res.data.message);
            }
        } catch (error) {
            console.error("Error fetching pet:", error);
        }
    };
    fetchHandler();
    }, [petId]);

  const validate = () => {
    let tempErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^[0-9]+$/;

    if (!inputs.Petname.match(nameRegex)) tempErrors.Petname = "Pet name must contain only letters.";
    if (!inputs.Species) tempErrors.Species = "Please select a species.";
    if (isNaN(inputs.Age) || inputs.Age < 1) tempErrors.Age = "Age must be at least 1.";
    if (!String(inputs.Num).match(numberRegex) || String(inputs.Num).length !== 10) tempErrors.Num = "Mobile number must be exactly 10 digits.";
    if (!inputs.Bday) {
      tempErrors.Bday = "Date of Birth is required.";
    } else if (inputs.Bday > today) {
      tempErrors.Bday = "Date of birth cannot be in the future.";
    }
    if (!inputs.Gender) tempErrors.Gender = "Please select Male or Female.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

//   const sendRequest = async () => {
//     try {
//         // Prepare data for backend
//         const updateData = {
//             ...inputs,
//             Age: Number(inputs.Age),
//             Num: Number(inputs.Num)
//         };

//         const res = await axios.put(
//             `${backendUrl}/api/pet/update/${petId}`,
//             updateData,
//             { headers: { token } }
//         );

//         if (!res.data.success) {
//             throw new Error(res.data.message);
//         }
//     } catch (error) {
//         console.error("Update failed:", error);
//         throw error; // Re-throw to handle in handleSubmit
//     }
// };

const sendRequest = async () => {
  try {
      // Prepare data for backend - ensure proper formatting
      const updateData = {
          ...inputs,
          Age: Number(inputs.Age),
          Num: Number(inputs.Num),
          // Bday is already in yyyy-MM-dd format from the input
      };

      const res = await axios.put(
          `${backendUrl}/api/pet/update/${petId}`,
          updateData,
          { 
              headers: { token },
              timeout: 5000 // Add timeout to prevent hanging
          }
      );

      if (!res.data.success) {
          throw new Error(res.data.message || "Update failed");
      }
      return res.data;
  } catch (error) {
      console.error("Update request details:");
      throw error;
  }
};

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//         try {
//             await sendRequest();
//             // Show success message
//             history("/petdetails");
//         } catch (error) {
//             // Show error message to user
//             console.error("Update error:", error);
//         }
//     }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
      const result = await sendRequest();
      // Show success notification
      console.log("Update successful:", result);
      alert("Pet updated successfully!");
      history("/petdetails");
  } catch (error) {
      let errorMessage = "Failed to update pet";
      
      if (error.response) {
          // The request was made and the server responded with a status code
          errorMessage = error.response.data.message || errorMessage;
          console.error("Server response:", error.response.data);
      } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "No response from server";
          console.error("No response received:", error.request);
      } else {
          // Something happened in setting up the request
          errorMessage = error.message;
          console.error("Request setup error:", error.message);
      }
      
      // Show error message to user (using toast, alert, or state)
      alert(errorMessage);
  }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 sm:p-8 bg-orange-50 rounded-2xl shadow-xl shadow-orange-100 font-['Poppins']">
      <Nav />
      <h1 className="text-center text-2xl font-bold text-orange-500 mb-6">Update Pet Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        {/* Pet Name */}
        <label className="text-orange-500 font-semibold">Pet Name</label>
        <input
          type="text"
          name="Petname"
          onChange={handleChange}
          value={inputs.Petname}
          required
          className="p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        />
        {errors.Petname && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.Petname}</p>}

        {/* Species */}
        <label className="text-orange-500 font-semibold">Species</label>
        <select
          name="Species"
          onChange={handleChange}
          value={inputs.Species}
          required
          className="p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        >
          <option value="">Select a species</option>
          {speciesOptions.map((species, index) => (
            <option key={index} value={species}>{species}</option>
          ))}
        </select>
        {errors.Species && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.Species}</p>}

        {/* Age */}
        <label className="text-orange-500 font-semibold">Age</label>
        <input
          type="number"
          name="Age"
          onChange={handleChange}
          value={inputs.Age}
          required
          className="p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        />
        {errors.Age && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.Age}</p>}

        {/* Gender */}
        <label className="text-orange-500 font-semibold">Gender</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="Gender"
              value="Male"
              onChange={handleChange}
              checked={inputs.Gender === "Male"}
              required
              className="text-orange-500"
            />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="Gender"
              value="Female"
              onChange={handleChange}
              checked={inputs.Gender === "Female"}
              required
              className="text-orange-500"
            />
            <span>Female</span>
          </label>
        </div>
        {errors.Gender && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.Gender}</p>}

        {/* Breed */}
        <label className="text-orange-500 font-semibold">Breed</label>
        <input
          type="text"
          name="Breed"
          onChange={handleChange}
          value={inputs.Breed}
          required
          className="p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        />

        {/* Date of Birth */}
        <label className="text-orange-500 font-semibold">Date Of Birth</label>
        <input
          type="date"
          name="Bday"
          max={today}
          onChange={handleChange}
          value={inputs.Bday}
          required
          className="p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        />
        {errors.Bday && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.Bday}</p>}

        {/* Address */}
        <label className="text-orange-500 font-semibold">Address</label>
        <input
          type="text"
          name="Address"
          onChange={handleChange}
          value={inputs.Address}
          required
          className="p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        />

        {/* Mobile Number */}
        <label className="text-orange-500 font-semibold">Mobile Number of the owner</label>
        <input
          type="text"
          name="Num"
          onChange={handleChange}
          value={inputs.Num}
          required
          className="p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        />
        {errors.Num && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.Num}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-all"
        >
          Update Pet
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;