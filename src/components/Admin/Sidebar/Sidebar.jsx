import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/admin/users"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        User Management
      </NavLink>
      <NavLink
        to="/admin/vendors"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        Vendors Applications
      </NavLink>
      <NavLink
        to="/admin/products"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        Products Submissions
      </NavLink>
    </div>
  );
}

export default Sidebar;
