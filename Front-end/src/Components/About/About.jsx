import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import '../About/Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4000/api/jobs')
            .then(response => {
                setJobs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='jobs'>
            <h1>Latest Jobs</h1>
            <p>Find the best job that fits you</p>

            {/* <select 
        className="inputcat"
        name='ItemType'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value=''>category</option>
        <option value='Kenya'>software engeenier</option>
        <option value='Europe'>web developer</option>
        <option value='Poland'>product manager</option>
        <option value='Singapore'>Junior software developer</option>
        <option value='Usa'>ict officer </option>
        <option value='Canada'>frontend developer</option>
        <option value='Australia'>backend developer</option>
        <option value='Australia'>web designer</option>
        <option value='Australia'>ui/ux designer</option>
      </select>
      <button className='Search-Btn' >Search</button> */}

     
            <div className='Jobs-container'>
                {jobs.map(job => (
                    <Link className="JobLink" key={job._id} to={`/PreviewJob/${job._id}`}>
                    <div className='cards' key={job._id}>
                        <div className='title'>{job.title}</div>
                        <div className='description'>{job.Description}</div> 
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Jobs;
