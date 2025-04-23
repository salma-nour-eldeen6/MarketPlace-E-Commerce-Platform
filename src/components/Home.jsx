import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";  
import Sidebar from "./Sidebar/Sidebar";  
import Services from "./Pages/Services";
import Footer from "./Footer/Footer";
import ProductDetails from "./Pages/ProductDetails";
// import ProductCard from "./ProductCard"; // Importing ProductCard component
import "../Style/Home.css";  

const productsByCategory = {
  "womens-fashion": [
    {
      id: 1,
      name: "Women's Summer Dress",
      price: 49.99,
      rating: 4.5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_-m0o4e6QParA0ofCMowzla2ruDm3lJ1I3MZKWP-WeJ0kqXcgR7-wky7Zy3jBEW9pMdg&usqp=CAU",
      description: "Lightweight summer dress with floral pattern"
    },
    {
      id: 2,
      name: "Women's Sneakers",
      price: 79.99,
      rating: 4.2,
      image: "https://www.mytheresa.com/media/1094/1238/100/0b/P00682288.jpg",
      description: "Comfortable running shoes for women"
    }
  ],
  "mens-fashion": [
    {
      id: 3,
      name: "Men's Casual Shirt",
      price: 39.99,
      rating: 4.3,
      image: "https://www.mytheresa.com/media/652/738/100/45/P00983828.jpg",
      description: "Cotton casual shirt for men"
    },
    {
      id: 4,
      name: "Men's Jeans",
      price: 59.99,
      rating: 4.7,
      image: "https://www.mytheresa.com/media/652/738/100/ef/P01013282.jpg",
      description: "Slim fit denim jeans"
    },
    {
        id: 5,
        name: "Men's Jeans",
        price: 59.99,
        rating: 4.7,
        image: "https://www.mytheresa.com/media/652/738/100/82/P01001134.jpg",
        description: "Slim fit denim jeans"
      },
      {
        id: 6,
        name: "Men's Jeans",
        price: 59.99,
        rating: 4.7,
        image: "https://www.mytheresa.com/media/652/738/100/76/P00980732.jpg",
        description: "Slim fit denim jeans"
      }
  ],
  "electronics": [
    {
      id: 7,
      name: "Wireless Headphones",
      price: 129.99,
      rating: 4.8,
      image: "https://cdn.thewirecutter.com/wp-content/media/2023/09/noise-cancelling-headphone-2048px-0876.jpg",
      description: "Noise-cancelling Bluetooth headphones"
    }
  ]
};

const Home = () => {
  return (
    <div className="home-layout">
      <Navbar />
      
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          {/* Banner Image */}
          <div className="banner-container">
            <img 
              src="https://img.freepik.com/premium-vector/mega-sale-banner-design-3d-illustration-yellow-background-sale-smartphone-with-tag-discount_420121-260.jpg?uid=R195428479&ga=GA1.1.87692558.1744835985&semt=ais_hybrid&w=740" 
              alt="Special Offers" 
              className="banner-image"
            />
          </div>

          {/* Women's Fashion Section */}
          <section id="womens-fashion" className="category-section">
            <h2>Woman's Fashion</h2>
            <div className="products-grid">
              {productsByCategory["womens-fashion"].map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Men's Fashion Section */}
          <section id="mens-fashion" className="category-section">
            <h2>Men's Fashion</h2>
            <div className="products-grid">
              {productsByCategory["mens-fashion"].map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Electronics Section */}
          <section id="electronics" className="category-section">
            <h2>Electronics</h2>
            <div className="products-grid">
              {productsByCategory["electronics"].map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Services />
      <Footer />
    </div>
    
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span 
              key={i} 
              className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
            >
              {i < product.rating ? '★' : '☆'}
            </span>
          ))}
          <span className="rating-value">({product.rating})</span>
        </div>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
    
  );
};

export default Home;