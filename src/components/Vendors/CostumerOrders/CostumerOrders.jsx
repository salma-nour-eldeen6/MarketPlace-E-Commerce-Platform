import "./CostumerOrders.css";
import NavigationBar from "../NavigationBar/VendorNavBar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../Footer/Footer";
import { useState } from "react";

const CustomerOrders = () => {
  const orders = [
    {
      id: 1,
      customer: "Customer 1",
      product: "LCD Monitor",
      orderDate: "2025-04-20",
      total: "$1300",
    },
    {
      id: 2,
      customer: "Customer 2",
      product: "OLED Monitor",
      orderDate: "2025-04-21",
      total: "$2100",
    },
    {
      id: 3,
      customer: "Customer 3",
      product: "H1 Gamepad",
      orderDate: "2025-04-22",
      total: "$550",
    },
    {
      id: 4,
      customer: "Customer 4",
      product: "H2 Gamepad",
      orderDate: "2025-04-23",
      total: "$800",
    },
  ];

  const [filter, setFilter] = useState("All");

  const uniqueProducts = [
    "All",
    ...new Set(orders.map((order) => order.product)),
  ];

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.product === filter);

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
                {uniqueProducts.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </select>
            </div>

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
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="customer-info">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        alt="customer"
                      />
                      <span>{order.customer}</span>
                    </td>
                    <td>{order.product}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.total}</td>
                  </tr>
                ))}
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
