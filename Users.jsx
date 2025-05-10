import React, { useEffect, useState, useRef, useContext } from 'react';
import Nav from './Nav';
import axios from "axios";
import User from './User';
import { useReactToPrint } from "react-to-print";
import { AppContext } from '../../context/AppContext';



function Users() {
  const { backendUrl, token } = useContext(AppContext);
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResult] = useState(false);
  const componentRef = useRef();

  const fetchHandler = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/pet/my-pets`, {
        headers: { token }
      });
      return response.data.pets || []; // Always return an array
    } catch (error) {
      console.error("Error fetching pets:", error);
      return [];
    }
  }
  

  useEffect(() => {
    fetchHandler().then((data) => {
      // Change 'users' to 'pets' if that's what your backend returns
      setUsers(data); 
    });
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.filter((user) =>
        Object.values(user).some((field) =>
          field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      setUsers(filteredUsers);
      setNoResult(filteredUsers.length === 0);
    });
  }

  const handlePrint = useReactToPrint({
    documentTitle: "Pet Report",
    contentRef: componentRef,
  });

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 sm:p-8 bg-orange-50 rounded-2xl shadow-xl shadow-orange-100 font-['Poppins'] text-center">
      <Nav />
      <h1 className="text-2xl font-bold text-orange-500 mb-5">Pet Details</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Pet Details"
          className="w-full sm:w-2/3 p-3 border border-orange-300 rounded-xl bg-orange-100 focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-colors"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-md active:scale-95 transition-all"
        >
          Search
        </button>
      </div>

      {noResults ? (
        <div className="text-orange-500 font-semibold my-5">
          <p>No pets found</p>
        </div>
      ) : (
        <div ref={componentRef} className="space-y-4 mt-5 p-4 bg-orange-50 rounded-xl shadow-inner">
          {users && users.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handlePrint}
        className="mt-6 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-md active:scale-95 transition-all"
      >
        Download Report
      </button>
    </div>
  );
}

export default Users;