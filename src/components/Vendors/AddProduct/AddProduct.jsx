import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    stock: '',
    image: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Added:', product);
    // Backend submit here
  };

  return (
    <div className="add-product-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        {/* form fields here */}
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>In Stock</label>
          <input type="number" name="stock" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="image" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        <button type="submit" className="add-btn">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
