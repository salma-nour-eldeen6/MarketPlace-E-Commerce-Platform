import "./VendorDashboard.css";
import NavigationBar from "./NavigationBar/VendorNavBar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import ProductTable from "./ProductTable/ProductTable";

const VendorDashboard = () => {
  return (
    <>
      <NavigationBar />
      <div className="vendor-wrapper">
        <Sidebar />
        <div className="vendor-content">
          <ProductTable />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorDashboard;
