import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';
import TokenRefresher from '../../TokenRefresher';

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    Name: '',
    Price: '',
    Quantity: '',
    Description: '',
    ImageFile: null,
    CategoryName: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'ImageFile') {
      setProduct({ ...product, ImageFile: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  
  const getRoleFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.warn("⚠ No token found in sessionStorage.");
      return null;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      console.log("🔍 Decoded JWT Payload:", decodedPayload);

      const role = decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (role) {
        console.log("✅ Role found in token payload:", role);
      } else {
        console.error("❌ Role not found in token payload.");
      }

      return role;
    } catch (error) {
      console.error("❌ Failed to decode token:", error);
      return null;
    }
  };

 
   const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.warn("⚠ No token found in sessionStorage.");
      return null;
    }
  
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      console.log("🔍 Decoded JWT Payload:", decodedPayload);
  
     
      const userId = decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] 
                   || decodedPayload['NameIdentifier']
                   || decodedPayload['sub']
                   || decodedPayload['id'];
  
      if (userId) {
        console.log("✅ User ID found in token payload:", userId);
        return userId;
      } else {
        console.error("❌ User ID not found in token payload.");
        return null;
      }
    } catch (error) {
      console.error("❌ Failed to decode token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const token = sessionStorage.getItem('token');
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate('/login');
      return;
    }

 
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("User ID not found in token. Please log in again.");
      navigate('/login');
      return;
    }


    const role = getRoleFromToken();
    if (role !== 'Vendor') {
      alert("You don't have permission to add products.");
      return;
    }


    const formData = new FormData();
    formData.append('Name', product.Name);
    formData.append('Price', product.Price);
    formData.append('Quantity', product.Quantity);
    formData.append('Description', product.Description);
    formData.append('CategoryName', product.CategoryName);
    formData.append('ImageFile', product.ImageFile);

    try {
      const response = await axios.post('https://localhost:7110/api/Product/add', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Product Added:', response.data);
      navigate('/products');
    } catch (error) {
      console.error('❌ Error adding product:', error.response?.data || error.message);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <TokenRefresher />

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

 
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="Name"
            value={product.Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="Quantity"
            value={product.Quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="Description"
            rows="2"
            value={product.Description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
  <label>Category</label>
  <select
    name="CategoryName"
    value={product.CategoryName}
    onChange={handleChange}
    required
  >
    <option value="">-- Select Category --</option>
    <option value="Electronics">Electronics</option>
    <option value="Clothing">Clothing</option>
    <option value="Books">Books</option>
    <option value="Furniture">Furniture</option>
  </select>
</div>


        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="ImageFile"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="add-btn">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;