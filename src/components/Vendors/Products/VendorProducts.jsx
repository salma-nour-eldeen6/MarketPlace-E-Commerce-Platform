import "./VendorProducts.css";
import NavigationBar from "../NavigationBar/VendorNavBar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../Footer/Footer";
import ProductTable from "../ProductTable/ProductTable";

const Vendor = () => {
  const products = [
    {
      id: 1,
      name: "LCD Monitor",
      image: "https://media.istockphoto.com/id/944512054/photo/tv-4k-flat-screen-lcd-or-oled-plasma-realistic-illustration-white-blank-hd-monitor-mockup-with.jpg?s=612x612&w=0&k=20&c=eIVcixhPfcgmiuJ0f8aGDpRhYRXEe2Ml-KtYxkGwr9A=",
      price: "$650",
      quantity: 500,
      inStock: 200,
    },
    {
      id: 2,
      name: "OLED Monitor",
      image: "https://media.istockphoto.com/id/944512054/photo/tv-4k-flat-screen-lcd-or-oled-plasma-realistic-illustration-white-blank-hd-monitor-mockup-with.jpg?s=612x612&w=0&k=20&c=eIVcixhPfcgmiuJ0f8aGDpRhYRXEe2Ml-KtYxkGwr9A=",
      price: "$700",
      quantity: 500,
      inStock: 200,
    },
    {
      id: 3,
      name: "H1 Gamepad",
      image: "https://media.istockphoto.com/id/148171018/photo/video-game-gamepad.jpg?s=612x612&w=0&k=20&c=AEQXmZPfTDjhWdf0ZNFvVBExqs6zpDZlB9FPWYsYhDs=",
      price: "$550",
      quantity: 300,
      inStock: 100,
    },
    {
      id: 4,
      name: "H2 Gamepad",
      image: "https://media.istockphoto.com/id/148171018/photo/video-game-gamepad.jpg?s=612x612&w=0&k=20&c=AEQXmZPfTDjhWdf0ZNFvVBExqs6zpDZlB9FPWYsYhDs=",
      price: "$400",
      quantity: 300,
      inStock: 100,
    },
  ];
  return (
    <>
      <NavigationBar />
      <div className="vendor-wrapper">
        <Sidebar />
        <div className="vendor-content">
          <div className="inventory-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>In Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td className="product-info">
                      <img src={prod.image} alt={prod.name} />
                      <span>{prod.name}</span>
                    </td>
                    <td>{prod.price}</td>
                    <td>{prod.quantity}</td>
                    <td>{prod.inStock}</td>
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

export default Vendor;
