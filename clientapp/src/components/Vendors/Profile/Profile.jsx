import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "0123456789",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", user);
    // Handle save logic in backend
  };

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>My Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
