import NavigationBar from "../Vendors/NavigationBar/VendorNavBar"
import Sidebar from "./Sidebar/Sidebar"
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css"
const AdminDashboard= () => {
    return(
        <>
        <NavigationBar />
        <div className="admin-wrapper">
          <Sidebar />
          <div className="admin-content">
          <Outlet />
          </div>
        </div>
        <Footer />
      </>
    )
}

export default AdminDashboard