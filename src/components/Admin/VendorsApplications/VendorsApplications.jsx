import React, { useState } from "react";
import "./VendorsApplications.css";

const VendorsApplications = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
  ]);

  const handleAccept = (id) => {
    alert(`Vendor ${id} accepted`);
  };

  const handleReject = (id) => {
    const confirmDelete = window.confirm("Reject this vendor?");
    if (confirmDelete) {
      setVendors(vendors.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="vendor-applications-wrapper">
      <h2 className="section-title">Vendor Applications</h2>
      {vendors.map((vendor) => (
        <div key={vendor.id} className="vendor-card">
          <div className="vendor-left">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="vendor"
              className="vendor-avatar"
            />
            <span>{vendor.name}</span>
          </div>
          <div className="vendor-actions">
            <button className="reject-btn" onClick={() => handleReject(vendor.id)}>
              Reject
            </button>
            <button className="accept-btn" onClick={() => handleAccept(vendor.id)}>
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorsApplications;
