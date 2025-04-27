import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ProductCard from '/home/snour-eldeen/E-commerce_react/src/components/Pages/ShoppingCart.jsx';
import '../../Style/Favorites.css';

const Favorites = () => {
  // Get favorites from localStorage or context
  const [favorites, setFavorites] = React.useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Remove from favorites function
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(id => id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Mock data - replace with your actual products data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      rating: 4.8,
      image: "https://example.com/headphones.jpg"
    },
    // Add other products as needed
  ];

  // Filter products to only show favorited ones
  const favoriteProducts = products.filter(product => 
    favorites.includes(product.id)
  );

  return (
    <div className="favorites-page">
      <Navbar />
      
      <div className="favorites-container">
        <h1 className="favorites-title">Your Favorites</h1>
        
        {favoriteProducts.length === 0 ? (
          <div className="empty-favorites">
            <p>You haven't added any favorites yet.</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteProducts.map(product => (
              <div key={product.id} className="favorite-item">
                <ProductCard product={product} />
                <button 
                  onClick={() => removeFromFavorites(product.id)}
                  className="remove-favorite-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
