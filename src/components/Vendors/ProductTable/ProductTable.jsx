import React, { useState } from "react";
import "./ProductTable.css";
import { Link, useNavigate } from "react-router-dom";

function ProductTable() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: "$650",
      quantity: 1,
      status: "Accepted",
      image:
        "https://media.istockphoto.com/id/944512054/photo/tv-4k-flat-screen-lcd-or-oled-plasma-realistic-illustration-white-blank-hd-monitor-mockup-with.jpg?s=612x612&w=0&k=20&c=eIVcixhPfcgmiuJ0f8aGDpRhYRXEe2Ml-KtYxkGwr9A=",
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: "$550",
      quantity: 2,
      status: "Pending",
      image:
        "https://media.istockphoto.com/id/148171018/photo/video-game-gamepad.jpg?s=612x612&w=0&k=20&c=AEQXmZPfTDjhWdf0ZNFvVBExqs6zpDZlB9FPWYsYhDs=",
    },
  ]);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (confirmed) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    navigate(`/edit/${product.id}`, { state: { product } });
  };

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((prod) => prod.status === filter);

  return (
    <div className="product-container">
      {/* Filter Dropdown */}
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

      {/* Product Table */}
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
            <tr key={prod.id}>
              <td className="product-info">
                <div className="product-image-container">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="product-image"
                  />
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(prod.id)}
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
                <select defaultValue={prod.quantity}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </td>
              <td
                className={
                  prod.status.toLowerCase() === "accepted"
                    ? "accepted"
                    : "pending"
                }
              >
                {prod.status}
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
