import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';

// Importing the components
import Vets from "../../../frontend/src/comptwo/Vets/Vets";
import Appointments from "../../../frontend/src/comptwo/Appointments/Appointments";
import Profile from "../../../frontend/src/comptwo/Profile/Profile";
import Login from "../../../frontend/src/comptwo/Login/Login";
import Logout from "../../../frontend/src/comptwo/Logout/Logout";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/vets" element={<Vets />} />           {/* Route to display the Vets page */}
          <Route path="/appointments" element={<Appointments />} /> {/* Route to display Appointments page */}
          <Route path="/profile" element={<Profile />} />     {/* Route to display Profile page */}
          <Route path="/login" element={<Login />} />         {/* Route to display Login page */}
          <Route path="/logout" element={<Logout />} />       {/* Route to display Logout page */}
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
