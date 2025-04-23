import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '/home/snour-eldeen/E-commerce_react/src/Style/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <Navbar />
      
      <div className="auth-content">
        <div>
          <img src="https://plus.unsplash.com/premium_photo-1678495325302-1986635b2bfb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8" alt="Exclusive" className="auth-image" />
        </div>
        {/* <div className="auth-header">
          <h1>{isLogin ? 'Log in to Exclusive' : 'Create an account'}</h1>
          <p>{isLogin ? 'Enter your details below' : 'Enter your details to register'}</p>
        </div> */}

        <form className="auth-form">
        {!isLogin && (
  <>
    <div className="form-group">
      <label>Name</label>
      <input type="text" placeholder="Enter your name" required />
    </div>

    <div className="form-group">
      <label>Address</label>
      <input type="text" placeholder="Enter your address" required />
    </div>

    <div className="form-group">
      <label>Role</label>
      <select required>
        <option value="">Select your role</option>
        <option value="customer">Customer</option>
        <option value="vendor">Vendor</option>
      </select>
    </div>
  </>
)}

          
          <div className="form-group">
            <label>Email</label>
            <input type="text" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" placeholder="Enter your phone number" required />
          </div>

           

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          {isLogin ? (
            <>
              <button type="submit" className="auth-button">Log In</button>
              <p className="auth-switch">
                Don't have an account? 
                <span onClick={() => setIsLogin(false)}> Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <button type="submit" className="auth-button">Create Account</button>
              <div className="auth-options">
                 
                <p className="auth-switch">
                  Already have an account? 
                  <span onClick={() => setIsLogin(true)}> Log In</span>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;