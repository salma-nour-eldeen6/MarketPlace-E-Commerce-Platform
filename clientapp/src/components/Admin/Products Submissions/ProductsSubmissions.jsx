import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductsSubmissions.css";

const API_BASE = "https://localhost:7110/api";
const AdminId = 1; 

const ProductsSubmissions = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/Admin/posts`);
      console.log("Fetched posts:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAccept = async (postId) => {
    console.log("Preparing to accept post, postId =", postId);
    try {
      const response = await axios.put(`${API_BASE}/Admin/accept-post${postId}`);
      console.log("Accept response:", response.data);
      alert(response.data);
      fetchPosts();
    } catch (error) {
      console.error("Error accepting post:", error);
      alert("Error accepting post.");
    }
  };

  const handleReject = async (postId) => {
    const confirmReject = window.confirm("Reject this product?");
    if (confirmReject) {
      console.log("Preparing to reject post, postId =", postId);
      try {
        const response = await axios.put(`${API_BASE}/Admin/reject-post${postId}`);
        console.log("Reject response:", response.data);
        alert(response.data);
        fetchPosts();
      } catch (error) {
        console.error("Error rejecting post:", error);
        alert("Error rejecting post.");
      }
    }
  };

  const handleAutoPost = async (vendorId) => {
    console.log("Enabling auto post for vendorId =", vendorId);
    try {
      const dto = {
        AdminId,
        VendorId: vendorId,
        PermissionId: 1,
      };
      const response = await axios.put(`${API_BASE}/Admin/EnableAutoPost`, dto);
      console.log("Auto post response:", response.data);
      alert(response.data);
    } catch (error) {
      console.error("Error enabling auto post:", error);
      alert("Error enabling auto post.");
    }
  };

  return (
    <div className="submissions-wrapper">
      <h2 className="section-title">Products Submissions</h2>
      {posts.map((post) => (
        <div className="submission-card" key={post.postId}>
          <div className="submission-left">
            {/* <img
              src={post.image || "https://via.placeholder.com/150"}
              alt={post.productName}
              className="submission-image"
            /> */}
            <div className="submission-details">
              <div>
                <strong style={{ color: "#a93226" }}>Product Name:</strong>{" "}
                <span>{post.productName}</span>
              </div>
              <div>
                <strong style={{ color: "#a93226" }}>Vendor Name:</strong>{" "}
                <span>{post.vendorName}</span>
              </div>
              <div>
                <strong style={{ color: "#a93226" }}>Price:</strong>{" "}
                <span>${post.price}</span>
              </div>
              <div>
                <strong style={{ color: "#a93226" }}>Quantity:</strong>{" "}
                <span>{post.quantity}</span>
              </div>
              <div>
                <strong style={{ color: "#a93226" }}>Status:</strong>{" "}
                <span>{post.status ? "Accepted" : "Pending/Rejected"}</span>
              </div>
            </div>
          </div>
          <div className="submission-actions">
            <button className="reject-btn" onClick={() => handleReject(post.postId)}>
              Reject
            </button>
            <button className="accept-btn" onClick={() => handleAccept(post.postId)}>
              Accept
            </button>
            <button className="auto-btn" onClick={() => handleAutoPost(post.vendorId)}>
              Auto Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSubmissions;

