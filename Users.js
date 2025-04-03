import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import User from '../User/User';
import './Users.css'; // Make sure to import the CSS file

const URL = "http://localhost:5008/dogs";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Users() {

  const [dogs, setUsers] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.dogs));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResult] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.dogs.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResult(filteredUsers.length === 0);
    });
  }

  return (
    <div className="users-container">
      <Nav />
      <h1>Pet Details</h1>

      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Pet Details"
      />
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div className="no-results">
          <p>No pets found</p>
        </div>
      ) : (
        <div>
          {dogs && dogs.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
