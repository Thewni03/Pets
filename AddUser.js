import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import './AddUser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
  const history = useNavigate();
  const [inputs,setInputs] = useState({
    Petname:"",
    Species:"",
    Breed:"",
    Age:"",
    Gender:"",
    Bday:"",
    Address:"",
    Num:"",
    
  });
  const handleChange =(e)=>{
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    history("/petdetails");
  };

  const sendRequest = async()=>{
  await axios.post("http://localhost:5008/dogs", {
    Petname:String(inputs.Petname),
    Species:String(inputs.Species),
    Age:Number(inputs.Age),
    Gender:String(inputs.Gender),
    Breed:String(inputs.Breed),
    Bday: Date(inputs.Bday),
    Address: String(inputs.Address),
    Num: Number(inputs.Num),
  }).then(res => res.data);
  };
  return (
    <div className="add-user-container">
        <Nav/>
        <h1>Add Pet Details</h1>
        <form onSubmit={handleSubmit}>
          <label>Pet name</label>
          <br />
          <input type="text" name="Petname" onChange={handleChange} value={inputs.Petname} required></input>
          <br></br>
          <br></br>
          <label>Species</label>
          <input type="text" name="Species" onChange={handleChange} value={inputs.Species} required />
          <br></br>
          <br></br>
          <label>Age</label>
          <input type="Number" name="Age" onChange={handleChange} value={inputs.Age} required></input>
          <br></br>
          <br></br>
          <label>Gender</label>
          <input type="text" name="Gender" onChange={handleChange} value={inputs.Gender} required></input>
          <br></br>
          <br></br>
          <label>Breed</label>
          <input type="text" name="Breed" onChange={handleChange} value={inputs.Breed} required></input>
          <br></br>
          <br></br>
          <label>Date Of Birth</label>
          <input type="date" name="Bday" onChange={handleChange} value={inputs.Bday} required></input>
          <br></br>
          <br></br>
          <label>Address</label>
          <input type="text" name="Address" onChange={handleChange} value={inputs.Address} required></input>
          <br></br>
          <br></br>
          <label>Mobile Number of the owner</label>
          <input type="Number" name="Num" onChange={handleChange} value={inputs.Num} required></input>
          <br></br>
          <br></br>
          <button>Submit</button>
        </form>
    </div>
  )
}

export default AddUser
