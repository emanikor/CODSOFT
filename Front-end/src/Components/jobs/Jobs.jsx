import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4000/api/jobs', 
        {
          
            
          })
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
            <div className='Jobs-container'>
                {jobs.map(job => (
                    <Link className="JobLink" key={job._id} to={`/PreviewJob/${job._id}`}>
                    <div className='cards' key={job._id}>
                        <div className='title'>{job.title}</div>
                        <div className='location'>{job.location}</div>
                        <br></br>
                        <div className='description'>{job.Description}</div> 
                         
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Jobs;
