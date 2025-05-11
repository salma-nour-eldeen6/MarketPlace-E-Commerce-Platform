import { NavLink } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import './Navbar.css';

const NavigationBar = () => {
  const isLoggedIn = sessionStorage.getItem("token"); // Check token presence

  return (
    <nav className="exclusive-navbar">
      <div className="nav-container">
        {/* Left side - Logo */}
        <div className="nav-left">
          <h1 className="logo">Exclusive</h1>
        </div>

        {/* Center - Navigation links */}
        <div className="nav-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Home
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            About
          </NavLink>

          {/* Show Sign Up if NOT logged in */}
          {!isLoggedIn && (
            <NavLink 
              to="/AuthPage" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Sign Up
            </NavLink>
          )}

          {/* Show Logout if logged in */}
          {isLoggedIn && (
            <NavLink 
              to="/Logout" 
              className="nav-link"
            >
              Logout
            </NavLink>
          )}
        </div>

        {/* Right side - Search with icons */}
        <div className="nav-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="search-input"
              aria-label="Search products"
            />
            <div className="search-icons-container">
              <button type="submit" className="search-button" aria-label="Search">
                {/* <FaSearch className="search-icon" /> */}
              </button>
            </div>

            <NavLink 
              to="/wishlist" 
              className={({ isActive }) => isActive ? "nav-icon-link active-icon" : "nav-icon-link"}
              aria-label="Wishlist"
            >
              <FaHeart className="nav-icon heart-icon" />
            </NavLink>

            <NavLink 
              to="/cart" 
              className={({ isActive }) => isActive ? "nav-icon-link active-icon" : "nav-icon-link"}
              aria-label="Shopping Cart"
            >
              <div className="cart-icon-container">
                <FaShoppingCart className="nav-icon cart-icon" />
                <span className="cart-count">0</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
