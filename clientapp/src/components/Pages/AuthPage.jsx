import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '../../Style/AuthPage.css';
import axios from 'axios';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    Role: '',
    Email: '',
    Phone: '',
    Password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    alert('Session expired. Please log in again.');
    sessionStorage.clear();
    navigate('/login');
  };

  const refreshTokenIfNeeded = async () => {
    const token = sessionStorage.getItem('token');
    const expiration = sessionStorage.getItem('expiration');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (!token || !expiration || !refreshToken) {
      console.warn('⚠ No session data to refresh.');
      return;
    }

    const now = new Date();
    const expirationDate = new Date(expiration);

    if (now >= expirationDate || (expirationDate - now) / 1000 < 60) {
      try {
        const response = await axios.post('http://localhost:5176/api/RfreshToken/RefreshToken', {
          refreshToken: refreshToken,
        });

        const data = response.data;

        if (data?.token && data?.refreshToken && data?.expiration) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('refreshToken', data.refreshToken);
          sessionStorage.setItem('expiration', data.expiration);
          console.log('✅ Token refreshed successfully.');
        } else {
          console.error('⚠ Invalid refresh response structure');
          handleLogout();
        }
      } catch (error) {
        console.error('❌ Refresh token failed:', error);
        handleLogout();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = sessionStorage.getItem('token');
      const expiresAt = sessionStorage.getItem('expiration');

      if (!token || !expiresAt) return;

      const expiry = new Date(expiresAt);
      const now = new Date();
      const timeLeft = expiry - now;

      console.log('⏱ Checking token expiration... Time left:', timeLeft / 1000, 'seconds');

      if (timeLeft > 0 && timeLeft < 2 * 60 * 1000) {
        refreshTokenIfNeeded();
      } else if (timeLeft <= 0) {
        refreshTokenIfNeeded();
      }
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      try {
        const response = await axios.post('http://localhost:5176/api/User/register', formData);
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      } catch (error) {
        console.error('❌ Registration error:', error.response?.data || error.message);
        alert('Registration failed.');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5176/api/User/login', {
          Email: formData.Email,
          Password: formData.Password,
        });

        const data = response.data;

        if (
          data &&
          data.token &&
          data.role &&
          data.refreshToken &&
          data.expiration
        ) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('role', data.role);
          sessionStorage.setItem('refreshToken', data.refreshToken);
          sessionStorage.setItem('expiration', data.expiration);

         
          refreshTokenIfNeeded();

          setTimeout(() => {
            if (data.role === 'Customer') {
              navigate('/');
            } else if (data.role === 'Vendor') {
              navigate('/vendor-dashboard');
            } else  {
              navigate('/admin');
            }
          }, 100);
        } else {
          alert('Login failed: Missing data from server.');
        }
      } catch (error) {
        console.error('❌ Login error:', error.response?.data || error.message);
        alert('Login failed. Check email and password.');
      }
    }
  };

  return (
    <div className="auth-container">
      <Navbar />
       

      <div class="background-images">
    <img src="https://media.istockphoto.com/id/1502375774/vector/shopping-online-global-retail-shop-store-order-purchase-sale-discount-payment-set-3d-icon.jpg?s=612x612&w=0&k=20&c=IWjAEaxamwXmmGCO0ajtR3mrV3d3ruQPF0QxNQ9cFss=" />
    <img src="https://media.istockphoto.com/id/1499697643/vector/shopping-goods-purchase-internet-store-order-sale-discount-special-offer-set-3d-icon-vector.jpg?s=612x612&w=0&k=20&c=yvZJOi0ckVT92i0t-4LxhplO1D2nOOMuP1lPIQhX4DE=" />
    <img src="https://media.istockphoto.com/id/1502375776/vector/internet-shopping-goods-delivery-order-purchase-smartphone-application-set-3d-icon-realistic.jpg?s=612x612&w=0&k=20&c=X9JdtwbNKzNKvdOkKyxGOaLH2hxypZlkw5uEKJEZW2s=" />
    <img src="https://media.istockphoto.com/id/1499697628/vector/sale-discount-shopping-purchasing-commercial-service-finance-business-promo-set-3d-icon.jpg?s=612x612&w=0&k=20&c=a_Oe1MYhZTJhIRAWv6NO4801X9QOQavyjm5F2n85plg=" />
    <img src="https://media.istockphoto.com/id/1502375780/vector/shopping-online-grocery-store-goods-order-delivery-smartphone-application-set-3d-icon-vector.jpg?s=612x612&w=0&k=20&c=90YtJ-pLa9a0bKnlv-jmXsrdAe77_vkyFzzptYKmCbE=" />
    <img src="https://media.istockphoto.com/id/1502375774/vector/shopping-online-global-retail-shop-store-order-purchase-sale-discount-payment-set-3d-icon.jpg?s=612x612&w=0&k=20&c=IWjAEaxamwXmmGCO0ajtR3mrV3d3ruQPF0QxNQ9cFss=" />
    <img src="https://media.istockphoto.com/id/1499697643/vector/shopping-goods-purchase-internet-store-order-sale-discount-special-offer-set-3d-icon-vector.jpg?s=612x612&w=0&k=20&c=yvZJOi0ckVT92i0t-4LxhplO1D2nOOMuP1lPIQhX4DE=" />
    <img src="https://media.istockphoto.com/id/1502375776/vector/internet-shopping-goods-delivery-order-purchase-smartphone-application-set-3d-icon-realistic.jpg?s=612x612&w=0&k=20&c=X9JdtwbNKzNKvdOkKyxGOaLH2hxypZlkw5uEKJEZW2s=" />
    <img src="https://media.istockphoto.com/id/1499697628/vector/sale-discount-shopping-purchasing-commercial-service-finance-business-promo-set-3d-icon.jpg?s=612x612&w=0&k=20&c=a_Oe1MYhZTJhIRAWv6NO4801X9QOQavyjm5F2n85plg=" />
    <img src="https://media.istockphoto.com/id/1502375780/vector/shopping-online-grocery-store-goods-order-delivery-smartphone-application-set-3d-icon-vector.jpg?s=612x612&w=0&k=20&c=90YtJ-pLa9a0bKnlv-jmXsrdAe77_vkyFzzptYKmCbE=" />
  </div>
  <div className="auth-content">

  <form className={`auth-form ${!isLogin ? 'signup-form' : ''}`} onSubmit={handleSubmit}>
  {!isLogin && (
    <div className="form-grid">
      <div className="form-group">
        <label>Name</label>
        <input
          name="Name"
          type="text"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          name="Address"
          type="text"
          value={formData.Address}
          onChange={handleChange}
          placeholder="Enter your address"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          name="Phone"
          type="text"
          value={formData.Phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div className="form-group">
        <label>Role</label>
        <select
          name="Role"
          value={formData.Role}
          onChange={handleChange}
          required
        >
          <option value="">Select your role</option>
          <option value="Customer">Customer</option>
          <option value="Vendor">Vendor</option>
        </select>
      </div>
    </div>
  )}

  <div className="form-group">
    <label>Email</label>
    <input
      name="Email"
      type="text"
      value={formData.Email}
      onChange={handleChange}
      placeholder="Enter your email"
      required
    />
  </div>

  <div className="form-group">
    <label>Password</label>
    <input
      name="Password"
      type="password"
      value={formData.Password}
      onChange={handleChange}
      placeholder="Enter your password"
      required
    />
  </div>

  <button type="submit" className="auth-button">
    {isLogin ? 'Log In' : 'Create Account'}
  </button>

  <div className="auth-options">
    {isLogin ? (
      <p className="auth-switch">
        Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
      </p>
    ) : (
      <p className="auth-switch">
        Already have an account? <span onClick={() => setIsLogin(true)}>Log In</span>
      </p>
    )}
  </div>
</form>

      </div>
    </div>
  );
};

export default AuthPage;
