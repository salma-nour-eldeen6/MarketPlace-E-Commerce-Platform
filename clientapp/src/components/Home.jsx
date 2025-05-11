import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Services from "./Pages/Services";
import Footer from "./Footer/Footer";
import "../Style/Home.css";
import * as signalR from "@microsoft/signalr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://localhost:7110";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Product/posts`);
        const processedProducts = response.data
          .filter((product) => product.productId || product.id)
          .map((product) => ({
            ...product,
            productId: product.productId || product.id,
            imageUrl: product.imageUrl
              ? product.imageUrl.startsWith("https")
                ? product.imageUrl
                : `${BASE_URL}/${product.imageUrl.replace(/^\/+/, "")}`
              : null,
            price:
              typeof product.price === "string"
                ? parseFloat(product.price)
                : product.price,
            sizes: ["S", "M", "L", "XL"],
            stock: product.quantity || 10,
            rating: 4.5,
            description: product.description || "No description available",
            details: "No additional details",
            category: product.category || "Uncategorized",
            vendor: { name: product.vendorName || "Unknown Vendor" },
          }));

        setProducts(processedProducts);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProducts();

    const createConnection = async () => {
      try {
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(`${BASE_URL}/notifications`)
          .withAutomaticReconnect()
          .build();

        connection.on("NewProductAdded", (data) => {
          setProducts((prevProducts) => {
            const existingProduct = prevProducts.find(
              (p) => p.productId === data.product.productId
            );

            if (!existingProduct) {
              toast.info("New product added!" || data.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                  backgroundColor: "#FFA500",
                  color: "#fff",
                },
              });

              const newProduct = {
                ...data.product,
                productId: data.product.productId || data.product.id,
                imageUrl: data.product.image
                  ? data.product.image.startsWith("https")
                    ? data.product.image
                    : `${BASE_URL}/${data.product.image.replace(/^\/+/, "")}`
                  : null,
                price:
                  typeof data.product.price === "string"
                    ? parseFloat(data.product.price)
                    : data.product.price,
                sizes: ["S", "M", "L", "XL"],
                stock: data.product.quantity || 10,
                rating: 4.5,
                description:
                  data.product.description || "No description available",
                details: "No additional details",
                category: data.product.category || "Uncategorized",
                vendor: { name: data.product.vendorName || "Unknown Vendor" },
              };

              return [newProduct, ...prevProducts];
            } else {
              return prevProducts;
            }
          });
        });

        await connection.start();
        return connection;
      } catch (err) {
        console.error("SignalR Connection Error:", err);
        return null;
      }
    };

    let connection;
    createConnection().then((conn) => {
      connection = conn;
    });

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [loading, error]);

  const handleProductClick = (product) => {
    if (!product.productId) return;
    navigate(`/products/${product.productId}`, { state: { product } });
  };

  const productsByCategory = {
    "womens-fashion": products.filter((p) =>
      (p?.name?.toLowerCase() || "").includes("women")
    ),
    "mens-fashion": products.filter((p) =>
      (p?.name?.toLowerCase() || "").includes("men")
    ),
    electronics: products.filter((p) =>
      ["electronic", "headphone", "phone", "laptop"].some((keyword) =>
        (p?.name?.toLowerCase() || "").includes(keyword)
      )
    ),
  };

  return (
    <>
      {loading && (
        <div className={`fade-loading-screen ${!loading ? "hidden" : ""}`}>
          <div className="simple-spinner"></div>
        </div>
      )}

      <div
        className={`home-layout page-content ${showContent ? "show" : ""}`}
        style={{ display: loading ? "none" : "block" }}
      >
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content-area">
            <div className="banner-container">
              <img
                src="https://img.freepik.com/premium-vector/mega-sale-banner-design-3d-illustration-yellow-background-sale-smartphone-with-tag-discount_420121-260.jpg"
                alt="Special Offers"
                className="banner-image"
                loading="lazy"
              />
            </div>

            {["womens-fashion", "mens-fashion", "electronics"].map(
              (category) =>
                productsByCategory[category].length > 0 && (
                  <section
                    key={category}
                    id={category}
                    className="category-section"
                  >
                    <h2>
                      {category
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h2>
                    <div className="products-grid">
                      {productsByCategory[category].map((product) => (
                        <ProductCard
                          key={product?.productId}
                          product={product}
                          onClick={() => handleProductClick(product)}
                        />
                      ))}
                    </div>
                  </section>
                )
            )}

            {products.length > 0 && (
              <section id="other-products" className="category-section">
                <h2>Discover More</h2>
                <div className="products-grid">
                  {products
                    .filter(
                      (p) =>
                        !productsByCategory["womens-fashion"].includes(p) &&
                        !productsByCategory["mens-fashion"].includes(p) &&
                        !productsByCategory["electronics"].includes(p)
                    )
                    .map((product) => (
                      <ProductCard
                        key={product?.productId}
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                </div>
              </section>
            )}
          </div>
        </div>
        <Services />
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  const getImageUrl = () => {
    if (!product.imageUrl) return "";
    const cleanUrl = product.imageUrl.replace(/([^:]\/)\/+/g, "$1");

    if (cleanUrl.includes("localhost") || cleanUrl.startsWith("https")) {
      return cleanUrl;
    }

    if (cleanUrl.startsWith("uploads/") || cleanUrl.startsWith("/uploads/")) {
      return `${BASE_URL}/${cleanUrl.replace(/^\/+/, "")}`;
    }

    return cleanUrl;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product?.name || "Product"}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="no-image-placeholder">No Image</div>
        )}
        {product.stock <= 0 && (
          <div className="out-of-stock-label">Out of Stock</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product?.name || "Unnamed Product"}</h3>
        <div className="product-meta">
          <p className="product-price">
            {product?.price ? `$${product.price.toFixed(2)}` : "Price N/A"}
          </p>
          {product?.vendor?.name && (
            <p className="product-vendor">Sold by: {product.vendor.name}</p>
          )}
        </div>
        {product?.description && (
          <p className="product-description">
            {product.description.length > 60
              ? `${product.description.substring(0, 60)}...`
              : product.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
