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
const Nav = () => {
  return (
    <div className="bg-black">
      <ul className="flex justify-center h-[60px] items-center space-x-6">
        {["vets", "VetForm", "Login", "Logout"].map((label) => (
          <li key={label} className="group">
            <Link
              to={`/${label.toLowerCase()}`}
              className="text-white px-5 py-2 rounded-md text-xl font-medium transition-all duration-300 ease-in-out group-hover:bg-[#051a06] group-hover:text-gray-100"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
