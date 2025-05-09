import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import './AddUser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
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
    "Cows", "Goats","Sheep", "Horses", "Turtles", "Snakes",
    "Lizards", "Ferrets","other"
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
    await axios.post("http://localhost:5001/users", {
      Petname: String(inputs.Petname),
      Species: String(inputs.Species),
      Age: Number(inputs.Age),
      Gender: String(inputs.Gender),
      Breed: String(inputs.Breed),
      Bday: String(inputs.Bday),
      Address: String(inputs.Address),
      Num: Number(inputs.Num),
    }).then(res => res.data);
  };

  return (
    <div className="add-user-container">
      <Nav />
      <h1>Add Pet Details</h1>
      <form onSubmit={handleSubmit}>

        
        <label>Pet Name</label>
        <input type="text" name="Petname" onChange={handleChange} value={inputs.Petname} required />
        <p className="error">{errors.Petname}</p>
      


        
        <label>Species</label>
        <select name="Species" onChange={handleChange} value={inputs.Species} required>
          <option value="">Select a species</option>
          {speciesOptions.map((species, index) => (
            <option key={index} value={species}>{species}</option>
          ))}
        </select>
        <p className="error">{errors.Species}</p>

        
        <label>Age</label>
        <input type="number" name="Age" onChange={handleChange} value={inputs.Age} required />
        <p className="error">{errors.Age}</p>

        
        <label>Gender</label>
        <div>
          <input type="radio" name="Gender" value="Male" onChange={handleChange} required /> Male
          <input type="radio" name="Gender" value="Female" onChange={handleChange} required /> Female
        </div>
        <p className="error">{errors.Gender}</p>

       
        <label>Breed</label>
        <input type="text" name="Breed" onChange={handleChange} value={inputs.Breed} required />
        
        
        <label>Date Of Birth</label>
        <input type="date" name="Bday" max={today} onChange={handleChange} value={inputs.Bday} required />
        <p className="error">{errors.Bday}</p>

       
        <label>Address</label>
        <input type="text" name="Address" onChange={handleChange} value={inputs.Address} required />

       
        <label>Mobile Number of the owner</label>
        <input type="text" name="Num" onChange={handleChange} value={inputs.Num} required />
        <p className="error">{errors.Num}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
