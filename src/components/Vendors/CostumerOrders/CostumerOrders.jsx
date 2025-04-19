import "./CostumerOrders.css";
import NavigationBar from "../NavigationBar/VendorNavBar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../Footer/Footer";

const CustomerOrders = () => {
  const orders = [
    {
      id: 1,
      name: "Customer 1",
      product: "LCD Monitor",
      quantity: 2,
      total: "$1300",
    },
    {
      id: 2,
      name: "Customer 2",
      product: "OLED Monitor",
      quantity: 3,
      total: "$2100",
    },
    {
      id: 3,
      name: "Customer 3",
      product: "H1 Gamepad",
      quantity: 1,
      total: "$550",
    },
    {
      id: 4,
      name: "Customer 4",
      product: "H2 Gamepad",
      quantity: 2,
      total: "$800",
    },
  ];
  return (
    <>
      <NavigationBar />
      <div className="vendor-wrapper">
        <Sidebar />
        <div className="vendor-content">
          <div className="orders-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="customer-info">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        alt="customer"
                      />
                      <span>{order.name}</span>
                    </td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
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
