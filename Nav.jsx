import React from 'react';
import { Link } from 'react-router-dom';

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
