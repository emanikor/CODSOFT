import React from 'react';
import './Ctegory.css'; // Import your CSS file (replace with your actual file path)

// Import icons (you can choose from various icon libraries)
import { FaHospital, FaHardHat, FaCalculator, FaPalette, FaTshirt, FaDesktop } from 'react-icons/fa';

const Category = () => {
  const category = [
    {
      id: 1,
      title: "Hospital Job",
      icon: <FaHospital />,
    },
    {
      id: 2,
      title: "Construction Job",
      icon: <FaHardHat />,
    },
    {
      id: 3,
      title: "Accounts Job",
      icon: <FaCalculator />,
    },
    {
      id: 4,
      title: "Design and Creative",
      icon: <FaPalette />,
    },
    {
      id: 5,
      title: "Fashion Job",
      icon: <FaTshirt />,
    },
    {
      id: 6,
      title: "IT & Telecoms Job",
      icon: <FaDesktop />,
    },
    {
        id: 7,
        title: "Realestate Job",
        icon: <FaDesktop />,
      },
      {
        id: 8,
        title: "shipping Job",
        icon: <FaDesktop />,
      },
  ];

  return (
    <div className='Category'>
        <h3>Browse by category</h3>
        <span>You can locate your category where your dream job is found!</span>
      <div className='category-container'>
        {category.map((item) => (
          <div key={item.id} className='category-card'>
            <div className='category-icon'>{item.icon}</div>
            <h3>{item.title}</h3>
            {/* Additional content or styling can be added here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
