import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const productData = state?.product;

  const [product, setProduct] = useState(productData || {
    Name: "",
    Price: "",
    Description: "",
    Quantity: "",
    CategoryName: "",
    ImageFile: null,
  });

  const [imagePreview, setImagePreview] = useState(productData?.Image || null);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const role = decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (role === "Vendor") {
          setIsVendor(true);
        } else {
          alert("Only vendors can edit products.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        navigate("/login");
      }
    } else {
      alert("You must be logged in.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "ImageFile") {
      setProduct({ ...product, ImageFile: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", product.Name);
    formData.append("Price", product.Price);
    formData.append("Description", product.Description);
    formData.append("Quantity", product.Quantity);
    formData.append("CategoryName", product.CategoryName);
    if (product.ImageFile) {
      formData.append("ImageFile", product.ImageFile);
    }

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `https://localhost:7110/api/Product/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(-1);
    } catch (error) {
      console.error("Error updating product:", error);
      alert(`Error updating product: ${error.response?.data?.message || error.message}`);
    }
  };

  if (!isVendor) return null;

  return (
    <div className="edit-product-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Edit Product - {product.Name}</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
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
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="Description"
            value={product.Description}
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
            min="0"
          />
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
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;


