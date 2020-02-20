import React from "react";
import "./Landing.css";
export const Landing = () => {
  return (
    <section className='landing'>
      <div className='overlay'>
        <div className='landing-inner'>
          <h1 className='large'>Creative Connection</h1>
          <p className='lead'>
            Create a profile/portfolio, share posts, and meet other artists
          </p>
          <div className='buttons'>
            <a href='register.html' className='btn btn-primary'>
              Sign Up
            </a>
            <a href='login.html' className='btn btn-secondary'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
