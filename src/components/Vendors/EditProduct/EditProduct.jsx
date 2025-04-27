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
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] }); // handle file upload
    } else if (name === "price") {
      setProduct({ ...product, price: `$${value}` });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", product);
    // Backend update here, e.g., using FormData if sending a file
    /*
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('image', product.image);
    axios.post(`/api/products/${id}`, formData);
    */
    navigate(-1); // Go back
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
            onChange={handleChange}
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
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
