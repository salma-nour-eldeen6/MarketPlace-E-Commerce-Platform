import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "/home/snour-eldeen/E-commerce_react/src/Style/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setTimeout(() => {
          const allProducts = {
            1: {
              id: 1,
              name: "Women's Summer Dress",
              price: 49.99,
              originalPrice: 59.99,
              discount: 17,
              rating: 4.5,
              images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_-m0o4e6QParA0ofCMowzla2ruDm3lJ1I3MZKWP-WeJ0kqXcgR7-wky7Zy3jBEW9pMdg&usqp=CAU",
                "https://example.com/women-dress-2.jpg",
                "https://example.com/women-dress-3.jpg"
              ],
              description: "Lightweight summer dress with floral pattern",
              details: "This beautiful summer dress is made from 100% organic cotton. It features a floral pattern, short sleeves, and a comfortable fit that flatters all body types. Perfect for beach outings or casual summer days.",
              sizes: ["S", "M", "L", "XL"],
              colors: ["Red", "Blue", "Yellow"],
              category: "womens-fashion",
              stock: 15,
              vendor: {
                name: "Trends Co.",
                rating: 4.7
              },
              views: 1243
            },
            // يمكن إضافة منتجات أخرى هنا بنفس الهيكل
          };
          
          const foundProduct = allProducts[id];
          if (foundProduct) {
            setProduct(foundProduct);
            setViewCount(foundProduct.views);
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.includes(id));
          } else {
            setError("Product not found");
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
    setViewCount(prev => prev + 1);
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      localStorage.setItem('favorites', JSON.stringify(favorites.filter(fav => fav !== id)));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, id]));
    }
  };

  if (loading) return <div className="loading-container"><Navbar /><div className="loading-spinner">Loading product details...</div><Footer /></div>;
  if (error) return <div className="error-container"><Navbar /><div className="error-message">{error}</div><Footer /></div>;
  if (!product) return <div className="not-found-container"><Navbar /><div className="not-found-message">Product not found</div><Footer /></div>;

  return (
    <div className="product-details-layout">
      <Navbar />
      
      <div className="product-details-container">
        {/* قسم الصور */}
        <div className="product-images">
          <div className="favorite-badge" onClick={toggleFavorite}>
            {isFavorite ? '❤️' : '♡'}
          </div>
          <div className="main-image">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              onError={(e) => e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image'}
            />
          </div>
        </div>

        {/* قسم المعلومات */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                {i < product.rating ? '★' : '☆'}
              </span>
            ))}
            <span className="rating-value">({product.rating})</span>
          </div>

          <div className="price-section">
            <div className="product-price">
              ${product.price.toFixed(2)}
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="discount">{product.discount}% OFF</span>
              )}
            </div>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <span>Brand:</span>
              <strong>{product.vendor?.name || 'Unknown'}</strong>
            </div>
            <div className="meta-item">
              <span>Category:</span>
              <strong>{product.category}</strong>
            </div>
            <div className="meta-item">
              <span>Views:</span>
              <strong>{viewCount.toLocaleString()}</strong>
            </div>
          </div>

          <div className="product-description">
            <h3 className="section-title">Description</h3>
            <p className="description-text">{product.description}</p>
            <p className="description-text">{product.details}</p>
          </div>

          <div className="product-sizes">
            <h3 className="section-title">Size</h3>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <button 
                  key={index} 
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* إضافة قسم اختيار الكمية هنا */}
          <div className="product-quantity">
            <h3 className="section-title">Quantity</h3>
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stock || 10)}
              >
                +
              </button>
            </div>
            <div className="stock-status">
              {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
            </div>
          </div>

          <div className="product-actions">
            <button className="action-btn add-to-cart">Add to Cart</button>
            <button className="action-btn buy-now">Buy Now</button>
            <button 
              className={`action-btn wishlist ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '❤️ Added to Wishlist' : '♡ Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;