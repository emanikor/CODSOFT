import React from 'react'
import './signProfile.css'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

function SignProfile() {
  return (
    <div>

    
    <nav>
        <ul>
            <li>
                <a href=""> job seeker</a>
            </li>
        </ul>
        </nav>
        
    <div className='Card'>
    <Link  className="CardLink" to="/employer">
        <div className='Card-Container'>
            <div className='Info'>
                <p>Employer</p>
            </div>
        </div>
     </Link>
     <Link  className="CardLink" to="/signup">
        <div className='Card-Container'>
            <div className='Info'>
                <p>Job Seeker</p>
            </div>

        </div>
        </Link>
        
        </div>
        <Footer/>
    </div>
    
  )
}

export default SignProfile