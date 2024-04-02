import React from 'react';

import { FaTwitter, FaDribbble, FaLinkedin ,FaFacebookSquare} from 'react-icons/fa';

import './Footer.css';
import '../Navbar/Component.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
     
        <div className='footerLinks'>
            <h3>Log in or Sign Up</h3>
            <ul>
               <p>Job Hunt is the best platform to rewrite the story of your life. 
                It all begins here!</p>
                <ul className='footer-brans' style={{cursor:'pointer' }}>
                <FaFacebookSquare style={{ color: '#016ec1', cursor:'pointer' }} />
                <FaTwitter style={{ color: 'blue' }}/>
                <FaDribbble style={{ color: 'pink' }}/>
                <FaLinkedin style={{ color: 'blue' }} />
            </ul>
            </ul>
        </div>
        <div className='footerLinks'>
            <h3>Faq</h3>
            <ul>
                <li>About us</li>
                <li>Career us</li>
                <li>Faq</li>
                <li>support</li>
                <li>support</li>
                
                
            </ul>

        </div>
        <div className='footerLinks'>
            <h3>Information</h3>
            <ul>
                <li>Pricing</li>
                <li>Blog</li>
                <li>About us</li>
                <li>Press Kit</li>
                <li>Support</li>
                <li>SiteMap</li>
            </ul>

        </div>
        <div className='footerLinks'>
            <h3>Privacy and Policy</h3>
            <ul>
                <li>Terms and services</li>
                <li>License Agreement</li>
                <li>Copyright Information</li>
                <li>Cookie Policy</li>
                <li>Cookies Settings</li>
            </ul>

        </div>
        

       
        </div>
      
      
    </footer>
  )
}

export default Footer