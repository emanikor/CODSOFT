import React from 'react'
import '../Navbar/Component.css';
import './Email.css'

const Email=()=> {
  return (
    <div className='Email'>
        <div className='Email-container'>
           <h2>
           Want to get notified on <br/>
             every Job Posting?
           </h2>
           <div className='EmailForm'>
           <input className='inputform' type="text" name='Email' placeholder='Enter Your Email address..' />
           <button className='Email-Button1'>Subscribe</button>
        </div>
        </div>
    </div>
  )
}

export default Email