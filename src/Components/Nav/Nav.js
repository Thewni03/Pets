import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Admin Dashboard</h2>
      <ul>
      
        <li>
          <Link to="/customers" className="ab">Manage Users</Link>
        </li>
        <li>
          <Link to="/record" className="ab">Reports & Stats</Link>
        </li>
        <li>
          <Link to="/files" className="ab">Upload files</Link>
        </li>
        <li>
          <Link to="/ai" className="ab">Diet</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
