import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (

     
<nav className="navbar">
<h2>Admin Dashboard</h2>
<ul>


<li >
          <Link to="/petvacdetails" className="ab">
            Pet Vaccination Details
          </Link>
        </li>
        <li >
          <Link to="/petdetails" className="ab">
            Pet Details
          </Link>
        </li>
      </ul>
</nav>
  );
}

export default Nav;
