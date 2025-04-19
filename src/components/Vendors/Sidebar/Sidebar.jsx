import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/vendor-dashboard"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        Products Dashboard
      </NavLink>
      <NavLink to="/vendor-products" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} >My Products</NavLink>
      <NavLink to="/costumer-orders" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} >Customers Orders</NavLink>
    </div>
  );
}

export default Sidebar;
