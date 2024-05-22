import React, { useState, useEffect } from 'react';
import { FaHospital, FaHardHat, FaCalculator, FaPalette, FaTshirt, FaDesktop } from 'react-icons/fa'; 
import axios from 'axios';
import { Link } from "react-router-dom";
import './Ctegory.css';

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/Category')
      .then(response => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError('Error fetching category details');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='Category'>
      <h3>Browse by category</h3>
      <span>You can locate the category where your dream job is</span>
      <div className='category-container'>
        {category.map(item => (
          <Link key={item._id} to={`/category/${item.name}`}>
          <div key={item._id} className='category-card'>
            <div className='category-icon'>
              {item.name === 'Hospital Job' && <FaHospital />}
              {item.name === 'Construction Job' && <FaHardHat />}
              {item.name === 'Accounts Job' && <FaCalculator />}
              {item.name === 'Design and Creative' && <FaPalette />}
              {item.name === 'Fashion Job' && <FaTshirt />}
              {item.name === 'IT & Telecoms Job' && <FaDesktop />}
              {/* Add more conditions for other icons */}
            </div>
            <h3>{item.name}</h3>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
