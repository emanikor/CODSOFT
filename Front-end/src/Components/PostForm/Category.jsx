import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input
    if (!categoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      // Make POST request to add category
      const response = await axios.post("http://localhost:4000/api/category", {
        name: categoryName
      });

      // Log response data (for demonstration)
      console.log(response.data);

      // Call onSubmit function with the category name
      onSubmit(categoryName);

      // Clear input field after submission
      setCategoryName('');

      // Show success message
      alert(response.data.message);
    } catch (error) {
      // Log and handle errors
      console.error('Error adding category:', error);
      alert('Error adding category. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="categoryName">Category Name:</label>
      <input
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;
