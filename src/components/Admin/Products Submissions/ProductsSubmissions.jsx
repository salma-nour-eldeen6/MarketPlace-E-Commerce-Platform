import React, { useState } from "react";
import "./ProductsSubmissions.css";

const ProductsSubmissions = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: "$650",
      vendor: "User1",
      image: "https://media.istockphoto.com/id/944512054/photo/tv-4k-flat-screen-lcd-or-oled-plasma-realistic-illustration-white-blank-hd-monitor-mockup-with.jpg?s=612x612&w=0&k=20&c=eIVcixhPfcgmiuJ0f8aGDpRhYRXEe2Ml-KtYxkGwr9A=",
    },
    {
      id: 2,
      name: "OLED Monitor",
      price: "$700",
      vendor: "User2",
      image: "https://media.istockphoto.com/id/944512054/photo/tv-4k-flat-screen-lcd-or-oled-plasma-realistic-illustration-white-blank-hd-monitor-mockup-with.jpg?s=612x612&w=0&k=20&c=eIVcixhPfcgmiuJ0f8aGDpRhYRXEe2Ml-KtYxkGwr9A=",
    },
    {
      id: 3,
      name: "H1 Gamepad",
      price: "$550",
      vendor: "User3",
      image: "https://media.istockphoto.com/id/148171018/photo/video-game-gamepad.jpg?s=612x612&w=0&k=20&c=AEQXmZPfTDjhWdf0ZNFvVBExqs6zpDZlB9FPWYsYhDs=",
    },
    {
      id: 4,
      name: "H2 Gamepad",
      price: "$400",
      vendor: "User4",
      image: "https://media.istockphoto.com/id/148171018/photo/video-game-gamepad.jpg?s=612x612&w=0&k=20&c=AEQXmZPfTDjhWdf0ZNFvVBExqs6zpDZlB9FPWYsYhDs=",
    },
  ]);

  const handleAutoPost = (id) => {
    alert(`Auto posting enabled for User ${id}`);
  };

  const handleAccept = (id) => {
    alert(`Product ID ${id} has been accepted ✅`);
  };

  const handleReject = (id) => {
    const confirm = window.confirm("Reject this product?");
    if (confirm) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="submissions-wrapper">
      <h2 className="section-title">Products Submissions</h2>
      {products.map((product) => (
        <div className="submission-card" key={product.id}>
          <div className="submission-left">
            <img
              src={product.image}
              alt={product.name}
              className="submission-image"
            />
            <div className="submission-details">
              <h4>{product.name}</h4>
              <p className="price">{product.price}</p>
              <p className="vendor">Vendor: {product.vendor}</p>
            </div>
          </div>
          <div className="submission-actions">
            <button className="reject-btn" onClick={() => handleReject(product.id)}>
              Reject
            </button>
            <button className="accept-btn" onClick={() => handleAccept(product.id)}>
              Accept
            </button>
            <button className="auto-btn" onClick={() => handleAutoPost(product.id)}>
              Auto Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSubmissions;
