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
        const response = await axios.post('https://localhost:7110/api/RfreshToken/RefreshToken', {
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
        const response = await axios.post('https://localhost:7110/api/User/register', formData);
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      } catch (error) {
        console.error('❌ Registration error:', error.response?.data || error.message);
        alert('Registration failed.');
      }
    } else {
      try {
        const response = await axios.post('https://localhost:7110/api/User/login', {
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
              navigate('/admin-dashboard');
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
      <div className="auth-content">
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1678495325302-1986635b2bfb?w=900&auto=format&fit=crop&q=60"
            alt="Exclusive"
            className="auth-image"
          />
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
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
            </>
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
                Don't have an account?{' '}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            ) : (
              <p className="auth-switch">
                Already have an account?{' '}
                <span onClick={() => setIsLogin(true)}>Log In</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
