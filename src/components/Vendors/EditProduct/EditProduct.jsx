import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const productData = state?.product;

  const [product, setProduct] = useState(productData || {
    name: "",
    price: "",
    quantity: "",
    status: "Pending",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", product);
    // You can send this to a backend here
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="edit-product-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Edit Product - {product.name}</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price.replace("$", "")}
            onChange={(e) =>
              setProduct({ ...product, price: `$${e.target.value}` })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
