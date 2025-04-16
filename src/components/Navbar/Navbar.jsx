import { NavLink } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import './Navbar.css';

const NavigationBar = () => {
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
          <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
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
                className="nav-icon-link"
                activeClassName="active-icon"
                aria-label="Wishlist"
              >
                <FaHeart className="nav-icon heart-icon" />
              </NavLink>
              
              <NavLink 
                to="/cart" 
                className="nav-icon-link"
                activeClassName="active-icon"
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