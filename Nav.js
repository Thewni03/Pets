import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
        <ul className="home-ul">
            
            <li className="home-ll">
            <Link to="/petvacdetails" className="active home-a">
                <h1>Pet vaccination details</h1>
                </Link>
            </li>
            <li className="home-ll">
            <Link to="/petdetails" className="active home-a">
                <h1>Pet Details</h1>
                </Link>
            </li>

            <li className="home-ll">
            <Link to="/imgpart" className="active home-a">
                <h1>Photo Gallery</h1>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav
