import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


const PreviewJob = () => {
  const [previewJob, setPreviewJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Getting parameter by id
  const { jobId } = useParams();

  // Fetching job details by Id
  useEffect(() => {
    console.log('jobid:', jobId);

    if (!jobId) {
      setLoading(false);
      setError("Job ID is missing");
      return;
    }

    axios.get(`http://localhost:4000/job/${jobId}`)
      .then(response => {
        setPreviewJob(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError("Error fetching job details");
        setLoading(false);
      });
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <div className="description">
          {previewJob && (
            <div className="product-details">
              <h3 className="item-name">{previewJob.title}</h3>
              <h4>JOB DESCRIPTION</h4>
              <p className="item-description">{previewJob.Description}</p>
              <h4>JOB REQUIREMNENTS</h4>
              <p className="item-description">{previewJob.requirements}</p>
              <h4>JOb RESPONSINBILITIES</h4>
              <p className="item-description">{previewJob.responsibilities}</p>
              <h4>LOCATION</h4>
              <p className="item-description">{previewJob.location}</p>
              <div className='Price-section'>
                {/* Additional job details can be rendered here */}
                <Link to="/application">
                <button className='btn' style={{color:'white', background: 'blue', height:'40px', border: 'none', width: '120px', }}>Apply Job</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // minHeight: '100vh',
  },
  
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    width: '700px',
  },
 
};

export default PreviewJob;
