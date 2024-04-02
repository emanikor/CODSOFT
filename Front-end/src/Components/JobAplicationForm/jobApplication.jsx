import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
// import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    resume: null,
    coverLetter: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    

    e.preventDefault();
    setError(null); 

    // Reset error state on each submission
    try {
      // Create FormData object to send files
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('coverLetter', formData.coverLetter);


      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Send data to server
      const response = await axios.post("http://localhost:4000/applyjob", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Make sure to set proper content type for FormData
        }
      });
      console.log(response.data);
      alert('successfully applied')
      navigate('/')
      if (response.status == 200) {
        alert(response.data.message);
        
        // Clear form data after successful submission
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          resume: null,
          coverLetter: '',
        });
       
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      setError("Failed to apply for job. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    // Set the file to state
    // const selectedFile = e.target.files[0];

    setFormData({ ...formData, resume: e.target.files[0] });
  };
    
  return (
    <form onSubmit={handleSubmit} className="job-application-form">
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="resume">Resume:</label>
        <input
          type="file"
          className="form-control-file"
          accept='file'
          id="resume"
          onChange={handleFileChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="coverLetter">Cover Letter:</label>
        <textarea
          className="form-control"
          id="coverLetter"
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          required
        ></textarea>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="btn btn-primary">
        Apply for Job
      </button>
    </form>
  );
};

export default JobApplicationForm;
