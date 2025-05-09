import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './user.css';
import { useNavigate } from 'react-router-dom';

function User(props) {
  const { _id, Petname, Species, Age, Gender, Breed, Bday, Address, Num } = props.user;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5001/users/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/petdetails'));
  };

  return (
    <div className="user-card">
      <div className="pet-info">
        <p><strong>ID:</strong> {_id}</p>
        <p><strong>Pet Name:</strong> {Petname}</p>
        <p><strong>Species:</strong> {Species}</p>
        <p><strong>Age:</strong> {Age}</p>
        <p><strong>Gender:</strong> {Gender}</p>
        <p><strong>Breed:</strong> {Breed}</p>
        <p><strong>Date of Birth:</strong> {Bday}</p>
        <p><strong>Address:</strong> {Address}</p>
        <p><strong>Owner's Mobile:</strong> {Num}</p>
      </div>

      <div className="button-container">
        <Link to={`/petdetails/${_id}`} className="update-button">Update</Link>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
      </div>
    </div>
  );
}

export default User;
