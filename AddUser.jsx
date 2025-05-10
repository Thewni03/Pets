import React, { useState, useContext } from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function AddUser() {
  const { backendUrl, token, userData} = useContext(AppContext);
  const userId = userData._id;
  
  const history = useNavigate();
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
    "Lizards", "Ferrets", "other"
  ];

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^[0-9]+$/;

    if (!inputs.Petname.match(nameRegex)) tempErrors.Petname = "Pet name must contain only letters.";
    if (!inputs.Species) tempErrors.Species = "Please select a species.";
    if (isNaN(inputs.Age) || inputs.Age < 1) tempErrors.Age = "Age must be at least 1.";
    if (!inputs.Num.match(numberRegex) || inputs.Num.length !== 10) tempErrors.Num = "Mobile number must be exactly 10 digits.";
    
    if (!inputs.Bday) {
      tempErrors.Bday = "Date of Birth is required.";
    } else if (inputs.Bday > today) {
      tempErrors.Bday = "Date of birth cannot be in the future.";
    }

    if (!inputs.Gender) tempErrors.Gender = "Please select Male or Female.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(inputs);
      await sendRequest();
      history("/petdetails");
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/pet/add`, {
        userId,
        Petname: inputs.Petname,
        Species: inputs.Species,
        Age: inputs.Age,
        Gender: inputs.Gender,
        Breed: inputs.Breed,
        Bday: inputs.Bday,
        Address: inputs.Address,
        Num: inputs.Num
      }, { 
        headers: { token } 
      }
    );
      console.log("Response:", response.data); // Add this to see server response
      return response.data;
      
    } catch (error) {
      console.error("Error saving pet:", error.response?.data || error.message);
      throw error; // Re-throw to handle in handleSubmit
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 sm:p-8 bg-white rounded-2xl shadow-xl shadow-orange-100 font-['Poppins']">
      <Nav />
      <h1 className="text-center text-2xl font-bold text-orange-500 mb-6">Add Pet Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        {/* Pet Name */}
        <label className="text-orange-500 font-semibold">Pet Name</label>
        <input
          type="text"
          name="Petname"
          onChange={handleChange}
          value={inputs.Petname}
          required
          className="p-3 border border-orange-300 rounded-xl mb-1 bg-orange-50 focus:border-orange-500 focus:bg-orange-100 focus:outline-none transition-colors"
        />
        {errors.Petname && <p className="text-red-500 text-sm -mt-3">{errors.Petname}</p>}

        {/* Species */}
        <label className="text-orange-500 font-semibold">Species</label>
        <select
          name="Species"
          onChange={handleChange}
          value={inputs.Species}
          required
          className="p-3 border border-orange-300 rounded-xl mb-1 bg-orange-50 focus:border-orange-500 focus:bg-orange-100 focus:outline-none transition-colors"
        >
          <option value="">Select a species</option>
          {speciesOptions.map((species, index) => (
            <option key={index} value={species}>{species}</option>
          ))}
        </select>
        {errors.Species && <p className="text-red-500 text-sm -mt-3">{errors.Species}</p>}

        {/* Age */}
        <label className="text-orange-500 font-semibold">Age</label>
        <input
          type="number"
          name="Age"
          onChange={handleChange}
          value={inputs.Age}
          required
          className="p-3 border border-orange-300 rounded-xl mb-1 bg-orange-50 focus:border-orange-500 focus:bg-orange-100 focus:outline-none transition-colors"
        />
        {errors.Age && <p className="text-red-500 text-sm -mt-3">{errors.Age}</p>}

        {/* Gender */}
        <label className="text-orange-500 font-semibold">Gender</label>
        <div className="flex space-x-4 mb-1">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="Gender"
              value="Male"
              onChange={handleChange}
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
              required
              className="text-orange-500"
            />
            <span>Female</span>
          </label>
        </div>
        {errors.Gender && <p className="text-red-500 text-sm -mt-3">{errors.Gender}</p>}

        {/* Breed */}
        <label className="text-orange-500 font-semibold">Breed</label>
        <input
          type="text"
          name="Breed"
          onChange={handleChange}
          value={inputs.Breed}
          required
          className="p-3 border border-orange-300 rounded-xl mb-1 bg-orange-50 focus:border-orange-500 focus:bg-orange-100 focus:outline-none transition-colors"
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
          className="p-3 border border-orange-300 rounded-xl mb-1 bg-orange-50 focus:border-orange-500 focus:bg-orange-100 focus:outline-none transition-colors"
        />
        {errors.Bday && <p className="text-red-500 text-sm -mt-3">{errors.Bday}</p>}

        {/* Address */}
        <label className="text-orange-500 font-semibold">Address</label>
        <input
          type="text"
          name="Address"
          onChange={handleChange}
          value={inputs.Address}
          required
          className="p-3 border border-orange-300 rounded-xl mb-1 bg-orange-50 focus:border-orange-500 focus:bg-orange-100 focus:outline-none transition-colors"
        />

        {/* Mobile Number */}
        <label className="text-orange-500 font-semibold">Mobile Number of the owner</label>
        <input
          type="text"
          name="Num"
          onChange={handleChange}
          value={inputs.Num}
          required
          className="p-3 border border-orange-300 rounded-xl mb-1 bg-orange-50 focus:border-orange-500 focus:bg-orange-100 focus:outline-none transition-colors"
        />
        {errors.Num && <p className="text-red-500 text-sm -mt-3">{errors.Num}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUser;