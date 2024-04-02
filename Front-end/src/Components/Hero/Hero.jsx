import React, { useState, useEffect } from 'react';
import axios from 'axios';
import man from '../assets/man.png';
import '../Navbar/Component.css';
import './Hero.css' 


const Hero=()=> {

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState([]);


  // useEffect(() => {
  //   const fetchCountriesAndStates = async () => {
  //     try {
  //       const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
  //       setCountries(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching countries and states:', error);
  //     }
  //   };

  //   fetchCountriesAndStates();
  // }, []);
const empty = 'please enter search';


  const handleSearch = async () => {

   
   
    try {
      setLoading(true);
      if(searchQuery == 0){
        alert("please enter search")
      }
     
      const response = await axios.get(`http://localhost:4000/jobs?query=${searchQuery}&location=${location}`);
      setSearchResults(response.data);
      setLoading(false);
    }  catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
    

  return (
    <div>
         <section id="about">
        <div className="container">

        <div className="about-content">
                <p className="about-header2">Find and Apply for a Job that suits you!
                </p>
           <p className="about-p">Here you can find your best job, Explore hundreds of jobs with us. Ready for your next adventure?
           </p>
           <div className='form'>
      <input
        type="text" 
        name="Jobtext"
        placeholder='Job Title or Keyword'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select 
        className="inputcat"
        name='ItemType'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value=''>City or state</option>
        <option value='Kenya'>Kenya</option>
        <option value='Europe'>Europe</option>
        <option value='Poland'>Poland</option>
        <option value='Singapore'>Singapore</option>
        <option value='Usa'>USA</option>
        <option value='Canada'>Canada</option>
        <option value='Australia'>Australia</option>
      </select>
      
      <button className='Search-Btn' onClick={handleSearch}>Search</button>

     
    </div>
        </div>
        <div className="aboutImage">
        <img
              src={man}
              alt='hero-image'
              className='hero-section'
            />
           </div>
        </div>
        
        
    </section>
    {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>

          <div className='Jobs-container'>
          <ul>

            {searchResults.map(job => (
              
              <li className='cards' key={job._id}>{job.title}
              
                <p>{job.Description}</p>
              </li>
             
              
            ))}
          </ul>
          </div>
        </div>
      )}   
    </div>
    
  )
}

export default Hero