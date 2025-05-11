import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductTable() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const getToken = () => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      console.log("🔑 Token:", storedToken);
    } else {
      console.warn("⚠ No token found in sessionStorage.");
    }
  };

  const getUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      console.log("🔍 Decoded JWT Payload:", decodedPayload);

      const userId = decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
                  || decodedPayload['NameIdentifier']
                  || decodedPayload['sub']
                  || decodedPayload['id'];

      if (userId) {
        console.log("✅ User ID:", userId);
        setUserId(userId);
      } else {
        console.error("❌ User ID not found in token.");
      }
    } catch (error) {
      console.error("❌ Failed to decode token:", error);
    }
  };

  const getRoleFromToken = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      const extractedRole = decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (extractedRole) {
        console.log("✅ Role:", extractedRole);
        setRole(extractedRole);
      } else {
        console.error("❌ Role not found in token.");
      }
    } catch (error) {
      console.error("❌ Failed to decode role:", error);
    }
  };

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get("https://localhost:7110/api/Product/ProductVendor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const data = response.data.map(prod => {
        let imageUrl = prod.ImageUrl || prod.imageUrl || prod.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `https://localhost:7110${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        console.log("🖼️ Processed Image URL:", imageUrl);

        return {
          ...prod,
          ProductId: prod.ProductId || prod.productId,
          ImageUrl: imageUrl,
        };
      });

      console.log("[TRACE] Normalized product data:", data);
      setProducts(data);
    } catch (error) {
      console.error("[ERROR] Failed to fetch product data:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate('/login');
    } else {
      setToken(token);
      getUserIdFromToken(token);
      getRoleFromToken(token);
      fetchProducts(token);
    }
  }, [navigate]);

  const handleEdit = (product) => {
    console.log("[TRACE] Editing product with ID:", product.ProductId);
    navigate(`/edit/${product.ProductId}`, { state: { product } });
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`https://localhost:7110/api/Product/Delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("[TRACE] Product deleted successfully:", response);
      fetchProducts(token);
    } catch (error) {
      console.error("[ERROR] Failed to delete product:", error);
    }
  };


  const filteredProducts =
  filter === "All"
    ? products
    : products.filter((prod) =>
        filter === "Accepted" ? prod.status === true : prod.status === false
      );


  return (
    <div className="product-container">
      <div className="filter-bar">
        <label htmlFor="filter">Filter by Status: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((prod) => (
            <tr key={prod.ProductId}>
              <td className="product-info">
                <div className="product-image-container">
                  {prod.ImageUrl ? (
                    <>
                      <img 
                        src={prod.ImageUrl} 
                        alt={prod.name} 
                        width="80" 
                        style={{ display: loadedImages[prod.ProductId] ? 'block' : 'none' }}
                        onLoad={() => setLoadedImages(prev => ({ ...prev, [prod.ProductId]: true }))}
                        onError={(e) => {
                          e.target.onerror = null;
                          console.error('Failed to load image:', prod.ImageUrl);
                        }}
                      />
                    </>
                  ) : (
                    <span>No image available</span>
                  )}
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(prod.ProductId)}
                  >
                    ✖
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(prod)}
                  >
                    ✎
                  </button>
                </div>
                <span>{prod.name}</span>
              </td>
              <td>{prod.price}</td>
              <td>
                
                  <span>{prod.quantity}</span>
                   
                  
              
              </td>
              <td className={prod.status ? "approved" : "pending"}>
                {prod.status ? "Approved" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-button">
        <Link to="/Add-Product">
          <button>Add Product</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductTable;




