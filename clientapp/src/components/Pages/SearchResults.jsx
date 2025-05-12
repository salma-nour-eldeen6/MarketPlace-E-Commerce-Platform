import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer.jsx';
import '../../Style/SearchResults.css';

const SearchResults = () => {
 
  const dummyResults = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High quality wireless headphones with noise cancellation.',
      price: 99.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Fitness tracking smart watch with customizable face.',
      price: 59.99,
      image: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        name: 'Smart Watch',
        description: 'Fitness tracking smart watch with customizable face.',
        price: 59.99,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 4,
        name: 'Smart Watch',
        description: 'Fitness tracking smart watch with customizable face.',
        price: 59.99,
        image: 'https://via.placeholder.com/150'
      }
  ];

  return (
    <div className="search-results-page">
      <Navbar />
      <section className="search-hero">
        <div className="hero-content">
          <h1>Search Results</h1>
          <p>{dummyResults.length > 0 ? `Found ${dummyResults.length} results` : 'No results found'}</p>
        </div>
      </section>

      <section className="results-grid">
        {dummyResults.length > 0 ? (
          dummyResults.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">${product.price}</span>
              <Link to={`/product/${product.id}`} className="details-button">View Details</Link>
            </div>
          ))
        ) : (
          <p className="no-results-message">Try searching with different keywords.</p>
        )}
      </section>
      <Footer /> 
    </div>
  );
};

export default SearchResults;
