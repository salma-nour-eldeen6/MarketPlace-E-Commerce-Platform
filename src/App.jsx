import { Routes, Route } from "react-router-dom";
import "./AppStyles.css";
import CustomerManager from "./components/Customers/CustomerManager";
import ProductDetails from "./components/Pages/ProductDetails";
import ShoppingCart from './components/Pages/ShoppingCart';

import Home from "./components/Home";
import NavigationBar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import NotFound from "./components/Pages/NotFound";
import AuthPage from "./components/Pages/AuthPage";
import VendorDashboard from "./components/Vendors/VendorDashboard";
import VendorProducts from "./components/Vendors/Products/VendorProducts";
import CostumerOrders from "./components/Vendors/CostumerOrders/CostumerOrders";
import AddProduct from "./components/Vendors/AddProduct/AddProduct";
import EditProduct from './components/Vendors/EditProduct/EditProduct';
import Profile from "./components/Vendors/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/customers" element={<CustomerManager />} />
        <Route path="/customers/:id" element={<CustomerManager />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        {/* <Route path='/products' element={<ProductManager />} />
                <Route path='/products/:id' element={<ProductManager />} />
                <Route path='/orders' element={<OrderManager />} />
                <Route path='/orders/:id' element={<OrderManager />} /> */}
        <Route path="*" element={<NotFound />} />

        {/* Vendor Section */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/vendor-products" element={<VendorProducts />} />
        <Route path="/costumer-orders" element={<CostumerOrders />} />
        <Route path="/Add-Product" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/Profile" element={<Profile />} />
        {/* Vendor Section */}
      </Routes>
    </div>
  );
};

export default App;
