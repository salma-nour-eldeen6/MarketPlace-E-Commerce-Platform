import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CostumerOrders.css";
import NavigationBar from "../NavigationBar/VendorNavBar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../Footer/Footer";

const CustomerOrders = () => {
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token) {
      navigate("/login");
    } else if (role !== "Vendor") {
      navigate("/unauthorized");
    }
  }, [navigate]);

  
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios.get("https://localhost:7110/api/product/names", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setProducts(res.data);
      if (res.data.length > 0) {
        setFilter(res.data[0]); // تعيين أول منتج كخيار افتراضي
      }
    })
    .catch((err) => {
      console.error("Failed to fetch product names", err);
    });
  }, []);

  
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (filter && token) {
      axios.get(`https://localhost:7110/api/Product/track/${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setOrders([]);
      });
    } else {
      setOrders([]);
    }
  }, [filter]);

  return (
    <>
      <NavigationBar />
      <div className="vendor-wrapper">
        <Sidebar />
        <div className="vendor-content">
          <div className="orders-container">
            {/* Filter Dropdown */}
            <div className="order-filter-bar">
              <label htmlFor="productFilter">Filter by Product: </label>
              <select
                id="productFilter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {products.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </select>
            </div>

            {/* Orders Table */}
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Product</th>
                  <th>Order Date</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td className="customer-info">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                          alt="customer"
                        />
                        <span>{order.customerName}</span>
                      </td>
                      <td>{filter}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>{order.totalprice}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No orders found for this product.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerOrders;







