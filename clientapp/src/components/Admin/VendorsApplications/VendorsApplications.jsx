import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VendorsApplications.css";

const VendorsApplications = () => {
  const [vendors, setVendors] = useState([]);

  const AdminId = 1;
  const API_BASE = "https://localhost:7110/api";

  useEffect(() => {
    axios
      .get(`${API_BASE}/Admin`)
      .then((response) => {
        console.log("Fetched vendors:", response.data);
        setVendors(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch vendors:", error);
      });
  }, []);

  const handleAccept = async (vendorId) => {
    try {
      const response = await axios.put(
        `${API_BASE}/Admin/accept-vendor${vendorId}-${AdminId}`
      );
      alert(response.data);
  
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor.userId === vendorId ? { ...vendor, status: "Accepted" } : vendor
        )
      );
    } catch (error) {
      console.error("Error accepting vendor:", error);
      alert("Error accepting vendor.");
    }
  };
  
  const handleReject = async (vendorId) => {
    const confirmDelete = window.confirm("Reject this vendor?");
    if (confirmDelete) {
      try {
        const response = await axios.put(
          `${API_BASE}/Admin/reject-vendor${vendorId}?AdminId=${AdminId}`
        );
        alert(response.data);
  
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor.userId === vendorId ? { ...vendor, status: "Rejected" } : vendor
          )
        );
      } catch (error) {
        console.error("Error rejecting vendor:", error);
        alert("Error rejecting vendor.");
      }
    }
  };
  

  return (
    <div className="vendor-applications-wrapper">
      <h2 className="section-title">Vendor Applications</h2>
      {vendors.map((vendor) => (
        <div key={vendor.userId || vendor.id} className="vendor-card">
          <div className="vendor-left">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="vendor"
              className="vendor-avatar"
            />

            <div>
              <strong style={{ color: "#FFA500" }}>Name:</strong>{" "}
              <span style={{ color: "#000" }}>{vendor.name}</span>
            </div>
            <div>
              <strong style={{ color: "#FFA500" }}>Email:</strong>{" "}
              <span style={{ color: "#000" }}>{vendor.email}</span>
            </div>
            <div>
              <strong style={{ color: "#FFA500" }}>Phone:</strong>{" "}
              <span style={{ color: "#000" }}>{vendor.phone}</span>
            </div>
            <div>
              <strong style={{ color: "#FFA500" }}>Address:</strong>{" "}
              <span style={{ color: "#000" }}>{vendor.address}</span>
            </div>
          </div>

          <div className="vendor-actions">
          <div className="vendor-actions">
  {vendor.status ? (
    <span
      style={{
        fontWeight: "bold",
        color: vendor.status === "Accepted" ? "green" : "red",
      }}
    >
      {vendor.status}
    </span>
  ) : (
    <>
      <button
        className="reject-btn"
        onClick={() => handleReject(vendor.userId)}
      >
        Reject
      </button>
      <button
        className="accept-btn"
        onClick={() => handleAccept(vendor.userId)}
      >
        Accept
      </button>
    </>
  )}
</div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorsApplications;
