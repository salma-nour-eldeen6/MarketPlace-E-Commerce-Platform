import { NavLink } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart ,FaUser } from "react-icons/fa";
import './VendorNavBar.css';


const VendorNavBar = () => {
  return (
    <nav className="exclusive-navbar">
      <div className="nav-container">
        {/* Left side - Logo */}
        <div className="nav-left">
          <h1 className="logo">Exclusive</h1>
        </div>

        {/* Center - Navigation links */}
        <div className="nav-center">
          <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
          <NavLink to="#" className="nav-link" activeClassName="active">Contact</NavLink>
             <NavLink to="/Logout" className="nav-link" activeClassName="active">Logout</NavLink>
        </div>

        {/* Right side - Search with icons */}
        <div className="nav-right">
          <div className="search-container">
              <NavLink 
                to="/profile" 
                className="nav-icon-link"
                aria-label="Vendor Profile"
              >
                <div className="profile-icon-container">
                  <FaUser className="nav-icon cart-icon" />
                </div>
              </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VendorNavBar;