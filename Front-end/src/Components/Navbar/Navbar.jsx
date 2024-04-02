import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import'./Component.css'



const Navbar =()=> {
  return (
    // <div className='nav'>
    <nav>
      <ul>
      <li>
          <Link to="/">JOB BOARD</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">Browser Job</Link>
        </li>
        
        
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/sign">login</Link>
        </li>
        <li className='small-btn'>

          <Link to="/postjob" style={{color:'white'}}>Post a job</Link>
        </li>
      </ul>
    </nav>
  
// </div>
  );
}

export default Navbar