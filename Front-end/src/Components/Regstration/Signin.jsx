import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Sign.css';

const Signin = () => {
  const navigate = useNavigate();
   const [values, setValues] = useState({
    name:"",
     email:"",
     Password: "",

   })

   const handleSubmit =(e) =>{
    e.preventDefault();
    alert('succefull logged in')
    navigate('/login')
   }

 
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
     
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e)=>
            setValues({ ...values, [e.target.Email]: e.target.value })
        }
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e)=>
            setValues({ ...values, [e.target.Password]: e.target.value })
        }
          required
        />
      </div>
      <button type="submit">Sign Up</button>
      You dont have an account  <Link to='/signup'>register here.</Link>
    </form>
  );
};

export default Signin;
