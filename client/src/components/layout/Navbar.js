import React from "react";

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <a href='index.html'>
          <i className='fab fa-cuttlefish'></i> Creative Connection
        </a>
      </h1>
      <ul>
        <li>
          <a href='profiles.html'></a>
        </li>
        <li>
          <a href='register.html'></a>
        </li>
        <li>
          <a href='login.html'></a>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navbar;
