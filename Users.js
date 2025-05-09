import React, { useEffect, useState, useRef } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import User from '../User/User';
import './Users.css';
import {useReactToPrint} from "react-to-print";

//search pet details
const URL ="http://localhost:5001/users";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}
function Users() {

  const [users, setUsers] = useState();
  useEffect(()=>{
    fetchHandler ().then((data) => setUsers(data.users));
  },[]);

  const [searchQuery, setSearchQuery] =useState("");
  const [noResults, setNoResult] =useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) =>{
      const filteredUsers = data.users.filter((user)=>
      Object.values(user).some((field)=>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ))
      setUsers(filteredUsers);
      setNoResult(filteredUsers.length === 0);
    });
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle:"Pet Report",
    contentRef:componentRef,
    

  })




  return (
    <div className="users-container">
      <Nav/>
      <h1>Pet Details</h1>

      <input onChange={(e)=> setSearchQuery(e.target.value)}
      type="text"
      name="search"
      placeholder="Search Pet Details">
      </input>
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div className="no-results">
          <p>No pets found</p>
        </div>  
      ): (
      <div ref={componentRef} className="users-list">
        {users && users.map((user,i) =>(
          <div key={i}>
            <User user={user}/>
            </div> 
        ))}
      </div>
      )}
      <button onClick={handlePrint}>Download Report</button>
    </div>
  )
}

export default Users
