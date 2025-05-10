import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function User(props) {
  const { _id, Petname, Species, Age, Gender, Breed, Bday, Address, Num } = props.user;
  const { backendUrl, token } = useContext(AppContext);

  const deleteHandler = async () => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;

    try {
      await axios.delete(`${backendUrl}/api/pet/${_id}`, {  // Changed route to match backend
        headers: { 
          token  
        }
      });
      // Refresh the page to see updated list
      window.location.reload();
      
      
    } catch (err) {
      console.error("Delete error:", err);
      // Add user feedback
      console.log("Response data:", err.response?.data);
      alert(`Failed to delete pet: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="bg-orange-50 p-5 rounded-xl shadow-md shadow-orange-100 mb-5 text-left">
      <div className="space-y-1">
        <p className="text-sm"><strong>ID:</strong> {_id}</p>
        <p className="text-sm"><strong>Pet Name:</strong> {Petname}</p>
        <p className="text-sm"><strong>Species:</strong> {Species}</p>
        <p className="text-sm"><strong>Age:</strong> {Age}</p>
        <p className="text-sm"><strong>Gender:</strong> {Gender}</p>
        <p className="text-sm"><strong>Breed:</strong> {Breed}</p>
        <p className="text-sm"><strong>Date of Birth:</strong> {Bday}</p>
        <p className="text-sm"><strong>Address:</strong> {Address}</p>
        <p className="text-sm"><strong>Owner's Mobile:</strong> {Num}</p>
      </div>

      <div className="flex gap-2 mt-3">
        <Link 
          to={`/petdetails/${_id}`} 
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all"
        >
          Update
        </Link>
        <button 
          onClick={deleteHandler} 
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default User;