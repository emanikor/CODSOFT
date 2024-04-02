import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import './Sign.css'






export const Register = (props) => {
  const Navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    company:"",
    website:"",
    phone: "",
    password: "",
    confirmPassword: "",
    Description:"",
  };


  const generateSuccess = (success) => toast.success(success, {
    position: "bottom-right"
  });

  const generateError = (err) => toast.error(err, {
    position: "bottom-right"
  });
  const [user, setUser] = useState('');
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  // setting a strong password
  const isStrongPassword = (password) => {
    const minPasswordLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
  
    return (
      password.length >= minPasswordLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Check if passwords match
    if (values.password !== values.confirmPassword) {
      generateError("Password and Confirm Password do not match");
      return;
    }

    if (!isStrongPassword(values.password)) {
      generateError("Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.");
      return; 
    }
    // sending the request
    try {
      const { data } = await axios.post("http://localhost:4000/employer", {
        ...values,

        
      });
    
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          generateSuccess("Successfully registered. Check your email for verification.");

 
          if (data.user) {
            setUser(data.user);
            document.cookie = `jwt=${data.token}; path=/; secure; SameSite=strict;`;
            Navigate('/');
          } else {
            console.log("User data not available in response.");
            
          }
        }
      }
    } catch (err) {
      console.log(err);
    
    }
    

  console.log("Form submitted");
  console.log(values);
    // Reset form after submission
    setValues(initialValues);
    setLoading(false);
  };

  return (
    <div className="auth-form-container">
     
      <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="paddings">Create Employee Profile</h2>
      <label htmlFor="name">Full name:</label>
        <input
        type="text"
          name="name"
          id="name"
          placeholder="Full Name"
         required
          value={values.name}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          required
          value={values.email}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
         <label htmlFor="email">Company Name:</label>
        <input
          type="text"
          id="Company"
          name="company"
          required
          value={values.company}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
         <label htmlFor="email">website Name:</label>
        <input
          type="text"
          id="Company"
          name="website"
          required
          value={values.website}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />

        <label htmlFor="phone">Phone no:</label>
        <input
          type="number"
          placeholder="Enter Your Phone no..."
          id="phone"
          name="phone"
          required
          value={values.phone}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
          required
          value={values.password}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />

        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          placeholder="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          required
          value={values.confirmPassword}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
         <label htmlFor="confirmPassword">Job Description</label>
<textarea
className="form-control"
          id="jobDescription"
          name="Description"
          value={values.Description}
          onChange={(e) => setFormData({ ...values, [e.target.name]: e.target.value })}
          required>
</textarea>
        <button className="reg-btn" type="submit">
          Submit
        </button>
        Already have an account? <a className="link-text" onClick={() => props.onFormSwitch("Signin")}>
         Login here.
    
      </a>
      </form>
     
      <ToastContainer />
      
    </div>
    
  );
};

export default Register;
