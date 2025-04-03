import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";

function User(props) {
  const { _id, Petname, Species, Age, Gender, Breed, Bday, Address, Num } = props.user;

  const history = useNavigate();
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5008/dogs/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/petdetails"));
  };

  return (
    <div className="user-card ">
      <div className="user-card-header">
        <h2>{Petname}</h2>
        <p>{Species} - {Breed}</p>
      </div>
      <div className="user-card-body">
        <p><strong>Age:</strong> {Age} years</p>
        <p><strong>Gender:</strong> {Gender}</p>
        <p><strong>Birthday:</strong> {Bday}</p>
        <p><strong>Address:</strong> {Address}</p>
        <p><strong>Owner's Mobile:</strong> {Num}</p>
      </div>
      <div className="user-card-actions">
        <Link to={`/petdetails/${_id}`} className="update-btn">Update</Link>
        <button onClick={deleteHandler} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default User;
