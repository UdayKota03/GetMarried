import React, { useState } from "react";
import Logo from "../assets/baang.svg";
import {useNavigate , Link} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar bg-white fixed text-lg mt-0 mx-auto z-50" style={{ height: "70px", backgroundColor:'#ECDFD0'}}>
      <div className="flex-1 flex items-center h-full"> {/* Full height for alignment */}
        <a className="btn btn-ghost normal-case flex items-center leading-none hover:bg-transparent p-0" style={{ padding: "0px" }}>
          <img src={Logo} alt="Logo" className="h-14 w-60 object-contain mt-0" /> {/* Increased size */}
        </a>
      </div>
      <div className="flex-none">
        {/* Dropdown for small screens */}
        <div className="dropdown lg:hidden relative"> {/* Added relative positioning */}
          <button 
            onClick={toggleDropdown} 
            className="btn btn-ghost p-1" aria-label="Menu">
            {/* Menu Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800" // Change color for visibility
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-8 6h8"
              />
            </svg>
          </button>
          {isOpen && (
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 absolute right-0 p-2 shadow-md">
              <li>
                <a className="hover:bg-transparent hover:text-customBlue font-serif">Home</a>
              </li>
              <li>
                <a className="hover:bg-transparent hover:text-customBlue font-serif">About</a>
              </li>
              <li>
                <a className="hover:bg-transparent hover:text-customBlue font-serif">How it works</a>
              </li>
              <li>
                <a className="hover:bg-transparent hover:text-customBlue font-serif">Contact Us</a>
              </li>
              <li>
              <Link to="/register" className="hover:bg-transparent"> <button className="btn hover:bg-transparent border-none">Register</button>
              </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Menu for medium screens and larger */}
        <ul className="menu menu-horizontal px-1 text-lg font-thin hidden lg:flex items-center justify-center">
          <li>
            <a className="hover:bg-transparent hover:text-customBlue font-robotic">Home</a>
          </li>
          <li>
            <a className="hover:bg-transparent hover:text-customBlue font-serif">About</a>
          </li>
          <li>
            <a className="hover:bg-transparent hover:text-customBlue font-serif">How it works</a>
          </li>
          <li>
            <a className="hover:bg-transparent hover:text-customBlue font-serif">Contact Us</a>
          </li>
          <li>
            <Link to="/register" className="hover:bg-transparent"> <button className="btn hover:bg-transparent border-none">Register</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;