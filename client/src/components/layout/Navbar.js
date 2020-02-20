import React from "react";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <a href='index.html'>
          <i class='fas  fa-2x fa-map-signs'></i>
        </a>
      </h1>
      <ul className='menu-right'>
        <li className='profiles'>
          <a href='profiles.html'>Profiles</a>
        </li>
        <li>
          <i class='fas fa-user'></i>
          <a href='register.html'>Register</a>
        </li>
        <li>
          <i class='fas fa-lock'></i>
          <a href='login.html'>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
