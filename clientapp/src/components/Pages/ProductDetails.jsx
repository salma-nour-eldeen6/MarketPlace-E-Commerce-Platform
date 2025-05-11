import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "../../Style/ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (location.state?.product) return;

      try {
        const response = await fetch(`https://localhost:7110/api/Product/posts/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();

        const processedProduct = {
          ...data,
          images: data.imageUrl
            ? [data.imageUrl.startsWith('https')
                ? data.imageUrl
                : `https://localhost:7110/${data.imageUrl.replace(/^\/+/, '')}`]
            : ['https://via.placeholder.com/600x600?text=No+Image'],
          price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
          sizes: data.sizes || ['S', 'M', 'L', 'XL'],
          stock: data.quantity || 10,
          rating: data.rating || 4.5,
          description: data.description || 'No description available',
          details: data.details || 'No additional details',
          category: data.category || 'Uncategorized',
          vendor: data.vendorName ? { name: data.vendorName } : { name: 'Unknown Vendor' },
        };

        setProduct(processedProduct);
        setViewCount(data.numberOfViewers || 0);
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(parseInt(productId)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, location.state]);

  useEffect(() => {
    if (product) {
      setViewCount(prev => prev + 1);
    }
  }, [product]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    try {
      const cartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        size: selectedSize,
        maxStock: product.stock 
      };

      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = existingCart.findIndex(item => 
        item.id === productId && item.size === selectedSize
      );

      if (existingItemIndex >= 0) {
        const newQuantity = existingCart[existingItemIndex].quantity + quantity;
        if (newQuantity > existingCart[existingItemIndex].maxStock) {
          alert(`You can't add more than ${existingCart[existingItemIndex].maxStock} of this item`);
          return;
        }
        existingCart[existingItemIndex].quantity = newQuantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert(`${quantity} ${product.name} (Size: ${selectedSize}) added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding the product to your cart. Please try again.');
    }
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (newFavoriteStatus) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, parseInt(productId)]));
    } else {
      localStorage.setItem('favorites', JSON.stringify(favorites.filter(fav => fav !== parseInt(productId))));
    }
  };

  if (loading) return <div className="loading-container"><Navbar /><div className="loading-spinner">Loading product details...</div><Footer /></div>;
  if (error) return <div className="error-container"><Navbar /><div className="error-message">{error}</div><Footer /></div>;
  if (!product) return <div className="not-found-container"><Navbar /><div className="not-found-message">Product not found</div><Footer /></div>;

  return (
    <div className="product-details-layout">
      <Navbar />
      
      <div className="product-details-container">
        <div className="product-images">
          <div className="favorite-badge" onClick={toggleFavorite}>
            {isFavorite ? '❤️' : '♡'}
          </div>
          <div className="main-image">
            <img 
              src={product.images?.[selectedImage] || 'https://via.placeholder.com/600x600?text=No+Image'} 
              alt={product.name} 
              onError={(e) => e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image'}
            />
          </div>
          <div className="thumbnail-container">
            {(product.images || []).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

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
            <button 
              className="action-btn add-to-cart"
              onClick={addToCart}
              disabled={!selectedSize || product.stock <= 0}
            >
              Add to Cart
            </button>
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
