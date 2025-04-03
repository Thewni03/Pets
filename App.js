import React from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from "./Components/Home/Home";
import AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/UserDetails/Users";
import UpdateUser from "./Components/UpdateUser/UpdateUser";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/mainhome" element={<Home />}/>
          <Route path="/petvacdetails" element={<AddUser />}/>
          <Route path="/petdetails" element={<Users/>}/>
          <Route path="/petdetails/:id" element={<UpdateUser/>}/>
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
