import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import './PostForm.css';
import '../Navbar/Component.css';

const PostJobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    Description: "", 
    requirements: "",
    responsibilities: "",
    jobCategory:"",
    location: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on each submission
    try {
      const response = await axios.post("http://localhost:4000/Job", formData);
      console.log(response.data);
      if (response.data.success) {
        alert(response.data.message);
        setFormData({
          title: "",
          Description: "",
          requirements: "",
          responsibilities: "",
          jobCategory:"",
          location: "",
        });
        navigate(`/previewjob/${response.data._Id}`);
      }
    } catch (error) {
      console.error('Error posting job:', error);
      setError("Failed to post job. Please try again."); // Set error message
    }
  };
    
  return (
    <form onSubmit={handleSubmit} className="post-job-form">
      <div className="form-group">
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          className="form-control"
          id="jobTitle"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="jobDescription">Job Description:</label>
        <textarea
          className="form-control"
          id="jobDescription"
          value={formData.Description}
          onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="jobRequirements">Job Requirements:</label>
        <textarea
          className="form-control"
          id="jobRequirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="jobResponsibilities">Job Responsibilities:  `</label>
        <textarea
          className="form-control"
          id="jobResponsibilities"
          value={formData.responsibilities}
          onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
          required
        ></textarea>
      </div>
      <select 
        className="form-control"
        type ="jobCategory"
        id="jobCategory"
        value={formData.jobCategory}
        onChange={(e) => setFormData({ ...formData, jobCategory: e.target.value})}
        required
      >
        <option value=''>category</option>
        <option value='Software developer'>software engeenier</option>
        <option value='Webdeveloper'>web developer</option>
        <option value='ProductManager'>product manager</option>
        <option value='IctOfficer'>ict officer </option>
        <option value='frontendDeveloper'>frontend developer</option>
        <option value='BackendDeveloper'>backend developer</option>
        <option value='WebDesigner'>web designer</option>
        <option value='Designer'>ui/ux designer</option>
      </select>
      <div className="form-group">
        <label htmlFor="jobLocation">Job Location:</label>
        <input
          type="text"
          className="form-control"
          id="jobLocation"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="btn btn-primary">
        Post Job
      </button>
    </form>
  );
};

export default PostJobForm;
