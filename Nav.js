import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <div>
      <ul className="home-ul">
        <li className="home-ll">
          <Link to="/vets" className="active home-a">
            <h1>Pets</h1>
          </Link>
        </li>
      
        <li className="home-ll">
          <Link to="/vetForm" className="active home-a">
            <h1>vetForm</h1>
          </Link>
        </li>
        <li className="home-ll">
          <Link to="/login" className="active home-a">
            <h1>Login</h1>
          </Link>
        </li>
        <li className="home-ll">
          <Link to="/logout" className="active home-a">
            <h1>Logout</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav; 
