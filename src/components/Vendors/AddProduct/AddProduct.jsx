import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '', // New field
    image: null,      // File object
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] }); // handle file upload
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Added:', product);
    // Backend submit here (example with FormData if file upload)
    /*
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('description', product.description);
    formData.append('image', product.image);
    axios.post('/api/products', formData);
    */
  };

  return (
    <div className="add-product-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        {/* Form Fields */}
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
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </div>

        <button type="submit" className="add-btn">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
