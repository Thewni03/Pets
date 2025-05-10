import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
        <ul className="flex justify-center items-center gap-10 list-none bg-gradient-to-r from-blue-700 to-blue-900 p-5 m-0 rounded-b-xl shadow-md">
            <li className="transition-all duration-300 hover:scale-105">
                <Link to="/petvacdetails" className="text-white no-underline">
                    <h1 className="text-xl m-0 cursor-pointer hover:text-yellow-300">Pet vaccination details</h1>
                </Link>
            </li>
            <li className="transition-all duration-300 hover:scale-105">
                <Link to="/petdetails" className="text-white no-underline">
                    <h1 className="text-xl m-0 cursor-pointer hover:text-yellow-300">Pet Details</h1>
                </Link>
            </li>
            <li className="transition-all duration-300 hover:scale-105">
                <Link to="/imgpart" className="text-white no-underline">
                    <h1 className="text-xl m-0 cursor-pointer hover:text-yellow-300">Photo Gallery</h1>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav;