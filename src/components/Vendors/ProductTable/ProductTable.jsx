import React from "react";
import "./ProductTable.css";
import { Link } from "react-router-dom";

function ProductTable() {
  const products = [
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
  ];

  const handleDelete = (id) => {
    console.log("Delete product:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit product:", id);
  };

  return (
    <div className="product-container">
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
          {products.map((prod) => (
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
                    onClick={() => handleEdit(prod.id)}
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
