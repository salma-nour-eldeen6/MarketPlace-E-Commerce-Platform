import { Routes, Route } from "react-router-dom";
import "./AppStyles.css";
import CustomerManager from "./components/Customers/CustomerManager";
import ProductDetails from "./components/Pages/ProductDetails";
import ShoppingCart from './components/Pages/ShoppingCart';
import Favorites from './components/Pages/Favorites';
import About from "./components/Pages/About";

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
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserManagement from "./components/Admin/UserManagement/UserManagement";
import VendorsApplications from "./components/Admin/VendorsApplications/VendorsApplications";
import ProductsSubmissions from "./components/Admin/Products Submissions/ProductsSubmissions"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenRefresher from './components/TokenRefresher';
import Logout from "./components/Pages/Logout";


const App = () => {
  return (
    <div className="app-container">
      <TokenRefresher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/customers" element={<CustomerManager />} />
        <Route path="/customers/:id" element={<CustomerManager />} />
        <Route path="/products/:ProductId" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout />} />
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

        {/* Admin Section */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<UserManagement />} /> {/* /admin */}
          <Route path="users" element={<UserManagement />} /> {/* /admin/users */}
          <Route path="vendors" element={<VendorsApplications />} /> {/*/admin/vendors*/}
          <Route path="products" element={<ProductsSubmissions />} /> {/*/admin/products */}
        </Route>
        {/* Admin Section */}
      </Routes>
    </div>
  );
};

export default App;
